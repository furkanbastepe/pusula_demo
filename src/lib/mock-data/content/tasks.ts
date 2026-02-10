// Comprehensive Challenge/Task Library - 40+ Professional Assignments
// Aligned with UNDP SDGs and real-world applications for Eskişehir context

export interface TaskDefinition {
  id: string;
  title: string;
  description: string;
  phase: 'kesif' | 'insa' | 'etki';
  difficulty: 'easy' | 'med' | 'hard';
  estimatedHours: number;
  xpReward: number;
  sdgImpact: {
    primarySDG: number;
    secondarySDGs: number[];
    impactDescription: string;
    measurableOutcomes: string[];
  };
  deliverables: Array<{
    type: 'document' | 'code' | 'design' | 'presentation' | 'video' | 'prototype';
    title: string;
    description: string;
    required: boolean;
    format: string[];
  }>;
  collaborationLevel: 'individual' | 'pair' | 'team';
  realWorldContext: string;
  prerequisites: string[];
  hints: string[];
  mandatoryEvidence: string[];
  skills: string[];
}

// KEŞIF PHASE (15 challenges) - Foundation Projects
export const KESIF_TASKS: TaskDefinition[] = [
  {
    id: 'T-01',
    title: 'Dijital Kimlik: Kişisel Web Sayfası',
    description: 'HTML, CSS ve JavaScript kullanarak kendini tanıtan, responsive bir kişisel web sayfası oluştur. Portfolyo temelini at.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 8,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 4,
      secondarySDGs: [8],
      impactDescription: 'Dijital okuryazarlık ve kişisel marka oluşturma becerilerini geliştir',
      measurableOutcomes: ['Web teknolojileri bilgisi', 'Kişisel portfolyo', 'Online varlık']
    },
    deliverables: [
      { type: 'code', title: 'Web Sayfası Kodu', description: 'HTML, CSS, JS dosyaları', required: true, format: ['github'] },
      { type: 'presentation', title: 'Canlı Demo', description: 'Yayınlanmış web sayfası', required: true, format: ['url'] },
      { type: 'document', title: 'Tasarım Kararları', description: 'Neden bu tasarımı seçtin?', required: false, format: ['md', 'pdf'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Profesyonel dünyada kişisel web sayfası, dijital kartvizit görevi görür. İş başvurularında fark yaratır.',
    prerequisites: [],
    hints: [
      'Semantic HTML kullan (header, nav, main, footer)',
      'Mobile-first yaklaşımla tasarla',
      'GitHub Pages ile ücretsiz yayınlayabilirsin'
    ],
    mandatoryEvidence: ['Canlı web sayfası URL', 'GitHub repository linki', 'Responsive tasarım ekran görüntüleri'],
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Git']
  },
  {
    id: 'T-02',
    title: 'Eskişehir Hava Durumu Dashboard',
    description: 'Hava durumu API kullanarak Eskişehir için gerçek zamanlı hava durumu gösterimi yapan bir dashboard oluştur.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 10,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 13,
      secondarySDGs: [11],
      impactDescription: 'İklim verilerini görselleştirerek farkındalık yaratma',
      measurableOutcomes: ['API entegrasyonu', 'Veri görselleştirme', 'Yerel iklim bilinci']
    },
    deliverables: [
      { type: 'code', title: 'Dashboard Kodu', description: 'API entegrasyonlu uygulama', required: true, format: ['github'] },
      { type: 'presentation', title: 'Canlı Demo', description: 'Çalışan dashboard', required: true, format: ['url'] },
      { type: 'document', title: 'API Dokümantasyonu', description: 'Kullanılan API ve veri yapısı', required: true, format: ['md'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Eskişehir\'de iklim değişikliği etkileri gözlemleniyor. Veri görselleştirme, toplumsal farkındalık yaratır.',
    prerequisites: ['ML-04', 'ML-12'],
    hints: [
      'OpenWeatherMap API ücretsiz kullanılabilir',
      'Async/await ile API çağrıları yap',
      'Hata durumlarını yönet (API down, network error)'
    ],
    mandatoryEvidence: ['Çalışan dashboard URL', 'API key yönetimi açıklaması', 'Hata yönetimi ekran görüntüsü'],
    skills: ['JavaScript', 'API Integration', 'Async Programming', 'Data Visualization']
  },
  {
    id: 'T-03',
    title: 'STK Logo ve Kimlik Tasarımı',
    description: 'Eskişehir\'deki bir STK için logo, renk paleti ve temel kimlik tasarımı yap. Figma kullanarak profesyonel sunum hazırla.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 12,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 17,
      secondarySDGs: [11],
      impactDescription: 'Yerel STK\'ların görünürlüğünü artırarak toplumsal etkiyi güçlendirme',
      measurableOutcomes: ['Tasarım becerileri', 'STK desteği', 'Marka kimliği oluşturma']
    },
    deliverables: [
      { type: 'design', title: 'Logo Tasarımı', description: 'Vektörel logo dosyaları', required: true, format: ['figma', 'svg', 'png'] },
      { type: 'document', title: 'Marka Kılavuzu', description: 'Renk, tipografi, kullanım kuralları', required: true, format: ['pdf'] },
      { type: 'presentation', title: 'Tasarım Sunumu', description: 'Tasarım sürecini anlat', required: true, format: ['pdf', 'video'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Eskişehir\'de 200+ STK faaliyet gösteriyor. Profesyonel kimlik, güvenilirlik ve erişim sağlar.',
    prerequisites: ['ML-09'],
    hints: [
      'STK\'nın misyon ve vizyonunu anla',
      'Renk psikolojisini araştır',
      'Basit ve akılda kalıcı tasarla'
    ],
    mandatoryEvidence: ['Figma dosya linki', 'Logo varyasyonları (renkli, siyah-beyaz)', 'Marka kılavuzu PDF'],
    skills: ['Figma', 'Logo Design', 'Brand Identity', 'Visual Communication']
  },
  {
    id: 'T-04',
    title: 'Python ile Veri Analizi: Eskişehir Nüfus Trendleri',
    description: 'TÜİK verilerini kullanarak Eskişehir nüfus değişimlerini analiz et ve görselleştir. Pandas ve Matplotlib kullan.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 10,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 11,
      secondarySDGs: [4],
      impactDescription: 'Şehir planlaması için veri odaklı içgörüler sağlama',
      measurableOutcomes: ['Veri analizi becerileri', 'Yerel veri kullanımı', 'İstatistiksel düşünme']
    },
    deliverables: [
      { type: 'code', title: 'Analiz Notebook', description: 'Jupyter notebook ile analiz', required: true, format: ['ipynb', 'github'] },
      { type: 'document', title: 'Analiz Raporu', description: 'Bulgular ve öneriler', required: true, format: ['pdf', 'md'] },
      { type: 'presentation', title: 'Görselleştirmeler', description: 'Grafikler ve chartlar', required: true, format: ['png', 'pdf'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Eskişehir genç nüfus oranı yüksek bir şehir. Veri analizi, şehir planlaması kararlarını destekler.',
    prerequisites: ['ML-05', 'ML-06'],
    hints: [
      'TÜİK açık veri portalını kullan',
      'Pandas ile veri temizleme yap',
      'Matplotlib/Seaborn ile görselleştir'
    ],
    mandatoryEvidence: ['Jupyter notebook linki', 'En az 3 farklı görselleştirme', 'Analiz raporu PDF'],
    skills: ['Python', 'Pandas', 'Data Analysis', 'Data Visualization', 'Statistics']
  },
  {
    id: 'T-05',
    title: 'Responsive Blog Sitesi',
    description: 'Kişisel blog sitesi oluştur. Yazı ekleme, kategori, arama ve responsive tasarım özellikleri olsun.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 15,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 4,
      secondarySDGs: [9],
      impactDescription: 'Dijital içerik üretimi ve bilgi paylaşımı becerileri geliştirme',
      measurableOutcomes: ['Web development', 'İçerik yönetimi', 'SEO bilgisi']
    },
    deliverables: [
      { type: 'code', title: 'Blog Kodu', description: 'Full stack blog uygulaması', required: true, format: ['github'] },
      { type: 'presentation', title: 'Canlı Site', description: 'Yayınlanmış blog', required: true, format: ['url'] },
      { type: 'document', title: 'Özellik Dokümantasyonu', description: 'Teknik özellikler', required: false, format: ['md'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Blog, kişisel marka ve düşünce liderliği için güçlü araç. Yazılım geliştiriciler için portfolyo değeri yüksek.',
    prerequisites: ['ML-02', 'ML-03', 'ML-04'],
    hints: [
      'Static site generator kullanabilirsin (Jekyll, Hugo)',
      'Markdown ile yazı yazma kolaylığı sağla',
      'SEO için meta tags ekle'
    ],
    mandatoryEvidence: ['Canlı blog URL', 'En az 3 blog yazısı', 'Responsive tasarım kanıtı'],
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'SEO']
  },
  {
    id: 'T-06',
    title: 'Kullanıcı Araştırması: DiGEM Deneyimi',
    description: 'DiGEM kullanıcılarıyla mülakat yap, anket düzenle ve kullanıcı deneyimi raporu hazırla.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 12,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 4,
      secondarySDGs: [11],
      impactDescription: 'Kullanıcı odaklı tasarım ile eğitim kalitesini artırma',
      measurableOutcomes: ['UX research becerileri', 'Empati geliştirme', 'Veri toplama']
    },
    deliverables: [
      { type: 'document', title: 'Araştırma Raporu', description: 'Bulgular ve öneriler', required: true, format: ['pdf'] },
      { type: 'document', title: 'Kullanıcı Personaları', description: '3-5 persona', required: true, format: ['pdf', 'figma'] },
      { type: 'presentation', title: 'Sunum', description: 'Bulgular sunumu', required: true, format: ['pdf', 'pptx'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'DiGEM\'in başarısı, kullanıcı ihtiyaçlarını anlamaya bağlı. UX research, ürün geliştirmenin temelidir.',
    prerequisites: ['ML-08'],
    hints: ['En az 10 kişiyle görüş', 'Açık uçlu sorular sor', 'Gözlem notları tut'],
    mandatoryEvidence: ['Araştırma raporu PDF', 'Persona görselleri', 'Anket sonuçları'],
    skills: ['User Research', 'Interviewing', 'Data Analysis', 'Persona Creation']
  },
  {
    id: 'T-07',
    title: 'Git ve GitHub Workflow Projesi',
    description: 'Takım arkadaşınla birlikte Git kullanarak ortak bir proje geliştir. Branch, merge, pull request süreçlerini uygula.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 8,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 17,
      secondarySDGs: [9],
      impactDescription: 'İşbirlikçi yazılım geliştirme kültürü oluşturma',
      measurableOutcomes: ['Versiyon kontrolü', 'Takım çalışması', 'Kod review']
    },
    deliverables: [
      { type: 'code', title: 'Ortak Repository', description: 'En az 10 commit, 3 branch', required: true, format: ['github'] },
      { type: 'document', title: 'Workflow Dokümantasyonu', description: 'Süreç açıklaması', required: true, format: ['md'] },
      { type: 'document', title: 'Code Review Örnekleri', description: 'Pull request yorumları', required: false, format: ['screenshot'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'Git, yazılım dünyasının standart aracı. Takım çalışması için vazgeçilmez.',
    prerequisites: ['ML-13'],
    hints: ['Feature branch workflow kullan', 'Anlamlı commit mesajları yaz', 'Pull request\'lerde detaylı açıklama yap'],
    mandatoryEvidence: ['GitHub repository URL', 'Branch history', 'Pull request örnekleri'],
    skills: ['Git', 'GitHub', 'Collaboration', 'Code Review']
  },
  {
    id: 'T-08',
    title: 'Basit Hesap Makinesi Uygulaması',
    description: 'JavaScript ile tam özellikli hesap makinesi yap. Temel işlemler, hafıza, geçmiş özellikleri ekle.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 10,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 4,
      secondarySDGs: [],
      impactDescription: 'Programlama mantığı ve problem çözme becerileri geliştirme',
      measurableOutcomes: ['JavaScript yetkinliği', 'UI/UX tasarımı', 'Test yazma']
    },
    deliverables: [
      { type: 'code', title: 'Hesap Makinesi Kodu', description: 'HTML, CSS, JS', required: true, format: ['github'] },
      { type: 'presentation', title: 'Canlı Demo', description: 'Çalışan uygulama', required: true, format: ['url'] },
      { type: 'document', title: 'Test Senaryoları', description: 'Manuel test dokümantasyonu', required: false, format: ['md'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Hesap makinesi, programlama mantığını öğrenmek için klasik proje. State management ve event handling pratiği.',
    prerequisites: ['ML-04'],
    hints: ['State management için object kullan', 'Edge case\'leri düşün (0\'a bölme)', 'Keyboard desteği ekle'],
    mandatoryEvidence: ['Çalışan uygulama URL', 'Tüm işlemlerin çalıştığı video', 'GitHub repository'],
    skills: ['JavaScript', 'DOM Manipulation', 'Event Handling', 'State Management']
  },
  {
    id: 'T-09',
    title: 'Eskişehir Ulaşım Haritası',
    description: 'Eskişehir tramvay ve otobüs hatlarını gösteren interaktif harita oluştur. Leaflet.js kullan.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 14,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 11,
      secondarySDGs: [9],
      impactDescription: 'Sürdürülebilir ulaşım bilincini artırma ve erişilebilirliği iyileştirme',
      measurableOutcomes: ['Harita API kullanımı', 'Yerel veri entegrasyonu', 'Kullanıcı deneyimi']
    },
    deliverables: [
      { type: 'code', title: 'Harita Uygulaması', description: 'İnteraktif web haritası', required: true, format: ['github'] },
      { type: 'presentation', title: 'Canlı Demo', description: 'Yayınlanmış harita', required: true, format: ['url'] },
      { type: 'document', title: 'Veri Kaynakları', description: 'Kullanılan veriler', required: true, format: ['md'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Eskişehir tramvay sistemi Türkiye\'nin en uzun tramvay hattına sahip. Toplu taşıma bilgisi, sürdürülebilir ulaşımı destekler.',
    prerequisites: ['ML-04', 'ML-12'],
    hints: ['Leaflet.js ücretsiz ve kolay', 'GeoJSON formatında veri kullan', 'Durak bilgilerini popup\'ta göster'],
    mandatoryEvidence: ['Çalışan harita URL', 'En az 10 durak işaretli', 'Mobil uyumlu tasarım'],
    skills: ['JavaScript', 'Leaflet.js', 'GeoJSON', 'Map APIs']
  },
  {
    id: 'T-10',
    title: 'Kişisel Finans Takip Uygulaması',
    description: 'Gelir-gider takibi yapan basit bir web uygulaması. LocalStorage ile veri saklama.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 12,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 8,
      secondarySDGs: [1],
      impactDescription: 'Finansal okuryazarlık ve kişisel finans yönetimi becerileri geliştirme',
      measurableOutcomes: ['CRUD operations', 'Data persistence', 'Finansal planlama bilinci']
    },
    deliverables: [
      { type: 'code', title: 'Finans Uygulaması', description: 'Full CRUD functionality', required: true, format: ['github'] },
      { type: 'presentation', title: 'Canlı Demo', description: 'Çalışan uygulama', required: true, format: ['url'] },
      { type: 'document', title: 'Kullanım Kılavuzu', description: 'Özellikler ve kullanım', required: false, format: ['md'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Finansal okuryazarlık, gençler için kritik beceri. Kişisel finans yönetimi, ekonomik bağımsızlığın temelidir.',
    prerequisites: ['ML-04'],
    hints: ['LocalStorage API kullan', 'Kategori bazlı raporlama ekle', 'Grafik ile görselleştir'],
    mandatoryEvidence: ['Çalışan uygulama URL', 'CRUD işlemleri videosu', 'Veri persistence kanıtı'],
    skills: ['JavaScript', 'LocalStorage', 'CRUD', 'Data Visualization']
  },
  {
    id: 'T-11',
    title: 'Sosyal Medya Analiz Aracı',
    description: 'Twitter/X API kullanarak belirli hashtag\'leri analiz eden araç. Sentiment analysis ve trend görselleştirme.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 14,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 16,
      secondarySDGs: [9],
      impactDescription: 'Dijital okuryazarlık ve bilgi doğrulama becerileri geliştirme',
      measurableOutcomes: ['API kullanımı', 'Veri analizi', 'Sosyal medya bilinci']
    },
    deliverables: [
      { type: 'code', title: 'Analiz Aracı', description: 'Python veya JavaScript', required: true, format: ['github'] },
      { type: 'document', title: 'Analiz Raporu', description: 'Örnek analiz sonuçları', required: true, format: ['pdf'] },
      { type: 'presentation', title: 'Bulgular Sunumu', description: 'Görselleştirmeler', required: true, format: ['pdf'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'Sosyal medya analizi, marka yönetimi ve toplumsal trendleri anlamak için kullanılır.',
    prerequisites: ['ML-05', 'ML-12'],
    hints: ['Twitter API v2 kullan', 'Rate limiting\'e dikkat et', 'Basit sentiment analysis için keyword matching yeterli'],
    mandatoryEvidence: ['Çalışan kod', 'En az 100 tweet analizi', 'Görselleştirme grafikleri'],
    skills: ['Python', 'API Integration', 'Data Analysis', 'NLP Basics']
  },
  {
    id: 'T-12',
    title: 'Erişilebilir Web Sitesi Denetimi',
    description: 'Bir web sitesini WCAG standartlarına göre denetle. Erişilebilirlik sorunlarını tespit et ve çözüm öner.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 10,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 10,
      secondarySDGs: [4],
      impactDescription: 'Dijital erişilebilirlik ve kapsayıcılık bilincini artırma',
      measurableOutcomes: ['Accessibility bilgisi', 'Inclusive design', 'WCAG standartları']
    },
    deliverables: [
      { type: 'document', title: 'Denetim Raporu', description: 'Tespit edilen sorunlar', required: true, format: ['pdf'] },
      { type: 'code', title: 'Düzeltme Örnekleri', description: 'Before/after kod örnekleri', required: true, format: ['github'] },
      { type: 'presentation', title: 'Erişilebilirlik Sunumu', description: 'Öğrendiklerini paylaş', required: false, format: ['pdf'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Türkiye\'de 8.5 milyon engelli birey var. Erişilebilir web, herkes için eşit erişim sağlar.',
    prerequisites: ['ML-02', 'ML-03'],
    hints: ['WAVE veya axe DevTools kullan', 'Keyboard navigation test et', 'Screen reader ile dene'],
    mandatoryEvidence: ['Denetim raporu', 'En az 10 sorun tespiti', 'Çözüm önerileri'],
    skills: ['Accessibility', 'WCAG', 'HTML', 'Testing']
  },
  {
    id: 'T-13',
    title: 'Basit Quiz Uygulaması',
    description: 'Çoktan seçmeli quiz uygulaması. Skor takibi, zaman sınırı ve sonuç ekranı olsun.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 10,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 4,
      secondarySDGs: [],
      impactDescription: 'Eğitim teknolojileri ve interaktif öğrenme araçları geliştirme',
      measurableOutcomes: ['JavaScript yetkinliği', 'State management', 'UI/UX tasarımı']
    },
    deliverables: [
      { type: 'code', title: 'Quiz Uygulaması', description: 'En az 10 soru', required: true, format: ['github'] },
      { type: 'presentation', title: 'Canlı Demo', description: 'Çalışan uygulama', required: true, format: ['url'] },
      { type: 'document', title: 'Soru Bankası', description: 'JSON formatında sorular', required: true, format: ['json'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Quiz uygulamaları, eğitim platformlarında yaygın kullanılır. Gamification ile öğrenmeyi eğlenceli hale getirir.',
    prerequisites: ['ML-04'],
    hints: ['Timer için setInterval kullan', 'Soruları JSON\'dan yükle', 'Progress bar ekle'],
    mandatoryEvidence: ['Çalışan quiz URL', 'Skor hesaplama videosu', 'Responsive tasarım'],
    skills: ['JavaScript', 'JSON', 'Timer', 'State Management']
  },
  {
    id: 'T-14',
    title: 'Markdown Blog Generator',
    description: 'Markdown dosyalarını HTML\'e çeviren static site generator. Basit ama işlevsel.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 12,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 4,
      secondarySDGs: [9],
      impactDescription: 'İçerik yönetimi ve web teknolojileri bilgisi geliştirme',
      measurableOutcomes: ['File system operations', 'Template engine', 'Build tools']
    },
    deliverables: [
      { type: 'code', title: 'Generator Kodu', description: 'Node.js script', required: true, format: ['github'] },
      { type: 'presentation', title: 'Örnek Site', description: 'Generate edilmiş site', required: true, format: ['url'] },
      { type: 'document', title: 'Kullanım Dokümantasyonu', description: 'README', required: true, format: ['md'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Static site generator\'lar (Jekyll, Hugo, Gatsby) popüler. Hızlı, güvenli ve SEO dostu siteler oluşturur.',
    prerequisites: ['ML-04', 'ML-05'],
    hints: ['marked.js ile Markdown parse et', 'Template için EJS veya Handlebars kullan', 'fs modülü ile dosya işlemleri'],
    mandatoryEvidence: ['Çalışan generator', 'En az 3 sayfa generate edilmiş', 'README dokümantasyonu'],
    skills: ['Node.js', 'File System', 'Template Engine', 'Markdown']
  },
  {
    id: 'T-15',
    title: 'Takım Çalışması Simülasyonu',
    description: 'Buddy\'nle birlikte Agile/Scrum metodolojisi kullanarak mini proje yönet. Sprint planning, daily standup, retrospective uygula.',
    phase: 'kesif',
    difficulty: 'easy',
    estimatedHours: 16,
    xpReward: 50,
    sdgImpact: {
      primarySDG: 17,
      secondarySDGs: [8],
      impactDescription: 'İşbirliği ve proje yönetimi becerileri geliştirme',
      measurableOutcomes: ['Agile methodology', 'Takım çalışması', 'Proje yönetimi']
    },
    deliverables: [
      { type: 'document', title: 'Sprint Dokümantasyonu', description: 'Planning, daily notes, retrospective', required: true, format: ['pdf', 'md'] },
      { type: 'code', title: 'Proje Deliverable', description: 'Sprint sonunda tamamlanan özellik', required: true, format: ['github'] },
      { type: 'presentation', title: 'Sprint Review', description: 'Demo ve retrospective sunumu', required: true, format: ['pdf', 'video'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'Agile, yazılım şirketlerinin %90\'ında kullanılır. Takım çalışması ve adaptasyon becerileri kritik.',
    prerequisites: ['ML-14', 'ML-17'],
    hints: ['Trello veya GitHub Projects kullan', '1 haftalık sprint yap', 'Her gün 15 dakika standup'],
    mandatoryEvidence: ['Sprint board ekran görüntüleri', 'Daily standup notları', 'Retrospective raporu'],
    skills: ['Agile', 'Scrum', 'Project Management', 'Collaboration']
  }
];

// İNŞA PHASE (15 challenges) - Advanced Development Projects
export const INSA_TASKS: TaskDefinition[] = [
  {
    id: 'T-16',
    title: 'Full Stack E-Ticaret Platformu',
    description: 'React + Node.js ile tam özellikli e-ticaret sitesi. Ürün listeleme, sepet, ödeme simülasyonu.',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 40,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 8,
      secondarySDGs: [9, 12],
      impactDescription: 'Dijital ekonomi ve sürdürülebilir tüketim platformu geliştirme',
      measurableOutcomes: ['Full stack development', 'E-commerce bilgisi', 'Payment integration']
    },
    deliverables: [
      { type: 'code', title: 'Full Stack Kod', description: 'Frontend + Backend', required: true, format: ['github'] },
      { type: 'presentation', title: 'Canlı Demo', description: 'Deploy edilmiş uygulama', required: true, format: ['url'] },
      { type: 'document', title: 'API Dokümantasyonu', description: 'Endpoint açıklamaları', required: true, format: ['md', 'swagger'] },
      { type: 'video', title: 'Demo Videosu', description: 'Tüm özelliklerin gösterimi', required: true, format: ['mp4', 'youtube'] }
    ],
    collaborationLevel: 'team',
    realWorldContext: 'E-ticaret, Türkiye\'de hızla büyüyor. Full stack beceriler, en çok aranan yetenekler arasında.',
    prerequisites: ['ML-21', 'ML-22', 'ML-23'],
    hints: ['Stripe test mode kullan', 'JWT ile authentication', 'MongoDB veya PostgreSQL', 'Docker ile deploy'],
    mandatoryEvidence: ['Çalışan site URL', 'Sepet ve ödeme akışı videosu', 'API dokümantasyonu', 'GitHub repository'],
    skills: ['React', 'Node.js', 'Express', 'Database', 'Authentication', 'Payment Integration']
  },
  {
    id: 'T-17',
    title: 'Sosyal Medya Platformu MVP',
    description: 'Kullanıcı profilleri, post paylaşımı, beğeni, yorum özellikleri olan mini sosyal platform.',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 35,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 17,
      secondarySDGs: [9],
      impactDescription: 'Dijital topluluk ve iletişim platformu oluşturma',
      measurableOutcomes: ['Social features', 'Real-time updates', 'User engagement']
    },
    deliverables: [
      { type: 'code', title: 'Platform Kodu', description: 'Full stack application', required: true, format: ['github'] },
      { type: 'presentation', title: 'Canlı Platform', description: 'Deploy edilmiş MVP', required: true, format: ['url'] },
      { type: 'document', title: 'Özellik Dokümantasyonu', description: 'User stories ve features', required: true, format: ['md'] }
    ],
    collaborationLevel: 'team',
    realWorldContext: 'Sosyal platformlar, modern iletişimin merkezi. Real-time features ve scalability kritik.',
    prerequisites: ['ML-21', 'ML-22', 'ML-24'],
    hints: ['Socket.io ile real-time', 'Image upload için Cloudinary', 'Infinite scroll ekle', 'Redis ile caching'],
    mandatoryEvidence: ['Çalışan platform URL', 'Real-time özellik videosu', 'En az 3 kullanıcı testi'],
    skills: ['React', 'Node.js', 'WebSocket', 'Real-time', 'File Upload', 'Caching']
  },
  {
    id: 'T-18',
    title: 'Veri Görselleştirme Dashboard',
    description: 'Eskişehir şehir verileri için interaktif dashboard. Chart.js/D3.js ile zengin görselleştirmeler.',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 30,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 11,
      secondarySDGs: [9, 13],
      impactDescription: 'Akıllı şehir verileri ile karar destek sistemi oluşturma',
      measurableOutcomes: ['Data visualization', 'Dashboard design', 'Data storytelling']
    },
    deliverables: [
      { type: 'code', title: 'Dashboard Kodu', description: 'Interactive dashboard', required: true, format: ['github'] },
      { type: 'presentation', title: 'Canlı Dashboard', description: 'Deploy edilmiş uygulama', required: true, format: ['url'] },
      { type: 'document', title: 'Veri Analizi Raporu', description: 'İçgörüler ve öneriler', required: true, format: ['pdf'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'Eskişehir akıllı şehir projelerinde öncü. Veri görselleştirme, şehir yönetimi için kritik.',
    prerequisites: ['ML-29', 'ML-21'],
    hints: ['Recharts veya Victory kullan', 'Responsive design önemli', 'Filter ve drill-down ekle', 'Export to PDF özelliği'],
    mandatoryEvidence: ['Çalışan dashboard URL', 'En az 5 farklı chart tipi', 'Interaktif özellikler videosu'],
    skills: ['React', 'Chart.js', 'D3.js', 'Data Visualization', 'Dashboard Design']
  },
  {
    id: 'T-19',
    title: 'Machine Learning Tahmin Modeli',
    description: 'Scikit-learn ile tahmin modeli geliştir. Veri hazırlama, model training, evaluation ve deployment.',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 35,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 9,
      secondarySDGs: [4],
      impactDescription: 'Yapay zeka ve makine öğrenmesi ile problem çözme',
      measurableOutcomes: ['ML model development', 'Data preprocessing', 'Model evaluation']
    },
    deliverables: [
      { type: 'code', title: 'ML Pipeline', description: 'Jupyter notebook + Python scripts', required: true, format: ['github', 'ipynb'] },
      { type: 'document', title: 'Model Raporu', description: 'Methodology, results, insights', required: true, format: ['pdf'] },
      { type: 'presentation', title: 'Model Demo', description: 'Prediction interface', required: true, format: ['url', 'video'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'ML, her sektörde kullanılıyor. Tahmin modelleri, iş kararlarını optimize eder.',
    prerequisites: ['ML-30', 'ML-06'],
    hints: ['Kaggle dataset kullan', 'Train-test split yap', 'Cross-validation uygula', 'Flask ile API yap'],
    mandatoryEvidence: ['Trained model', 'Evaluation metrics', 'Prediction API', 'Model documentation'],
    skills: ['Python', 'Scikit-learn', 'Machine Learning', 'Data Science', 'Model Deployment']
  },
  {
    id: 'T-20',
    title: 'Mobil Uygulama Prototipi',
    description: 'React Native ile cross-platform mobil uygulama. Native features kullan (camera, location, notifications).',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 40,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 9,
      secondarySDGs: [11],
      impactDescription: 'Mobil teknoloji ile erişilebilirlik ve kullanıcı deneyimi iyileştirme',
      measurableOutcomes: ['Mobile development', 'Native features', 'Cross-platform']
    },
    deliverables: [
      { type: 'code', title: 'Mobil App Kodu', description: 'React Native project', required: true, format: ['github'] },
      { type: 'video', title: 'App Demo', description: 'Tüm özelliklerin gösterimi', required: true, format: ['mp4', 'youtube'] },
      { type: 'document', title: 'Kullanım Kılavuzu', description: 'Features ve setup', required: true, format: ['md'] }
    ],
    collaborationLevel: 'team',
    realWorldContext: 'Mobil kullanım, web\'i geçti. Cross-platform development, maliyet ve zaman tasarrufu sağlar.',
    prerequisites: ['ML-21'],
    hints: ['Expo kullan (kolay başlangıç)', 'Native modules dikkatli kullan', 'iOS ve Android test et', 'Push notification ekle'],
    mandatoryEvidence: ['APK/IPA dosyası', 'Demo videosu', 'En az 3 native feature kullanımı'],
    skills: ['React Native', 'Mobile Development', 'Native APIs', 'Cross-platform']
  },
  {
    id: 'T-21',
    title: 'IoT Sensör Dashboard',
    description: 'Arduino/Raspberry Pi sensör verilerini toplayan ve görselleştiren sistem. MQTT protokolü kullan.',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 35,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 13,
      secondarySDGs: [9, 11],
      impactDescription: 'IoT ile çevre izleme ve akıllı şehir uygulamaları',
      measurableOutcomes: ['IoT integration', 'Real-time data', 'Environmental monitoring']
    },
    deliverables: [
      { type: 'code', title: 'IoT System', description: 'Sensor code + Dashboard', required: true, format: ['github'] },
      { type: 'presentation', title: 'Live Dashboard', description: 'Real-time data visualization', required: true, format: ['url'] },
      { type: 'video', title: 'System Demo', description: 'Hardware + software integration', required: true, format: ['mp4'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'IoT, akıllı şehirlerin temeli. Çevre izleme, enerji yönetimi, trafik optimizasyonu için kullanılır.',
    prerequisites: ['ML-22', 'ML-29'],
    hints: ['MQTT broker olarak Mosquitto', 'Node-RED ile hızlı prototip', 'InfluxDB ile time-series data', 'Grafana ile visualization'],
    mandatoryEvidence: ['Çalışan sensör sistemi', 'Real-time dashboard', 'En az 24 saat veri kaydı'],
    skills: ['IoT', 'MQTT', 'Arduino', 'Real-time Data', 'Time-series Database']
  },
  {
    id: 'T-22',
    title: 'Blockchain Voting Sistemi',
    description: 'Ethereum smart contract ile şeffaf oylama sistemi. Web3.js ile frontend entegrasyonu.',
    phase: 'insa',
    difficulty: 'hard',
    estimatedHours: 45,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 16,
      secondarySDGs: [9],
      impactDescription: 'Blockchain ile şeffaf ve güvenli dijital demokrasi',
      measurableOutcomes: ['Blockchain development', 'Smart contracts', 'Decentralized apps']
    },
    deliverables: [
      { type: 'code', title: 'Smart Contract', description: 'Solidity code', required: true, format: ['github'] },
      { type: 'code', title: 'DApp Frontend', description: 'Web3 integration', required: true, format: ['github'] },
      { type: 'document', title: 'Security Audit', description: 'Contract security analysis', required: true, format: ['pdf'] }
    ],
    collaborationLevel: 'team',
    realWorldContext: 'Blockchain, güven gerektirmeyen sistemler oluşturur. Voting, supply chain, identity management için kullanılır.',
    prerequisites: ['ML-22'],
    hints: ['Hardhat development environment', 'Test network kullan (Sepolia)', 'MetaMask entegrasyonu', 'Gas optimization önemli'],
    mandatoryEvidence: ['Deployed contract address', 'Working DApp', 'Security audit report'],
    skills: ['Solidity', 'Blockchain', 'Smart Contracts', 'Web3.js', 'Ethereum']
  },
  {
    id: 'T-23',
    title: 'AI Chatbot Geliştirme',
    description: 'NLP kullanarak akıllı chatbot. Intent recognition, entity extraction ve context management.',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 35,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 9,
      secondarySDGs: [4],
      impactDescription: 'AI ile otomatik müşteri hizmeti ve bilgi erişimi',
      measurableOutcomes: ['NLP', 'Conversational AI', 'User experience']
    },
    deliverables: [
      { type: 'code', title: 'Chatbot Code', description: 'NLP pipeline + API', required: true, format: ['github'] },
      { type: 'presentation', title: 'Live Chatbot', description: 'Working demo', required: true, format: ['url'] },
      { type: 'document', title: 'Training Data', description: 'Intents and responses', required: true, format: ['json'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'Chatbot\'lar, müşteri hizmetlerinde yaygın. 7/24 destek, maliyet tasarrufu sağlar.',
    prerequisites: ['ML-30', 'ML-22'],
    hints: ['Rasa veya Dialogflow kullan', 'Intent classification için', 'Context management ekle', 'Fallback responses hazırla'],
    mandatoryEvidence: ['Working chatbot', 'En az 20 intent', 'Context handling demo'],
    skills: ['NLP', 'Python', 'Chatbot', 'Machine Learning', 'API Development']
  },
  {
    id: 'T-24',
    title: 'DevOps Pipeline Kurulumu',
    description: 'CI/CD pipeline oluştur. GitHub Actions, Docker, automated testing ve deployment.',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 30,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 9,
      secondarySDGs: [],
      impactDescription: 'Modern yazılım geliştirme ve deployment süreçleri',
      measurableOutcomes: ['DevOps practices', 'Automation', 'Continuous delivery']
    },
    deliverables: [
      { type: 'code', title: 'Pipeline Config', description: 'CI/CD configuration files', required: true, format: ['github'] },
      { type: 'document', title: 'Pipeline Documentation', description: 'Setup ve workflow', required: true, format: ['md'] },
      { type: 'video', title: 'Pipeline Demo', description: 'Automated deployment', required: true, format: ['mp4'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'DevOps, modern yazılım şirketlerinin standardı. Hızlı ve güvenilir deployment sağlar.',
    prerequisites: ['ML-33', 'ML-34'],
    hints: ['GitHub Actions ücretsiz', 'Docker multi-stage build', 'Automated tests ekle', 'Staging environment oluştur'],
    mandatoryEvidence: ['Working pipeline', 'Automated tests', 'Successful deployment log'],
    skills: ['DevOps', 'CI/CD', 'Docker', 'GitHub Actions', 'Automation']
  },
  {
    id: 'T-25',
    title: 'Mikroservis Mimarisi Projesi',
    description: 'Monolitik uygulamayı mikroservislere ayır. API Gateway, service discovery, distributed tracing.',
    phase: 'insa',
    difficulty: 'hard',
    estimatedHours: 50,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 9,
      secondarySDGs: [],
      impactDescription: 'Ölçeklenebilir ve dayanıklı sistem mimarisi',
      measurableOutcomes: ['Microservices', 'Distributed systems', 'Scalability']
    },
    deliverables: [
      { type: 'code', title: 'Microservices', description: 'Multiple services', required: true, format: ['github'] },
      { type: 'document', title: 'Architecture Diagram', description: 'System design', required: true, format: ['pdf', 'png'] },
      { type: 'document', title: 'API Documentation', description: 'Service APIs', required: true, format: ['swagger'] }
    ],
    collaborationLevel: 'team',
    realWorldContext: 'Mikroservisler, büyük ölçekli uygulamalar için ideal. Netflix, Amazon, Uber kullanıyor.',
    prerequisites: ['ML-36', 'ML-34'],
    hints: ['Kong veya Nginx API Gateway', 'Consul service discovery', 'Jaeger distributed tracing', 'Docker Compose orchestration'],
    mandatoryEvidence: ['Working microservices', 'API Gateway', 'Service communication demo'],
    skills: ['Microservices', 'Docker', 'API Gateway', 'Distributed Systems', 'Architecture']
  },
  {
    id: 'T-26',
    title: 'Performans Optimizasyonu Challenge',
    description: 'Yavaş bir web uygulamasını optimize et. Lighthouse score 90+ hedefle.',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 25,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 9,
      secondarySDGs: [12],
      impactDescription: 'Enerji verimliliği ve kullanıcı deneyimi optimizasyonu',
      measurableOutcomes: ['Performance optimization', 'Web vitals', 'User experience']
    },
    deliverables: [
      { type: 'code', title: 'Optimized Code', description: 'Before/after comparison', required: true, format: ['github'] },
      { type: 'document', title: 'Optimization Report', description: 'Metrics ve improvements', required: true, format: ['pdf'] },
      { type: 'presentation', title: 'Performance Demo', description: 'Lighthouse scores', required: true, format: ['video'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: '1 saniye yavaşlama, %7 conversion kaybı demek. Performance, kullanıcı deneyimini doğrudan etkiler.',
    prerequisites: ['ML-39', 'ML-21'],
    hints: ['Code splitting', 'Lazy loading', 'Image optimization', 'Caching strategies', 'Bundle analysis'],
    mandatoryEvidence: ['Lighthouse score 90+', 'Before/after metrics', 'Optimization techniques list'],
    skills: ['Performance', 'Optimization', 'Web Vitals', 'Caching', 'Bundle Optimization']
  },
  {
    id: 'T-27',
    title: 'Güvenlik Audit ve Penetration Test',
    description: 'Bir web uygulamasında OWASP Top 10 güvenlik açıklarını test et ve düzelt.',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 30,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 16,
      secondarySDGs: [9],
      impactDescription: 'Siber güvenlik ve veri koruma',
      measurableOutcomes: ['Security testing', 'Vulnerability assessment', 'Secure coding']
    },
    deliverables: [
      { type: 'document', title: 'Security Audit Report', description: 'Vulnerabilities found', required: true, format: ['pdf'] },
      { type: 'code', title: 'Security Fixes', description: 'Patched code', required: true, format: ['github'] },
      { type: 'document', title: 'Security Best Practices', description: 'Recommendations', required: true, format: ['md'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'Siber saldırılar artıyor. Güvenlik, her developer\'ın sorumluluğu.',
    prerequisites: ['ML-32'],
    hints: ['OWASP ZAP kullan', 'SQL injection test et', 'XSS vulnerabilities', 'CSRF protection', 'Authentication flaws'],
    mandatoryEvidence: ['Audit report', 'En az 5 vulnerability fix', 'Security checklist'],
    skills: ['Security', 'Penetration Testing', 'OWASP', 'Secure Coding', 'Vulnerability Assessment']
  },
  {
    id: 'T-28',
    title: 'Real-time Collaboration Tool',
    description: 'Google Docs benzeri real-time işbirliği aracı. WebSocket, CRDT veya Operational Transformation.',
    phase: 'insa',
    difficulty: 'hard',
    estimatedHours: 45,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 17,
      secondarySDGs: [9],
      impactDescription: 'Uzaktan işbirliği ve üretkenlik araçları',
      measurableOutcomes: ['Real-time collaboration', 'Conflict resolution', 'Distributed systems']
    },
    deliverables: [
      { type: 'code', title: 'Collaboration Tool', description: 'Full stack application', required: true, format: ['github'] },
      { type: 'presentation', title: 'Live Demo', description: 'Multi-user collaboration', required: true, format: ['url'] },
      { type: 'document', title: 'Technical Architecture', description: 'Conflict resolution strategy', required: true, format: ['pdf'] }
    ],
    collaborationLevel: 'team',
    realWorldContext: 'Remote work artıyor. Real-time collaboration tools, distributed teams için kritik.',
    prerequisites: ['ML-22', 'ML-21'],
    hints: ['Socket.io veya WebRTC', 'Yjs CRDT library', 'Conflict resolution strategy', 'Presence awareness'],
    mandatoryEvidence: ['Working tool', 'Multi-user demo', 'Conflict resolution test'],
    skills: ['WebSocket', 'Real-time', 'CRDT', 'Distributed Systems', 'Collaboration']
  },
  {
    id: 'T-29',
    title: 'GraphQL API Geliştirme',
    description: 'REST API\'yi GraphQL\'e dönüştür. Schema design, resolvers, subscriptions.',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 30,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 9,
      secondarySDGs: [],
      impactDescription: 'Modern API teknolojileri ve veri yönetimi',
      measurableOutcomes: ['GraphQL', 'API design', 'Data fetching optimization']
    },
    deliverables: [
      { type: 'code', title: 'GraphQL API', description: 'Server implementation', required: true, format: ['github'] },
      { type: 'document', title: 'Schema Documentation', description: 'Types, queries, mutations', required: true, format: ['md'] },
      { type: 'presentation', title: 'GraphQL Playground', description: 'Interactive API demo', required: true, format: ['url'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'GraphQL, Facebook, GitHub, Shopify tarafından kullanılıyor. Flexible data fetching sağlar.',
    prerequisites: ['ML-22', 'ML-25'],
    hints: ['Apollo Server kullan', 'DataLoader ile N+1 problem çöz', 'Subscriptions için WebSocket', 'Schema-first approach'],
    mandatoryEvidence: ['Working GraphQL API', 'Schema documentation', 'Query examples'],
    skills: ['GraphQL', 'Apollo', 'API Design', 'Schema Design', 'Resolvers']
  },
  {
    id: 'T-30',
    title: 'Test Driven Development Projesi',
    description: 'TDD metodolojisi ile sıfırdan proje geliştir. Unit tests, integration tests, %90+ coverage.',
    phase: 'insa',
    difficulty: 'med',
    estimatedHours: 35,
    xpReward: 100,
    sdgImpact: {
      primarySDG: 9,
      secondarySDGs: [],
      impactDescription: 'Kaliteli yazılım geliştirme ve test kültürü',
      measurableOutcomes: ['TDD', 'Testing', 'Code quality', 'Test coverage']
    },
    deliverables: [
      { type: 'code', title: 'TDD Project', description: 'Code + comprehensive tests', required: true, format: ['github'] },
      { type: 'document', title: 'Test Report', description: 'Coverage ve test strategy', required: true, format: ['pdf'] },
      { type: 'video', title: 'TDD Process', description: 'Red-Green-Refactor demo', required: true, format: ['mp4'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'TDD, kod kalitesini artırır ve bug\'ları azaltır. Profesyonel development\'ın standardı.',
    prerequisites: ['ML-37'],
    hints: ['Jest veya Vitest', 'Red-Green-Refactor cycle', 'Test first, code second', 'Refactor with confidence'],
    mandatoryEvidence: ['90%+ test coverage', 'TDD process video', 'Test documentation'],
    skills: ['TDD', 'Testing', 'Jest', 'Unit Testing', 'Integration Testing']
  }
];

// ETKİ PHASE (10 challenges) - Impact & Capstone Projects
export const ETKI_TASKS: TaskDefinition[] = [
  {
    id: 'T-31',
    title: 'Capstone MVP Geliştirme',
    description: 'Gerçek bir probleme çözüm sunan MVP geliştir. Problem tanımlama, tasarım, geliştirme, test ve deployment.',
    phase: 'etki',
    difficulty: 'hard',
    estimatedHours: 80,
    xpReward: 150,
    sdgImpact: {
      primarySDG: 9,
      secondarySDGs: [11, 13, 17],
      impactDescription: 'Gerçek dünya problemine teknoloji çözümü geliştirme',
      measurableOutcomes: ['Full product development', 'Problem solving', 'Social impact']
    },
    deliverables: [
      { type: 'code', title: 'MVP Code', description: 'Production-ready application', required: true, format: ['github'] },
      { type: 'presentation', title: 'Live MVP', description: 'Deployed product', required: true, format: ['url'] },
      { type: 'document', title: 'Product Documentation', description: 'Problem, solution, impact', required: true, format: ['pdf'] },
      { type: 'video', title: 'Product Demo', description: 'Full feature walkthrough', required: true, format: ['mp4', 'youtube'] },
      { type: 'presentation', title: 'Pitch Deck', description: 'Investor presentation', required: true, format: ['pdf', 'pptx'] }
    ],
    collaborationLevel: 'team',
    realWorldContext: 'Capstone, öğrendiklerini gerçek projede uygulama fırsatı. Portfolio\'nun yıldızı ve iş başvurularında fark yaratır.',
    prerequisites: ['ML-41', 'ML-21', 'ML-22'],
    hints: ['Eskişehir\'e özgü problem seç', 'User research yap', 'Iterative development', 'User testing yap', 'Metrics tanımla'],
    mandatoryEvidence: ['Working MVP', 'User testing results', 'Impact metrics', 'Pitch deck', 'Demo video'],
    skills: ['Full Stack', 'Product Development', 'User Research', 'Project Management', 'Pitching']
  },
  {
    id: 'T-32',
    title: 'Sosyal Etki Projesi: Eskişehir İçin Çözüm',
    description: 'Eskişehir\'deki sosyal/çevresel bir probleme teknoloji çözümü. SDG odaklı, ölçülebilir etki.',
    phase: 'etki',
    difficulty: 'hard',
    estimatedHours: 70,
    xpReward: 150,
    sdgImpact: {
      primarySDG: 11,
      secondarySDGs: [6, 13, 17],
      impactDescription: 'Yerel topluluk için sürdürülebilir teknoloji çözümü',
      measurableOutcomes: ['Social impact', 'Community engagement', 'Sustainability']
    },
    deliverables: [
      { type: 'code', title: 'Solution Code', description: 'Working application', required: true, format: ['github'] },
      { type: 'document', title: 'Impact Report', description: 'Problem, solution, metrics', required: true, format: ['pdf'] },
      { type: 'presentation', title: 'Community Presentation', description: 'Stakeholder sunumu', required: true, format: ['pdf', 'video'] },
      { type: 'document', title: 'Sustainability Plan', description: 'Long-term viability', required: true, format: ['pdf'] }
    ],
    collaborationLevel: 'team',
    realWorldContext: 'Teknoloji, sosyal problemleri çözmek için güçlü araç. Eskişehir\'de su yönetimi, atık azaltma, ulaşım gibi alanlarda fırsatlar var.',
    prerequisites: ['ML-42', 'ML-43'],
    hints: ['Belediye ile görüş', 'STK\'larla işbirliği', 'Pilot uygulama yap', 'Impact metrics tanımla', 'User feedback topla'],
    mandatoryEvidence: ['Working solution', 'Impact metrics', 'Community feedback', 'Sustainability plan'],
    skills: ['Social Impact', 'Community Engagement', 'Sustainability', 'Stakeholder Management', 'Impact Measurement']
  },
  {
    id: 'T-33',
    title: 'Startup Pitch ve Business Plan',
    description: 'Teknoloji startup fikri geliştir. Business model, market analysis, financial projections, pitch deck.',
    phase: 'etki',
    difficulty: 'hard',
    estimatedHours: 60,
    xpReward: 150,
    sdgImpact: {
      primarySDG: 8,
      secondarySDGs: [9],
      impactDescription: 'Girişimcilik ve ekonomik kalkınma',
      measurableOutcomes: ['Entrepreneurship', 'Business planning', 'Financial literacy']
    },
    deliverables: [
      { type: 'presentation', title: 'Pitch Deck', description: '10-15 slide investor pitch', required: true, format: ['pdf', 'pptx'] },
      { type: 'document', title: 'Business Plan', description: 'Comprehensive plan', required: true, format: ['pdf'] },
      { type: 'document', title: 'Financial Model', description: '3-year projections', required: true, format: ['xlsx', 'pdf'] },
      { type: 'video', title: 'Pitch Video', description: '5-minute pitch', required: true, format: ['mp4', 'youtube'] }
    ],
    collaborationLevel: 'team',
    realWorldContext: 'Türkiye\'de startup ekosistemi büyüyor. İyi bir pitch, yatırım almanın anahtarı.',
    prerequisites: ['ML-44', 'ML-45', 'ML-46'],
    hints: ['Problem-solution fit göster', 'Market size hesapla', 'Competitive analysis yap', 'Traction göster', 'Team\'i vurgula'],
    mandatoryEvidence: ['Pitch deck', 'Business plan', 'Financial model', 'Pitch video'],
    skills: ['Entrepreneurship', 'Business Planning', 'Financial Modeling', 'Pitching', 'Market Analysis']
  },
  {
    id: 'T-34',
    title: 'Açık Kaynak Katkısı',
    description: 'Büyük bir açık kaynak projeye anlamlı katkı yap. Bug fix, feature, documentation.',
    phase: 'etki',
    difficulty: 'med',
    estimatedHours: 40,
    xpReward: 150,
    sdgImpact: {
      primarySDG: 17,
      secondarySDGs: [9],
      impactDescription: 'Küresel yazılım topluluğuna katkı ve işbirliği',
      measurableOutcomes: ['Open source contribution', 'Community engagement', 'Code quality']
    },
    deliverables: [
      { type: 'code', title: 'Merged PR', description: 'Accepted contribution', required: true, format: ['github'] },
      { type: 'document', title: 'Contribution Report', description: 'What, why, how', required: true, format: ['md'] },
      { type: 'presentation', title: 'Learning Reflection', description: 'Experience sharing', required: true, format: ['pdf', 'video'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Açık kaynak, modern yazılımın omurgası. Katkı yapmak, öğrenme ve network için harika fırsat.',
    prerequisites: ['ML-13', 'ML-38'],
    hints: ['Good first issue etiketli issue\'lar', 'Contribution guidelines oku', 'Küçük başla', 'Code review\'dan öğren'],
    mandatoryEvidence: ['Merged PR link', 'Contribution story', 'Community interaction'],
    skills: ['Open Source', 'Git', 'Code Review', 'Community Engagement', 'Technical Writing']
  },
  {
    id: 'T-35',
    title: 'Topluluk Projesi Liderliği',
    description: 'DiGEM topluluğu için proje organize et. Hackathon, workshop, study group gibi.',
    phase: 'etki',
    difficulty: 'med',
    estimatedHours: 50,
    xpReward: 150,
    sdgImpact: {
      primarySDG: 17,
      secondarySDGs: [4],
      impactDescription: 'Topluluk oluşturma ve bilgi paylaşımı',
      measurableOutcomes: ['Leadership', 'Community building', 'Event organization']
    },
    deliverables: [
      { type: 'document', title: 'Event Plan', description: 'Detaylı organizasyon planı', required: true, format: ['pdf'] },
      { type: 'presentation', title: 'Event Report', description: 'Outcomes ve learnings', required: true, format: ['pdf'] },
      { type: 'video', title: 'Event Highlights', description: 'Event documentation', required: true, format: ['mp4'] },
      { type: 'document', title: 'Participant Feedback', description: 'Survey results', required: true, format: ['pdf'] }
    ],
    collaborationLevel: 'team',
    realWorldContext: 'Topluluk liderliği, soft skills geliştirme için harika fırsat. Networking ve kariyer için değerli.',
    prerequisites: ['ML-49', 'ML-18'],
    hints: ['Küçük başla', 'Sponsor bul', 'Marketing yap', 'Feedback topla', 'Dokümante et'],
    mandatoryEvidence: ['Event photos/videos', 'Participant list', 'Feedback results', 'Event report'],
    skills: ['Leadership', 'Event Management', 'Community Building', 'Marketing', 'Stakeholder Management']
  },
  {
    id: 'T-36',
    title: 'Mentorluk Programı',
    description: 'Yeni öğrencilere 8 hafta mentorluk yap. Structured program, weekly meetings, progress tracking.',
    phase: 'etki',
    difficulty: 'med',
    estimatedHours: 40,
    xpReward: 150,
    sdgImpact: {
      primarySDG: 4,
      secondarySDGs: [17],
      impactDescription: 'Bilgi paylaşımı ve yeni nesil geliştiricilere destek',
      measurableOutcomes: ['Mentorship', 'Teaching', 'Knowledge transfer']
    },
    deliverables: [
      { type: 'document', title: 'Mentorship Plan', description: '8-week structured plan', required: true, format: ['pdf'] },
      { type: 'document', title: 'Progress Reports', description: 'Weekly meeting notes', required: true, format: ['md'] },
      { type: 'document', title: 'Mentee Feedback', description: 'End-of-program survey', required: true, format: ['pdf'] },
      { type: 'presentation', title: 'Reflection Report', description: 'Learnings and improvements', required: true, format: ['pdf'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Mentorluk, öğrenmenin en etkili yolu. Öğretirken öğrenirsin.',
    prerequisites: ['ML-49'],
    hints: ['SMART goals belirle', 'Active listening', 'Constructive feedback', 'Celebrate wins', 'Be patient'],
    mandatoryEvidence: ['Mentorship plan', 'Meeting notes', 'Mentee progress', 'Feedback'],
    skills: ['Mentorship', 'Teaching', 'Communication', 'Empathy', 'Leadership']
  },
  {
    id: 'T-37',
    title: 'Teknik Blog Yazı Serisi',
    description: '5+ teknik blog yazısı yaz. Tutorial, deep dive, best practices gibi konularda.',
    phase: 'etki',
    difficulty: 'med',
    estimatedHours: 35,
    xpReward: 150,
    sdgImpact: {
      primarySDG: 4,
      secondarySDGs: [9],
      impactDescription: 'Bilgi paylaşımı ve teknik iletişim becerileri',
      measurableOutcomes: ['Technical writing', 'Knowledge sharing', 'Content creation']
    },
    deliverables: [
      { type: 'document', title: 'Blog Posts', description: '5+ published articles', required: true, format: ['url', 'md'] },
      { type: 'document', title: 'Content Strategy', description: 'Topics ve audience', required: true, format: ['pdf'] },
      { type: 'presentation', title: 'Analytics Report', description: 'Reach ve engagement', required: false, format: ['pdf'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Teknik blog, kişisel marka ve thought leadership için güçlü araç. İş fırsatları yaratır.',
    prerequisites: ['ML-16'],
    hints: ['Medium veya Dev.to kullan', 'SEO optimize et', 'Code examples ekle', 'Visuals kullan', 'Sosyal medyada paylaş'],
    mandatoryEvidence: ['5+ published posts', 'Total 5000+ words', 'Code examples'],
    skills: ['Technical Writing', 'Content Creation', 'SEO', 'Communication', 'Personal Branding']
  },
  {
    id: 'T-38',
    title: 'Konferans Konuşması',
    description: 'Teknik konferans veya meetup\'ta konuşma yap. Sunum hazırlama, public speaking, Q&A.',
    phase: 'etki',
    difficulty: 'hard',
    estimatedHours: 45,
    xpReward: 150,
    sdgImpact: {
      primarySDG: 4,
      secondarySDGs: [17],
      impactDescription: 'Bilgi paylaşımı ve topluluk liderliği',
      measurableOutcomes: ['Public speaking', 'Presentation skills', 'Community engagement']
    },
    deliverables: [
      { type: 'presentation', title: 'Presentation Slides', description: 'Professional deck', required: true, format: ['pdf', 'pptx'] },
      { type: 'video', title: 'Talk Recording', description: 'Full presentation', required: true, format: ['mp4', 'youtube'] },
      { type: 'document', title: 'Talk Proposal', description: 'Abstract ve outline', required: true, format: ['pdf'] },
      { type: 'document', title: 'Audience Feedback', description: 'Survey results', required: false, format: ['pdf'] }
    ],
    collaborationLevel: 'individual',
    realWorldContext: 'Public speaking, kariyer gelişimi için kritik beceri. Visibility ve network artırır.',
    prerequisites: ['ML-45'],
    hints: ['Storytelling kullan', 'Live demo hazırla', 'Practice, practice, practice', 'Backup plan hazırla', 'Q&A için hazırlan'],
    mandatoryEvidence: ['Talk video', 'Slides', 'Event proof', 'Audience feedback'],
    skills: ['Public Speaking', 'Presentation', 'Storytelling', 'Technical Communication', 'Confidence']
  },
  {
    id: 'T-39',
    title: 'Araştırma Makalesi',
    description: 'Teknik bir konuda araştırma yap ve makale yaz. Literature review, methodology, findings.',
    phase: 'etki',
    difficulty: 'hard',
    estimatedHours: 60,
    xpReward: 150,
    sdgImpact: {
      primarySDG: 9,
      secondarySDGs: [4],
      impactDescription: 'Akademik araştırma ve bilimsel düşünme',
      measurableOutcomes: ['Research skills', 'Academic writing', 'Critical thinking']
    },
    deliverables: [
      { type: 'document', title: 'Research Paper', description: '3000+ words', required: true, format: ['pdf'] },
      { type: 'document', title: 'Literature Review', description: 'Related work analysis', required: true, format: ['pdf'] },
      { type: 'code', title: 'Research Code', description: 'Experiments ve analysis', required: false, format: ['github'] },
      { type: 'presentation', title: 'Research Presentation', description: 'Findings sunumu', required: true, format: ['pdf'] }
    ],
    collaborationLevel: 'pair',
    realWorldContext: 'Araştırma becerileri, problem çözme ve critical thinking geliştirir. Akademik kariyer için temel.',
    prerequisites: ['ML-06', 'ML-30'],
    hints: ['Google Scholar kullan', 'Hypothesis tanımla', 'Methodology açıkla', 'Results visualize et', 'Peer review al'],
    mandatoryEvidence: ['Research paper', 'Literature review', 'Methodology', 'Findings'],
    skills: ['Research', 'Academic Writing', 'Critical Thinking', 'Data Analysis', 'Scientific Method']
  },
  {
    id: 'T-40',
    title: 'Demo Day Sunumu',
    description: 'PUSULA Demo Day\'de capstone projenizi sunun. Investor pitch formatında, 10 dakika.',
    phase: 'etki',
    difficulty: 'hard',
    estimatedHours: 50,
    xpReward: 150,
    sdgImpact: {
      primarySDG: 8,
      secondarySDGs: [9, 17],
      impactDescription: 'Girişimcilik ve profesyonel sunum becerileri',
      measurableOutcomes: ['Pitching', 'Presentation', 'Stakeholder communication']
    },
    deliverables: [
      { type: 'presentation', title: 'Demo Day Pitch', description: 'Polished pitch deck', required: true, format: ['pdf', 'pptx'] },
      { type: 'video', title: 'Pitch Recording', description: '10-minute presentation', required: true, format: ['mp4'] },
      { type: 'presentation', title: 'Live Demo', description: 'Working product demo', required: true, format: ['url'] },
      { type: 'document', title: 'One-Pager', description: 'Executive summary', required: true, format: ['pdf'] }
    ],
    collaborationLevel: 'team',
    realWorldContext: 'Demo Day, PUSULA yolculuğunun zirvesi. Stakeholder\'lara, potansiyel işverenlere ve yatırımcılara kendinizi gösterme fırsatı.',
    prerequisites: ['ML-45', 'T-31'],
    hints: ['Problem-solution-impact hikayesi', 'Live demo hazırla', 'Backup plan', 'Q&A hazırlığı', 'Confident delivery'],
    mandatoryEvidence: ['Pitch deck', 'Demo video', 'Live demo', 'One-pager', 'Audience feedback'],
    skills: ['Pitching', 'Presentation', 'Demo', 'Storytelling', 'Confidence', 'Stakeholder Management']
  }
];

// Export all 40 tasks
export const ALL_TASKS_FINAL = [
  ...KESIF_TASKS,
  ...INSA_TASKS,
  ...ETKI_TASKS
];

console.log(`📋 Total Tasks: ${ALL_TASKS_FINAL.length}`);
console.log(`   - Keşif: ${KESIF_TASKS.length}`);
console.log(`   - İnşa: ${INSA_TASKS.length}`);
console.log(`   - Etki: ${ETKI_TASKS.length}`);
