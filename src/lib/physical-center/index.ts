/**
 * Physical Center Integration - Main Export
 * 
 * Comprehensive system for managing physical center operations including:
 * - QR check-in and attendance tracking
 * - Equipment and workspace management
 * - Event scheduling and registration
 * - Learning plan integration
 */

// QR Check-in and Attendance
export {
  QRCheckInSystem,
  AttendanceTrackingSystem,
  RealTimeMonitoringSystem,
  qrCheckInSystem,
  attendanceTracking,
  realTimeMonitoring,
  type QRCheckIn,
  type AttendanceRecord,
  type CenterCapacity,
  type AttendanceAnalytics,
} from './qr-checkin';

// Resource Management
export {
  EquipmentManagementSystem,
  WorkspaceManagementSystem,
  EventSchedulingSystem,
  LearningPlanIntegration,
  equipmentManagement,
  workspaceManagement,
  eventScheduling,
  learningPlanIntegration,
  type Equipment,
  type Reservation,
  type Workspace,
  type Event,
} from './resource-management';
