// AI Mentor Content Referencer
// Provides course material referencing and next step suggestions

import { MockMicroLab, MockTask } from '../mock-data/types';

export interface ContentReference {
  type: 'microlab' | 'task' | 'resource';
  id: string;
  title: string;
  description: string;
  relevanceScore: number;
  url: string;
}

export interface NextStepSuggestion {
  action: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime?: string;
  relatedContent?: ContentReference[];
}

export class ContentReferencer {
  private static instance: ContentReferencer;

  static getInstance(): ContentReferencer {
    if (!ContentReferencer.instance) {
      ContentReferencer.instance = new ContentReferencer();
    }
    return ContentReferencer.instance;
  }

  /**
   * Find relevant content based on query
   */
  findRelevantContent(
    query: string,
    microlabs: MockMicroLab[],
    tasks: MockTask[],
    userLevel: string,
    limit: number = 5
  ): ContentReference[] {
    const references: ContentReference[] = [];

    // Search in microlabs
    microlabs.forEach(lab => {
      const relevance = this.calculateRelevance(query, lab.title, lab.description, lab.learningObjectives.join(' '));
      if (relevance > 0.3) {
        references.push({
          type: 'microlab',
          id: lab.id,
          title: lab.title,
          description: lab.description,
          relevanceScore: relevance,
          url: `/microlab/${lab.id}`
        });
      }
    });

    // Search in tasks
    tasks.forEach(task => {
      const relevance = this.calculateRelevance(query, task.title, task.description, task.realWorldContext);
      if (relevance > 0.3) {
        references.push({
          type: 'task',
          id: task.id,
          title: task.title,
          description: task.description,
          relevanceScore: relevance,
          url: `/gorev/${task.id}`
        });
      }
    });

    // Sort by relevance and return top results
    return references
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }

  /**
   * Generate next step suggestions based on context
   */
  generateNextSteps(
    userLevel: string,
    completedModules: string[],
    completedTasks: string[],
    recentTopics: string[],
    strugglingAreas: string[],
    microlabs: MockMicroLab[],
    tasks: MockTask[]
  ): NextStepSuggestion[] {
    const suggestions: NextStepSuggestion[] = [];

    // Suggest based on struggling areas
    if (strugglingAreas.length > 0) {
      strugglingAreas.forEach(area => {
        const relatedContent = this.findRelevantContent(area, microlabs, tasks, userLevel, 2);
        if (relatedContent.length > 0) {
          suggestions.push({
            action: `${area} konusunda pratik yap`,
            description: `${area} konusunda zorlandığını fark ettim. Bu içerikler sana yardımcı olabilir.`,
            priority: 'high',
            estimatedTime: '30-60 dakika',
            relatedContent
          });
        }
      });
    }

    // Suggest next module based on level
    const nextModule = this.getNextRecommendedModule(userLevel, completedModules, microlabs);
    if (nextModule) {
      suggestions.push({
        action: 'Yeni modül başlat',
        description: `Seviyene uygun bir sonraki modül: ${nextModule.title}`,
        priority: 'high',
        estimatedTime: `${nextModule.estimatedMinutes} dakika`,
        relatedContent: [{
          type: 'microlab',
          id: nextModule.id,
          title: nextModule.title,
          description: nextModule.description,
          relevanceScore: 1.0,
          url: `/microlab/${nextModule.id}`
        }]
      });
    }

    // Suggest task if ready
    const nextTask = this.getNextRecommendedTask(userLevel, completedTasks, tasks);
    if (nextTask) {
      suggestions.push({
        action: 'Yeni görev al',
        description: `Becerilerini test et: ${nextTask.title}`,
        priority: 'medium',
        estimatedTime: `${nextTask.estimatedHours} saat`,
        relatedContent: [{
          type: 'task',
          id: nextTask.id,
          title: nextTask.title,
          description: nextTask.description,
          relevanceScore: 1.0,
          url: `/gorev/${nextTask.id}`
        }]
      });
    }

    // Suggest practice based on recent topics
    if (recentTopics.length > 0) {
      const topic = recentTopics[recentTopics.length - 1];
      suggestions.push({
        action: `${topic} pratiği yap`,
        description: `${topic} konusunda daha fazla pratik yaparak pekiştirebilirsin.`,
        priority: 'medium',
        estimatedTime: '20-30 dakika'
      });
    }

    // General suggestions based on level
    suggestions.push(...this.getLevelBasedSuggestions(userLevel));

    return suggestions.slice(0, 5); // Return top 5
  }

  /**
   * Calculate relevance score between query and content
   */
  private calculateRelevance(query: string, ...texts: string[]): number {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
    
    if (queryWords.length === 0) return 0;

    const combinedText = texts.join(' ').toLowerCase();
    let matches = 0;
    let totalWords = queryWords.length;

    queryWords.forEach(word => {
      if (combinedText.includes(word)) {
        matches++;
      }
    });

    return matches / totalWords;
  }

  /**
   * Get next recommended module
   */
  private getNextRecommendedModule(
    userLevel: string,
    completedModules: string[],
    microlabs: MockMicroLab[]
  ): MockMicroLab | null {
    // Filter by level/phase
    const phaseMap: Record<string, 'kesif' | 'insa' | 'etki'> = {
      cirak: 'kesif',
      kalfa: 'insa',
      usta: 'etki',
      graduate: 'etki'
    };

    const targetPhase = phaseMap[userLevel] || 'kesif';
    
    // Find uncompleted modules in target phase
    const availableModules = microlabs.filter(lab => 
      lab.phase === targetPhase && 
      !completedModules.includes(lab.id)
    );

    // Return first available module
    return availableModules[0] || null;
  }

  /**
   * Get next recommended task
   */
  private getNextRecommendedTask(
    userLevel: string,
    completedTasks: string[],
    tasks: MockTask[]
  ): MockTask | null {
    const phaseMap: Record<string, 'kesif' | 'insa' | 'etki'> = {
      cirak: 'kesif',
      kalfa: 'insa',
      usta: 'etki',
      graduate: 'etki'
    };

    const targetPhase = phaseMap[userLevel] || 'kesif';
    
    const availableTasks = tasks.filter(task => 
      task.phase === targetPhase && 
      !completedTasks.includes(task.id)
    );

    return availableTasks[0] || null;
  }

  /**
   * Get level-based general suggestions
   */
  private getLevelBasedSuggestions(userLevel: string): NextStepSuggestion[] {
    const suggestions: Record<string, NextStepSuggestion[]> = {
      cirak: [
        {
          action: 'Buddy ile çalış',
          description: 'Buddy\'nle birlikte çalışarak daha hızlı öğrenebilirsin.',
          priority: 'medium',
          estimatedTime: '30 dakika'
        },
        {
          action: 'DiGEM\'e gel',
          description: 'Fiziksel merkezde çalışarak %50 bonus XP kazanabilirsin.',
          priority: 'low'
        }
      ],
      kalfa: [
        {
          action: 'Proje portfolyonu güncelle',
          description: 'Tamamladığın projeleri portfolyona ekle.',
          priority: 'medium',
          estimatedTime: '15 dakika'
        },
        {
          action: 'Bot Arena\'ya katıl',
          description: 'Becerilerini yarışmalarda test et.',
          priority: 'low'
        }
      ],
      usta: [
        {
          action: 'Mentorluk yap',
          description: 'Yeni öğrencilere mentorluk yaparak hem onlara yardım et hem de XP kazan.',
          priority: 'high',
          estimatedTime: '1 saat'
        },
        {
          action: 'Capstone projesine başla',
          description: 'Mezuniyet projen için planlama yap.',
          priority: 'high'
        }
      ],
      graduate: [
        {
          action: 'Alumni ağına katıl',
          description: 'Mezunlar ağında networking yap.',
          priority: 'medium'
        },
        {
          action: 'Kariyer danışmanlığı al',
          description: 'İş başvuruları için destek al.',
          priority: 'high'
        }
      ]
    };

    return suggestions[userLevel] || [];
  }

  /**
   * Generate learning path recommendation
   */
  generateLearningPath(
    userLevel: string,
    completedModules: string[],
    completedTasks: string[],
    careerInterests: string[],
    microlabs: MockMicroLab[],
    tasks: MockTask[]
  ): {
    nextModules: MockMicroLab[];
    nextTasks: MockTask[];
    estimatedCompletionTime: string;
  } {
    const phaseMap: Record<string, 'kesif' | 'insa' | 'etki'> = {
      cirak: 'kesif',
      kalfa: 'insa',
      usta: 'etki',
      graduate: 'etki'
    };

    const targetPhase = phaseMap[userLevel] || 'kesif';

    // Get next 3 modules
    const nextModules = microlabs
      .filter(lab => lab.phase === targetPhase && !completedModules.includes(lab.id))
      .slice(0, 3);

    // Get next 2 tasks
    const nextTasks = tasks
      .filter(task => task.phase === targetPhase && !completedTasks.includes(task.id))
      .slice(0, 2);

    // Calculate estimated time
    const moduleTime = nextModules.reduce((sum, lab) => sum + lab.estimatedMinutes, 0);
    const taskTime = nextTasks.reduce((sum, task) => sum + task.estimatedHours * 60, 0);
    const totalMinutes = moduleTime + taskTime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return {
      nextModules,
      nextTasks,
      estimatedCompletionTime: `${hours} saat ${minutes} dakika`
    };
  }
}

// Export singleton instance
export const contentReferencer = ContentReferencer.getInstance();
