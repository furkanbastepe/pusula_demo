-- PUSULA Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  age INTEGER CHECK (age >= 18 AND age <= 29),
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'guide')),
  cohort_id UUID REFERENCES cohorts(id),
  level TEXT NOT NULL DEFAULT 'cirak' CHECK (level IN ('cirak', 'kalfa', 'usta', 'graduate')),
  xp INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. COHORTS
CREATE TABLE cohorts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sdg_number INTEGER NOT NULL CHECK (sdg_number BETWEEN 1 AND 17),
  problem_theme TEXT NOT NULL,
  start_date DATE NOT NULL,
  guide_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. MICROLABS
CREATE TABLE microlabs (
  id TEXT PRIMARY KEY, -- e.g., 'ML-01'
  title TEXT NOT NULL,
  minutes INTEGER NOT NULL,
  spec_json JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. MICROLAB_ATTEMPTS
CREATE TABLE microlab_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  microlab_id TEXT NOT NULL REFERENCES microlabs(id),
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'done', 'failed')),
  progress_json JSONB NOT NULL DEFAULT '{"current_step": 0, "step_status": [], "answers": {}, "uploads": {}}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, microlab_id)
);

-- 5. TASKS
CREATE TABLE tasks (
  id TEXT PRIMARY KEY, -- e.g., 'T-01'
  title TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('cirak', 'kalfa', 'usta')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'med', 'hard')),
  estimated_hours INTEGER NOT NULL,
  spec_json JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SUBMISSIONS
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL REFERENCES tasks(id),
  evidence_json JSONB NOT NULL DEFAULT '{"items": []}',
  self_assessment JSONB,
  reflection TEXT,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'needs_changes', 'rejected')),
  rubric_score INTEGER CHECK (rubric_score BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- 7. REVIEWS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id),
  rubric_json JSONB NOT NULL DEFAULT '{}',
  decision TEXT NOT NULL CHECK (decision IN ('approved', 'needs_changes', 'rejected')),
  feedback TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. MEETINGS
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('welcome', 'clinic', 'demo', 'workshop')),
  capacity INTEGER NOT NULL DEFAULT 10,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. MEETING_ATTENDANCE
CREATE TABLE meeting_attendance (
  meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'booked' CHECK (status IN ('booked', 'attended', 'no_show')),
  checked_in_at TIMESTAMPTZ,
  PRIMARY KEY (meeting_id, user_id)
);

-- 10. LEVEL_TRANSITIONS
CREATE TABLE level_transitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  from_level TEXT NOT NULL,
  to_level TEXT NOT NULL,
  presentation_date TIMESTAMPTZ,
  approved_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. PORTFOLIO_ITEMS
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('private', 'public')),
  summary_json JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. CERTIFICATES
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  issue_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verification_code TEXT NOT NULL UNIQUE,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_profiles_cohort ON profiles(cohort_id);
CREATE INDEX idx_profiles_level ON profiles(level);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_submissions_task ON submissions(task_id);
CREATE INDEX idx_submissions_status ON submissions(verification_status);
CREATE INDEX idx_microlab_attempts_user ON microlab_attempts(user_id);
CREATE INDEX idx_reviews_submission ON reviews(submission_id);

-- TRIGGER: Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- TRIGGER: Create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, age, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'İsimsiz'),
    COALESCE((NEW.raw_user_meta_data->>'age')::integer, 18),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- RLS POLICIES (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE microlabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE microlab_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_transitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Cohorts: Everyone can read
CREATE POLICY "Cohorts are viewable by everyone" ON cohorts FOR SELECT USING (true);

-- MicroLabs: Published are readable by all
CREATE POLICY "Published microlabs are viewable" ON microlabs FOR SELECT USING (status = 'published');

-- MicroLab Attempts: Users can manage their own
CREATE POLICY "Users can view own attempts" ON microlab_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own attempts" ON microlab_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own attempts" ON microlab_attempts FOR UPDATE USING (auth.uid() = user_id);

-- Tasks: Published are readable
CREATE POLICY "Published tasks are viewable" ON tasks FOR SELECT USING (status = 'published');

-- Submissions: Users can manage own, guides can view all
CREATE POLICY "Users can view own submissions" ON submissions FOR SELECT USING (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'guide')
);
CREATE POLICY "Users can create own submissions" ON submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own pending submissions" ON submissions FOR UPDATE USING (
  auth.uid() = user_id AND verification_status = 'pending'
);

-- Reviews: Guides can manage, users can view own submission reviews
CREATE POLICY "Users can view reviews of own submissions" ON reviews FOR SELECT USING (
  EXISTS (SELECT 1 FROM submissions WHERE id = submission_id AND user_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'guide')
);
CREATE POLICY "Guides can create reviews" ON reviews FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'guide')
);

-- Meetings: Everyone can view
CREATE POLICY "Meetings are viewable by everyone" ON meetings FOR SELECT USING (true);

-- Meeting Attendance: Users can manage own
CREATE POLICY "Users can view own attendance" ON meeting_attendance FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can book meetings" ON meeting_attendance FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own attendance" ON meeting_attendance FOR UPDATE USING (auth.uid() = user_id);

-- Level Transitions: Users can view own
CREATE POLICY "Users can view own transitions" ON level_transitions FOR SELECT USING (auth.uid() = user_id);

-- Portfolio Items: Public are viewable, users manage own
CREATE POLICY "Public portfolio items are viewable" ON portfolio_items FOR SELECT USING (
  visibility = 'public' OR auth.uid() = user_id
);
CREATE POLICY "Users can manage own portfolio" ON portfolio_items FOR ALL USING (auth.uid() = user_id);

-- Certificates: Users can view own
CREATE POLICY "Users can view own certificates" ON certificates FOR SELECT USING (auth.uid() = user_id);
