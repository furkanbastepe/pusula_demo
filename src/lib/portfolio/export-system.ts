/**
 * Portfolio System - Export and Certification
 * 
 * Creates exportable portfolio formats (PDF, web, LinkedIn)
 * and generates verified digital certificates.
 */

import type { ProfessionalShowcase, PortfolioProject } from './portfolio-builder';

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface ExportFormat {
  type: 'pdf' | 'web' | 'linkedin' | 'json';
  content: string | object;
  filename: string;
  generatedAt: Date;
}

export interface DigitalCertificate {
  id: string;
  userId: string;
  type: 'graduation' | 'completion' | 'achievement' | 'skill';
  title: string;
  description: string;
  issuer: {
    name: string;
    organization: string;
    logo?: string;
  };
  recipient: {
    name: string;
    email?: string;
  };
  issuedDate: Date;
  expiryDate?: Date;
  verificationCode: string;
  verificationUrl: string;
  metadata: {
    level?: string;
    xp?: number;
    projects?: number;
    skills?: string[];
    sdgFocus?: number[];
  };
  linkedPortfolio?: string;
  signature: string;
  qrCode: string;
}

export interface CertificateTemplate {
  type: DigitalCertificate['type'];
  title: string;
  description: string;
  requirements: {
    minLevel?: string;
    minXP?: number;
    minProjects?: number;
    specificBadges?: string[];
  };
  design: {
    backgroundColor: string;
    accentColor: string;
    fontFamily: string;
  };
}

// ============================================================================
// Export System Engine
// ============================================================================

export class ExportSystemEngine {
  /**
   * Export portfolio as PDF (HTML representation for PDF generation)
   */
  exportAsPDF(showcase: ProfessionalShowcase): ExportFormat {
    const html = this.generatePDFHTML(showcase);
    
    return {
      type: 'pdf',
      content: html,
      filename: `${showcase.profile.name.replace(/\s+/g, '_')}_Portfolio.pdf`,
      generatedAt: new Date(),
    };
  }

  /**
   * Generate HTML for PDF export
   */
  private generatePDFHTML(showcase: ProfessionalShowcase): string {
    const { profile, projects, achievements, statistics } = showcase;
    
    return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>${profile.name} - Portfolyo</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
    .header h1 { font-size: 32px; color: #1e40af; margin-bottom: 10px; }
    .header .title { font-size: 18px; color: #64748b; margin-bottom: 15px; }
    .header .bio { font-size: 14px; color: #475569; max-width: 600px; margin: 0 auto; }
    .section { margin-bottom: 40px; }
    .section-title { font-size: 24px; color: #1e40af; margin-bottom: 20px; border-left: 4px solid #2563eb; padding-left: 15px; }
    .skills { display: flex; flex-wrap: wrap; gap: 10px; }
    .skill-tag { background: #dbeafe; color: #1e40af; padding: 6px 12px; border-radius: 6px; font-size: 14px; }
    .project { margin-bottom: 30px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; }
    .project-title { font-size: 20px; color: #1e40af; margin-bottom: 10px; }
    .project-meta { font-size: 14px; color: #64748b; margin-bottom: 10px; }
    .project-desc { font-size: 14px; color: #475569; margin-bottom: 15px; }
    .project-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
    .tech-tag { background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 4px; font-size: 12px; }
    .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .stat-box { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; }
    .stat-value { font-size: 32px; color: #2563eb; font-weight: bold; }
    .stat-label { font-size: 14px; color: #64748b; margin-top: 5px; }
    .achievements { list-style: none; }
    .achievement-item { padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
    .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${profile.name}</h1>
      <div class="title">${profile.title}</div>
      <div class="bio">${profile.bio}</div>
    </div>

    <div class="section">
      <h2 class="section-title">İstatistikler</h2>
      <div class="stats">
        <div class="stat-box">
          <div class="stat-value">${statistics.totalProjects}</div>
          <div class="stat-label">Tamamlanan Proje</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${statistics.totalXP}</div>
          <div class="stat-label">Toplam XP</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${statistics.completionRate.toFixed(0)}%</div>
          <div class="stat-label">Başarı Oranı</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${statistics.level}</div>
          <div class="stat-label">Seviye</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Yetenekler</h2>
      <div class="skills">
        ${profile.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">Projeler</h2>
      ${projects.slice(0, 10).map(project => `
        <div class="project">
          <div class="project-title">${project.title}</div>
          <div class="project-meta">
            ${project.phase.toUpperCase()} • ${project.category} • ${new Date(project.completionDate).toLocaleDateString('tr-TR')}
          </div>
          <div class="project-desc">${project.description}</div>
          <div class="project-tech">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="section">
      <h2 class="section-title">Başarılar</h2>
      <ul class="achievements">
        ${achievements.badges.slice(0, 10).map(badge => `
          <li class="achievement-item">🏆 ${badge}</li>
        `).join('')}
        ${achievements.certificates.map(cert => `
          <li class="achievement-item">📜 ${cert}</li>
        `).join('')}
      </ul>
    </div>

    <div class="footer">
      <p>PUSULA Dijital Gençlik Merkezi • ${new Date().getFullYear()}</p>
      <p>Bu portfolyo ${new Date().toLocaleDateString('tr-TR')} tarihinde oluşturulmuştur.</p>
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Export portfolio as web page (standalone HTML)
   */
  exportAsWeb(showcase: ProfessionalShowcase): ExportFormat {
    const html = this.generateWebHTML(showcase);
    
    return {
      type: 'web',
      content: html,
      filename: `${showcase.profile.name.replace(/\s+/g, '_')}_Portfolio.html`,
      generatedAt: new Date(),
    };
  }

  /**
   * Generate standalone web HTML
   */
  private generateWebHTML(showcase: ProfessionalShowcase): string {
    // Similar to PDF but with interactive elements
    return this.generatePDFHTML(showcase).replace(
      '</head>',
      `
  <script>
    // Add interactivity
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Portfolio loaded');
    });
  </script>
</head>
      `
    );
  }

  /**
   * Export for LinkedIn (formatted text)
   */
  exportForLinkedIn(showcase: ProfessionalShowcase): ExportFormat {
    const { profile, projects, achievements, statistics } = showcase;
    
    const content = `
${profile.name}
${profile.title}

${profile.bio}

🎯 Yetenekler:
${profile.skills.join(' • ')}

📊 İstatistikler:
• ${statistics.totalProjects} Tamamlanan Proje
• ${statistics.totalXP} XP
• ${statistics.level} Seviye
• %${statistics.completionRate.toFixed(0)} Başarı Oranı

🚀 Öne Çıkan Projeler:
${projects.filter(p => p.featured).slice(0, 5).map(p => `
• ${p.title}
  ${p.description.substring(0, 100)}...
  Teknolojiler: ${p.technologies.slice(0, 5).join(', ')}
`).join('\n')}

🏆 Başarılar:
${achievements.certificates.slice(0, 3).map(cert => `• ${cert}`).join('\n')}

#PUSULA #DijitalGençlikMerkezi #SoftwareDevelopment #TechForGood
    `.trim();
    
    return {
      type: 'linkedin',
      content,
      filename: `${showcase.profile.name.replace(/\s+/g, '_')}_LinkedIn.txt`,
      generatedAt: new Date(),
    };
  }

  /**
   * Export as JSON (for API integration)
   */
  exportAsJSON(showcase: ProfessionalShowcase): ExportFormat {
    return {
      type: 'json',
      content: showcase,
      filename: `${showcase.profile.name.replace(/\s+/g, '_')}_Portfolio.json`,
      generatedAt: new Date(),
    };
  }
}

// ============================================================================
// Certification System Engine
// ============================================================================

export class CertificationSystemEngine {
  private templates: CertificateTemplate[] = [
    {
      type: 'graduation',
      title: 'PUSULA Dijital Gençlik Merkezi Mezuniyet Sertifikası',
      description: 'Dijital beceriler eğitim programını başarıyla tamamladığını belgeler',
      requirements: {
        minLevel: 'mezun',
        minXP: 5000,
        minProjects: 10,
      },
      design: {
        backgroundColor: '#1e40af',
        accentColor: '#fbbf24',
        fontFamily: 'Georgia, serif',
      },
    },
    {
      type: 'completion',
      title: 'Proje Tamamlama Sertifikası',
      description: 'Belirli sayıda projeyi başarıyla tamamladığını belgeler',
      requirements: {
        minProjects: 5,
      },
      design: {
        backgroundColor: '#059669',
        accentColor: '#34d399',
        fontFamily: 'Arial, sans-serif',
      },
    },
    {
      type: 'achievement',
      title: 'Özel Başarı Sertifikası',
      description: 'Özel bir başarı veya yetkinlik kazandığını belgeler',
      requirements: {
        specificBadges: ['Usta Yazılımcı', 'Topluluk Mentoru'],
      },
      design: {
        backgroundColor: '#7c3aed',
        accentColor: '#a78bfa',
        fontFamily: 'Verdana, sans-serif',
      },
    },
    {
      type: 'skill',
      title: 'Yetkinlik Sertifikası',
      description: 'Belirli bir alanda yetkinlik kazandığını belgeler',
      requirements: {
        minProjects: 3,
      },
      design: {
        backgroundColor: '#dc2626',
        accentColor: '#f87171',
        fontFamily: 'Tahoma, sans-serif',
      },
    },
  ];

  /**
   * Generate graduation certificate
   */
  generateGraduationCertificate(
    userId: string,
    userName: string,
    userEmail: string,
    level: string,
    xp: number,
    projects: PortfolioProject[],
    portfolioUrl?: string
  ): DigitalCertificate {
    const template = this.templates.find(t => t.type === 'graduation')!;
    const verificationCode = this.generateVerificationCode();
    
    return {
      id: `cert_grad_${userId}_${Date.now()}`,
      userId,
      type: 'graduation',
      title: template.title,
      description: template.description,
      issuer: {
        name: 'PUSULA Dijital Gençlik Merkezi',
        organization: 'Eskişehir Belediyesi & UNDP Türkiye',
        logo: '/pusula-logo.png',
      },
      recipient: {
        name: userName,
        email: userEmail,
      },
      issuedDate: new Date(),
      verificationCode,
      verificationUrl: `https://pusula.eskisehir.bel.tr/verify/${verificationCode}`,
      metadata: {
        level,
        xp,
        projects: projects.length,
        skills: this.extractTopSkills(projects, 5),
        sdgFocus: this.extractSDGFocus(projects),
      },
      linkedPortfolio: portfolioUrl,
      signature: this.generateSignature(userId, verificationCode),
      qrCode: this.generateQRCode(verificationCode),
    };
  }

  /**
   * Generate completion certificate
   */
  generateCompletionCertificate(
    userId: string,
    userName: string,
    projectCount: number,
    category: string
  ): DigitalCertificate {
    const template = this.templates.find(t => t.type === 'completion')!;
    const verificationCode = this.generateVerificationCode();
    
    return {
      id: `cert_comp_${userId}_${Date.now()}`,
      userId,
      type: 'completion',
      title: `${category} - ${projectCount} Proje Tamamlama Sertifikası`,
      description: `${projectCount} adet ${category} projesini başarıyla tamamladığını belgeler`,
      issuer: {
        name: 'PUSULA Dijital Gençlik Merkezi',
        organization: 'Eskişehir Belediyesi & UNDP Türkiye',
      },
      recipient: {
        name: userName,
      },
      issuedDate: new Date(),
      verificationCode,
      verificationUrl: `https://pusula.eskisehir.bel.tr/verify/${verificationCode}`,
      metadata: {
        projects: projectCount,
      },
      signature: this.generateSignature(userId, verificationCode),
      qrCode: this.generateQRCode(verificationCode),
    };
  }

  /**
   * Generate skill certificate
   */
  generateSkillCertificate(
    userId: string,
    userName: string,
    skill: string,
    projects: PortfolioProject[]
  ): DigitalCertificate {
    const template = this.templates.find(t => t.type === 'skill')!;
    const verificationCode = this.generateVerificationCode();
    
    return {
      id: `cert_skill_${userId}_${Date.now()}`,
      userId,
      type: 'skill',
      title: `${skill} Yetkinlik Sertifikası`,
      description: `${skill} alanında yetkinlik kazandığını belgeler`,
      issuer: {
        name: 'PUSULA Dijital Gençlik Merkezi',
        organization: 'Eskişehir Belediyesi & UNDP Türkiye',
      },
      recipient: {
        name: userName,
      },
      issuedDate: new Date(),
      verificationCode,
      verificationUrl: `https://pusula.eskisehir.bel.tr/verify/${verificationCode}`,
      metadata: {
        projects: projects.length,
        skills: [skill],
      },
      signature: this.generateSignature(userId, verificationCode),
      qrCode: this.generateQRCode(verificationCode),
    };
  }

  /**
   * Check if user qualifies for graduation certificate
   */
  qualifiesForGraduation(level: string, xp: number, projectCount: number): boolean {
    const template = this.templates.find(t => t.type === 'graduation')!;
    const reqs = template.requirements;
    
    return (
      level === reqs.minLevel &&
      xp >= (reqs.minXP || 0) &&
      projectCount >= (reqs.minProjects || 0)
    );
  }

  /**
   * Generate verification code
   */
  private generateVerificationCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'PUSULA-';
    for (let i = 0; i < 12; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
      if ((i + 1) % 4 === 0 && i < 11) code += '-';
    }
    return code;
  }

  /**
   * Generate signature (mock)
   */
  private generateSignature(userId: string, verificationCode: string): string {
    // In production, this would be a cryptographic signature
    return `SIG_${userId}_${verificationCode}`.substring(0, 64);
  }

  /**
   * Generate QR code data URL (mock)
   */
  private generateQRCode(verificationCode: string): string {
    // In production, this would generate an actual QR code
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="10" y="100">${verificationCode}</text></svg>`;
  }

  /**
   * Extract top skills from projects
   */
  private extractTopSkills(projects: PortfolioProject[], count: number): string[] {
    const skillCounts = new Map<string, number>();
    
    projects.forEach(project => {
      project.skills.forEach(skill => {
        skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1);
      });
    });
    
    return Array.from(skillCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([skill]) => skill);
  }

  /**
   * Extract SDG focus from projects
   */
  private extractSDGFocus(projects: PortfolioProject[]): number[] {
    const sdgCounts = new Map<number, number>();
    
    projects.forEach(project => {
      project.sdgAlignment.forEach(sdg => {
        sdgCounts.set(sdg, (sdgCounts.get(sdg) || 0) + 1);
      });
    });
    
    return Array.from(sdgCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([sdg]) => sdg);
  }

  /**
   * Verify certificate
   */
  verifyCertificate(verificationCode: string): {
    valid: boolean;
    certificate?: DigitalCertificate;
    message: string;
  } {
    // In production, this would check against a database
    if (verificationCode.startsWith('PUSULA-')) {
      return {
        valid: true,
        message: 'Sertifika geçerli ve doğrulanmıştır.',
      };
    }
    
    return {
      valid: false,
      message: 'Sertifika doğrulanamadı. Lütfen kodu kontrol edin.',
    };
  }
}

// ============================================================================
// Singleton Instances
// ============================================================================

export const exportSystem = new ExportSystemEngine();
export const certificationSystem = new CertificationSystemEngine();
