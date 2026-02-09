-- Migration 007: Platform Redesign
-- Adds tables and columns for the complete student journey

-- ============================================
-- NEW TABLES
-- ============================================

-- Physical center check-in tracking
CREATE TABLE IF NOT EXISTS check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  code TEXT NOT NULL,
  checked_in_at TIMESTAMPTZ DEFAULT NOW(),
  checked_out_at TIMESTAMPTZ,
  location TEXT DEFAULT 'digem-eskisehir',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, DATE(checked_in_at))
);

-- Buddy peer reviews
CREATE TABLE IF NOT EXISTS buddy_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  buddy_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  comment TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  helpful_tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workshops/Atölyeler
CREATE TABLE IF NOT EXISTS workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 90,
  facilitator_id UUID REFERENCES profiles(id),
  cohort_id UUID REFERENCES cohorts(id),
  max_capacity INTEGER DEFAULT 15,
  location TEXT DEFAULT 'DiGEM Merkez',
  workshop_type TEXT CHECK (workshop_type IN ('skill', 'project', 'demo', 'mentor_clinic')) DEFAULT 'skill',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workshop attendance tracking
CREATE TABLE IF NOT EXISTS workshop_attendance (
  workshop_id UUID REFERENCES workshops(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  attended BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (workshop_id, user_id)
);

-- AI mentor conversation history
CREATE TABLE IF NOT EXISTS mentor_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  messages JSONB DEFAULT '[]',
  context_type TEXT CHECK (context_type IN ('general', 'task', 'microlab', 'simulation', 'career')),
  context_id TEXT,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Onboarding user goals and interests
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  goals TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  sdg_interests INTEGER[] DEFAULT '{}',
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  weekly_hours INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COLUMN ADDITIONS TO EXISTING TABLES
-- ============================================

-- profiles additions
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS soyad TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS buddy_id UUID REFERENCES profiles(id);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'lead' CHECK (status IN ('lead', 'active', 'paused', 'graduated', 'dropped'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS check_in_active BOOLEAN DEFAULT FALSE;

-- tasks additions
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS phase TEXT CHECK (phase IN ('kesif', 'insa', 'etki'));
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS sdg_tags INTEGER[];

-- microlabs additions
ALTER TABLE microlabs ADD COLUMN IF NOT EXISTS phase TEXT CHECK (phase IN ('kesif', 'insa', 'etki'));

-- cohorts additions
ALTER TABLE cohorts ADD COLUMN IF NOT EXISTS problem_card JSONB;

-- certificates additions
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS sdg_number INTEGER;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS cohort_name TEXT;

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_check_ins_user_date ON check_ins(user_id, DATE(checked_in_at));
CREATE INDEX IF NOT EXISTS idx_buddy_reviews_submission ON buddy_reviews(submission_id);
CREATE INDEX IF NOT EXISTS idx_workshops_date ON workshops(date);
CREATE INDEX IF NOT EXISTS idx_mentor_conversations_user ON mentor_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_last_active ON profiles(last_active_at);

-- ============================================
-- RLS POLICIES
-- ============================================

-- check_ins
ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own check-ins" ON check_ins
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own check-ins" ON check_ins
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Guides can view all check-ins" ON check_ins
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'guide')
  );

-- buddy_reviews
ALTER TABLE buddy_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reviews they're involved in" ON buddy_reviews
  FOR SELECT USING (
    auth.uid() = reviewer_id OR auth.uid() = buddy_id
  );

CREATE POLICY "Users can create reviews as reviewer" ON buddy_reviews
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- workshops
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workshops" ON workshops
  FOR SELECT USING (true);

CREATE POLICY "Guides can manage workshops" ON workshops
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'guide')
  );

-- workshop_attendance
ALTER TABLE workshop_attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attendance" ON workshop_attendance
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can register for workshops" ON workshop_attendance
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Guides can manage attendance" ON workshop_attendance
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'guide')
  );

-- mentor_conversations
ALTER TABLE mentor_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own conversations" ON mentor_conversations
  FOR ALL USING (auth.uid() = user_id);

-- user_goals
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own goals" ON user_goals
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Guides can view user goals" ON user_goals
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'guide')
  );

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to generate daily check-in code
CREATE OR REPLACE FUNCTION generate_checkin_code()
RETURNS TEXT AS $$
BEGIN
  RETURN UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
END;
$$ LANGUAGE plpgsql;

-- Function to update last_active_at
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles SET last_active_at = NOW() WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for last_active on submissions
DROP TRIGGER IF EXISTS trigger_update_last_active_submissions ON submissions;
CREATE TRIGGER trigger_update_last_active_submissions
AFTER INSERT ON submissions
FOR EACH ROW
EXECUTE FUNCTION update_last_active();

-- Trigger for last_active on check_ins
DROP TRIGGER IF EXISTS trigger_update_last_active_checkins ON check_ins;
CREATE TRIGGER trigger_update_last_active_checkins
AFTER INSERT ON check_ins
FOR EACH ROW
EXECUTE FUNCTION update_last_active();
