-- ============================================================================
-- Migration: 006_simulations.sql
-- Description: Simulations Progress Tracking - 6 kariyer yolu x 6 level
-- ============================================================================

-- Simülasyon ilerleme tablosu
CREATE TABLE IF NOT EXISTS simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  path_id TEXT NOT NULL, -- 'software-dev', 'data-analysis', 'digital-marketing', 'ecommerce', 'digital-design', 'ai-ml'
  current_level INTEGER DEFAULT 0 CHECK (current_level >= 0 AND current_level <= 6),
  completed_levels INTEGER[] DEFAULT '{}',
  total_xp_earned INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  
  -- Her kullanıcı için her path'te sadece bir kayıt
  UNIQUE(user_id, path_id)
);

-- Ders tamamlama detayları
CREATE TABLE IF NOT EXISTS simulation_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  path_id TEXT NOT NULL,
  level_number INTEGER NOT NULL CHECK (level_number >= 0 AND level_number <= 5),
  lesson_id TEXT NOT NULL, -- 'level-0', 'level-1', ..., 'level-5'
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER, -- 0-100 arası başarı skoru
  attempts INTEGER DEFAULT 1,
  code_snapshot TEXT, -- Son yazılan kod
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, path_id, level_number)
);

-- Kariyer yolları meta verisi
CREATE TABLE IF NOT EXISTS simulation_paths (
  id TEXT PRIMARY KEY, -- 'software-dev', 'data-analysis' vb.
  name_tr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_tr TEXT,
  description_en TEXT,
  icon TEXT, -- Lucide icon name
  color TEXT, -- Tailwind color class
  total_levels INTEGER DEFAULT 6,
  total_xp INTEGER DEFAULT 600, -- Tüm path tamamlanınca
  prerequisite_path TEXT, -- Öncesinde tamamlanması gereken path
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0
);

-- Kariyer yolu verileri
INSERT INTO simulation_paths (id, name_tr, name_en, description_tr, icon, color, sort_order) VALUES
  ('software-dev', 'Yazılım Geliştirme', 'Software Development', 'Değişkenler, koşullar, nesneler, döngüler ve entegrasyon', 'Code', 'cyan', 1),
  ('data-analysis', 'Veri Analizi', 'Data Analysis', 'SQL sorguları, veri filtreleme, gruplama ve analiz', 'BarChart3', 'emerald', 2),
  ('digital-marketing', 'Dijital Pazarlama', 'Digital Marketing', 'Bütçe, hedef kitle, CPC ve A/B test optimizasyonu', 'Target', 'orange', 3),
  ('ecommerce', 'E-Ticaret', 'E-Commerce', 'Fiyatlama, marj hesaplama, stok ve kar optimizasyonu', 'ShoppingCart', 'purple', 4),
  ('digital-design', 'Dijital Tasarım', 'Digital Design', 'Box model, tipografi, spacing ve modern UI', 'Palette', 'pink', 5),
  ('ai-ml', 'Yapay Zeka', 'AI/ML Fundamentals', 'Trafik kontrolü, sensör sistemleri ve akıllı algoritmalar', 'Brain', 'blue', 6)
ON CONFLICT (id) DO UPDATE SET
  name_tr = EXCLUDED.name_tr,
  description_tr = EXCLUDED.description_tr;

-- RLS politikaları
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own simulations" ON simulations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own simulations" ON simulations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own simulations" ON simulations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own lessons" ON simulation_lessons
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own lessons" ON simulation_lessons
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Everyone can view paths" ON simulation_paths
  FOR SELECT USING (true);

-- Ders tamamlama fonksiyonu
CREATE OR REPLACE FUNCTION complete_simulation_lesson(
  p_user_id UUID,
  p_path_id TEXT,
  p_level_number INTEGER,
  p_score INTEGER DEFAULT 100,
  p_code_snapshot TEXT DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  v_xp_reward INTEGER;
  v_is_capstone BOOLEAN;
  v_simulation RECORD;
  v_all_completed BOOLEAN;
BEGIN
  -- XP hesapla (capstone = 150, normal = 100)
  v_is_capstone := p_level_number = 5;
  v_xp_reward := CASE WHEN v_is_capstone THEN 150 ELSE 100 END;
  
  -- Simulation kaydını al veya oluştur
  INSERT INTO simulations (user_id, path_id)
  VALUES (p_user_id, p_path_id)
  ON CONFLICT (user_id, path_id) DO NOTHING;
  
  SELECT * INTO v_simulation FROM simulations WHERE user_id = p_user_id AND path_id = p_path_id;
  
  -- Ders kaydını ekle/güncelle
  INSERT INTO simulation_lessons (user_id, path_id, level_number, lesson_id, completed, score, code_snapshot, completed_at)
  VALUES (p_user_id, p_path_id, p_level_number, 'level-' || p_level_number, TRUE, p_score, p_code_snapshot, NOW())
  ON CONFLICT (user_id, path_id, level_number) DO UPDATE SET
    completed = TRUE,
    score = GREATEST(simulation_lessons.score, p_score),
    attempts = simulation_lessons.attempts + 1,
    code_snapshot = COALESCE(p_code_snapshot, simulation_lessons.code_snapshot),
    completed_at = COALESCE(simulation_lessons.completed_at, NOW());
  
  -- Simulations tablosunu güncelle
  UPDATE simulations SET
    current_level = GREATEST(current_level, p_level_number + 1),
    completed_levels = array_append(
      array_remove(completed_levels, p_level_number),
      p_level_number
    ),
    total_xp_earned = total_xp_earned + v_xp_reward,
    last_activity_at = NOW(),
    completed_at = CASE WHEN p_level_number = 5 THEN NOW() ELSE completed_at END
  WHERE user_id = p_user_id AND path_id = p_path_id;
  
  -- Kullanıcı XP'sini güncelle
  UPDATE profiles SET xp = xp + v_xp_reward WHERE id = p_user_id;
  
  -- GDR teknik rol artır
  PERFORM increment_gdr_component(p_user_id, 'teknik_rol', CASE WHEN v_is_capstone THEN 5 ELSE 2 END, 'simulation_completed', NULL);
  
  RETURN jsonb_build_object(
    'success', TRUE,
    'xp_earned', v_xp_reward,
    'is_capstone', v_is_capstone,
    'level_completed', p_level_number
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Kullanıcının simülasyon ilerlemesini getir
CREATE OR REPLACE FUNCTION get_simulation_progress(p_user_id UUID)
RETURNS TABLE (
  path_id TEXT,
  path_name TEXT,
  path_icon TEXT,
  path_color TEXT,
  current_level INTEGER,
  completed_levels INTEGER[],
  total_xp_earned INTEGER,
  is_completed BOOLEAN,
  last_activity TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sp.id,
    sp.name_tr,
    sp.icon,
    sp.color,
    COALESCE(s.current_level, 0),
    COALESCE(s.completed_levels, '{}'),
    COALESCE(s.total_xp_earned, 0),
    s.completed_at IS NOT NULL,
    s.last_activity_at
  FROM simulation_paths sp
  LEFT JOIN simulations s ON s.path_id = sp.id AND s.user_id = p_user_id
  WHERE sp.is_active = TRUE
  ORDER BY sp.sort_order;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_simulations_user ON simulations(user_id);
CREATE INDEX IF NOT EXISTS idx_simulations_path ON simulations(path_id);
CREATE INDEX IF NOT EXISTS idx_simulation_lessons_user ON simulation_lessons(user_id, path_id);
