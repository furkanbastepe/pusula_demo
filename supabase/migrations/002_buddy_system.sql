-- Buddy System Migration
-- Run this in Supabase SQL Editor

-- Add buddy_id to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS buddy_id UUID REFERENCES profiles(id);

-- Add buddy_reviewed flag to submissions
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS buddy_reviewed BOOLEAN DEFAULT false;

-- Create buddy_reviews table for peer feedback
CREATE TABLE IF NOT EXISTS buddy_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  buddy_id UUID NOT NULL REFERENCES profiles(id),
  comment TEXT,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS for buddy_reviews
ALTER TABLE buddy_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view buddy reviews on their submissions" ON buddy_reviews
  FOR SELECT USING (
    buddy_id = auth.uid() OR 
    submission_id IN (SELECT id FROM submissions WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create buddy reviews" ON buddy_reviews
  FOR INSERT WITH CHECK (buddy_id = auth.uid());

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_profiles_buddy_id ON profiles(buddy_id);
CREATE INDEX IF NOT EXISTS idx_buddy_reviews_submission ON buddy_reviews(submission_id);
