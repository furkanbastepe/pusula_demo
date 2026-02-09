-- ============================================================================
-- Migration: 005_daily_tasks.sql
-- Description: Daily Tasks System - Günlük 3 görev (öğrenme/proje/topluluk)
-- ============================================================================

-- Günlük görev tipi enum
DO $$ BEGIN
  CREATE TYPE daily_task_type AS ENUM ('learning', 'project', 'community');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Günlük görevler tablosu
CREATE TABLE IF NOT EXISTS daily_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  task_type daily_task_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_url TEXT, -- Görevin yönlendireceği sayfa
  xp_reward INTEGER DEFAULT 20,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Her kullanıcı için günde sadece 1 görev tipi olabilir
  UNIQUE(user_id, date, task_type)
);

-- Günlük görev şablonları
CREATE TABLE IF NOT EXISTS daily_task_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_type daily_task_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_url TEXT,
  xp_reward INTEGER DEFAULT 20,
  min_level TEXT DEFAULT 'cirak', -- cirak, kalfa, usta
  is_active BOOLEAN DEFAULT TRUE
);

-- Hazır görev şablonları ekle
INSERT INTO daily_task_templates (task_type, title, description, target_url, xp_reward, min_level) VALUES
  -- Learning görevleri
  ('learning', 'MicroLab Tamamla', 'Bugün bir MicroLab modülü tamamla', '/ogren', 25, 'cirak'),
  ('learning', 'Simülasyonda Pratik Yap', 'Bir simülasyon dersini tamamla', '/simulasyon', 30, 'cirak'),
  ('learning', 'Yeni Konu Öğren', 'Yeni bir konu hakkında öğren', '/ogren', 20, 'cirak'),
  
  -- Project görevleri
  ('project', 'Görev Üzerinde Çalış', 'Aktif görevinde ilerleme kaydet', '/gorevler', 30, 'cirak'),
  ('project', 'Deliverable Yükle', 'Bir çıktı dosyası yükle', '/gorevler', 35, 'kalfa'),
  ('project', 'Kod Yaz ve Test Et', 'Projende kod yaz ve test et', '/gorevler', 25, 'cirak'),
  
  -- Community görevleri
  ('community', 'Buddy İnceleme Yap', 'Bir arkadaşının çalışmasını incele', '/buddy', 30, 'kalfa'),
  ('community', 'Toplulukta Paylaşım Yap', 'Bir soru sor veya bilgi paylaş', '/topluluk', 20, 'cirak'),
  ('community', 'Mentor ile Sohbet', 'AI Mentor''a bir soru sor', '/gorevler', 15, 'cirak')
ON CONFLICT DO NOTHING;

-- RLS politikaları
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_task_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own daily tasks" ON daily_tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own daily tasks" ON daily_tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert daily tasks" ON daily_tasks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Everyone can view templates" ON daily_task_templates
  FOR SELECT USING (true);

-- Günlük görevleri oluşturma fonksiyonu
CREATE OR REPLACE FUNCTION generate_daily_tasks_for_user(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  v_user_level TEXT;
  v_template RECORD;
  v_task_types daily_task_type[] := ARRAY['learning', 'project', 'community'];
  v_task_type daily_task_type;
BEGIN
  -- Kullanıcının seviyesini al
  SELECT level INTO v_user_level FROM profiles WHERE id = p_user_id;
  
  -- Her görev tipi için rastgele bir şablon seç ve ekle
  FOREACH v_task_type IN ARRAY v_task_types
  LOOP
    SELECT * INTO v_template
    FROM daily_task_templates
    WHERE task_type = v_task_type
      AND is_active = TRUE
      AND (
        min_level = 'cirak'
        OR (min_level = 'kalfa' AND v_user_level IN ('kalfa', 'usta', 'graduate'))
        OR (min_level = 'usta' AND v_user_level IN ('usta', 'graduate'))
      )
    ORDER BY RANDOM()
    LIMIT 1;
    
    IF v_template IS NOT NULL THEN
      INSERT INTO daily_tasks (user_id, task_type, title, description, target_url, xp_reward)
      VALUES (p_user_id, v_task_type, v_template.title, v_template.description, v_template.target_url, v_template.xp_reward)
      ON CONFLICT (user_id, date, task_type) DO NOTHING;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Görev tamamlama fonksiyonu
CREATE OR REPLACE FUNCTION complete_daily_task(p_task_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_task RECORD;
BEGIN
  SELECT * INTO v_task FROM daily_tasks WHERE id = p_task_id AND completed = FALSE;
  
  IF v_task IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Görevi tamamla
  UPDATE daily_tasks 
  SET completed = TRUE, completed_at = NOW()
  WHERE id = p_task_id;
  
  -- XP ekle
  UPDATE profiles
  SET xp = xp + v_task.xp_reward
  WHERE id = v_task.user_id;
  
  -- Streak güncelle (eğer streak sistemi varsa)
  -- Bu önceki migration'da zaten var
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bugünkü görevleri getiren fonksiyon
CREATE OR REPLACE FUNCTION get_daily_tasks(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  task_type daily_task_type,
  title TEXT,
  description TEXT,
  target_url TEXT,
  xp_reward INTEGER,
  completed BOOLEAN,
  completed_at TIMESTAMPTZ
) AS $$
BEGIN
  -- Önce bugünkü görevlerin oluşturulduğundan emin ol
  PERFORM generate_daily_tasks_for_user(p_user_id);
  
  -- Görevleri döndür
  RETURN QUERY
  SELECT dt.id, dt.task_type, dt.title, dt.description, dt.target_url, dt.xp_reward, dt.completed, dt.completed_at
  FROM daily_tasks dt
  WHERE dt.user_id = p_user_id AND dt.date = CURRENT_DATE
  ORDER BY dt.task_type;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_daily_tasks_user_date ON daily_tasks(user_id, date);
CREATE INDEX IF NOT EXISTS idx_daily_tasks_completed ON daily_tasks(user_id, date, completed);
