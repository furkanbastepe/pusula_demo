-- Streak & Notification System Migration
-- Run this in Supabase SQL Editor

-- Add streak fields to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS streak_days INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_activity_date DATE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0;

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('review_result', 'reminder', 'milestone', 'level_ready', 'buddy_review', 'streak_bonus')),
  title TEXT NOT NULL,
  content TEXT,
  metadata JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS for notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_streak ON profiles(streak_days DESC);

-- Function to update streak on activity
CREATE OR REPLACE FUNCTION update_streak()
RETURNS TRIGGER AS $$
DECLARE
  user_profile RECORD;
  today DATE := CURRENT_DATE;
BEGIN
  -- Get user's current streak info
  SELECT streak_days, last_activity_date, longest_streak, xp INTO user_profile
  FROM profiles WHERE id = NEW.user_id;
  
  -- If no previous activity, start streak
  IF user_profile.last_activity_date IS NULL THEN
    UPDATE profiles SET 
      streak_days = 1,
      last_activity_date = today
    WHERE id = NEW.user_id;
  
  -- If activity today, don't increment
  ELSIF user_profile.last_activity_date = today THEN
    -- Do nothing, already counted
    NULL;
  
  -- If activity yesterday, continue streak
  ELSIF user_profile.last_activity_date = today - INTERVAL '1 day' THEN
    UPDATE profiles SET 
      streak_days = streak_days + 1,
      last_activity_date = today,
      longest_streak = GREATEST(longest_streak, streak_days + 1),
      -- Award 50 bonus XP on 7-day streak
      xp = CASE WHEN (streak_days + 1) % 7 = 0 THEN xp + 50 ELSE xp END
    WHERE id = NEW.user_id;
    
    -- Create streak bonus notification on 7-day milestone
    IF (user_profile.streak_days + 1) % 7 = 0 THEN
      INSERT INTO notifications (user_id, type, title, content, metadata)
      VALUES (
        NEW.user_id,
        'streak_bonus',
        '🔥 7 Gün Streak!',
        'Tebrikler! 7 günlük streak tamamladın ve 50 bonus XP kazandın!',
        jsonb_build_object('streak_days', user_profile.streak_days + 1, 'bonus_xp', 50)
      );
    END IF;
  
  -- If gap > 1 day, reset streak
  ELSE
    UPDATE profiles SET 
      streak_days = 1,
      last_activity_date = today
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on submissions (main activity tracking)
DROP TRIGGER IF EXISTS update_streak_on_submission ON submissions;
CREATE TRIGGER update_streak_on_submission
  AFTER INSERT ON submissions
  FOR EACH ROW EXECUTE FUNCTION update_streak();

-- Trigger on microlab_attempts
DROP TRIGGER IF EXISTS update_streak_on_microlab ON microlab_attempts;
CREATE TRIGGER update_streak_on_microlab
  AFTER INSERT ON microlab_attempts
  FOR EACH ROW EXECUTE FUNCTION update_streak();

-- Function to create review notification
CREATE OR REPLACE FUNCTION notify_review_result()
RETURNS TRIGGER AS $$
DECLARE
  submission_user_id UUID;
  task_title TEXT;
BEGIN
  -- Get submission owner and task title
  SELECT s.user_id, t.title INTO submission_user_id, task_title
  FROM submissions s
  JOIN tasks t ON t.id = s.task_id
  WHERE s.id = NEW.submission_id;
  
  -- Create notification based on decision
  INSERT INTO notifications (user_id, type, title, content, metadata)
  VALUES (
    submission_user_id,
    'review_result',
    CASE 
      WHEN NEW.decision = 'approved' THEN '✅ Görev Onaylandı!'
      WHEN NEW.decision = 'needs_changes' THEN '📝 Düzeltme Gerekli'
      ELSE '❌ Görev Reddedildi'
    END,
    task_title || ' görevi için değerlendirme sonucu.',
    jsonb_build_object(
      'submission_id', NEW.submission_id,
      'decision', NEW.decision,
      'feedback', NEW.feedback
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on reviews
DROP TRIGGER IF EXISTS notify_on_review ON reviews;
CREATE TRIGGER notify_on_review
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION notify_review_result();
