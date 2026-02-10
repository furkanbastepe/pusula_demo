/**
 * Physical Center Integration - Resource Management System
 * 
 * Manages equipment reservations, workspace assignments,
 * event scheduling, and learning plan integration.
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface Equipment {
  id: string;
  name: string;
  type: 'computer' | 'projector' | 'whiteboard' | 'meeting_room' | 'printer' | '3d_printer' | 'vr_headset' | 'camera' | 'microphone';
  location: string;
  status: 'available' | 'in_use' | 'reserved' | 'maintenance';
  specifications?: Record<string, any>;
  maintenanceSchedule?: Date[];
}

export interface Reservation {
  id: string;
  userId: string;
  equipmentId: string;
  startTime: Date;
  endTime: Date;
  purpose: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Workspace {
  id: string;
  name: string;
  type: 'desk' | 'meeting_room' | 'collaboration_space' | 'quiet_zone' | 'maker_space';
  capacity: number;
  equipment: string[]; // Equipment IDs
  amenities: string[];
  currentOccupancy: number;
  reservations: Reservation[];
}

export interface Event {
  id: string;
  title: string;
  type: 'workshop' | 'hackathon' | 'demo_day' | 'mentoring' | 'networking';
  startTime: Date;
  endTime: Date;
  location: string;
  capacity: number;
  registered: string[]; // User IDs
  resources: string[]; // Equipment/workspace IDs
  learningPlanIntegration?: {
    relatedModules: string[];
    relatedTasks: string[];
    xpReward: number;
  };
}

// ============================================================================
// Equipment Management System
// ============================================================================

export class EquipmentManagementSystem {
  /**
   * Get available equipment
   */
  getAvailableEquipment(
    equipment: Equipment[],
    type?: Equipment['type'],
    startTime?: Date,
    endTime?: Date
  ): Equipment[] {
    let available = equipment.filter(e => e.status === 'available');
    
    if (type) {
      available = available.filter(e => e.type === type);
    }
    
    // TODO: Check reservations for time conflicts
    
    return available;
  }

  /**
   * Reserve equipment
   */
  reserveEquipment(
    userId: string,
    equipmentId: string,
    startTime: Date,
    endTime: Date,
    purpose: string
  ): Reservation {
    // Validate time slot
    if (startTime >= endTime) {
      throw new Error('Başlangıç zamanı bitiş zamanından önce olmalıdır.');
    }
    
    if (startTime < new Date()) {
      throw new Error('Geçmiş bir zaman için rezervasyon yapamazsınız.');
    }
    
    const reservation: Reservation = {
      id: `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      equipmentId,
      startTime,
      endTime,
      purpose,
      status: 'confirmed',
    };
    
    return reservation;
  }

  /**
   * Cancel reservation
   */
  cancelReservation(reservationId: string, reservations: Reservation[]): Reservation | null {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return null;
    
    if (reservation.status === 'active' || reservation.status === 'completed') {
      throw new Error('Aktif veya tamamlanmış rezervasyonlar iptal edilemez.');
    }
    
    return {
      ...reservation,
      status: 'cancelled',
    };
  }

  /**
   * Check equipment availability
   */
  checkAvailability(
    equipmentId: string,
    startTime: Date,
    endTime: Date,
    reservations: Reservation[]
  ): boolean {
    const conflicts = reservations.filter(r => 
      r.equipmentId === equipmentId &&
      r.status !== 'cancelled' &&
      r.status !== 'completed' &&
      (
        (startTime >= r.startTime && startTime < r.endTime) ||
        (endTime > r.startTime && endTime <= r.endTime) ||
        (startTime <= r.startTime && endTime >= r.endTime)
      )
    );
    
    return conflicts.length === 0;
  }

  /**
   * Get equipment utilization rate
   */
  getUtilizationRate(
    equipmentId: string,
    reservations: Reservation[],
    days: number = 30
  ): number {
    const now = Date.now();
    const startPeriod = now - days * 24 * 60 * 60 * 1000;
    
    const relevantReservations = reservations.filter(r =>
      r.equipmentId === equipmentId &&
      r.status === 'completed' &&
      r.endTime.getTime() >= startPeriod
    );
    
    const totalMinutes = relevantReservations.reduce((sum, r) => {
      const duration = (r.endTime.getTime() - r.startTime.getTime()) / (1000 * 60);
      return sum + duration;
    }, 0);
    
    const availableMinutes = days * 24 * 60; // Assuming 24/7 availability
    const utilizationRate = (totalMinutes / availableMinutes) * 100;
    
    return Math.round(utilizationRate * 10) / 10;
  }
}

// ============================================================================
// Workspace Management System
// ============================================================================

export class WorkspaceManagementSystem {
  /**
   * Assign workspace to user
   */
  assignWorkspace(
    userId: string,
    workspaceType: Workspace['type'],
    workspaces: Workspace[]
  ): Workspace | null {
    const available = workspaces.filter(w => 
      w.type === workspaceType &&
      w.currentOccupancy < w.capacity
    );
    
    if (available.length === 0) return null;
    
    // Sort by lowest occupancy
    available.sort((a, b) => a.currentOccupancy - b.currentOccupancy);
    
    return available[0];
  }

  /**
   * Get workspace availability
   */
  getWorkspaceAvailability(workspaces: Workspace[]): {
    type: Workspace['type'];
    available: number;
    total: number;
    occupancyRate: number;
  }[] {
    const byType = new Map<Workspace['type'], { available: number; total: number }>();
    
    workspaces.forEach(w => {
      if (!byType.has(w.type)) {
        byType.set(w.type, { available: 0, total: 0 });
      }
      const stats = byType.get(w.type)!;
      stats.total += w.capacity;
      stats.available += (w.capacity - w.currentOccupancy);
    });
    
    return Array.from(byType.entries()).map(([type, stats]) => ({
      type,
      available: stats.available,
      total: stats.total,
      occupancyRate: ((stats.total - stats.available) / stats.total) * 100,
    }));
  }

  /**
   * Recommend workspace based on activity
   */
  recommendWorkspace(
    activity: 'solo_work' | 'pair_programming' | 'team_meeting' | 'presentation' | 'making',
    workspaces: Workspace[]
  ): Workspace | null {
    const recommendations: Record<typeof activity, Workspace['type'][]> = {
      solo_work: ['desk', 'quiet_zone'],
      pair_programming: ['desk', 'collaboration_space'],
      team_meeting: ['meeting_room', 'collaboration_space'],
      presentation: ['meeting_room'],
      making: ['maker_space'],
    };
    
    const preferredTypes = recommendations[activity];
    
    for (const type of preferredTypes) {
      const workspace = this.assignWorkspace('temp', type, workspaces);
      if (workspace) return workspace;
    }
    
    return null;
  }
}

// ============================================================================
// Event Scheduling System
// ============================================================================

export class EventSchedulingSystem {
  /**
   * Schedule event
   */
  scheduleEvent(
    title: string,
    type: Event['type'],
    startTime: Date,
    endTime: Date,
    location: string,
    capacity: number,
    resources: string[]
  ): Event {
    return {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      type,
      startTime,
      endTime,
      location,
      capacity,
      registered: [],
      resources,
    };
  }

  /**
   * Register user for event
   */
  registerForEvent(userId: string, event: Event): Event {
    if (event.registered.includes(userId)) {
      throw new Error('Bu etkinliğe zaten kayıtlısınız.');
    }
    
    if (event.registered.length >= event.capacity) {
      throw new Error('Etkinlik kapasitesi dolmuştur.');
    }
    
    return {
      ...event,
      registered: [...event.registered, userId],
    };
  }

  /**
   * Integrate event with learning plan
   */
  integrateWithLearningPlan(
    event: Event,
    relatedModules: string[],
    relatedTasks: string[],
    xpReward: number
  ): Event {
    return {
      ...event,
      learningPlanIntegration: {
        relatedModules,
        relatedTasks,
        xpReward,
      },
    };
  }

  /**
   * Get upcoming events
   */
  getUpcomingEvents(events: Event[], days: number = 7): Event[] {
    const now = Date.now();
    const futureLimit = now + days * 24 * 60 * 60 * 1000;
    
    return events
      .filter(e => e.startTime.getTime() >= now && e.startTime.getTime() <= futureLimit)
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }

  /**
   * Get event recommendations for user
   */
  getEventRecommendations(
    userId: string,
    userLevel: string,
    userInterests: string[],
    events: Event[]
  ): Event[] {
    const upcoming = this.getUpcomingEvents(events, 14);
    
    // Score events based on relevance
    const scored = upcoming.map(event => {
      let score = 0;
      
      // Type relevance
      if (event.type === 'workshop' && userLevel === 'cirak') score += 10;
      if (event.type === 'hackathon' && (userLevel === 'kalfa' || userLevel === 'usta')) score += 10;
      if (event.type === 'demo_day') score += 5;
      
      // Capacity availability
      const spotsLeft = event.capacity - event.registered.length;
      if (spotsLeft > 5) score += 5;
      else if (spotsLeft > 0) score += 2;
      
      // Learning plan integration
      if (event.learningPlanIntegration) score += 8;
      
      return { event, score };
    });
    
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(s => s.event);
  }

  /**
   * Check resource conflicts
   */
  checkResourceConflicts(
    event: Event,
    existingEvents: Event[]
  ): { hasConflict: boolean; conflicts: Event[] } {
    const conflicts = existingEvents.filter(e => {
      // Check time overlap
      const timeOverlap = (
        (event.startTime >= e.startTime && event.startTime < e.endTime) ||
        (event.endTime > e.startTime && event.endTime <= e.endTime) ||
        (event.startTime <= e.startTime && event.endTime >= e.endTime)
      );
      
      if (!timeOverlap) return false;
      
      // Check resource overlap
      const resourceOverlap = event.resources.some(r => e.resources.includes(r));
      
      return resourceOverlap;
    });
    
    return {
      hasConflict: conflicts.length > 0,
      conflicts,
    };
  }
}

// ============================================================================
// Learning Plan Integration
// ============================================================================

export class LearningPlanIntegration {
  /**
   * Suggest physical center activities for learning path
   */
  suggestActivities(
    currentModule: string,
    currentTasks: string[],
    upcomingEvents: Event[]
  ): {
    recommendedEvents: Event[];
    recommendedEquipment: string[];
    recommendedWorkspace: Workspace['type'];
    benefits: string[];
  } {
    const recommendations = {
      recommendedEvents: [] as Event[],
      recommendedEquipment: [] as string[],
      recommendedWorkspace: 'desk' as Workspace['type'],
      benefits: [] as string[],
    };
    
    // Match events to learning content
    recommendations.recommendedEvents = upcomingEvents.filter(e => 
      e.learningPlanIntegration &&
      (
        e.learningPlanIntegration.relatedModules.includes(currentModule) ||
        e.learningPlanIntegration.relatedTasks.some(t => currentTasks.includes(t))
      )
    );
    
    // Recommend equipment based on module
    if (currentModule.includes('design') || currentModule.includes('ui')) {
      recommendations.recommendedEquipment.push('whiteboard', 'projector');
      recommendations.recommendedWorkspace = 'collaboration_space';
    } else if (currentModule.includes('hardware') || currentModule.includes('iot')) {
      recommendations.recommendedEquipment.push('3d_printer');
      recommendations.recommendedWorkspace = 'maker_space';
    } else if (currentModule.includes('presentation') || currentModule.includes('demo')) {
      recommendations.recommendedEquipment.push('projector', 'microphone', 'camera');
      recommendations.recommendedWorkspace = 'meeting_room';
    }
    
    // Benefits
    recommendations.benefits = [
      '%50 XP bonusu kazanın',
      'Mentorlarla yüz yüze çalışın',
      'Buddylerinizle işbirliği yapın',
      'Profesyonel ekipmanlara erişin',
      'Topluluk etkinliklerine katılın',
    ];
    
    return recommendations;
  }

  /**
   * Calculate physical center impact on learning
   */
  calculateImpact(
    physicalCenterHours: number,
    totalLearningHours: number
  ): {
    physicalCenterRatio: number;
    xpBonus: number;
    collaborationOpportunities: number;
    recommendedBalance: string;
  } {
    const ratio = totalLearningHours > 0 ? (physicalCenterHours / totalLearningHours) * 100 : 0;
    const xpBonus = Math.floor(physicalCenterHours * 10); // 10 XP per hour
    const collaborationOpportunities = Math.floor(physicalCenterHours / 2); // 1 opportunity per 2 hours
    
    let recommendedBalance = '';
    if (ratio < 20) {
      recommendedBalance = 'Fiziksel merkezi daha fazla kullanmayı düşünün. Sosyal öğrenme fırsatlarını kaçırıyorsunuz!';
    } else if (ratio > 80) {
      recommendedBalance = 'Harika! Fiziksel merkezi çok iyi kullanıyorsunuz. Online kaynaklarla dengeyi koruyun.';
    } else {
      recommendedBalance = 'Mükemmel denge! Hem fiziksel hem online öğrenmeyi etkili kullanıyorsunuz.';
    }
    
    return {
      physicalCenterRatio: Math.round(ratio),
      xpBonus,
      collaborationOpportunities,
      recommendedBalance,
    };
  }
}

// ============================================================================
// Singleton Instances
// ============================================================================

export const equipmentManagement = new EquipmentManagementSystem();
export const workspaceManagement = new WorkspaceManagementSystem();
export const eventScheduling = new EventSchedulingSystem();
export const learningPlanIntegration = new LearningPlanIntegration();
