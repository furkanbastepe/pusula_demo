// Leaderboard Utility Functions

import { LeaderboardEntry, LeaderboardMetric } from './leaderboard-engine';

/**
 * Format rank with ordinal suffix
 */
export function formatRank(rank: number): string {
  return `${rank}. Sıra`;
}

/**
 * Get rank color based on position
 */
export function getRankColor(rank: number, totalParticipants: number): string {
  if (rank === 1) return '#FFD700'; // Gold
  if (rank === 2) return '#C0C0C0'; // Silver
  if (rank === 3) return '#CD7F32'; // Bronze
  if (rank <= 10) return '#3b82f6'; // Blue
  if (rank <= totalParticipants * 0.25) return '#10b981'; // Green
  return '#6b7280'; // Gray
}

/**
 * Get rank icon
 */
export function getRankIcon(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  if (rank <= 10) return '⭐';
  return '📍';
}

/**
 * Format change indicator
 */
export function formatChange(change: number): {
  text: string;
  icon: string;
  color: string;
} {
  if (change > 0) {
    return {
      text: `+${change}`,
      icon: '↑',
      color: '#10b981' // Green
    };
  } else if (change < 0) {
    return {
      text: `${change}`,
      icon: '↓',
      color: '#ef4444' // Red
    };
  } else {
    return {
      text: '—',
      icon: '→',
      color: '#6b7280' // Gray
    };
  }
}

/**
 * Get metric unit
 */
export function getMetricUnit(metric: LeaderboardMetric): string {
  const units: Record<LeaderboardMetric, string> = {
    xp: 'XP',
    streak: 'gün',
    modules_completed: 'modül',
    tasks_completed: 'görev',
    badges: 'rozet',
    social_impact: 'puan',
    collaboration: 'işbirliği',
    mentorship: 'mentorluk',
    physical_visits: 'ziyaret',
    gdr_score: 'puan'
  };
  return units[metric] || 'puan';
}

/**
 * Format score with unit
 */
export function formatScore(score: number, metric: LeaderboardMetric): string {
  const unit = getMetricUnit(metric);
  return `${score.toLocaleString('tr-TR')} ${unit}`;
}

/**
 * Get percentile message
 */
export function getPercentileMessage(percentile: number): string {
  if (percentile >= 99) return 'En iyi %1\'desin! 🌟';
  if (percentile >= 90) return 'En iyi %10\'dasın! ⭐';
  if (percentile >= 75) return 'En iyi %25\'tesin! ✨';
  if (percentile >= 50) return 'Ortalamanın üstündesin! 💪';
  return 'Devam et, ilerliyorsun! 🚀';
}

/**
 * Calculate progress to next rank
 */
export function calculateProgressToNextRank(
  currentScore: number,
  nextRankScore: number
): {
  percentage: number;
  remaining: number;
} {
  if (nextRankScore <= currentScore) {
    return { percentage: 100, remaining: 0 };
  }

  const percentage = Math.round((currentScore / nextRankScore) * 100);
  const remaining = nextRankScore - currentScore;

  return { percentage, remaining };
}

/**
 * Get leaderboard tier
 */
export function getLeaderboardTier(rank: number, totalParticipants: number): {
  name: string;
  color: string;
  icon: string;
} {
  const percentage = (rank / totalParticipants) * 100;

  if (percentage <= 1) {
    return { name: 'Efsane', color: '#FFD700', icon: '👑' };
  } else if (percentage <= 5) {
    return { name: 'Usta', color: '#C0C0C0', icon: '💎' };
  } else if (percentage <= 10) {
    return { name: 'Uzman', color: '#CD7F32', icon: '🔥' };
  } else if (percentage <= 25) {
    return { name: 'İleri Seviye', color: '#3b82f6', icon: '⚡' };
  } else if (percentage <= 50) {
    return { name: 'Orta Seviye', color: '#10b981', icon: '🌟' };
  } else {
    return { name: 'Başlangıç', color: '#6b7280', icon: '🌱' };
  }
}

/**
 * Generate motivational message based on rank
 */
export function getMotivationalMessage(
  rank: number,
  change: number,
  totalParticipants: number
): string {
  const messages = {
    top1: [
      'Muhteşem! Liderliğini sürdür! 👑',
      'Zirvedesin! Harika bir performans! 🏆',
      'Birinci sıradasın! Tebrikler! 🥇'
    ],
    top3: [
      'Harika! Podyumdasın! 🥈',
      'Muhteşem bir başarı! 🥉',
      'Top 3\'tesin! Devam et! ⭐'
    ],
    top10: [
      'Top 10\'dasın! Harika gidiyorsun! 🌟',
      'Çok iyi! Zirveye yaklaşıyorsun! ⚡',
      'Etkileyici bir performans! 💪'
    ],
    rising: [
      `${change} sıra yükseldin! Harika! 🚀`,
      'Hızlı ilerliyorsun! Devam et! 📈',
      'Yükselişin etkileyici! 🔥'
    ],
    falling: [
      'Biraz geride kaldın, hadi tekrar gaza gel! 💪',
      'Geri dönüş zamanı! Sen yaparsın! 🎯',
      'Küçük bir düşüş, büyük bir geri dönüş için hazırlan! 🚀'
    ],
    stable: [
      'Tutarlı bir performans! Devam et! ✨',
      'İyi gidiyorsun! Biraz daha hız ver! ⚡',
      'Sıralamanda sabitsin, şimdi yükselme zamanı! 🌟'
    ]
  };

  if (rank === 1) {
    return messages.top1[Math.floor(Math.random() * messages.top1.length)];
  } else if (rank <= 3) {
    return messages.top3[Math.floor(Math.random() * messages.top3.length)];
  } else if (rank <= 10) {
    return messages.top10[Math.floor(Math.random() * messages.top10.length)];
  } else if (change > 5) {
    return messages.rising[Math.floor(Math.random() * messages.rising.length)];
  } else if (change < -5) {
    return messages.falling[Math.floor(Math.random() * messages.falling.length)];
  } else {
    return messages.stable[Math.floor(Math.random() * messages.stable.length)];
  }
}

/**
 * Get achievement suggestions based on leaderboard position
 */
export function getAchievementSuggestions(
  entry: LeaderboardEntry,
  metric: LeaderboardMetric
): string[] {
  const suggestions: string[] = [];

  if (entry.rank > 10) {
    suggestions.push(`Top 10'a girmek için ${entry.rank - 10} sıra daha yüksel`);
  }

  if (entry.rank > 3) {
    suggestions.push('Podyuma çıkmak için daha fazla çalış');
  }

  if (entry.change <= 0) {
    suggestions.push('Sıralamanda yükseliş için aktif ol');
  }

  // Metric-specific suggestions
  switch (metric) {
    case 'xp':
      suggestions.push('Daha fazla modül ve görev tamamla');
      break;
    case 'streak':
      suggestions.push('Her gün aktif olmaya devam et');
      break;
    case 'modules_completed':
      suggestions.push('Yeni MicroLab modüllerine başla');
      break;
    case 'tasks_completed':
      suggestions.push('Bekleyen görevlerini tamamla');
      break;
    case 'collaboration':
      suggestions.push('Buddy\'nle daha fazla çalış');
      break;
    case 'physical_visits':
      suggestions.push('DiGEM\'e daha sık gel');
      break;
  }

  return suggestions.slice(0, 3);
}

/**
 * Compare two leaderboard entries
 */
export function compareEntries(
  a: LeaderboardEntry,
  b: LeaderboardEntry
): number {
  // Primary: score (descending)
  if (a.score !== b.score) {
    return b.score - a.score;
  }

  // Secondary: change (descending)
  if (a.change !== b.change) {
    return b.change - a.change;
  }

  // Tertiary: alphabetical by name
  return a.name.localeCompare(b.name, 'tr');
}

/**
 * Group leaderboard by level
 */
export function groupByLevel(
  leaderboard: LeaderboardEntry[]
): Map<string, LeaderboardEntry[]> {
  const grouped = new Map<string, LeaderboardEntry[]>();

  leaderboard.forEach(entry => {
    const level = entry.level;
    if (!grouped.has(level)) {
      grouped.set(level, []);
    }
    grouped.get(level)!.push(entry);
  });

  return grouped;
}

/**
 * Get leaderboard highlights
 */
export function getLeaderboardHighlights(
  leaderboard: LeaderboardEntry[]
): {
  topPerformer: LeaderboardEntry | undefined;
  biggestRiser: LeaderboardEntry | undefined;
  mostImproved: LeaderboardEntry | undefined;
  consistentPerformer: LeaderboardEntry | undefined;
} {
  const topPerformer = leaderboard[0];
  
  const biggestRiser = [...leaderboard]
    .filter(e => e.change > 0)
    .sort((a, b) => b.change - a.change)[0];

  const mostImproved = [...leaderboard]
    .filter(e => e.change > 0 && e.rank > 10)
    .sort((a, b) => b.change - a.change)[0];

  const consistentPerformer = [...leaderboard]
    .filter(e => e.rank <= 10 && Math.abs(e.change) <= 2)
    .sort((a, b) => a.rank - b.rank)[0];

  return {
    topPerformer,
    biggestRiser,
    mostImproved,
    consistentPerformer
  };
}
