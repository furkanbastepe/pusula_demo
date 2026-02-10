// AI Mentor Escalation Manager
// Handles complexity detection and escalation to human guides

import { Message, ConversationSession } from './conversation-manager';

export interface EscalationTrigger {
  type: 'complexity' | 'sentiment' | 'repetition' | 'explicit_request' | 'technical_limit';
  severity: 'low' | 'medium' | 'high';
  reason: string;
  detectedAt: Date;
}

export interface EscalationDecision {
  shouldEscalate: boolean;
  triggers: EscalationTrigger[];
  recommendedAction: string;
  urgency: 'low' | 'medium' | 'high';
}

export class EscalationManager {
  private static instance: EscalationManager;
  
  // Escalation thresholds
  private readonly COMPLEXITY_THRESHOLD = 0.7;
  private readonly REPETITION_THRESHOLD = 3;
  private readonly NEGATIVE_SENTIMENT_THRESHOLD = 0.6;

  static getInstance(): EscalationManager {
    if (!EscalationManager.instance) {
      EscalationManager.instance = new EscalationManager();
    }
    return EscalationManager.instance;
  }

  /**
   * Evaluate if conversation should be escalated
   */
  evaluateEscalation(session: ConversationSession, latestMessage: Message): EscalationDecision {
    const triggers: EscalationTrigger[] = [];

    // Check for explicit escalation request
    const explicitRequest = this.detectExplicitRequest(latestMessage.content);
    if (explicitRequest) {
      triggers.push({
        type: 'explicit_request',
        severity: 'high',
        reason: 'Kullanıcı insan mentor talep etti',
        detectedAt: new Date()
      });
    }

    // Check message complexity
    const complexity = this.assessComplexity(latestMessage.content);
    if (complexity > this.COMPLEXITY_THRESHOLD) {
      triggers.push({
        type: 'complexity',
        severity: 'medium',
        reason: `Yüksek karmaşıklık seviyesi: ${Math.round(complexity * 100)}%`,
        detectedAt: new Date()
      });
    }

    // Check for repetitive questions
    const repetition = this.detectRepetition(session.messages, latestMessage.content);
    if (repetition >= this.REPETITION_THRESHOLD) {
      triggers.push({
        type: 'repetition',
        severity: 'medium',
        reason: `Aynı soru ${repetition} kez soruldu`,
        detectedAt: new Date()
      });
    }

    // Check sentiment
    const sentiment = this.analyzeSentiment(latestMessage.content);
    if (sentiment < -this.NEGATIVE_SENTIMENT_THRESHOLD) {
      triggers.push({
        type: 'sentiment',
        severity: 'high',
        reason: 'Olumsuz duygu durumu tespit edildi',
        detectedAt: new Date()
      });
    }

    // Check for technical limitations
    const technicalLimit = this.detectTechnicalLimitation(latestMessage.content);
    if (technicalLimit) {
      triggers.push({
        type: 'technical_limit',
        severity: 'medium',
        reason: technicalLimit,
        detectedAt: new Date()
      });
    }

    // Determine if escalation is needed
    const shouldEscalate = this.shouldEscalate(triggers);
    const urgency = this.calculateUrgency(triggers);
    const recommendedAction = this.getRecommendedAction(triggers);

    return {
      shouldEscalate,
      triggers,
      recommendedAction,
      urgency
    };
  }

  /**
   * Detect explicit escalation request
   */
  private detectExplicitRequest(content: string): boolean {
    const keywords = [
      'insan', 'mentor', 'öğretmen', 'rehber', 'yardım et',
      'konuşmak istiyorum', 'görüşmek istiyorum', 'danışmak istiyorum'
    ];

    const contentLower = content.toLowerCase();
    return keywords.some(keyword => contentLower.includes(keyword));
  }

  /**
   * Assess message complexity
   */
  private assessComplexity(content: string): number {
    let complexityScore = 0;

    // Length factor
    const wordCount = content.split(/\s+/).length;
    if (wordCount > 50) complexityScore += 0.2;
    if (wordCount > 100) complexityScore += 0.2;

    // Technical terms
    const technicalTerms = [
      'algorithm', 'architecture', 'optimization', 'scalability', 'deployment',
      'algoritma', 'mimari', 'optimizasyon', 'ölçeklenebilirlik', 'deployment',
      'async', 'promise', 'callback', 'closure', 'prototype', 'inheritance'
    ];
    const contentLower = content.toLowerCase();
    const technicalCount = technicalTerms.filter(term => contentLower.includes(term)).length;
    complexityScore += Math.min(technicalCount * 0.1, 0.3);

    // Multiple questions
    const questionCount = (content.match(/\?/g) || []).length;
    if (questionCount > 2) complexityScore += 0.2;

    // Code blocks
    if (content.includes('```') || content.includes('`')) {
      complexityScore += 0.1;
    }

    return Math.min(complexityScore, 1.0);
  }

  /**
   * Detect repetitive questions
   */
  private detectRepetition(messages: Message[], currentContent: string): number {
    const userMessages = messages.filter(m => m.role === 'user');
    const recentMessages = userMessages.slice(-5); // Check last 5 messages

    let repetitionCount = 0;
    const currentLower = currentContent.toLowerCase();
    const currentWords = new Set(currentLower.split(/\s+/).filter(w => w.length > 3));

    recentMessages.forEach(msg => {
      const msgLower = msg.content.toLowerCase();
      const msgWords = new Set(msgLower.split(/\s+/).filter(w => w.length > 3));
      
      // Calculate word overlap
      const overlap = Array.from(currentWords).filter(w => msgWords.has(w)).length;
      const similarity = overlap / Math.max(currentWords.size, msgWords.size);
      
      if (similarity > 0.6) {
        repetitionCount++;
      }
    });

    return repetitionCount;
  }

  /**
   * Analyze sentiment
   */
  private analyzeSentiment(content: string): number {
    const contentLower = content.toLowerCase();

    // Positive indicators
    const positiveWords = [
      'teşekkür', 'harika', 'mükemmel', 'anladım', 'başardım', 'güzel',
      'iyi', 'süper', 'muhteşem', 'çok iyi'
    ];
    const positiveCount = positiveWords.filter(word => contentLower.includes(word)).length;

    // Negative indicators
    const negativeWords = [
      'anlamadım', 'yapamıyorum', 'zorlanıyorum', 'başaramadım', 'kötü',
      'berbat', 'imkansız', 'çok zor', 'vazgeçtim', 'bıktım'
    ];
    const negativeCount = negativeWords.filter(word => contentLower.includes(word)).length;

    // Calculate sentiment score (-1 to 1)
    const totalIndicators = positiveCount + negativeCount;
    if (totalIndicators === 0) return 0;

    return (positiveCount - negativeCount) / totalIndicators;
  }

  /**
   * Detect technical limitations
   */
  private detectTechnicalLimitation(content: string): string | null {
    const contentLower = content.toLowerCase();

    // Check for requests beyond AI capabilities
    if (contentLower.includes('kod yaz') || contentLower.includes('proje yap')) {
      return 'Tam kod yazma talebi - insan mentor daha uygun';
    }

    if (contentLower.includes('cv') || contentLower.includes('özgeçmiş')) {
      return 'CV/özgeçmiş inceleme - insan mentor gerekli';
    }

    if (contentLower.includes('mülakat') || contentLower.includes('görüşme')) {
      return 'Mülakat pratiği - insan mentor ile daha etkili';
    }

    if (contentLower.includes('kişisel') || contentLower.includes('özel durum')) {
      return 'Kişisel durum - insan mentor daha uygun';
    }

    return null;
  }

  /**
   * Determine if escalation is needed
   */
  private shouldEscalate(triggers: EscalationTrigger[]): boolean {
    // Escalate if any high severity trigger
    if (triggers.some(t => t.severity === 'high')) {
      return true;
    }

    // Escalate if multiple medium severity triggers
    const mediumCount = triggers.filter(t => t.severity === 'medium').length;
    if (mediumCount >= 2) {
      return true;
    }

    return false;
  }

  /**
   * Calculate urgency level
   */
  private calculateUrgency(triggers: EscalationTrigger[]): 'low' | 'medium' | 'high' {
    const highCount = triggers.filter(t => t.severity === 'high').length;
    const mediumCount = triggers.filter(t => t.severity === 'medium').length;

    if (highCount >= 2) return 'high';
    if (highCount >= 1) return 'medium';
    if (mediumCount >= 2) return 'medium';
    return 'low';
  }

  /**
   * Get recommended action
   */
  private getRecommendedAction(triggers: EscalationTrigger[]): string {
    if (triggers.length === 0) {
      return 'AI mentor ile devam et';
    }

    const hasExplicitRequest = triggers.some(t => t.type === 'explicit_request');
    if (hasExplicitRequest) {
      return 'Kullanıcıyı hemen insan mentora yönlendir';
    }

    const hasTechnicalLimit = triggers.some(t => t.type === 'technical_limit');
    if (hasTechnicalLimit) {
      return 'İnsan mentor ile görüşme planla';
    }

    const hasNegativeSentiment = triggers.some(t => t.type === 'sentiment');
    if (hasNegativeSentiment) {
      return 'Empati göster ve insan mentor öner';
    }

    const hasRepetition = triggers.some(t => t.type === 'repetition');
    if (hasRepetition) {
      return 'Farklı açıklama yöntemi dene, gerekirse yönlendir';
    }

    return 'Durumu izle, gerekirse yönlendir';
  }

  /**
   * Generate escalation message
   */
  generateEscalationMessage(decision: EscalationDecision): string {
    if (!decision.shouldEscalate) {
      return '';
    }

    const messages = {
      high: 'Sana daha iyi yardımcı olabilmek için insan mentorumuza bağlanmanı öneriyorum. Hemen bir görüşme ayarlayalım mı? 🤝',
      medium: 'Bu konuda insan mentorumuza danışman daha faydalı olabilir. İsterseniz bir görüşme planlayabiliriz. 💬',
      low: 'Eğer daha detaylı yardım istersen, insan mentorumuza bağlanabiliriz. 👨‍🏫'
    };

    return messages[decision.urgency];
  }
}

// Export singleton instance
export const escalationManager = EscalationManager.getInstance();
