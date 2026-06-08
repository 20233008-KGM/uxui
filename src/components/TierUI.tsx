import { Link } from 'react-router-dom'
import { Sparkles, ChevronRight } from 'lucide-react'
import {
  LEADER_TIERS,
  getTierProgress,
  type LeaderTierId,
} from '../data/leaderTier'

export function TierBadge({ tierId, size = 'md' }: { tierId: LeaderTierId; size?: 'sm' | 'md' }) {
  const tier = LEADER_TIERS.find((t) => t.id === tierId) ?? LEADER_TIERS[0]

  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-full ${
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      style={{ background: `${tier.accent}22`, color: tier.accent, border: `1px solid ${tier.accent}44` }}
    >
      <Sparkles size={size === 'sm' ? 10 : 12} />
      {tier.label}
    </span>
  )
}

export function SparkleName({ name, mileage }: { name: string; mileage: number }) {
  const { current } = getTierProgress(mileage)

  return (
    <span className={`inline-flex items-center gap-1.5 ${current.sparkleClass}`}>
      <Sparkles size={16} className="tier-sparkle-icon shrink-0" style={{ color: current.accent }} />
      <span className="font-bold">{name}</span>
    </span>
  )
}

export function TierProgressCard({ mileage, compact = false }: { mileage: number; compact?: boolean }) {
  const { current, next, progress, remaining } = getTierProgress(mileage)

  if (compact) {
    return (
      <Link
        to="/mypage/tier"
        className="block mx-5 mb-4 bg-surface rounded-xl border border-border p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TierBadge tierId={current.id} size="sm" />
            <span className="text-xs text-text-secondary">팀장 마일리지 {mileage.toLocaleString()}</span>
          </div>
          <ChevronRight size={16} className="text-text-secondary" />
        </div>
        {next ? (
          <>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: current.accent }}
              />
            </div>
            <p className="text-[11px] text-text-secondary">
              {next.label}까지 <strong className="text-text">{remaining.toLocaleString()}</strong> 마일리지
            </p>
          </>
        ) : (
          <p className="text-[11px] text-primary font-semibold">최고 등급 달성 · 수수료 95%</p>
        )}
      </Link>
    )
  }

  return null
}
