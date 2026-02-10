// Comprehensive MicroLab Content Library - 50+ Professional Modules
// Aligned with UNDP SDGs and real-world applications

export interface MicroLabDefinition {
  id: string;
  title: string;
  description: string;
  phase: 'kesif' | 'insa' | 'etki';
  sdgAlignment: number[];
  estimatedMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  prerequisites: string[];
  learningObjectives: string[];
  realWorldApplication: string;
  skills: string[];
}

// KEŞIF PHASE (20 modules) - Foundation & Discovery
export const KESIF_MICROLABS: MicroLabDefinition[] = [
  {
    id: 'ML-01',
    title: 'Dijital Dünyaya Giriş',
    description: 'İnternet nasıl çalışır? Web teknolojilerinin temellerini keşfet ve dijital okuryazarlık becerilerini geliştir.',
    phase: 'kesif',
    sdgAlignment: [4, 9],
    estimatedMinutes: 30,
    difficulty: 'easy',
    prerequisites: [],
    learningObjectives: [
      'İnternetin temel çalışma prensiplerini anlama',
      'Web tarayıcıları ve arama motorlarını etkili kullanma',
      'Dijital güvenlik ve gizlilik temellerini öğrenme',
      'Online kaynaklara güvenli erişim sağlama'
    ],
    realWorldApplication: 'Dijital okuryazarlık, modern iş dünyasında temel bir beceridir. Bu modül, dijital araçları etkili kullanarak verimliliği artırmanızı sağlar.',
    skills: ['Dijital Okuryazarlık', 'İnternet Güvenliği', 'Bilgi Arama']
  },
  {
    id: 'ML-02',
    title: 'HTML Temelleri - İlk Web Sayfan',
    description: 'HTML ile web sayfası yapısını öğren. Kendi kişisel web sayfanı oluştur ve yayınla.',
    phase: 'kesif',
    sdgAlignment: [4, 8],
    estimatedMinutes: 45,
    difficulty: 'easy',
    prerequisites: ['ML-01'],
    learningObjectives: [
      'HTML etiketlerini ve yapısını anlama',
      'Semantik HTML kullanarak erişilebilir içerik oluşturma',
      'Formlar, listeler ve tablolar ile çalışma',
      'İlk web sayfanı oluşturma ve yayınlama'
    ],
    realWorldApplication: 'HTML, tüm web sitelerinin temelidir. E-ticaret, blog, portfolyo - her dijital varlık HTML ile başlar.',
    skills: ['HTML', 'Web Development', 'Semantic Markup']
  },
  {
    id: 'ML-03',
    title: 'CSS ile Stil Verme',
    description: 'CSS ile web sayfalarını güzelleştir. Renkler, fontlar, layout ve responsive tasarım öğren.',
    phase: 'kesif',
    sdgAlignment: [4, 9],
    estimatedMinutes: 50,
    difficulty: 'easy',
    prerequisites: ['ML-02'],
    learningObjectives: [
      'CSS selectors ve properties kullanma',
      'Flexbox ve Grid ile modern layout oluşturma',
      'Responsive tasarım prensiplerini uygulama',
      'CSS animations ve transitions ile etkileşim ekleme'
    ],
    realWorldApplication: 'Profesyonel görünümlü web siteleri oluşturmak için CSS şarttır. Kullanıcı deneyimini doğrudan etkiler.',
    skills: ['CSS', 'Responsive Design', 'UI Design']
  },
  {
    id: 'ML-04',
    title: 'JavaScript Başlangıç',
    description: 'Web sayfalarına interaktivite ekle. JavaScript temelleri, değişkenler, fonksiyonlar ve DOM manipülasyonu.',
    phase: 'kesif',
    sdgAlignment: [4, 9],
    estimatedMinutes: 60,
    difficulty: 'medium',
    prerequisites: ['ML-02', 'ML-03'],
    learningObjectives: [
      'JavaScript syntax ve temel kavramları öğrenme',
      'Değişkenler, veri tipleri ve operatörler',
      'Fonksiyonlar ve scope kavramı',
      'DOM ile etkileşim ve event handling'
    ],
    realWorldApplication: 'JavaScript, modern web uygulamalarının kalbidir. Dinamik, etkileşimli kullanıcı deneyimleri oluşturur.',
    skills: ['JavaScript', 'Programming', 'DOM Manipulation']
  },
  {
    id: 'ML-05',
    title: 'Python Temelleri',
    description: 'Dünyanın en popüler programlama dillerinden Python ile tanış. Temel syntax, veri yapıları ve algoritmalar.',
    phase: 'kesif',
    sdgAlignment: [4, 9],
    estimatedMinutes: 55,
    difficulty: 'easy',
    prerequisites: [],
    learningObjectives: [
      'Python syntax ve temel kavramları',
      'Veri tipleri: strings, lists, dictionaries',
      'Kontrol yapıları: if, for, while',
      'Fonksiyonlar ve modüller'
    ],
    realWorldApplication: 'Python, veri bilimi, web development, otomasyon ve AI için kullanılır. Çok yönlü ve öğrenmesi kolay.',
    skills: ['Python', 'Programming', 'Problem Solving']
  },
  {
    id: 'ML-06',
    title: 'Veri Analizi Giriş',
    description: 'Veri ile hikaye anlat. Excel ve temel istatistik ile veri analizi yapmayı öğren.',
    phase: 'kesif',
    sdgAlignment: [4, 9, 11],
    estimatedMinutes: 50,
    difficulty: 'easy',
    prerequisites: [],
    learningObjectives: [
      'Veri toplama ve temizleme teknikleri',
      'Temel istatistik kavramları',
      'Excel ile veri analizi',
      'Grafikler ve görselleştirme'
    ],
    realWorldApplication: 'Veri analizi, iş kararlarını destekler. Pazarlama, finans, sağlık - her sektörde kritik.',
    skills: ['Data Analysis', 'Excel', 'Statistics']
  },
  {
    id: 'ML-07',
    title: 'Tasarım Düşüncesi (Design Thinking)',
    description: 'Kullanıcı odaklı problem çözme. Empati, ideation, prototipleme ve test süreçleri.',
    phase: 'kesif',
    sdgAlignment: [4, 9, 11],
    estimatedMinutes: 45,
    difficulty: 'easy',
    prerequisites: [],
    learningObjectives: [
      'Design Thinking metodolojisini anlama',
      'Empati haritası oluşturma',
      'Brainstorming ve ideation teknikleri',
      'Hızlı prototipleme ve kullanıcı testi'
    ],
    realWorldApplication: 'Design Thinking, inovasyon ve problem çözme için güçlü bir framework. Startup\'lardan kurumsal şirketlere kadar yaygın kullanılır.',
    skills: ['Design Thinking', 'Problem Solving', 'User Research']
  },
  {
    id: 'ML-08',
    title: 'Kullanıcı Araştırması',
    description: 'Kullanıcılarını tanı. Anketler, mülakatlar ve kullanıcı testleri ile veri topla.',
    phase: 'kesif',
    sdgAlignment: [4, 9],
    estimatedMinutes: 40,
    difficulty: 'easy',
    prerequisites: ['ML-07'],
    learningObjectives: [
      'Kullanıcı araştırması metodları',
      'Anket ve mülakat tasarlama',
      'Kullanıcı persona oluşturma',
      'Bulgular analiz etme ve raporlama'
    ],
    realWorldApplication: 'Başarılı ürünler, kullanıcı ihtiyaçlarını anlamakla başlar. UX research, ürün geliştirmenin temelidir.',
    skills: ['User Research', 'UX Design', 'Data Collection']
  },
  {
    id: 'ML-09',
    title: 'Wireframe ve Prototipleme',
    description: 'Fikirlerini görselleştir. Figma ile wireframe ve interaktif prototip oluştur.',
    phase: 'kesif',
    sdgAlignment: [4, 9],
    estimatedMinutes: 55,
    difficulty: 'medium',
    prerequisites: ['ML-07', 'ML-08'],
    learningObjectives: [
      'Wireframe ve mockup farkını anlama',
      'Figma temel araçları',
      'Low-fidelity ve high-fidelity prototipler',
      'İnteraktif prototip oluşturma'
    ],
    realWorldApplication: 'Prototipleme, ürün geliştirme maliyetini düşürür. Kod yazmadan önce fikirleri test et.',
    skills: ['Figma', 'Prototyping', 'UI Design']
  },
  {
    id: 'ML-10',
    title: 'Siber Güvenlik Temelleri',
    description: 'Dijital dünyada güvende kal. Şifre güvenliği, phishing, sosyal mühendislik ve temel güvenlik pratikleri.',
    phase: 'kesif',
    sdgAlignment: [4, 16],
    estimatedMinutes: 35,
    difficulty: 'easy',
    prerequisites: ['ML-01'],
    learningObjectives: [
      'Siber güvenlik tehditleri ve riskleri',
      'Güçlü şifre oluşturma ve yönetme',
      'Phishing ve sosyal mühendislik saldırılarını tanıma',
      'Güvenli internet kullanımı pratikleri'
    ],
    realWorldApplication: 'Siber güvenlik, kişisel ve kurumsal verileri korur. Her dijital profesyonelin bilmesi gereken temel beceri.',
    skills: ['Cybersecurity', 'Digital Safety', 'Risk Management']
  }
];

// Continue with more modules...
// Due to length constraints, I'll create a comprehensive structure
// that can be expanded with the remaining 40+ modules

export const ALL_MICROLABS = [...KESIF_MICROLABS];

// Continue KEŞIF PHASE (10 more modules)
const KESIF_MICROLABS_PART2: MicroLabDefinition[] = [
  {
    id: 'ML-11',
    title: 'Veritabanı Temelleri - SQL',
    description: 'Veri saklama ve sorgulama. SQL ile veritabanı işlemleri, tablolar, ilişkiler ve sorgular.',
    phase: 'kesif',
    sdgAlignment: [4, 9],
    estimatedMinutes: 50,
    difficulty: 'medium',
    prerequisites: ['ML-05'],
    learningObjectives: [
      'İlişkisel veritabanı kavramları',
      'SQL syntax ve temel komutlar',
      'SELECT, INSERT, UPDATE, DELETE işlemleri',
      'JOIN ve ilişkiler'
    ],
    realWorldApplication: 'Veritabanları, tüm modern uygulamaların omurgasıdır. E-ticaret, sosyal medya, bankacılık - hepsi veritabanı kullanır.',
    skills: ['SQL', 'Database', 'Data Management']
  },
  {
    id: 'ML-12',
    title: 'API Kullanımı ve REST',
    description: 'Uygulamalar arası iletişim. REST API kavramları, HTTP metodları ve API entegrasyonu.',
    phase: 'kesif',
    sdgAlignment: [4, 9],
    estimatedMinutes: 45,
    difficulty: 'medium',
    prerequisites: ['ML-04'],
    learningObjectives: [
      'API ve REST kavramları',
      'HTTP metodları (GET, POST, PUT, DELETE)',
      'JSON veri formatı',
      'API ile veri çekme ve gönderme'
    ],
    realWorldApplication: 'API\'ler, modern web\'in yapı taşlarıdır. Hava durumu, harita, ödeme - her şey API ile çalışır.',
    skills: ['API', 'REST', 'HTTP', 'JSON']
  },
  {
    id: 'ML-13',
    title: 'Git ve Versiyon Kontrolü',
    description: 'Kod yönetimi ve işbirliği. Git temelleri, GitHub kullanımı ve takım çalışması.',
    phase: 'kesif',
    sdgAlignment: [4, 9, 17],
    estimatedMinutes: 40,
    difficulty: 'easy',
    prerequisites: [],
    learningObjectives: [
      'Versiyon kontrolü neden önemli',
      'Git temel komutları',
      'GitHub ile çalışma',
      'Branch, commit, merge işlemleri'
    ],
    realWorldApplication: 'Git, yazılım geliştirmede standart araçtır. Takım çalışması ve kod yönetimi için vazgeçilmez.',
    skills: ['Git', 'Version Control', 'Collaboration']
  },
  {
    id: 'ML-14',
    title: 'Agile ve Scrum Metodolojisi',
    description: 'Çevik proje yönetimi. Sprint, daily standup, retrospective ve Scrum rolleri.',
    phase: 'kesif',
    sdgAlignment: [4, 8, 9],
    estimatedMinutes: 35,
    difficulty: 'easy',
    prerequisites: [],
    learningObjectives: [
      'Agile manifesto ve prensipleri',
      'Scrum framework ve rolleri',
      'Sprint planning ve execution',
      'Retrospective ve continuous improvement'
    ],
    realWorldApplication: 'Agile, modern yazılım şirketlerinin %90\'ında kullanılır. Hızlı değişime adapte olmayı sağlar.',
    skills: ['Agile', 'Scrum', 'Project Management']
  },
  {
    id: 'ML-15',
    title: 'Problem Çözme Teknikleri',
    description: 'Algoritmik düşünme. Problem analizi, çözüm stratejileri ve debugging.',
    phase: 'kesif',
    sdgAlignment: [4, 9],
    estimatedMinutes: 45,
    difficulty: 'medium',
    prerequisites: ['ML-05'],
    learningObjectives: [
      'Problem analizi ve decomposition',
      'Algoritma tasarlama',
      'Debugging stratejileri',
      'Kod optimizasyonu'
    ],
    realWorldApplication: 'Problem çözme, programcının en önemli becerisidir. Teknik bilgiden daha değerlidir.',
    skills: ['Problem Solving', 'Algorithms', 'Debugging']
  },
  {
    id: 'ML-16',
    title: 'İletişim Becerileri',
    description: 'Teknik iletişim. Dokümantasyon, sunum, takım içi iletişim ve feedback.',
    phase: 'kesif',
    sdgAlignment: [4, 8],
    estimatedMinutes: 30,
    difficulty: 'easy',
    prerequisites: [],
    learningObjectives: [
      'Etkili teknik dokümantasyon yazma',
      'Sunum hazırlama ve sunma',
      'Aktif dinleme ve feedback verme',
      'Asenkron iletişim araçları'
    ],
    realWorldApplication: 'İletişim, teknik beceriler kadar önemlidir. Takım çalışması ve kariyer gelişimi için kritik.',
    skills: ['Communication', 'Documentation', 'Presentation']
  },
  {
    id: 'ML-17',
    title: 'Takım Çalışması ve İşbirliği',
    description: 'Etkili takım çalışması. Roller, sorumluluklar, conflict resolution ve remote çalışma.',
    phase: 'kesif',
    sdgAlignment: [4, 8, 17],
    estimatedMinutes: 35,
    difficulty: 'easy',
    prerequisites: [],
    learningObjectives: [
      'Takım dinamikleri ve roller',
      'Etkili işbirliği stratejileri',
      'Çatışma yönetimi',
      'Remote takım çalışması'
    ],
    realWorldApplication: 'Modern iş dünyası takım çalışmasına dayanır. Soft skills, technical skills kadar değerlidir.',
    skills: ['Teamwork', 'Collaboration', 'Conflict Resolution']
  },
  {
    id: 'ML-18',
    title: 'Proje Yönetimi Temelleri',
    description: 'Proje planlama ve yürütme. Timeline, resource management, risk yönetimi.',
    phase: 'kesif',
    sdgAlignment: [4, 8, 9],
    estimatedMinutes: 40,
    difficulty: 'easy',
    prerequisites: ['ML-14'],
    learningObjectives: [
      'Proje yaşam döngüsü',
      'Proje planlama ve scheduling',
      'Resource ve risk yönetimi',
      'Proje takibi ve raporlama'
    ],
    realWorldApplication: 'Proje yönetimi, her sektörde gerekli bir beceridir. Organize çalışma ve hedeflere ulaşma.',
    skills: ['Project Management', 'Planning', 'Risk Management']
  },
  {
    id: 'ML-19',
    title: 'SDG ve Teknoloji',
    description: 'Sürdürülebilir kalkınma hedefleri. Teknoloji ile sosyal etki yaratma.',
    phase: 'kesif',
    sdgAlignment: [4, 9, 11, 13, 17],
    estimatedMinutes: 30,
    difficulty: 'easy',
    prerequisites: [],
    learningObjectives: [
      '17 SDG hedefini anlama',
      'Teknoloji ile sosyal etki örnekleri',
      'Sürdürülebilir proje tasarlama',
      'Etki ölçümleme'
    ],
    realWorldApplication: 'SDG\'ler, küresel sorunlara çözüm için yol haritasıdır. Teknoloji, bu hedeflere ulaşmada güçlü bir araçtır.',
    skills: ['SDG', 'Social Impact', 'Sustainability']
  },
  {
    id: 'ML-20',
    title: 'Etik ve Teknoloji',
    description: 'Dijital etik. Veri gizliliği, AI etiği, dijital haklar ve sorumluluk.',
    phase: 'kesif',
    sdgAlignment: [4, 16],
    estimatedMinutes: 35,
    difficulty: 'easy',
    prerequisites: [],
    learningObjectives: [
      'Teknoloji etiği prensipleri',
      'Veri gizliliği ve GDPR/KVKK',
      'AI ve algoritma etiği',
      'Dijital sorumluluk'
    ],
    realWorldApplication: 'Etik, teknoloji geliştirmede giderek daha önemli. Güvenilir ve sorumlu teknoloji için şart.',
    skills: ['Ethics', 'Privacy', 'Responsible Tech']
  }
];

// İNŞA PHASE (20 modules) - Building & Development
const INSA_MICROLABS: MicroLabDefinition[] = [
  {
    id: 'ML-21',
    title: 'React Temelleri',
    description: 'Modern web uygulamaları. React components, props, state ve hooks.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 65,
    difficulty: 'medium',
    prerequisites: ['ML-04'],
    learningObjectives: [
      'React component yapısı',
      'Props ve state yönetimi',
      'React Hooks (useState, useEffect)',
      'Component lifecycle'
    ],
    realWorldApplication: 'React, Facebook, Netflix, Airbnb gibi dev şirketlerin kullandığı framework. Modern web development\'ın standardı.',
    skills: ['React', 'Frontend', 'Component Architecture']
  },
  {
    id: 'ML-22',
    title: 'Node.js Backend Development',
    description: 'Server-side JavaScript. Express.js ile API geliştirme, middleware ve routing.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 70,
    difficulty: 'medium',
    prerequisites: ['ML-04', 'ML-12'],
    learningObjectives: [
      'Node.js runtime environment',
      'Express.js framework',
      'RESTful API geliştirme',
      'Middleware ve error handling'
    ],
    realWorldApplication: 'Node.js, hızlı ve ölçeklenebilir backend uygulamaları için ideal. LinkedIn, Uber, PayPal kullanıyor.',
    skills: ['Node.js', 'Express', 'Backend', 'API Development']
  },
  {
    id: 'ML-23',
    title: 'SQL İleri Seviye',
    description: 'Karmaşık sorgular. JOIN, subquery, indexing, optimization ve transaction management.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 60,
    difficulty: 'hard',
    prerequisites: ['ML-11'],
    learningObjectives: [
      'Complex JOIN operations',
      'Subqueries ve CTEs',
      'Index ve query optimization',
      'Transaction ve ACID properties'
    ],
    realWorldApplication: 'İleri SQL, büyük veri setleriyle çalışmak için gerekli. Veri analisti ve backend developer için kritik.',
    skills: ['SQL', 'Database Optimization', 'Data Analysis']
  },
  {
    id: 'ML-24',
    title: 'MongoDB ve NoSQL',
    description: 'Document-based veritabanı. MongoDB CRUD operations, aggregation ve schema design.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 55,
    difficulty: 'medium',
    prerequisites: ['ML-11'],
    learningObjectives: [
      'NoSQL vs SQL farkları',
      'MongoDB CRUD operations',
      'Aggregation pipeline',
      'Schema design patterns'
    ],
    realWorldApplication: 'MongoDB, esnek veri modelleri için idealdir. Startup\'lar ve hızlı geliştirme için popüler.',
    skills: ['MongoDB', 'NoSQL', 'Database Design']
  },
  {
    id: 'ML-25',
    title: 'REST API Geliştirme',
    description: 'Professional API design. Authentication, validation, error handling ve documentation.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 65,
    difficulty: 'medium',
    prerequisites: ['ML-22'],
    learningObjectives: [
      'RESTful API design principles',
      'Authentication ve authorization',
      'Input validation',
      'API documentation (Swagger)'
    ],
    realWorldApplication: 'API\'ler, modern uygulamaların omurgasıdır. Mobil app, web app, IoT - hepsi API kullanır.',
    skills: ['API Design', 'REST', 'Authentication']
  },
  {
    id: 'ML-26',
    title: 'Frontend Framework Derinlemesine',
    description: 'Advanced React patterns. Context API, custom hooks, performance optimization.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 70,
    difficulty: 'hard',
    prerequisites: ['ML-21'],
    learningObjectives: [
      'Context API ve global state',
      'Custom hooks oluşturma',
      'Performance optimization',
      'Code splitting ve lazy loading'
    ],
    realWorldApplication: 'Advanced React, büyük ölçekli uygulamalar için gerekli. Enterprise projelerinde kullanılır.',
    skills: ['React Advanced', 'Performance', 'State Management']
  },
  {
    id: 'ML-27',
    title: 'Responsive Tasarım İleri',
    description: 'Mobile-first design. CSS Grid, Flexbox mastery, animations ve accessibility.',
    phase: 'insa',
    sdgAlignment: [4, 9, 10],
    estimatedMinutes: 55,
    difficulty: 'medium',
    prerequisites: ['ML-03'],
    learningObjectives: [
      'Mobile-first approach',
      'CSS Grid ve Flexbox mastery',
      'CSS animations ve transitions',
      'Accessibility (WCAG) standards'
    ],
    realWorldApplication: 'Responsive design, mobil kullanımın %60\'ı geçtiği dünyada zorunludur. Her cihazda mükemmel deneyim.',
    skills: ['Responsive Design', 'CSS Advanced', 'Accessibility']
  },
  {
    id: 'ML-28',
    title: 'Figma ile Profesyonel Tasarım',
    description: 'Design systems. Components, variants, auto-layout ve design tokens.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 60,
    difficulty: 'medium',
    prerequisites: ['ML-09'],
    learningObjectives: [
      'Design system oluşturma',
      'Component ve variant kullanımı',
      'Auto-layout mastery',
      'Design tokens ve handoff'
    ],
    realWorldApplication: 'Design systems, büyük ekiplerde tutarlılık sağlar. Google, Apple, Microsoft hepsi kullanıyor.',
    skills: ['Figma Advanced', 'Design Systems', 'UI Design']
  },
  {
    id: 'ML-29',
    title: 'Veri Görselleştirme',
    description: 'Data storytelling. Chart.js, D3.js ile interaktif grafikler ve dashboard\'lar.',
    phase: 'insa',
    sdgAlignment: [4, 9, 11],
    estimatedMinutes: 60,
    difficulty: 'medium',
    prerequisites: ['ML-06', 'ML-04'],
    learningObjectives: [
      'Veri görselleştirme prensipleri',
      'Chart.js ile grafikler',
      'D3.js temelleri',
      'İnteraktif dashboard oluşturma'
    ],
    realWorldApplication: 'Veri görselleştirme, karmaşık verileri anlaşılır hale getirir. Business intelligence ve analytics için kritik.',
    skills: ['Data Visualization', 'Chart.js', 'D3.js']
  },
  {
    id: 'ML-30',
    title: 'Machine Learning Giriş',
    description: 'AI temelleri. Supervised learning, model training ve scikit-learn.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 75,
    difficulty: 'hard',
    prerequisites: ['ML-05', 'ML-06'],
    learningObjectives: [
      'Machine learning kavramları',
      'Supervised vs unsupervised learning',
      'Scikit-learn ile model training',
      'Model evaluation ve metrics'
    ],
    realWorldApplication: 'ML, öneri sistemlerinden fraud detection\'a kadar her yerde. Geleceğin en önemli becerisi.',
    skills: ['Machine Learning', 'Python', 'Scikit-learn']
  }
];

// Add remaining İNŞA modules and ETKİ modules...
// Continuing with comprehensive content

export const ALL_MICROLABS_COMPLETE = [
  ...KESIF_MICROLABS,
  ...KESIF_MICROLABS_PART2,
  ...INSA_MICROLABS
];

// Continue İNŞA PHASE (10 more modules)
const INSA_MICROLABS_PART2: MicroLabDefinition[] = [
  {
    id: 'ML-31',
    title: 'Python İleri Seviye',
    description: 'Advanced Python. OOP, decorators, generators ve async programming.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 65,
    difficulty: 'hard',
    prerequisites: ['ML-05'],
    learningObjectives: ['OOP principles', 'Decorators ve generators', 'Async/await', 'Context managers'],
    realWorldApplication: 'İleri Python, profesyonel yazılım geliştirme için gerekli. Clean code ve best practices.',
    skills: ['Python Advanced', 'OOP', 'Async Programming']
  },
  {
    id: 'ML-32',
    title: 'Web Güvenliği',
    description: 'Secure coding. OWASP Top 10, XSS, CSRF, SQL injection prevention.',
    phase: 'insa',
    sdgAlignment: [4, 16],
    estimatedMinutes: 55,
    difficulty: 'medium',
    prerequisites: ['ML-22'],
    learningObjectives: ['OWASP Top 10', 'XSS ve CSRF prevention', 'SQL injection', 'Secure authentication'],
    realWorldApplication: 'Web güvenliği, kullanıcı verilerini korur. Her developer\'ın bilmesi gereken temel.',
    skills: ['Web Security', 'OWASP', 'Secure Coding']
  },
  {
    id: 'ML-33',
    title: 'DevOps Temelleri',
    description: 'CI/CD pipeline. Docker, deployment ve monitoring.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 70,
    difficulty: 'hard',
    prerequisites: ['ML-13'],
    learningObjectives: ['CI/CD concepts', 'Docker containers', 'Deployment strategies', 'Monitoring ve logging'],
    realWorldApplication: 'DevOps, hızlı ve güvenilir yazılım teslimatı sağlar. Modern development\'ın vazgeçilmezi.',
    skills: ['DevOps', 'Docker', 'CI/CD']
  },
  {
    id: 'ML-34',
    title: 'Docker ve Konteynerler',
    description: 'Containerization. Docker images, volumes, networks ve docker-compose.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 60,
    difficulty: 'medium',
    prerequisites: ['ML-33'],
    learningObjectives: ['Docker architecture', 'Images ve containers', 'Volumes ve networks', 'Docker Compose'],
    realWorldApplication: 'Docker, uygulamaları her yerde aynı şekilde çalıştırır. "Works on my machine" problemini çözer.',
    skills: ['Docker', 'Containerization', 'Infrastructure']
  },
  {
    id: 'ML-35',
    title: 'Cloud Computing AWS',
    description: 'Cloud fundamentals. EC2, S3, Lambda ve serverless architecture.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 75,
    difficulty: 'hard',
    prerequisites: ['ML-33'],
    learningObjectives: ['Cloud computing concepts', 'AWS core services', 'Serverless architecture', 'Cost optimization'],
    realWorldApplication: 'Cloud, modern uygulamaların %95\'i cloud\'da çalışıyor. Ölçeklenebilirlik ve maliyet avantajı.',
    skills: ['AWS', 'Cloud Computing', 'Serverless']
  },
  {
    id: 'ML-36',
    title: 'Mikroservis Mimarisi',
    description: 'Distributed systems. Microservices patterns, API gateway ve service mesh.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 70,
    difficulty: 'hard',
    prerequisites: ['ML-22', 'ML-33'],
    learningObjectives: ['Microservices architecture', 'Service communication', 'API gateway', 'Distributed tracing'],
    realWorldApplication: 'Mikroservisler, büyük ölçekli uygulamalar için idealdir. Netflix, Amazon, Uber kullanıyor.',
    skills: ['Microservices', 'Distributed Systems', 'Architecture']
  },
  {
    id: 'ML-37',
    title: 'Test Driven Development',
    description: 'TDD methodology. Unit tests, integration tests ve test automation.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 60,
    difficulty: 'medium',
    prerequisites: ['ML-22'],
    learningObjectives: ['TDD principles', 'Unit testing', 'Integration testing', 'Test automation'],
    realWorldApplication: 'TDD, kod kalitesini artırır ve bug\'ları azaltır. Profesyonel development\'ın standardı.',
    skills: ['TDD', 'Testing', 'Quality Assurance']
  },
  {
    id: 'ML-38',
    title: 'Code Review ve Best Practices',
    description: 'Clean code. Code review, refactoring ve SOLID principles.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 50,
    difficulty: 'medium',
    prerequisites: ['ML-13'],
    learningObjectives: ['Clean code principles', 'Code review best practices', 'Refactoring techniques', 'SOLID principles'],
    realWorldApplication: 'Clean code, maintainability ve team collaboration için kritik. Uzun vadeli proje başarısı.',
    skills: ['Clean Code', 'Code Review', 'Best Practices']
  },
  {
    id: 'ML-39',
    title: 'Performance Optimization',
    description: 'Speed matters. Frontend ve backend performance optimization teknikleri.',
    phase: 'insa',
    sdgAlignment: [4, 9],
    estimatedMinutes: 65,
    difficulty: 'hard',
    prerequisites: ['ML-21', 'ML-22'],
    learningObjectives: ['Performance metrics', 'Frontend optimization', 'Backend optimization', 'Caching strategies'],
    realWorldApplication: 'Performance, kullanıcı deneyimini doğrudan etkiler. 1 saniye yavaşlama %7 conversion kaybı.',
    skills: ['Performance', 'Optimization', 'Caching']
  },
  {
    id: 'ML-40',
    title: 'Portfolio Hazırlama',
    description: 'Kendini pazarla. GitHub portfolio, kişisel website ve LinkedIn optimization.',
    phase: 'insa',
    sdgAlignment: [4, 8],
    estimatedMinutes: 45,
    difficulty: 'easy',
    prerequisites: ['ML-02', 'ML-13'],
    learningObjectives: ['GitHub portfolio oluşturma', 'Kişisel website', 'LinkedIn optimization', 'Project showcase'],
    realWorldApplication: 'Portfolio, iş başvurularında fark yaratır. Becerilerini görsel olarak sergile.',
    skills: ['Portfolio', 'Personal Branding', 'Career Development']
  }
];

// ETKİ PHASE (10 modules) - Impact & Graduation
const ETKI_MICROLABS: MicroLabDefinition[] = [
  {
    id: 'ML-41',
    title: 'Capstone Proje Planlama',
    description: 'Bitirme projesi. Problem tanımlama, scope belirleme ve timeline oluşturma.',
    phase: 'etki',
    sdgAlignment: [4, 9, 11, 13, 17],
    estimatedMinutes: 60,
    difficulty: 'medium',
    prerequisites: ['ML-18'],
    learningObjectives: ['Problem definition', 'Scope ve requirements', 'Project timeline', 'Resource planning'],
    realWorldApplication: 'Capstone, öğrendiklerini gerçek bir projede uygulama fırsatı. Portfolio\'nun yıldızı.',
    skills: ['Project Planning', 'Problem Solving', 'Capstone']
  },
  {
    id: 'ML-42',
    title: 'Eskişehir Veri Analizi',
    description: 'Yerel veri ile çalış. Eskişehir şehir verileri analizi ve görselleştirme.',
    phase: 'etki',
    sdgAlignment: [11, 13],
    estimatedMinutes: 90,
    difficulty: 'hard',
    prerequisites: ['ML-06', 'ML-29'],
    learningObjectives: ['Gerçek veri analizi', 'Veri temizleme', 'İstatistiksel analiz', 'Insight çıkarma'],
    realWorldApplication: 'Yerel veri analizi, şehir yönetimi ve politika geliştirme için değerli. Sosyal etki yaratma.',
    skills: ['Data Analysis', 'Real-world Data', 'Social Impact']
  },
  {
    id: 'ML-43',
    title: 'Sosyal Etki Ölçümü',
    description: 'Impact measurement. KPI\'lar, metrics ve sosyal etki raporlama.',
    phase: 'etki',
    sdgAlignment: [4, 9, 11, 13, 17],
    estimatedMinutes: 50,
    difficulty: 'medium',
    prerequisites: ['ML-19'],
    learningObjectives: ['Impact metrics', 'KPI definition', 'Data collection', 'Impact reporting'],
    realWorldApplication: 'Sosyal etki ölçümü, projelerin değerini gösterir. Fon sağlama ve sürdürülebilirlik için kritik.',
    skills: ['Impact Measurement', 'KPIs', 'Reporting']
  },
  {
    id: 'ML-44',
    title: 'Startup Temelleri',
    description: 'Girişimcilik. Business model, MVP, customer discovery ve fundraising.',
    phase: 'etki',
    sdgAlignment: [8, 9],
    estimatedMinutes: 70,
    difficulty: 'medium',
    prerequisites: ['ML-07'],
    learningObjectives: ['Business model canvas', 'MVP development', 'Customer discovery', 'Fundraising basics'],
    realWorldApplication: 'Startup bilgisi, kendi işini kurmak veya startup\'ta çalışmak için gerekli. İnovasyon ve girişimcilik.',
    skills: ['Entrepreneurship', 'Business Model', 'Startup']
  },
  {
    id: 'ML-45',
    title: 'Pitch ve Sunum Teknikleri',
    description: 'Etkili sunum. Storytelling, slide design ve demo day hazırlığı.',
    phase: 'etki',
    sdgAlignment: [4, 8],
    estimatedMinutes: 55,
    difficulty: 'medium',
    prerequisites: ['ML-16'],
    learningObjectives: ['Storytelling', 'Slide design', 'Presentation delivery', 'Q&A handling'],
    realWorldApplication: 'Sunum becerisi, fikirleri satmak için gerekli. İş görüşmeleri, investor pitch, konferanslar.',
    skills: ['Presentation', 'Storytelling', 'Public Speaking']
  },
  {
    id: 'ML-46',
    title: 'İş Modeli Geliştirme',
    description: 'Sustainable business. Revenue streams, cost structure ve value proposition.',
    phase: 'etki',
    sdgAlignment: [8, 9],
    estimatedMinutes: 60,
    difficulty: 'medium',
    prerequisites: ['ML-44'],
    learningObjectives: ['Business model canvas', 'Revenue models', 'Cost structure', 'Value proposition'],
    realWorldApplication: 'İş modeli, projenin sürdürülebilirliğini sağlar. Kar etmeden sosyal etki sürdürülemez.',
    skills: ['Business Model', 'Strategy', 'Sustainability']
  },
  {
    id: 'ML-47',
    title: 'Pazarlama Stratejileri',
    description: 'Digital marketing. SEO, social media, content marketing ve analytics.',
    phase: 'etki',
    sdgAlignment: [8, 9],
    estimatedMinutes: 65,
    difficulty: 'medium',
    prerequisites: ['ML-44'],
    learningObjectives: ['Digital marketing channels', 'SEO basics', 'Social media strategy', 'Marketing analytics'],
    realWorldApplication: 'Pazarlama, en iyi ürün bile pazarlanmazsa başarısız olur. Kullanıcı kazanımı ve büyüme.',
    skills: ['Digital Marketing', 'SEO', 'Social Media']
  },
  {
    id: 'ML-48',
    title: 'Finansal Planlama',
    description: 'Money matters. Budget, cash flow, financial projections.',
    phase: 'etki',
    sdgAlignment: [8, 9],
    estimatedMinutes: 55,
    difficulty: 'medium',
    prerequisites: ['ML-44'],
    learningObjectives: ['Budget planning', 'Cash flow management', 'Financial projections', 'Funding options'],
    realWorldApplication: 'Finansal planlama, projelerin hayatta kalması için kritik. Para yönetimi ve sürdürülebilirlik.',
    skills: ['Financial Planning', 'Budgeting', 'Cash Flow']
  },
  {
    id: 'ML-49',
    title: 'Liderlik Becerileri',
    description: 'Lead by example. Team leadership, motivation ve decision making.',
    phase: 'etki',
    sdgAlignment: [4, 8],
    estimatedMinutes: 50,
    difficulty: 'medium',
    prerequisites: ['ML-17'],
    learningObjectives: ['Leadership styles', 'Team motivation', 'Decision making', 'Conflict resolution'],
    realWorldApplication: 'Liderlik, kariyer ilerlemesi için gerekli. Takım yönetimi ve organizasyonel başarı.',
    skills: ['Leadership', 'Management', 'Decision Making']
  },
  {
    id: 'ML-50',
    title: 'Mezuniyet Hazırlığı',
    description: 'Next steps. Kariyer planlama, iş başvuruları ve network building.',
    phase: 'etki',
    sdgAlignment: [4, 8],
    estimatedMinutes: 45,
    difficulty: 'easy',
    prerequisites: ['ML-40'],
    learningObjectives: ['Kariyer planlama', 'İş başvuru stratejileri', 'Mülakat hazırlığı', 'Network building'],
    realWorldApplication: 'Mezuniyet, yeni bir başlangıç. Kariyer hedeflerine ulaşmak için stratejik planlama.',
    skills: ['Career Planning', 'Job Search', 'Networking']
  }
];

// Export all 50+ modules
export const ALL_MICROLABS_FINAL = [
  ...KESIF_MICROLABS,
  ...KESIF_MICROLABS_PART2,
  ...INSA_MICROLABS,
  ...INSA_MICROLABS_PART2,
  ...ETKI_MICROLABS
];

console.log(`📚 Total MicroLabs: ${ALL_MICROLABS_FINAL.length}`);
console.log(`   - Keşif: ${KESIF_MICROLABS.length + KESIF_MICROLABS_PART2.length}`);
console.log(`   - İnşa: ${INSA_MICROLABS.length + INSA_MICROLABS_PART2.length}`);
console.log(`   - Etki: ${ETKI_MICROLABS.length}`);