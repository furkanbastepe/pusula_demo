// AI Mentor Conversation Manager
// Handles conversation history, context persistence, and session management

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    relatedContent?: string[]; // IDs of related modules/tasks
    suggestedActions?: string[];
    complexity?: 'simple' | 'moderate' | 'complex';
    escalated?: boolean;
  };
}

export interface ConversationSession {
  id: string;
  userId: string;
  messages: Message[];
  context: ConversationContext;
  startedAt: Date;
  lastActivityAt: Date;
  status: 'active' | 'completed' | 'escalated';
}

export interface ConversationContext {
  userLevel: string;
  currentModule?: string;
  currentTask?: string;
  recentTopics: string[];
  learningGoals: string[];
  strugglingAreas: string[];
  preferredLearningStyle?: string;
}

export class ConversationManager {
  private static instance: ConversationManager;
  private sessions: Map<string, ConversationSession> = new Map();
  private readonly MAX_MESSAGES_IN_MEMORY = 50;
  private readonly SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

  static getInstance(): ConversationManager {
    if (!ConversationManager.instance) {
      ConversationManager.instance = new ConversationManager();
    }
    return ConversationManager.instance;
  }

  /**
   * Create or get existing conversation session
   */
  getOrCreateSession(userId: string, context: ConversationContext): ConversationSession {
    const existingSession = this.getActiveSession(userId);
    
    if (existingSession) {
      // Update last activity
      existingSession.lastActivityAt = new Date();
      return existingSession;
    }

    // Create new session
    const session: ConversationSession = {
      id: `session_${userId}_${Date.now()}`,
      userId,
      messages: [],
      context,
      startedAt: new Date(),
      lastActivityAt: new Date(),
      status: 'active'
    };

    this.sessions.set(session.id, session);
    this.persistSession(session);
    
    return session;
  }

  /**
   * Get active session for user
   */
  getActiveSession(userId: string): ConversationSession | undefined {
    const now = Date.now();
    
    for (const session of this.sessions.values()) {
      if (session.userId === userId && session.status === 'active') {
        // Check if session is still valid
        const timeSinceLastActivity = now - session.lastActivityAt.getTime();
        if (timeSinceLastActivity < this.SESSION_TIMEOUT_MS) {
          return session;
        } else {
          // Session expired
          session.status = 'completed';
        }
      }
    }
    
    return undefined;
  }

  /**
   * Add message to session
   */
  addMessage(sessionId: string, message: Omit<Message, 'id' | 'timestamp'>): Message {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const fullMessage: Message = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };

    session.messages.push(fullMessage);
    session.lastActivityAt = new Date();

    // Update context based on message
    this.updateContextFromMessage(session, fullMessage);

    // Trim old messages if needed
    if (session.messages.length > this.MAX_MESSAGES_IN_MEMORY) {
      session.messages = session.messages.slice(-this.MAX_MESSAGES_IN_MEMORY);
    }

    this.persistSession(session);
    
    return fullMessage;
  }

  /**
   * Get conversation history
   */
  getHistory(sessionId: string, limit?: number): Message[] {
    const session = this.sessions.get(sessionId);
    if (!session) return [];

    const messages = session.messages;
    return limit ? messages.slice(-limit) : messages;
  }

  /**
   * Update conversation context
   */
  updateContext(sessionId: string, updates: Partial<ConversationContext>): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.context = {
      ...session.context,
      ...updates
    };

    this.persistSession(session);
  }

  /**
   * Mark session as escalated
   */
  escalateSession(sessionId: string, reason: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.status = 'escalated';
    
    // Add system message about escalation
    this.addMessage(sessionId, {
      role: 'system',
      content: `Görüşme insan mentora yönlendirildi. Sebep: ${reason}`,
      metadata: {
        escalated: true
      }
    });
  }

  /**
   * Get session summary for display
   */
  getSessionSummary(sessionId: string): {
    messageCount: number;
    duration: number;
    topics: string[];
    lastActivity: Date;
  } | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    const duration = session.lastActivityAt.getTime() - session.startedAt.getTime();

    return {
      messageCount: session.messages.length,
      duration,
      topics: session.context.recentTopics,
      lastActivity: session.lastActivityAt
    };
  }

  /**
   * Get all sessions for a user
   */
  getUserSessions(userId: string): ConversationSession[] {
    return Array.from(this.sessions.values())
      .filter(session => session.userId === userId)
      .sort((a, b) => b.lastActivityAt.getTime() - a.lastActivityAt.getTime());
  }

  /**
   * Clear old sessions
   */
  clearOldSessions(): void {
    const now = Date.now();
    const sessionsToRemove: string[] = [];

    for (const [id, session] of this.sessions.entries()) {
      const timeSinceLastActivity = now - session.lastActivityAt.getTime();
      if (timeSinceLastActivity > this.SESSION_TIMEOUT_MS * 2) {
        sessionsToRemove.push(id);
      }
    }

    sessionsToRemove.forEach(id => {
      this.sessions.delete(id);
      this.removePersistedSession(id);
    });
  }

  /**
   * Update context based on message content
   */
  private updateContextFromMessage(session: ConversationSession, message: Message): void {
    if (message.role !== 'user') return;

    const content = message.content.toLowerCase();

    // Extract topics
    const topics = this.extractTopics(content);
    topics.forEach(topic => {
      if (!session.context.recentTopics.includes(topic)) {
        session.context.recentTopics.push(topic);
        // Keep only last 10 topics
        if (session.context.recentTopics.length > 10) {
          session.context.recentTopics.shift();
        }
      }
    });

    // Detect struggling areas
    const strugglingKeywords = ['anlamadım', 'zorlanıyorum', 'yapamıyorum', 'yardım', 'nasıl'];
    if (strugglingKeywords.some(keyword => content.includes(keyword))) {
      const area = this.extractStruggleArea(content);
      if (area && !session.context.strugglingAreas.includes(area)) {
        session.context.strugglingAreas.push(area);
      }
    }
  }

  /**
   * Extract topics from message
   */
  private extractTopics(content: string): string[] {
    const topicKeywords: Record<string, string> = {
      'javascript': 'JavaScript',
      'react': 'React',
      'python': 'Python',
      'sql': 'SQL',
      'git': 'Git',
      'css': 'CSS',
      'html': 'HTML',
      'api': 'API',
      'database': 'Veritabanı',
      'frontend': 'Frontend',
      'backend': 'Backend',
      'ui': 'UI/UX',
      'ux': 'UI/UX',
      'design': 'Tasarım',
      'algorithm': 'Algoritma',
      'data': 'Veri Analizi'
    };

    const topics: string[] = [];
    for (const [keyword, topic] of Object.entries(topicKeywords)) {
      if (content.includes(keyword)) {
        topics.push(topic);
      }
    }

    return topics;
  }

  /**
   * Extract struggle area from message
   */
  private extractStruggleArea(content: string): string | null {
    const topics = this.extractTopics(content);
    return topics[0] || 'Genel';
  }

  /**
   * Persist session to localStorage
   */
  private persistSession(session: ConversationSession): void {
    try {
      const key = `mentor_session_${session.id}`;
      localStorage.setItem(key, JSON.stringify({
        ...session,
        startedAt: session.startedAt.toISOString(),
        lastActivityAt: session.lastActivityAt.toISOString(),
        messages: session.messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString()
        }))
      }));
    } catch (error) {
      console.warn('Could not persist session:', error);
    }
  }

  /**
   * Remove persisted session
   */
  private removePersistedSession(sessionId: string): void {
    try {
      const key = `mentor_session_${sessionId}`;
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Could not remove persisted session:', error);
    }
  }

  /**
   * Load sessions from localStorage
   */
  loadPersistedSessions(): void {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('mentor_session_'));
      
      keys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          const session = JSON.parse(data);
          // Convert ISO strings back to Dates
          session.startedAt = new Date(session.startedAt);
          session.lastActivityAt = new Date(session.lastActivityAt);
          session.messages = session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          
          this.sessions.set(session.id, session);
        }
      });
    } catch (error) {
      console.warn('Could not load persisted sessions:', error);
    }
  }
}

// Export singleton instance
export const conversationManager = ConversationManager.getInstance();
