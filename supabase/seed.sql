-- PUSULA Seed Data
-- Run after schema.sql

-- Insert pilot cohorts
INSERT INTO cohorts (id, name, sdg_number, problem_theme, start_date) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Su Kahramanları', 6, 'Eskişehir''in su kaynaklarının sürdürülebilir kullanımı', '2026-02-15'),
  ('c1000000-0000-0000-0000-000000000002', 'İklim Savaşçıları', 13, 'Şehrin karbon ayak izini azaltma stratejileri', '2026-02-15'),
  ('c1000000-0000-0000-0000-000000000003', 'Eğitim Öncüleri', 4, 'Dijital okuryazarlık ve erişilebilir öğrenme', '2026-02-15');

-- Insert 10 MicroLabs
INSERT INTO microlabs (id, title, minutes, status, spec_json) VALUES
  ('ML-01', 'Kanıt Zinciri ve Portfolyo Yazımı', 35, 'published', '{
    "unlocks": ["T-01"],
    "steps": [
      {"type": "read", "content": "Kanıt nedir? Neden önemli?"},
      {"type": "quiz", "content": {"questions": [{"q": "İyi bir kanıt hangi özelliği taşımalı?", "options": ["Uzun olmalı", "Doğrulanabilir olmalı", "Renkli olmalı"], "correct": 1}]}},
      {"type": "checklist", "content": ["Ekran görüntüsü aldım", "Açıklama yazdım", "Tarih ekledim"]},
      {"type": "reflection", "prompt": "Bu hafta ne öğrendin?", "min_words": 50},
      {"type": "upload", "accept": ["image/*", "video/*"]}
    ]
  }'),
  ('ML-02', 'Problem Çerçeveleme + Paydaş Haritası', 45, 'published', '{
    "unlocks": ["T-02", "T-03"],
    "steps": [
      {"type": "read", "content": "Problem tanımı nasıl yapılır?"},
      {"type": "quiz", "content": {"questions": [{"q": "Paydaş kimdir?", "options": ["Sadece müşteriler", "Tüm etkilenen gruplar", "Sadece çalışanlar"], "correct": 1}]}},
      {"type": "checklist", "content": ["Ana problemi belirledim", "3 paydaş listeledim", "Etkiyi tanımladım"]},
      {"type": "upload", "accept": ["image/*"]}
    ]
  }'),
  ('ML-03', 'Hızlı Kullanıcı Araştırması', 45, 'published', '{
    "unlocks": ["T-04"],
    "prereq": "ML-02",
    "steps": [
      {"type": "read", "content": "Kullanıcı araştırması neden önemli?"},
      {"type": "quiz", "content": {"questions": [{"q": "Görüşmede ilk ne sormalısın?", "options": ["Ürün fiyatı", "Günlük deneyimleri", "Demografik bilgi"], "correct": 1}]}},
      {"type": "checklist", "content": ["2 kişiyle görüştüm", "Notlar aldım", "İçgörü çıkardım"]},
      {"type": "upload", "accept": ["image/*", ".pdf"]}
    ]
  }'),
  ('ML-04', 'Prototip + Mini Kullanılabilirlik Testi', 60, 'published', '{"unlocks": ["T-11", "T-12"], "prereq": "ML-03"}'),
  ('ML-05', 'KPI ve Basit Ölçüm (Sheets)', 50, 'published', '{"unlocks": ["T-06"]}'),
  ('ML-06', 'Supabase Temelleri', 40, 'published', '{"unlocks": ["T-16"]}'),
  ('ML-07', 'AI ile Öğrenme ve Doğrulama', 45, 'published', '{"unlocks": ["T-09"], "prereq": "ML-05"}'),
  ('ML-08', 'Erişilebilirlik ve Anlaşılır UI', 45, 'published', '{"unlocks": ["T-08"], "prereq": "ML-04"}'),
  ('ML-09', 'Sprint Planlama ve Görev Kırılımı', 35, 'published', '{"unlocks": ["T-07"], "prereq": "ML-05"}'),
  ('ML-10', 'Demo Sunumu ve Hikaye Anlatımı', 50, 'published', '{"unlocks": ["T-05"], "prereq": "ML-01"}');

-- Insert Çırak level tasks (T-01 to T-10)
INSERT INTO tasks (id, title, level, difficulty, estimated_hours, status, spec_json) VALUES
  ('T-01', 'Misyon Seçimi + Etki Sözleşmesi', 'cirak', 'easy', 2, 'published', '{
    "sdg_tags": ["all"],
    "deliverables": ["1 sayfa etki sözleşmesi"],
    "acceptance_criteria": ["SDG seçildi", "Problem tanımlandı", "Kişisel hedef yazıldı"],
    "hints": {"L1": "SDG listesine bak", "L2": "Eskişehir bağlamında düşün", "L3": "Şablon kullan"},
    "rubric": {"correctness": 30, "quality": 30, "evidence": 40},
    "mandatory_evidence": ["screenshot", "reflection"]
  }'),
  ('T-02', 'Problem Havuzu: 10 Fikir + 1 Seçim', 'cirak', 'med', 3, 'published', '{
    "sdg_tags": ["6", "13", "4"],
    "deliverables": ["10 problem fikri", "1 seçim gerekçesi"],
    "acceptance_criteria": ["10 farklı problem yazıldı", "Seçim gerekçeli", "SDG ile ilişkili"],
    "rubric": {"correctness": 25, "quality": 35, "evidence": 40}
  }'),
  ('T-03', '2 Görüşme + 3 İçgörü Kartı', 'cirak', 'med', 4, 'published', '{
    "deliverables": ["Görüşme notları", "3 içgörü kartı"],
    "acceptance_criteria": ["2 farklı kişiyle görüşüldü", "Her görüşme 10+ dk", "İçgörüler çıkarıldı"],
    "rubric": {"correctness": 30, "quality": 30, "evidence": 40}
  }'),
  ('T-04', '1 Akış + 3 Ekran Low-Fi Prototip', 'cirak', 'med', 5, 'published', '{}'),
  ('T-05', '3 Dakikalık Mikro Sunum', 'cirak', 'easy', 2, 'published', '{"presentation": true}'),
  ('T-06', 'Doğrulanmış Veri Noktası + Grafik', 'cirak', 'med', 3, 'published', '{}'),
  ('T-07', '60 Dakikalık Çözüm Atölyesi Planı', 'cirak', 'med', 3, 'published', '{}'),
  ('T-08', 'A11y Fix Pack: 5 Hata Bul + 2 Düzelt', 'cirak', 'med', 4, 'published', '{}'),
  ('T-09', 'AI ile 1 Haftalık Öğrenme Planı', 'cirak', 'easy', 2, 'published', '{}'),
  ('T-10', 'Landing Copy + 3 CTA Varyasyonu', 'cirak', 'easy', 2, 'published', '{}');

-- Insert welcome meetings
INSERT INTO meetings (id, title, date, type, capacity) VALUES
  ('m1000000-0000-0000-0000-000000000001', 'Hoş Geldin Toplantısı - Salı', '2026-02-11 14:00:00+03', 'welcome', 10),
  ('m1000000-0000-0000-0000-000000000002', 'Hoş Geldin Toplantısı - Perşembe', '2026-02-13 10:00:00+03', 'welcome', 10),
  ('m1000000-0000-0000-0000-000000000003', 'Hoş Geldin Toplantısı - Cumartesi', '2026-02-15 14:00:00+03', 'welcome', 10);
