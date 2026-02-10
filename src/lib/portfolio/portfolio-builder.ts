/**
 * Portfolio System - Automatic Portfolio Builder
 * 
 * Automatically collects evidence from completed projects,
 * supports multiple media types, and builds professional showcases.
 */

import type { MockSubmission, MockPortfolioItem, MockTask } from '../mock-data/types';

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface PortfolioEvidence {
  id: string;
  type: 'code' | 'design' | 'document' | 'presentation' | 'video' | 'prototype' | 'screenshot';
  title: string;
  description: string;
  url?: string;
  file?: File;
  metadata: {
    fileSize?: number;
    format?: string;
    createdAt: Date;
    tags: string[];
  };
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: 'web-development' | 'mobile-app' | 'data-science' | 'design' | 'iot' | 'ai-ml' | 'other';
  phase: 'kesif' | 'insa' | 'etki';
  sdgAlignment: number[];
  evidence: PortfolioEvidence[];
  skills: string[];
  technologies: string[];
  outcomes: {
    impact: string;
    metrics?: string[];
    testimonials?: string[];
  };
  collaborators?: string[];
  startDate: Date;
  completionDate: Date;
  featured: boolean;
  visibility: 'public' | 'cohort' | 'private';
}

export interface ProfessionalShowcase {
  userId: string;
  profile: {
    name: string;
    title: string;
    bio: string;
    skills: string[];
    interests: string[];
    sdgFocus: number[];
  };
  projects: PortfolioProject[];
  achievements: {
    badges: string[];
    certificates: string[];
    awards: string[];
  };
  statistics: {
    totalProjects: number;
    totalXP: number;
    level: string;
    completionRate: number;
    collaborationScore: number;
  };
  socialLinks: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
  generatedAt: Date;
}

// ============================================================================
// Portfolio Builder Engine
// ============================================================================

export class PortfolioBuilderEngine {
  /**
   * Automatically build portfolio from submissions
   */
  buildPortfolioFromSubmissions(
    userId: string,
    submissions: MockSubmission[],
    tasks: MockTask[]
  ): PortfolioProject[] {
    const approvedSubmissions = submissions.filter(s => s.status === 'approved');
    
    return approvedSubmissions.map(submission => {
      const task = tasks.find(t => t.id === submission.taskId);
      if (!task) return null;
      
      return this.createPortfolioProject(submission, task);
    }).filter((p): p is PortfolioProject => p !== null);
  }

  /**
   * Create a portfolio project from a submission
   */
  private createPortfolioProject(
    submission: MockSubmission,
    task: MockTask
  ): PortfolioProject {
    const evidence = this.collectEvidence(submission);
    const skills = this.extractSkills(task, submission);
    const technologies = this.extractTechnologies(task);
    
    return {
      id: `project_${submission.id}`,
      title: task.title,
      description: task.description,
      category: this.categorizeProject(task),
      phase: task.phase,
      sdgAlignment: task.sdgImpact.primarySDG ? [task.sdgImpact.primarySDG, ...task.sdgImpact.secondarySDGs] : [],
      evidence,
      skills,
      technologies,
      outcomes: {
        impact: task.sdgImpact.impactDescription,
        metrics: task.sdgImpact.measurableOutcomes,
        testimonials: submission.buddyReviews.map(r => r.comment),
      },
      collaborators: task.collaborationLevel !== 'individual' ? ['Buddy collaboration'] : undefined,
      startDate: new Date(new Date(submission.submittedAt).getTime() - task.estimatedHours * 60 * 60 * 1000),
      completionDate: new Date(submission.submittedAt),
      featured: submission.score ? submission.score >= 90 : false,
      visibility: 'public',
    };
  }

  /**
   * Collect evidence from submission
   */
  private collectEvidence(submission: MockSubmission): PortfolioEvidence[] {
    const evidence: PortfolioEvidence[] = [];
    
    // Code repositories
    submission.evidenceLinks.forEach((link, index) => {
      if (link.includes('github')) {
        evidence.push({
          id: `evidence_code_${index}`,
          type: 'code',
          title: 'Kaynak Kod',
          description: 'Proje kaynak kodu ve dokümantasyon',
          url: link,
          metadata: {
            createdAt: new Date(submission.submittedAt),
            tags: ['code', 'repository'],
          },
        });
      } else if (link.includes('figma') || link.includes('design')) {
        evidence.push({
          id: `evidence_design_${index}`,
          type: 'design',
          title: 'Tasarım Dosyaları',
          description: 'UI/UX tasarım ve prototip',
          url: link,
          metadata: {
            createdAt: new Date(submission.submittedAt),
            tags: ['design', 'ui-ux'],
          },
        });
      } else {
        evidence.push({
          id: `evidence_doc_${index}`,
          type: 'document',
          title: 'Proje Dokümantasyonu',
          description: 'Teknik dokümantasyon ve raporlar',
          url: link,
          metadata: {
            createdAt: new Date(submission.submittedAt),
            tags: ['documentation'],
          },
        });
      }
    });
    
    // Files
    submission.evidenceFiles.forEach(file => {
      const type = this.determineEvidenceType(file.type);
      evidence.push({
        id: `evidence_file_${file.id}`,
        type,
        title: file.name,
        description: `Yüklenen dosya: ${file.name}`,
        url: file.url,
        metadata: {
          fileSize: file.size,
          format: file.type,
          createdAt: new Date(file.uploadedAt),
          tags: [type],
        },
      });
    });
    
    return evidence;
  }

  /**
   * Determine evidence type from file type
   */
  private determineEvidenceType(fileType: string): PortfolioEvidence['type'] {
    if (fileType.includes('image')) return 'screenshot';
    if (fileType.includes('video')) return 'video';
    if (fileType.includes('pdf') || fileType.includes('document')) return 'document';
    if (fileType.includes('presentation')) return 'presentation';
    return 'document';
  }

  /**
   * Extract skills from task and submission
   */
  private extractSkills(task: MockTask, submission: MockSubmission): string[] {
    const skills = new Set<string>();
    
    // From self-assessment learnings
    submission.selfAssessment.learnings.forEach(learning => {
      if (learning.includes('JavaScript')) skills.add('JavaScript');
      if (learning.includes('Python')) skills.add('Python');
      if (learning.includes('React')) skills.add('React');
      if (learning.includes('Node')) skills.add('Node.js');
      if (learning.includes('tasarım') || learning.includes('design')) skills.add('UI/UX Design');
      if (learning.includes('veri') || learning.includes('data')) skills.add('Data Analysis');
      if (learning.includes('takım') || learning.includes('team')) skills.add('Team Collaboration');
      if (learning.includes('problem')) skills.add('Problem Solving');
    });
    
    // From task context
    const context = task.realWorldContext.toLowerCase();
    if (context.includes('web')) skills.add('Web Development');
    if (context.includes('mobil') || context.includes('mobile')) skills.add('Mobile Development');
    if (context.includes('veri') || context.includes('data')) skills.add('Data Science');
    if (context.includes('ai') || context.includes('yapay zeka')) skills.add('Artificial Intelligence');
    if (context.includes('iot')) skills.add('IoT');
    
    return Array.from(skills);
  }

  /**
   * Extract technologies from task
   */
  private extractTechnologies(task: MockTask): string[] {
    const technologies = new Set<string>();
    const text = `${task.title} ${task.description} ${task.realWorldContext}`.toLowerCase();
    
    // Programming languages
    if (text.includes('javascript') || text.includes('js')) technologies.add('JavaScript');
    if (text.includes('typescript') || text.includes('ts')) technologies.add('TypeScript');
    if (text.includes('python')) technologies.add('Python');
    if (text.includes('java')) technologies.add('Java');
    
    // Frameworks
    if (text.includes('react')) technologies.add('React');
    if (text.includes('next')) technologies.add('Next.js');
    if (text.includes('node')) technologies.add('Node.js');
    if (text.includes('express')) technologies.add('Express');
    if (text.includes('django')) technologies.add('Django');
    if (text.includes('flask')) technologies.add('Flask');
    
    // Databases
    if (text.includes('mongodb')) technologies.add('MongoDB');
    if (text.includes('postgresql') || text.includes('postgres')) technologies.add('PostgreSQL');
    if (text.includes('mysql')) technologies.add('MySQL');
    if (text.includes('redis')) technologies.add('Redis');
    
    // Tools
    if (text.includes('git')) technologies.add('Git');
    if (text.includes('docker')) technologies.add('Docker');
    if (text.includes('aws')) technologies.add('AWS');
    if (text.includes('figma')) technologies.add('Figma');
    
    return Array.from(technologies);
  }

  /**
   * Categorize project based on task
   */
  private categorizeProject(task: MockTask): PortfolioProject['category'] {
    const text = `${task.title} ${task.description}`.toLowerCase();
    
    if (text.includes('web') || text.includes('site') || text.includes('frontend')) return 'web-development';
    if (text.includes('mobil') || text.includes('mobile') || text.includes('app')) return 'mobile-app';
    if (text.includes('veri') || text.includes('data') || text.includes('analiz')) return 'data-science';
    if (text.includes('tasarım') || text.includes('design') || text.includes('ui')) return 'design';
    if (text.includes('iot') || text.includes('sensor') || text.includes('arduino')) return 'iot';
    if (text.includes('ai') || text.includes('ml') || text.includes('yapay zeka')) return 'ai-ml';
    
    return 'other';
  }

  /**
   * Generate professional showcase
   */
  generateShowcase(
    userId: string,
    userName: string,
    userLevel: string,
    userXP: number,
    userBadges: string[],
    projects: PortfolioProject[],
    sdgFocus: number[]
  ): ProfessionalShowcase {
    const allSkills = new Set<string>();
    projects.forEach(p => p.skills.forEach(s => allSkills.add(s)));
    
    const completionRate = projects.length > 0 
      ? (projects.filter(p => p.featured).length / projects.length) * 100 
      : 0;
    
    return {
      userId,
      profile: {
        name: userName,
        title: this.generateProfessionalTitle(userLevel, Array.from(allSkills)),
        bio: this.generateBio(userLevel, projects.length, sdgFocus),
        skills: Array.from(allSkills).slice(0, 10),
        interests: this.extractInterests(projects),
        sdgFocus,
      },
      projects: projects.sort((a, b) => {
        // Featured projects first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Then by completion date (newest first)
        return b.completionDate.getTime() - a.completionDate.getTime();
      }),
      achievements: {
        badges: userBadges,
        certificates: this.generateCertificates(userLevel, projects),
        awards: this.generateAwards(projects),
      },
      statistics: {
        totalProjects: projects.length,
        totalXP: userXP,
        level: userLevel,
        completionRate,
        collaborationScore: this.calculateCollaborationScore(projects),
      },
      socialLinks: {
        github: `https://github.com/${userName.toLowerCase().replace(' ', '')}`,
        linkedin: `https://linkedin.com/in/${userName.toLowerCase().replace(' ', '-')}`,
      },
      generatedAt: new Date(),
    };
  }

  /**
   * Generate professional title based on level and skills
   */
  private generateProfessionalTitle(level: string, skills: string[]): string {
    const levelTitles = {
      cirak: 'Junior',
      kalfa: 'Mid-Level',
      usta: 'Senior',
      mezun: 'Expert',
      graduate: 'Expert',
    };
    
    const prefix = levelTitles[level as keyof typeof levelTitles] || 'Junior';
    
    if (skills.includes('Web Development')) return `${prefix} Web Developer`;
    if (skills.includes('Mobile Development')) return `${prefix} Mobile Developer`;
    if (skills.includes('Data Science')) return `${prefix} Data Scientist`;
    if (skills.includes('UI/UX Design')) return `${prefix} UI/UX Designer`;
    if (skills.includes('Artificial Intelligence')) return `${prefix} AI Engineer`;
    
    return `${prefix} Software Developer`;
  }

  /**
   * Generate bio
   */
  private generateBio(level: string, projectCount: number, sdgFocus: number[]): string {
    const sdgDescriptions: Record<number, string> = {
      4: 'nitelikli eğitim',
      6: 'temiz su ve sanitasyon',
      11: 'sürdürülebilir şehirler',
      13: 'iklim eylemi',
      17: 'amaçlar için ortaklıklar',
    };
    
    const sdgText = sdgFocus.map(sdg => sdgDescriptions[sdg]).filter(Boolean).join(', ');
    
    return `PUSULA Dijital Gençlik Merkezi mezunu. ${projectCount}+ proje tamamladım ve ${sdgText} alanlarında sosyal etki yaratan çözümler geliştirdim. Teknoloji ile toplumsal sorunlara çözüm üretmeye odaklanıyorum.`;
  }

  /**
   * Extract interests from projects
   */
  private extractInterests(projects: PortfolioProject[]): string[] {
    const interests = new Set<string>();
    
    projects.forEach(project => {
      if (project.category === 'web-development') interests.add('Web Geliştirme');
      if (project.category === 'mobile-app') interests.add('Mobil Uygulama');
      if (project.category === 'data-science') interests.add('Veri Bilimi');
      if (project.category === 'design') interests.add('Tasarım');
      if (project.category === 'ai-ml') interests.add('Yapay Zeka');
      if (project.category === 'iot') interests.add('IoT');
      
      if (project.sdgAlignment.includes(4)) interests.add('Eğitim Teknolojileri');
      if (project.sdgAlignment.includes(13)) interests.add('İklim Teknolojileri');
      if (project.sdgAlignment.includes(11)) interests.add('Akıllı Şehirler');
    });
    
    return Array.from(interests).slice(0, 5);
  }

  /**
   * Generate certificates based on level and projects
   */
  private generateCertificates(level: string, projects: PortfolioProject[]): string[] {
    const certificates: string[] = [];
    
    if (level === 'mezun' || level === 'graduate') {
      certificates.push('PUSULA Dijital Gençlik Merkezi Mezuniyet Sertifikası');
    }
    
    if (projects.length >= 10) {
      certificates.push('10+ Proje Tamamlama Sertifikası');
    }
    
    const webProjects = projects.filter(p => p.category === 'web-development');
    if (webProjects.length >= 3) {
      certificates.push('Web Geliştirme Uzmanlık Sertifikası');
    }
    
    const sdgProjects = projects.filter(p => p.sdgAlignment.length > 0);
    if (sdgProjects.length >= 5) {
      certificates.push('Sosyal Etki Projesi Sertifikası');
    }
    
    return certificates;
  }

  /**
   * Generate awards based on project quality
   */
  private generateAwards(projects: PortfolioProject[]): string[] {
    const awards: string[] = [];
    
    const featuredCount = projects.filter(p => p.featured).length;
    if (featuredCount >= 5) {
      awards.push('Mükemmellik Ödülü - 5+ Öne Çıkan Proje');
    }
    
    const collaborativeProjects = projects.filter(p => p.collaborators && p.collaborators.length > 0);
    if (collaborativeProjects.length >= 3) {
      awards.push('Takım Çalışması Ödülü');
    }
    
    const impactProjects = projects.filter(p => p.outcomes.metrics && p.outcomes.metrics.length > 0);
    if (impactProjects.length >= 3) {
      awards.push('Sosyal Etki Ödülü');
    }
    
    return awards;
  }

  /**
   * Calculate collaboration score
   */
  private calculateCollaborationScore(projects: PortfolioProject[]): number {
    if (projects.length === 0) return 0;
    
    const collaborativeProjects = projects.filter(p => p.collaborators && p.collaborators.length > 0);
    const score = (collaborativeProjects.length / projects.length) * 100;
    
    return Math.round(score);
  }

  /**
   * Filter projects by criteria
   */
  filterProjects(
    projects: PortfolioProject[],
    filters: {
      category?: PortfolioProject['category'];
      phase?: 'kesif' | 'insa' | 'etki';
      sdg?: number;
      featured?: boolean;
      minSkills?: number;
    }
  ): PortfolioProject[] {
    return projects.filter(project => {
      if (filters.category && project.category !== filters.category) return false;
      if (filters.phase && project.phase !== filters.phase) return false;
      if (filters.sdg && !project.sdgAlignment.includes(filters.sdg)) return false;
      if (filters.featured !== undefined && project.featured !== filters.featured) return false;
      if (filters.minSkills && project.skills.length < filters.minSkills) return false;
      return true;
    });
  }

  /**
   * Get portfolio statistics
   */
  getPortfolioStatistics(projects: PortfolioProject[]): {
    totalProjects: number;
    byCategory: Record<string, number>;
    byPhase: Record<string, number>;
    totalSkills: number;
    totalTechnologies: number;
    featuredCount: number;
    collaborativeCount: number;
    averageProjectDuration: number;
  } {
    const allSkills = new Set<string>();
    const allTechnologies = new Set<string>();
    let totalDuration = 0;
    
    const byCategory: Record<string, number> = {};
    const byPhase: Record<string, number> = {};
    
    projects.forEach(project => {
      // Skills and technologies
      project.skills.forEach(s => allSkills.add(s));
      project.technologies.forEach(t => allTechnologies.add(t));
      
      // Categories
      byCategory[project.category] = (byCategory[project.category] || 0) + 1;
      
      // Phases
      byPhase[project.phase] = (byPhase[project.phase] || 0) + 1;
      
      // Duration
      const duration = project.completionDate.getTime() - project.startDate.getTime();
      totalDuration += duration;
    });
    
    return {
      totalProjects: projects.length,
      byCategory,
      byPhase,
      totalSkills: allSkills.size,
      totalTechnologies: allTechnologies.size,
      featuredCount: projects.filter(p => p.featured).length,
      collaborativeCount: projects.filter(p => p.collaborators && p.collaborators.length > 0).length,
      averageProjectDuration: projects.length > 0 ? totalDuration / projects.length / (1000 * 60 * 60 * 24) : 0, // days
    };
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

export const portfolioBuilder = new PortfolioBuilderEngine();
