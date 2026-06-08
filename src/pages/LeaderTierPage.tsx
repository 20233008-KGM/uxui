import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, TrendingUp, Crown } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { TierBadge, SparkleName } from '../components/TierUI'
import { useApp } from '../context/AppContext'
import {
  LEADER_TIERS,
  getTierProgress,
  getLeaderCommission,
  formatCommissionShare,
  MILEAGE_OPEN_GROUP_BUY,
  BASE_COMMISSION,
} from '../data/leaderTier'
import { formatPrice } from '../data/groupBuys'

export default function LeaderTierPage() {
  const navigate = useNavigate()
  const { user, leaderMileage } = useApp()
  const { current, next, progress, remaining } = getTierProgress(leaderMileage)
  const commission = getLeaderCommission(leaderMileage)

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="팀장 등급"
        left={
          <button onClick={() => navigate(-1)} aria-label="뒤로">
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="px-5 py-4 space-y-5 pb-8">
        <div
          className="rounded-2xl p-6 text-center border"
          style={{
            background: `linear-gradient(135deg, ${current.accent}18, ${current.accent}08)`,
            borderColor: `${current.accent}33`,
          }}
        >
          <Crown size={32} style={{ color: current.accent }} className="mx-auto mb-3" />
          <div className="text-xl mb-2">
            <SparkleName name={user?.name ?? '공구러버'} mileage={leaderMileage} />
          </div>
          <TierBadge tierId={current.id} />
          <p className="text-sm text-text-secondary mt-3">
            팀장 마일리지 <strong className="text-text">{leaderMileage.toLocaleString()}</strong>
          </p>
          <p className="text-xs text-primary font-semibold mt-2">
            인당 수수료 {formatPrice(commission)} ({formatCommissionShare(current.commissionShare)})
          </p>
        </div>

        {next && (
          <div className="bg-surface rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-text">다음 등급 · {next.label}</p>
              <span className="text-xs text-text-secondary">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: current.accent }}
              />
            </div>
            <p className="text-xs text-text-secondary">
              <strong className="text-text">{remaining.toLocaleString()}</strong> 마일리지 더 쌓으면{' '}
              {next.label} 등급 · 수수료 {formatCommissionShare(next.commissionShare)}
            </p>
          </div>
        )}

        <div className="bg-primary-light rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-primary" />
            <p className="text-sm font-bold text-text">마일리지 적립</p>
          </div>
          <div className="space-y-2 text-xs text-text-secondary">
            <p>• 공구 개설 완료: +{MILEAGE_OPEN_GROUP_BUY} 마일리지</p>
            <p>• 모집 성공·수령 완료: 추가 적립 (데모)</p>
            <p>• 등급이 올라갈수록 팀장 수수료 비율 증가</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-text mb-3 flex items-center gap-1.5">
            <Sparkles size={16} className="text-primary" />
            등급별 혜택
          </p>
          <div className="space-y-2">
            {LEADER_TIERS.map((tier) => {
              const active = tier.id === current.id
              const comm = Math.round(BASE_COMMISSION * tier.commissionShare)
              return (
                <div
                  key={tier.id}
                  className={`rounded-xl border p-4 ${active ? 'border-primary bg-primary-light/40' : 'border-border bg-surface'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <TierBadge tierId={tier.id} size="sm" />
                    {active && (
                      <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">
                        현재
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mt-2">
                    {tier.minMileage.toLocaleString()} 마일리지 이상 · 인당{' '}
                    <strong className="text-text">{formatPrice(comm)}</strong> ({formatCommissionShare(tier.commissionShare)})
                  </p>
                  {tier.id === 'platinum' && (
                    <p className="text-[11px] text-primary mt-1 font-medium">
                      거래 수수료의 대부분을 팀장 몫으로 정산
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
