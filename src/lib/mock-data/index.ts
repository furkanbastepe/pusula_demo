// Mock Data System - Main Export

export * from './types';
export * from './generators';
export * from './engine';

import { MockDataEngine } from './engine';

// Global instance
export const mockDataEngine = MockDataEngine.getInstance();

// Initialize mock data system
export async function initializeMockData(): Promise<void> {
  // Try to load from localStorage first
  if (!mockDataEngine.loadFromStorage()) {
    // Generate fresh data if not found
    await mockDataEngine.initialize();
  }
}

// Convenience functions for common operations
export function getCurrentUser(): any {
  // For demo purposes, return a sample user
  const users = mockDataEngine.getUsers();
  return users.find(user => user.role === 'student') || users[0];
}

export function getDemoUser(stage?: string): any {
  // Return user based on demo stage
  const users = mockDataEngine.getStudents();
  
  switch (stage) {
    case 'beginner':
      return users.find(user => user.level === 'cirak') || users[0];
    case 'intermediate':
      return users.find(user => user.level === 'kalfa') || users[1];
    case 'advanced':
      return users.find(user => user.level === 'usta') || users[2];
    case 'graduate':
      return users.find(user => user.level === 'graduate') || users[3];
    default:
      return users[0];
  }
}

export function getMockLearningContent() {
  return {
    microlabs: mockDataEngine.getMicroLabs(),
    tasks: mockDataEngine.getTasks(),
    kesifModules: mockDataEngine.getMicroLabsByPhase('kesif'),
    insaModules: mockDataEngine.getMicroLabsByPhase('insa'),
    etkiModules: mockDataEngine.getMicroLabsByPhase('etki')
  };
}

export function getMockDashboardData(userId?: string) {
  const user = userId ? mockDataEngine.getUser(userId) : getCurrentUser();
  if (!user) return null;

  const userSubmissions = mockDataEngine.getUserSubmissions(user.id);
  const userPortfolio = mockDataEngine.getUserPortfolio(user.id);
  const userNotifications = mockDataEngine.getUserNotifications(user.id);
  const upcomingEvents = mockDataEngine.getUpcomingEvents();

  return {
    user,
    submissions: userSubmissions,
    portfolio: userPortfolio,
    notifications: userNotifications,
    upcomingEvents: upcomingEvents.slice(0, 3), // Next 3 events
    analytics: mockDataEngine.getUserAnalytics(user.id).slice(0, 7) // Last 7 days
  };
}

export function getMockUNDPMetrics() {
  return mockDataEngine.generateUNDPMetrics();
}

export function getMockPhysicalCenterData() {
  return mockDataEngine.getPhysicalCenterData();
}

export function getMockBotArenaData() {
  return {
    competitions: mockDataEngine.getBotArenaCompetitions(),
    activeCompetitions: mockDataEngine.getActiveCompetitions()
  };
}

// Search and filter functions
export function searchUsers(query: string) {
  const users = mockDataEngine.getUsers();
  const lowercaseQuery = query.toLowerCase();
  
  return users.filter(user => 
    user.name.toLowerCase().includes(lowercaseQuery) ||
    user.surname.toLowerCase().includes(lowercaseQuery) ||
    user.email.toLowerCase().includes(lowercaseQuery)
  );
}

export function filterUsersByLevel(level: string) {
  return mockDataEngine.getUsers().filter(user => user.level === level);
}

export function filterUsersByCohort(cohortId: string) {
  return mockDataEngine.getUsersByCohort(cohortId);
}

export function searchContent(query: string) {
  const microlabs = mockDataEngine.getMicroLabs();
  const tasks = mockDataEngine.getTasks();
  const lowercaseQuery = query.toLowerCase();
  
  const matchingLabs = microlabs.filter(lab => 
    lab.title.toLowerCase().includes(lowercaseQuery) ||
    lab.description.toLowerCase().includes(lowercaseQuery)
  );
  
  const matchingTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(lowercaseQuery) ||
    task.description.toLowerCase().includes(lowercaseQuery)
  );
  
  return {
    microlabs: matchingLabs,
    tasks: matchingTasks
  };
}

// Analytics helpers
export function calculateUserProgress(userId: string) {
  const user = mockDataEngine.getUser(userId);
  if (!user) return null;

  const totalMicrolabs = mockDataEngine.getMicroLabs().length;
  const totalTasks = mockDataEngine.getTasks().length;
  
  return {
    moduleProgress: (user.completedModules.length / totalMicrolabs) * 100,
    taskProgress: (user.completedTasks.length / totalTasks) * 100,
    overallProgress: ((user.completedModules.length + user.completedTasks.length) / (totalMicrolabs + totalTasks)) * 100,
    xpProgress: (user.xp / 5000) * 100, // Assuming 5000 is max XP
    levelProgress: calculateLevelProgress(user.xp, user.level)
  };
}

function calculateLevelProgress(xp: number, level: string): number {
  const thresholds = { cirak: 0, kalfa: 1000, usta: 2500, graduate: 5000 };
  const currentThreshold = thresholds[level as keyof typeof thresholds];
  const nextThreshold = level === 'graduate' ? 5000 : 
    level === 'usta' ? 5000 :
    level === 'kalfa' ? 2500 : 1000;
  
  return ((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
}

// Leaderboard functions
export function getLeaderboard(type: 'xp' | 'gdr' | 'streak' = 'xp', limit: number = 10) {
  const students = mockDataEngine.getStudents();
  
  const sorted = students.sort((a, b) => {
    switch (type) {
      case 'xp':
        return b.xp - a.xp;
      case 'gdr':
        return b.gdrScore - a.gdrScore;
      case 'streak':
        return b.streak - a.streak;
      default:
        return b.xp - a.xp;
    }
  });
  
  return sorted.slice(0, limit).map((user, index) => ({
    rank: index + 1,
    user,
    score: type === 'xp' ? user.xp : type === 'gdr' ? user.gdrScore : user.streak,
    change: Math.floor(Math.random() * 6) - 3 // Random change for demo
  }));
}

export function getCohortLeaderboard(cohortId: string, type: 'xp' | 'gdr' | 'streak' = 'xp') {
  const cohortUsers = mockDataEngine.getUsersByCohort(cohortId);
  
  const sorted = cohortUsers.sort((a, b) => {
    switch (type) {
      case 'xp':
        return b.xp - a.xp;
      case 'gdr':
        return b.gdrScore - a.gdrScore;
      case 'streak':
        return b.streak - a.streak;
      default:
        return b.xp - a.xp;
    }
  });
  
  return sorted.map((user, index) => ({
    rank: index + 1,
    user,
    score: type === 'xp' ? user.xp : type === 'gdr' ? user.gdrScore : user.streak
  }));
}