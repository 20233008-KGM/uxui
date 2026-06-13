export type LeaderTierId = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface LeaderTier {
  id: LeaderTierId
  label: string
  minMileage: number
  /** 팀장이 받는 수수료 비율 (0~1) */
  commissionShare: number
  accent: string
  sparkleClass: string
}

export const LEADER_TIERS: LeaderTier[] = [
  {
    id: 'bronze',
    label: '브론즈',
    minMileage: 0,
    commissionShare: 0.5,
    accent: '#cd7f32',
    sparkleClass: 'tier-name-bronze',
  },
  {
    id: 'silver',
    label: '실버',
    minMileage: 500,
    commissionShare: 0.65,
    accent: '#94a3b8',
    sparkleClass: 'tier-name-silver',
  },
  {
    id: 'gold',
    label: '골드',
    minMileage: 1500,
    commissionShare: 0.8,
    accent: '#eab308',
    sparkleClass: 'tier-name-gold',
  },
  {
    id: 'platinum',
    label: '플래티넘',
    minMileage: 3000,
    commissionShare: 0.95,
    accent: '#818cf8',
    sparkleClass: 'tier-name-platinum',
  },
]

export const BASE_COMMISSION = 800

/** 공구 1회 개설 시 적립 */
export const MILEAGE_OPEN_GROUP_BUY = 250

export function getTierFromMileage(mileage: number): LeaderTier {
  let current = LEADER_TIERS[0]
  for (const tier of LEADER_TIERS) {
    if (mileage >= tier.minMileage) current = tier
  }
  return current
}

export function getNextTier(mileage: number): LeaderTier | null {
  const current = getTierFromMileage(mileage)
  const idx = LEADER_TIERS.findIndex((t) => t.id === current.id)
  return idx < LEADER_TIERS.length - 1 ? LEADER_TIERS[idx + 1] : null
}

export function getTierProgress(mileage: number) {
  const current = getTierFromMileage(mileage)
  const next = getNextTier(mileage)

  if (!next) {
    return {
      current,
      next: null as LeaderTier | null,
      progress: 100,
      remaining: 0,
    }
  }

  const range = next.minMileage - current.minMileage
  const earned = mileage - current.minMileage
  const progress = Math.min(100, Math.round((earned / range) * 100))
  const remaining = next.minMileage - mileage

  return { current, next, progress, remaining }
}

export function getLeaderCommission(mileage: number, perPerson = BASE_COMMISSION) {
  const tier = getTierFromMileage(mileage)
  return Math.round(perPerson * tier.commissionShare)
}

export function formatCommissionShare(share: number) {
  return `${Math.round(share * 100)}%`
}

/** 데모: 4등급 동일 확률(25%) — 새로고침마다 해당 구간 마일리지 반환 */
export function getRandomDemoMileage(): number {
  const idx = Math.floor(Math.random() * LEADER_TIERS.length)
  const tier = LEADER_TIERS[idx]
  const nextTier = LEADER_TIERS[idx + 1]

  if (!nextTier) {
    return tier.minMileage + Math.floor(Math.random() * 801)
  }

  const max = nextTier.minMileage - 1
  return tier.minMileage + Math.floor(Math.random() * (max - tier.minMileage + 1))
}
