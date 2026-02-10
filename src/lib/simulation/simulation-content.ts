/**
 * Simulation Content Library
 * 36+ Interactive Simulations across all learning phases
 */

import { Simulation } from './simulation-engine';

/**
 * All 36+ simulations organized by phase and type
 */
export const SIMULATIONS: Simulation[] = [
  // ============================================
  // KEŞİF PHASE - Beginner Simulations (12)
  // ============================================
  
  // Scenario Simulations (3)
  {
    id: 'SIM-K-01',
    title: 'Dijital Okuryazarlık: İlk Adımlar',
    description: 'Temel dijital araçları kullanarak günlük görevleri tamamla',
    type: 'scenario',
    difficulty: 'beginner',
    phase: 'kesif',
    sdgAlignment: [4, 9],
    estimatedMinutes: 20,
    xpReward: 100,
    gdrReward: 5,
    objectives: [
      'E-posta yönetimi',
      'Dosya organizasyonu',
      'Temel güvenlik'
    ],
    skills: ['Dijital Okuryazarlık', 'Dosya Yönetimi', 'E-posta'],
    prerequisites: [],
    scenario: 'Yeni bir işe başladın ve dijital araçları kullanarak ilk görevlerini tamamlaman gerekiyor.',
    initialState: {},
    steps: [
      {
        id: 'step-1',
        title: 'E-posta Kontrolü',
        description: 'Gelen kutundaki önemli e-postayı bul',
        type: 'decision',
        options: [
          {
            id: 'opt-1',
            label: 'Spam klasörüne bak',
            isCorrect: false,
            impact: 'Önemli e-postalar spam\'de olmaz',
            points: 0
          },
          {
            id: 'opt-2',
            label: 'Gelen kutusunda ara',
            isCorrect: true,
            impact: 'Doğru! E-postayı buldun',
            points: 10
          }
        ],
        feedback: {
          correct: 'Harika! E-postayı doğru yerde buldun.',
          incorrect: 'Tekrar dene. Önemli e-postalar genelde gelen kutusunda olur.',
          hint: 'Gelen kutusu en çok kullanılan klasördür'
        },
        points: 10
      }
    ],
    supportsCollaboration: false,
    maxParticipants: 1,
    passingScore: 60,
    assessmentCriteria: [
      {
        id: 'crit-1',
        name: 'Doğru Kararlar',
        description: 'Doğru seçimleri yapma',
        weight: 0.7,
        maxScore: 100
      }
    ]
  },

  {
    id: 'SIM-K-02',
    title: 'Sosyal Medya Güvenliği',
    description: 'Güvenli sosyal medya kullanımı ve gizlilik ayarları',
    type: 'scenario',
    difficulty: 'beginner',
    phase: 'kesif',
    sdgAlignment: [4, 16],
    estimatedMinutes: 25,
    xpReward: 120,
    gdrReward: 6,
    objectives: [
      'Gizlilik ayarları',
      'Güvenli paylaşım',
      'Kimlik avı tanıma'
    ],
    skills: ['Dijital Güvenlik', 'Sosyal Medya', 'Gizlilik'],
    prerequisites: [],
    scenario: 'Sosyal medya hesabını güvenli hale getir ve tehlikeli durumları tanı.',
    initialState: {},
    steps: [],
    supportsCollaboration: false,
    maxParticipants: 1,
    passingScore: 60,
    assessmentCriteria: []
  },

  {
    id: 'SIM-K-03',
    title: 'Takım Çalışması Temelleri',
    description: 'Dijital ortamda etkili takım çalışması',
    type: 'scenario',
    difficulty: 'beginner',
    phase: 'kesif',
    sdgAlignment: [4, 8],
    estimatedMinutes: 30,
    xpReward: 150,
    gdrReward: 8,
    objectives: [
      'İletişim araçları',
      'Görev paylaşımı',
      'Zaman yönetimi'
    ],
    skills: ['Takım Çalışması', 'İletişim', 'Proje Yönetimi'],
    prerequisites: [],
    scenario: 'Bir proje ekibinde yer alıyorsun. Dijital araçları kullanarak ekiple koordinasyon sağla.',
    initialState: {},
    steps: [],
    supportsCollaboration: true,
    maxParticipants: 4,
    passingScore: 60,
    assessmentCriteria: []
  },

  // Coding Simulations (3)
  {
    id: 'SIM-K-04',
    title: 'HTML Temelleri: İlk Web Sayfan',
    description: 'Temel HTML etiketleriyle basit bir web sayfası oluştur',
    type: 'coding',
    difficulty: 'beginner',
    phase: 'kesif',
    sdgAlignment: [4, 9],
    estimatedMinutes: 35,
    xpReward: 180,
    gdrReward: 10,
    objectives: ['HTML yapısı', 'Temel etiketler', 'Semantik HTML'],
    skills: ['HTML', 'Web Geliştirme', 'Frontend'],
    prerequisites: [],
    scenario: 'İlk web sayfanı oluştur. Başlık, paragraf ve liste kullan.',
    initialState: {},
    steps: [],
    supportsCollaboration: false,
    maxParticipants: 1,
    passingScore: 70,
    assessmentCriteria: []
  },

  // Additional 32 simulations (abbreviated for brevity - full implementation would include all details)
  ...generateRemainingSimulations()
];

/**
 * Generate remaining 32 simulations across all phases and types
 */
function generateRemainingSimulations(): Simulation[] {
  const simulations: Simulation[] = [];
  
  // Keşif Phase (8 more): CSS, JavaScript, Git, Data basics
  const kesifSims = [
    { id: 'SIM-K-05', title: 'CSS Styling Temelleri', type: 'coding' as const, xp: 180 },
    { id: 'SIM-K-06', title: 'JavaScript Değişkenler', type: 'coding' as const, xp: 200 },
    { id: 'SIM-K-07', title: 'Git Versiyon Kontrolü', type: 'coding' as const, xp: 150 },
    { id: 'SIM-K-08', title: 'Veri Analizi Giriş', type: 'data' as const, xp: 170 },
    { id: 'SIM-K-09', title: 'UI/UX Tasarım İlkeleri', type: 'design' as const, xp: 160 },
    { id: 'SIM-K-10', title: 'Dijital Pazarlama Temelleri', type: 'business' as const, xp: 140 },
    { id: 'SIM-K-11', title: 'Topluluk Yönetimi', type: 'social' as const, xp: 130 },
    { id: 'SIM-K-12', title: 'Proje Planlama', type: 'business' as const, xp: 150 }
  ];

  // İnşa Phase (12): Advanced coding, design, data analysis
  const insaSims = [
    { id: 'SIM-I-01', title: 'React Component Geliştirme', type: 'coding' as const, xp: 300 },
    { id: 'SIM-I-02', title: 'API Entegrasyonu', type: 'coding' as const, xp: 350 },
    { id: 'SIM-I-03', title: 'Database Tasarımı', type: 'coding' as const, xp: 320 },
    { id: 'SIM-I-04', title: 'Responsive Design', type: 'design' as const, xp: 280 },
    { id: 'SIM-I-05', title: 'Veri Görselleştirme', type: 'data' as const, xp: 300 },
    { id: 'SIM-I-06', title: 'Python Veri Analizi', type: 'data' as const, xp: 330 },
    { id: 'SIM-I-07', title: 'Figma Prototyping', type: 'design' as const, xp: 290 },
    { id: 'SIM-I-08', title: 'E-Ticaret Platformu', type: 'business' as const, xp: 400 },
    { id: 'SIM-I-09', title: 'Sosyal Etki Projesi', type: 'social' as const, xp: 350 },
    { id: 'SIM-I-10', title: 'Agile Proje Yönetimi', type: 'business' as const, xp: 280 },
    { id: 'SIM-I-11', title: 'Kullanıcı Araştırması', type: 'design' as const, xp: 270 },
    { id: 'SIM-I-12', title: 'İçerik Stratejisi', type: 'business' as const, xp: 260 }
  ];

  // Etki Phase (12): Real-world impact, capstone projects
  const etkiSims = [
    { id: 'SIM-E-01', title: 'İklim Krizi Çözümleri', type: 'scenario' as const, xp: 500 },
    { id: 'SIM-E-02', title: 'Su Yönetimi Sistemi', type: 'scenario' as const, xp: 550 },
    { id: 'SIM-E-03', title: 'Eğitim Platformu Geliştirme', type: 'coding' as const, xp: 600 },
    { id: 'SIM-E-04', title: 'Sağlık Takip Uygulaması', type: 'coding' as const, xp: 580 },
    { id: 'SIM-E-05', title: 'Sürdürülebilir Şehir Planı', type: 'scenario' as const, xp: 520 },
    { id: 'SIM-E-06', title: 'Toplumsal Cinsiyet Eşitliği', type: 'social' as const, xp: 480 },
    { id: 'SIM-E-07', title: 'Veri Odaklı Karar Verme', type: 'data' as const, xp: 550 },
    { id: 'SIM-E-08', title: 'Sosyal Girişim Modeli', type: 'business' as const, xp: 500 },
    { id: 'SIM-E-09', title: 'Erişilebilir Tasarım', type: 'design' as const, xp: 480 },
    { id: 'SIM-E-10', title: 'Açık Kaynak Katkısı', type: 'coding' as const, xp: 530 },
    { id: 'SIM-E-11', title: 'Topluluk Liderliği', type: 'social' as const, xp: 490 },
    { id: 'SIM-E-12', title: 'Dijital Dönüşüm Stratejisi', type: 'business' as const, xp: 560 }
  ];

  // Create simulation objects
  [...kesifSims, ...insaSims, ...etkiSims].forEach((sim, index) => {
    const phase = sim.id.startsWith('SIM-K') ? 'kesif' : 
                  sim.id.startsWith('SIM-I') ? 'insa' : 'etki';
    const difficulty = phase === 'kesif' ? 'beginner' : 
                      phase === 'insa' ? 'intermediate' : 'advanced';
    
    simulations.push({
      id: sim.id,
      title: sim.title,
      description: `${sim.title} simülasyonu - Gerçek dünya senaryolarıyla pratik yap`,
      type: sim.type,
      difficulty,
      phase,
      sdgAlignment: [4, 8, 9, 11, 13],
      estimatedMinutes: phase === 'kesif' ? 30 : phase === 'insa' ? 45 : 60,
      xpReward: sim.xp,
      gdrReward: Math.floor(sim.xp / 20),
      objectives: ['Pratik beceri geliştirme', 'Problem çözme', 'Gerçek dünya uygulaması'],
      skills: [sim.title.split(' ')[0], 'Problem Çözme', 'Analitik Düşünme'],
      prerequisites: phase === 'kesif' ? [] : phase === 'insa' ? ['Keşif tamamlandı'] : ['İnşa tamamlandı'],
      scenario: `${sim.title} konusunda gerçek dünya senaryosu`,
      initialState: {},
      steps: [],
      supportsCollaboration: phase !== 'kesif',
      maxParticipants: phase === 'kesif' ? 1 : phase === 'insa' ? 2 : 4,
      passingScore: phase === 'kesif' ? 60 : phase === 'insa' ? 70 : 80,
      assessmentCriteria: [
        {
          id: 'crit-1',
          name: 'Teknik Yeterlilik',
          description: 'Teknik becerilerin doğru uygulanması',
          weight: 0.4,
          maxScore: 100
        },
        {
          id: 'crit-2',
          name: 'Problem Çözme',
          description: 'Yaratıcı ve etkili çözümler',
          weight: 0.3,
          maxScore: 100
        },
        {
          id: 'crit-3',
          name: 'Sosyal Etki',
          description: 'SDG hedeflerine katkı',
          weight: 0.3,
          maxScore: 100
        }
      ]
    });
  });

  return simulations;
}

/**
 * Get simulations by phase
 */
export function getSimulationsByPhase(phase: 'kesif' | 'insa' | 'etki'): Simulation[] {
  return SIMULATIONS.filter(sim => sim.phase === phase);
}

/**
 * Get simulations by type
 */
export function getSimulationsByType(type: string): Simulation[] {
  return SIMULATIONS.filter(sim => sim.type === type);
}

/**
 * Get simulation by ID
 */
export function getSimulationById(id: string): Simulation | undefined {
  return SIMULATIONS.find(sim => sim.id === id);
}
