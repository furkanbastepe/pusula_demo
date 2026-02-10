"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeMockData, mockDataEngine } from "@/lib/mock-data";
import { systemIntegration } from "@/lib/integration";
import { toast } from "sonner";

interface MockDataContextType {
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initializeData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Initialize system integration (which initializes all subsystems)
      await systemIntegration.initialize();
      
      setIsInitialized(true);
      console.log("✅ PUSULA Platform fully integrated and ready");
      
      // Show success toast only in development
      if (process.env.NODE_ENV === 'development') {
        toast.success("PUSULA Platform Ready", {
          description: "All systems integrated and operational",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error("❌ Failed to initialize platform:", err);
      
      toast.error("Platform Initialization Failed", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    setIsInitialized(false);
    await initializeData();
  };

  useEffect(() => {
    initializeData();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">PUSULA Yükleniyor...</h2>
            <p className="text-muted-foreground">
              Dijital gençlik merkezi platformu hazırlanıyor
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-destructive text-4xl">⚠️</div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-destructive">Yükleme Hatası</h2>
            <p className="text-muted-foreground">{error}</p>
            <button 
              onClick={refreshData}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MockDataContext.Provider
      value={{
        isInitialized,
        isLoading,
        error,
        refreshData,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
}

export function useMockData() {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
}

// Convenience hooks for accessing mock data
export function useMockUsers() {
  const { isInitialized } = useMockData();
  if (!isInitialized) return [];
  return mockDataEngine.getUsers();
}

export function useMockCurrentUser() {
  const { isInitialized } = useMockData();
  if (!isInitialized) return null;
  
  // Return first student for demo purposes
  const students = mockDataEngine.getStudents();
  return students[0] || null;
}

export function useMockLearningContent() {
  const { isInitialized } = useMockData();
  if (!isInitialized) return { microlabs: [], tasks: [] };
  
  return {
    microlabs: mockDataEngine.getMicroLabs(),
    tasks: mockDataEngine.getTasks(),
    kesifModules: mockDataEngine.getMicroLabsByPhase('kesif'),
    insaModules: mockDataEngine.getMicroLabsByPhase('insa'),
    etkiModules: mockDataEngine.getMicroLabsByPhase('etki')
  };
}

export function useMockDashboardData(userId?: string) {
  const { isInitialized } = useMockData();
  if (!isInitialized) return null;
  
  const user = userId ? mockDataEngine.getUser(userId) : mockDataEngine.getStudents()[0];
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
    upcomingEvents: upcomingEvents.slice(0, 3),
    analytics: mockDataEngine.getUserAnalytics(user.id).slice(0, 7)
  };
}

export function useMockUNDPMetrics() {
  const { isInitialized } = useMockData();
  if (!isInitialized) return null;
  return mockDataEngine.generateUNDPMetrics();
}

export function useMockPhysicalCenter() {
  const { isInitialized } = useMockData();
  if (!isInitialized) return null;
  return mockDataEngine.getPhysicalCenterData();
}

export function useMockBotArena() {
  const { isInitialized } = useMockData();
  if (!isInitialized) return { competitions: [], activeCompetitions: [] };
  
  return {
    competitions: mockDataEngine.getBotArenaCompetitions(),
    activeCompetitions: mockDataEngine.getActiveCompetitions()
  };
}

/**
 * Unified dashboard hook using system integration
 */
export function useUnifiedDashboard(userId?: string) {
  const { isInitialized } = useMockData();
  if (!isInitialized) return null;
  
  const user = userId ? mockDataEngine.getUser(userId) : mockDataEngine.getStudents()[0];
  if (!user) return null;

  return systemIntegration.getUserDashboard(user.id);
}

/**
 * Activity completion hook
 */
export function useActivityCompletion() {
  const { isInitialized } = useMockData();
  
  const completeActivity = async (
    userId: string,
    activityType: 'microlab' | 'task' | 'simulation' | 'event',
    activityId: string,
    result: any
  ) => {
    if (!isInitialized) {
      throw new Error('System not initialized');
    }
    
    return systemIntegration.processActivityCompletion(userId, activityType, activityId, result);
  };

  return { completeActivity };
}