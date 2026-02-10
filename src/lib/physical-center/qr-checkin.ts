/**
 * Physical Center Integration - QR Check-in and Attendance System
 * 
 * Manages QR code generation, scanning, attendance tracking,
 * and real-time capacity monitoring for DiGEM.
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface QRCheckIn {
  id: string;
  userId: string;
  centerId: string;
  checkInTime: Date;
  checkOutTime?: Date;
  duration?: number; // minutes
  purpose: 'learning' | 'event' | 'mentoring' | 'collaboration' | 'other';
  workspaceId?: string;
  equipmentUsed?: string[];
  xpBonus: number; // 50% bonus for physical center
}

export interface AttendanceRecord {
  userId: string;
  date: string;
  totalTime: number; // minutes
  checkIns: QRCheckIn[];
  activitiesCompleted: string[];
  collaborations: string[];
}

export interface CenterCapacity {
  centerId: string;
  totalCapacity: number;
  currentOccupancy: number;
  availableSpots: number;
  occupancyRate: number; // percentage
  peakHours: string[];
  averageStayDuration: number; // minutes
  realTimeStatus: 'available' | 'busy' | 'full';
}

export interface AttendanceAnalytics {
  userId: string;
  totalVisits: number;
  totalHours: number;
  averageSessionDuration: number;
  mostFrequentDay: string;
  mostFrequentTime: string;
  visitTrend: 'increasing' | 'stable' | 'decreasing';
  consistencyScore: number; // 0-100
  xpEarnedFromVisits: number;
}

// ============================================================================
// QR Check-in System
// ============================================================================

export class QRCheckInSystem {
  /**
   * Generate QR code for user check-in
   */
  generateCheckInQR(userId: string, centerId: string = 'digem-eskisehir'): {
    qrCode: string;
    qrData: string;
    expiresAt: Date;
  } {
    const timestamp = Date.now();
    const qrData = JSON.stringify({
      userId,
      centerId,
      timestamp,
      type: 'checkin',
    });
    
    // In production, this would generate an actual QR code image
    const qrCode = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="white"/><text x="10" y="100" font-size="12">${userId}</text></svg>`;
    
    const expiresAt = new Date(timestamp + 5 * 60 * 1000); // 5 minutes
    
    return { qrCode, qrData, expiresAt };
  }

  /**
   * Process check-in from QR scan
   */
  processCheckIn(
    qrData: string,
    purpose: QRCheckIn['purpose'] = 'learning'
  ): QRCheckIn {
    const data = JSON.parse(qrData);
    const now = new Date();
    
    // Validate QR code (not expired)
    if (now.getTime() - data.timestamp > 5 * 60 * 1000) {
      throw new Error('QR kodu süresi dolmuş. Lütfen yeni bir kod oluşturun.');
    }
    
    const checkIn: QRCheckIn = {
      id: `checkin_${data.userId}_${Date.now()}`,
      userId: data.userId,
      centerId: data.centerId,
      checkInTime: now,
      purpose,
      xpBonus: 0, // Will be calculated on checkout
    };
    
    return checkIn;
  }

  /**
   * Process check-out
   */
  processCheckOut(checkIn: QRCheckIn): QRCheckIn {
    const now = new Date();
    const duration = Math.floor((now.getTime() - checkIn.checkInTime.getTime()) / (1000 * 60));
    
    // Calculate XP bonus (50% of time-based XP)
    const baseXP = Math.floor(duration / 30) * 10; // 10 XP per 30 minutes
    const xpBonus = Math.floor(baseXP * 0.5); // 50% bonus
    
    return {
      ...checkIn,
      checkOutTime: now,
      duration,
      xpBonus,
    };
  }

  /**
   * Get active check-ins for a center
   */
  getActiveCheckIns(checkIns: QRCheckIn[]): QRCheckIn[] {
    return checkIns.filter(c => !c.checkOutTime);
  }

  /**
   * Calculate current capacity
   */
  calculateCapacity(
    activeCheckIns: QRCheckIn[],
    totalCapacity: number = 30
  ): CenterCapacity {
    const currentOccupancy = activeCheckIns.length;
    const availableSpots = totalCapacity - currentOccupancy;
    const occupancyRate = (currentOccupancy / totalCapacity) * 100;
    
    let realTimeStatus: CenterCapacity['realTimeStatus'];
    if (occupancyRate >= 90) realTimeStatus = 'full';
    else if (occupancyRate >= 70) realTimeStatus = 'busy';
    else realTimeStatus = 'available';
    
    return {
      centerId: 'digem-eskisehir',
      totalCapacity,
      currentOccupancy,
      availableSpots,
      occupancyRate,
      peakHours: ['10:00-12:00', '14:00-17:00', '19:00-21:00'],
      averageStayDuration: 180, // 3 hours
      realTimeStatus,
    };
  }
}

// ============================================================================
// Attendance Tracking System
// ============================================================================

export class AttendanceTrackingSystem {
  /**
   * Record attendance for a user
   */
  recordAttendance(userId: string, checkIns: QRCheckIn[]): AttendanceRecord {
    const today = new Date().toISOString().split('T')[0];
    const todayCheckIns = checkIns.filter(c => {
      const checkInDate = new Date(c.checkInTime).toISOString().split('T')[0];
      return checkInDate === today && c.userId === userId;
    });
    
    const totalTime = todayCheckIns.reduce((sum, c) => sum + (c.duration || 0), 0);
    
    return {
      userId,
      date: today,
      totalTime,
      checkIns: todayCheckIns,
      activitiesCompleted: [],
      collaborations: [],
    };
  }

  /**
   * Get attendance history for user
   */
  getAttendanceHistory(
    userId: string,
    checkIns: QRCheckIn[],
    days: number = 30
  ): AttendanceRecord[] {
    const records: AttendanceRecord[] = [];
    const userCheckIns = checkIns.filter(c => c.userId === userId);
    
    // Group by date
    const byDate = new Map<string, QRCheckIn[]>();
    userCheckIns.forEach(checkIn => {
      const date = new Date(checkIn.checkInTime).toISOString().split('T')[0];
      if (!byDate.has(date)) {
        byDate.set(date, []);
      }
      byDate.get(date)!.push(checkIn);
    });
    
    // Create records
    byDate.forEach((checkIns, date) => {
      const totalTime = checkIns.reduce((sum, c) => sum + (c.duration || 0), 0);
      records.push({
        userId,
        date,
        totalTime,
        checkIns,
        activitiesCompleted: [],
        collaborations: [],
      });
    });
    
    return records.sort((a, b) => b.date.localeCompare(a.date)).slice(0, days);
  }

  /**
   * Generate attendance analytics
   */
  generateAnalytics(userId: string, checkIns: QRCheckIn[]): AttendanceAnalytics {
    const userCheckIns = checkIns.filter(c => c.userId === userId && c.checkOutTime);
    
    if (userCheckIns.length === 0) {
      return {
        userId,
        totalVisits: 0,
        totalHours: 0,
        averageSessionDuration: 0,
        mostFrequentDay: 'N/A',
        mostFrequentTime: 'N/A',
        visitTrend: 'stable',
        consistencyScore: 0,
        xpEarnedFromVisits: 0,
      };
    }
    
    const totalMinutes = userCheckIns.reduce((sum, c) => sum + (c.duration || 0), 0);
    const totalHours = totalMinutes / 60;
    const averageSessionDuration = totalMinutes / userCheckIns.length;
    
    // Most frequent day
    const dayCount = new Map<string, number>();
    userCheckIns.forEach(c => {
      const day = new Date(c.checkInTime).toLocaleDateString('tr-TR', { weekday: 'long' });
      dayCount.set(day, (dayCount.get(day) || 0) + 1);
    });
    const mostFrequentDay = Array.from(dayCount.entries())
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    
    // Most frequent time
    const hourCount = new Map<number, number>();
    userCheckIns.forEach(c => {
      const hour = new Date(c.checkInTime).getHours();
      hourCount.set(hour, (hourCount.get(hour) || 0) + 1);
    });
    const mostFrequentHour = Array.from(hourCount.entries())
      .sort((a, b) => b[1] - a[1])[0]?.[0];
    const mostFrequentTime = mostFrequentHour !== undefined 
      ? `${mostFrequentHour}:00-${mostFrequentHour + 1}:00`
      : 'N/A';
    
    // Visit trend (last 30 days vs previous 30 days)
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
    const sixtyDaysAgo = now - 60 * 24 * 60 * 60 * 1000;
    
    const recentVisits = userCheckIns.filter(c => 
      c.checkInTime.getTime() >= thirtyDaysAgo
    ).length;
    const previousVisits = userCheckIns.filter(c => 
      c.checkInTime.getTime() >= sixtyDaysAgo && c.checkInTime.getTime() < thirtyDaysAgo
    ).length;
    
    let visitTrend: AttendanceAnalytics['visitTrend'];
    if (recentVisits > previousVisits * 1.2) visitTrend = 'increasing';
    else if (recentVisits < previousVisits * 0.8) visitTrend = 'decreasing';
    else visitTrend = 'stable';
    
    // Consistency score (based on regularity)
    const uniqueDays = new Set(
      userCheckIns.map(c => new Date(c.checkInTime).toISOString().split('T')[0])
    ).size;
    const daysSinceFirst = Math.floor(
      (now - userCheckIns[0].checkInTime.getTime()) / (24 * 60 * 60 * 1000)
    );
    const consistencyScore = Math.min(100, Math.round((uniqueDays / Math.max(daysSinceFirst, 1)) * 100));
    
    // XP earned from visits
    const xpEarnedFromVisits = userCheckIns.reduce((sum, c) => sum + c.xpBonus, 0);
    
    return {
      userId,
      totalVisits: userCheckIns.length,
      totalHours,
      averageSessionDuration,
      mostFrequentDay,
      mostFrequentTime,
      visitTrend,
      consistencyScore,
      xpEarnedFromVisits,
    };
  }

  /**
   * Get daily attendance report
   */
  getDailyReport(checkIns: QRCheckIn[], date?: string): {
    date: string;
    totalVisitors: number;
    totalHours: number;
    averageStayDuration: number;
    peakHour: string;
    purposeBreakdown: Record<string, number>;
    hourlyOccupancy: number[];
  } {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const dayCheckIns = checkIns.filter(c => {
      const checkInDate = new Date(c.checkInTime).toISOString().split('T')[0];
      return checkInDate === targetDate && c.checkOutTime;
    });
    
    const totalMinutes = dayCheckIns.reduce((sum, c) => sum + (c.duration || 0), 0);
    const totalHours = totalMinutes / 60;
    const averageStayDuration = dayCheckIns.length > 0 ? totalMinutes / dayCheckIns.length : 0;
    
    // Peak hour
    const hourCount = new Map<number, number>();
    dayCheckIns.forEach(c => {
      const hour = new Date(c.checkInTime).getHours();
      hourCount.set(hour, (hourCount.get(hour) || 0) + 1);
    });
    const peakHourNum = Array.from(hourCount.entries())
      .sort((a, b) => b[1] - a[1])[0]?.[0];
    const peakHour = peakHourNum !== undefined 
      ? `${peakHourNum}:00-${peakHourNum + 1}:00`
      : 'N/A';
    
    // Purpose breakdown
    const purposeBreakdown: Record<string, number> = {};
    dayCheckIns.forEach(c => {
      purposeBreakdown[c.purpose] = (purposeBreakdown[c.purpose] || 0) + 1;
    });
    
    // Hourly occupancy
    const hourlyOccupancy = Array.from({ length: 24 }, (_, hour) => {
      return dayCheckIns.filter(c => {
        const checkInHour = new Date(c.checkInTime).getHours();
        const checkOutHour = c.checkOutTime ? new Date(c.checkOutTime).getHours() : 23;
        return hour >= checkInHour && hour <= checkOutHour;
      }).length;
    });
    
    return {
      date: targetDate,
      totalVisitors: new Set(dayCheckIns.map(c => c.userId)).size,
      totalHours,
      averageStayDuration,
      peakHour,
      purposeBreakdown,
      hourlyOccupancy,
    };
  }
}

// ============================================================================
// Real-time Monitoring System
// ============================================================================

export class RealTimeMonitoringSystem {
  /**
   * Get real-time center status
   */
  getRealTimeStatus(activeCheckIns: QRCheckIn[]): {
    status: 'available' | 'busy' | 'full';
    currentOccupancy: number;
    capacity: number;
    waitTime: number; // estimated minutes
    recommendation: string;
  } {
    const capacity = 30;
    const currentOccupancy = activeCheckIns.length;
    const occupancyRate = (currentOccupancy / capacity) * 100;
    
    let status: 'available' | 'busy' | 'full';
    let waitTime = 0;
    let recommendation = '';
    
    if (occupancyRate >= 90) {
      status = 'full';
      waitTime = 30;
      recommendation = 'Merkez şu anda dolu. Lütfen daha sonra tekrar deneyin veya online çalışmayı düşünün.';
    } else if (occupancyRate >= 70) {
      status = 'busy';
      waitTime = 15;
      recommendation = 'Merkez yoğun. Hemen gelebilirsiniz ama yer bulmakta zorluk yaşayabilirsiniz.';
    } else {
      status = 'available';
      waitTime = 0;
      recommendation = 'Merkez müsait! Şimdi gelmek için harika bir zaman.';
    }
    
    return {
      status,
      currentOccupancy,
      capacity,
      waitTime,
      recommendation,
    };
  }

  /**
   * Predict future occupancy
   */
  predictOccupancy(
    historicalData: QRCheckIn[],
    targetHour: number,
    targetDay: string
  ): {
    predictedOccupancy: number;
    confidence: number; // 0-100
    recommendation: string;
  } {
    // Simple prediction based on historical averages
    const relevantCheckIns = historicalData.filter(c => {
      const day = new Date(c.checkInTime).toLocaleDateString('tr-TR', { weekday: 'long' });
      const hour = new Date(c.checkInTime).getHours();
      return day === targetDay && hour === targetHour;
    });
    
    const avgOccupancy = relevantCheckIns.length > 0 
      ? relevantCheckIns.length / 4 // Assuming 4 weeks of data
      : 15; // Default estimate
    
    const confidence = Math.min(100, relevantCheckIns.length * 5);
    
    let recommendation = '';
    if (avgOccupancy >= 25) {
      recommendation = 'Yoğun olması bekleniyor. Daha erken veya geç saatleri düşünün.';
    } else if (avgOccupancy >= 15) {
      recommendation = 'Orta yoğunluk bekleniyor. Yer bulabilirsiniz.';
    } else {
      recommendation = 'Sakin olması bekleniyor. İdeal zaman!';
    }
    
    return {
      predictedOccupancy: Math.round(avgOccupancy),
      confidence,
      recommendation,
    };
  }
}

// ============================================================================
// Singleton Instances
// ============================================================================

export const qrCheckInSystem = new QRCheckInSystem();
export const attendanceTracking = new AttendanceTrackingSystem();
export const realTimeMonitoring = new RealTimeMonitoringSystem();
