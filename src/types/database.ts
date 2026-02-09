// Database Types for PUSULA Platform

export type UserRole = 'student' | 'guide'
export type Level = 'cirak' | 'kalfa' | 'usta' | 'graduate'
export type Difficulty = 'easy' | 'med' | 'hard'
export type VerificationStatus = 'pending' | 'verified' | 'needs_changes' | 'rejected'
export type ReviewDecision = 'approved' | 'needs_changes' | 'rejected'
export type MeetingType = 'welcome' | 'clinic' | 'demo' | 'workshop'
export type AttendanceStatus = 'booked' | 'attended' | 'no_show'

export interface Profile {
    id: string
    email: string
    name: string
    age: number
    role: UserRole
    cohort_id: string | null
    level: Level
    xp: number
    created_at: string
}

export interface Cohort {
    id: string
    name: string
    sdg_number: number
    problem_theme: string
    start_date: string
    guide_id: string
}

export interface MicroLab {
    id: string
    title: string
    minutes: number
    spec_json: MicroLabSpec
    status: 'draft' | 'published'
}

export interface MicroLabSpec {
    prerequisite: string | null
    unlocks: string[]
    steps: MicroLabStep[]
    completion_rule: string
    required_evidence: string[]
}

export interface MicroLabStep {
    type: 'read' | 'quiz' | 'checklist' | 'reflection' | 'upload'
    content: string | QuizContent | string[]
    threshold?: string
    prompt?: string
    min_words?: number
    accept?: string[]
    template?: string
}

export interface QuizContent {
    questions: QuizQuestion[]
}

export interface QuizQuestion {
    q: string
    options: string[]
    correct: number
    explanation: string
}

export interface MicroLabAttempt {
    id: string
    user_id: string
    microlab_id: string
    status: 'in_progress' | 'done' | 'failed'
    progress_json: MicroLabProgress
    created_at: string
    completed_at: string | null
}

export interface MicroLabProgress {
    current_step: number
    step_status: ('pending' | 'done' | 'failed')[]
    answers: Record<number, unknown>
    uploads: Record<number, string>
}

export interface Task {
    id: string
    title: string
    level: Level
    difficulty: Difficulty
    estimated_hours: number
    spec_json: TaskSpec
    status: 'draft' | 'published'
}

export interface TaskSpec {
    sdg_tags: string[]
    prerequisite_microlabs: string[]
    deliverables: string[]
    acceptance_criteria: string[]
    hints: {
        L1: string
        L2: string
        L3: string
    }
    rubric: {
        correctness: number
        quality: number
        ux: number
        evidence: number
    }
    mandatory_evidence: string[]
    presentation: boolean
}

export interface Submission {
    id: string
    user_id: string
    task_id: string
    evidence_json: EvidencePayload
    self_assessment: SelfAssessment
    reflection: string
    verification_status: VerificationStatus
    rubric_score: number | null
    created_at: string
    reviewed_at: string | null
}

export interface EvidencePayload {
    items: EvidenceItem[]
}

export interface EvidenceItem {
    type: 'screenshot' | 'video' | 'file' | 'link' | 'metric'
    url: string
    description?: string
}

export interface SelfAssessment {
    criteria: {
        name: string
        score: number
        note?: string
    }[]
}

export interface Review {
    id: string
    submission_id: string
    reviewer_id: string
    rubric_json: RubricScores
    decision: ReviewDecision
    feedback: string
    created_at: string
}

export interface RubricScores {
    correctness: { score: number; comment?: string }
    quality: { score: number; comment?: string }
    ux: { score: number; comment?: string }
    evidence: { score: number; comment?: string }
}

export interface Meeting {
    id: string
    title: string
    date: string
    type: MeetingType
    capacity: number
    created_by: string
}

export interface MeetingAttendance {
    meeting_id: string
    user_id: string
    status: AttendanceStatus
    checked_in_at: string | null
}

export interface LevelTransition {
    id: string
    user_id: string
    from_level: Level
    to_level: Level
    presentation_date: string
    approved_by: string
    created_at: string
}

export interface PortfolioItem {
    id: string
    user_id: string
    submission_id: string
    visibility: 'private' | 'public'
    summary_json: PortfolioSummary
}

export interface PortfolioSummary {
    problem: string
    solution: string
    impact: string
    evidence_urls: string[]
}

export interface Certificate {
    id: string
    user_id: string
    issue_date: string
    verification_code: string
    pdf_url: string
}
