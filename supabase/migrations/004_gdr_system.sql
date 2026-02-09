-- ============================================================================
-- Migration: 004_gdr_system.sql
-- Description: GDR (Gelişim-Değerlendirme-Reputasyon) Score System
-- 
-- GDR Ağırlıkları:
--   - Teknik Rol: 35%
--   - Takım: 20%
--   - Sunum: 20%
--   - Güvenilirlik: 15%
--   - Sosyal Etki: 10%
-- ============================================================================

-- GDR bileşen sütunlarını profiles tablosuna ekle (0-100 arası)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gdr_teknik_rol INTEGER DEFAULT 0 CHECK (gdr_teknik_rol >= 0 AND gdr_teknik_rol <= 100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gdr_takim INTEGER DEFAULT 0 CHECK (gdr_takim >= 0 AND gdr_takim <= 100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gdr_sunum INTEGER DEFAULT 0 CHECK (gdr_sunum >= 0 AND gdr_sunum <= 100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gdr_guvenilirlik INTEGER DEFAULT 0 CHECK (gdr_guvenilirlik >= 0 AND gdr_guvenilirlik <= 100);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gdr_sosyal_etki INTEGER DEFAULT 0 CHECK (gdr_sosyal_etki >= 0 AND gdr_sosyal_etki <= 100);

-- Hesaplanmış GDR skoru (0-100 arası, ağırlıklı ortalama)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gdr_score INTEGER DEFAULT 0;

-- GDR geçmişi tablosu (değişiklikleri takip etmek için)
CREATE TABLE IF NOT EXISTS gdr_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  component TEXT NOT NULL CHECK (component IN ('teknik_rol', 'takim', 'sunum', 'guvenilirlik', 'sosyal_etki')),
  old_value INTEGER,
  new_value INTEGER,
  reason TEXT, -- 'task_completed', 'presentation', 'peer_review', 'workshop', 'volunteer'
  source_id UUID, -- İlgili submission/review/meeting ID
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GDR hesaplama fonksiyonu
CREATE OR REPLACE FUNCTION calculate_gdr_score(
  teknik INTEGER,
  takim INTEGER,
  sunum INTEGER,
  guvenilirlik INTEGER,
  sosyal INTEGER
) RETURNS INTEGER AS $$
BEGIN
  RETURN ROUND(
    teknik * 0.35 +
    takim * 0.20 +
    sunum * 0.20 +
    guvenilirlik * 0.15 +
    sosyal * 0.10
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- GDR otomatik güncelleme trigger fonksiyonu
CREATE OR REPLACE FUNCTION update_gdr_score_trigger()
RETURNS TRIGGER AS $$
BEGIN
  NEW.gdr_score := calculate_gdr_score(
    NEW.gdr_teknik_rol,
    NEW.gdr_takim,
    NEW.gdr_sunum,
    NEW.gdr_guvenilirlik,
    NEW.gdr_sosyal_etki
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger oluştur (mevcut trigger varsa önce sil)
DROP TRIGGER IF EXISTS trigger_update_gdr_score ON profiles;
CREATE TRIGGER trigger_update_gdr_score
BEFORE INSERT OR UPDATE OF gdr_teknik_rol, gdr_takim, gdr_sunum, gdr_guvenilirlik, gdr_sosyal_etki
ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_gdr_score_trigger();

-- Leaderboard view (performans için materialized olabilir)
CREATE OR REPLACE VIEW leaderboard_gdr AS
SELECT 
  p.id,
  p.name,
  p.level,
  p.xp,
  p.gdr_score,
  p.gdr_teknik_rol,
  p.gdr_takim,
  p.gdr_sunum,
  p.gdr_guvenilirlik,
  p.gdr_sosyal_etki,
  c.name as cohort_name,
  ROW_NUMBER() OVER (ORDER BY p.gdr_score DESC, p.xp DESC) as rank
FROM profiles p
LEFT JOIN cohorts c ON p.cohort_id = c.id
WHERE p.role = 'student'
ORDER BY p.gdr_score DESC, p.xp DESC;

-- GDR history için RLS
ALTER TABLE gdr_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own GDR history" ON gdr_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert GDR history" ON gdr_history
  FOR INSERT WITH CHECK (true);

-- GDR artırma fonksiyonu (görev tamamlama, sunum vb. için kullanılacak)
CREATE OR REPLACE FUNCTION increment_gdr_component(
  p_user_id UUID,
  p_component TEXT,
  p_amount INTEGER,
  p_reason TEXT DEFAULT NULL,
  p_source_id UUID DEFAULT NULL
) RETURNS INTEGER AS $$
DECLARE
  v_old_value INTEGER;
  v_new_value INTEGER;
  v_column TEXT;
BEGIN
  v_column := 'gdr_' || p_component;
  
  -- Mevcut değeri al
  EXECUTE format('SELECT %I FROM profiles WHERE id = $1', v_column) INTO v_old_value USING p_user_id;
  
  -- Yeni değeri hesapla (max 100)
  v_new_value := LEAST(COALESCE(v_old_value, 0) + p_amount, 100);
  
  -- Güncelle
  EXECUTE format('UPDATE profiles SET %I = $1 WHERE id = $2', v_column) USING v_new_value, p_user_id;
  
  -- History'ye kaydet
  INSERT INTO gdr_history (user_id, component, old_value, new_value, reason, source_id)
  VALUES (p_user_id, p_component, v_old_value, v_new_value, p_reason, p_source_id);
  
  RETURN v_new_value;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Görev tamamlandığında GDR artırma trigger'ı
CREATE OR REPLACE FUNCTION on_submission_verified_gdr()
RETURNS TRIGGER AS $$
DECLARE
  v_task_difficulty TEXT;
  v_gdr_amount INTEGER;
BEGIN
  -- Sadece 'verified' durumuna geçişte çalış
  IF NEW.verification_status = 'verified' AND (OLD.verification_status IS NULL OR OLD.verification_status != 'verified') THEN
    -- Task zorluğuna göre GDR miktarını belirle
    SELECT difficulty INTO v_task_difficulty FROM tasks WHERE id = NEW.task_id;
    
    v_gdr_amount := CASE v_task_difficulty
      WHEN 'easy' THEN 2
      WHEN 'med' THEN 4
      WHEN 'hard' THEN 6
      ELSE 3
    END;
    
    -- Teknik rol GDR'ını artır
    PERFORM increment_gdr_component(NEW.user_id, 'teknik_rol', v_gdr_amount, 'task_completed', NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_submission_verified_gdr ON submissions;
CREATE TRIGGER trigger_submission_verified_gdr
AFTER UPDATE OF verification_status ON submissions
FOR EACH ROW
EXECUTE FUNCTION on_submission_verified_gdr();

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_profiles_gdr_score ON profiles(gdr_score DESC);
CREATE INDEX IF NOT EXISTS idx_gdr_history_user ON gdr_history(user_id, created_at DESC);
