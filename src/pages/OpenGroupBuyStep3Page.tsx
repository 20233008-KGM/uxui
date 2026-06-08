import { Link } from 'react-router-dom'
import { X, ShieldCheck, CheckCircle2, MapPin, Eye, TrendingUp, Crown } from 'lucide-react'
import { StatusBar } from '../components/Layout'
import { StepIndicator } from './OpenGroupBuyStep2Page'
import { formatPrice } from '../data/groupBuys'
import { useApp } from '../context/AppContext'
import { rangeLabels } from '../data/notifications'
import {
  getLeaderCommission,
  getTierFromMileage,
  formatCommissionShare,
  MILEAGE_OPEN_GROUP_BUY,
  BASE_COMMISSION,
} from '../data/leaderTier'
import { getCatalogProduct } from '../data/productCatalog'
import { TierBadge } from '../components/TierUI'

const leaderTiers = [
  { members: 3, bonus: 0, label: '기본' },
  { members: 5, bonus: 500, label: '5명 달성 +500P' },
  { members: 8, bonus: 1500, label: '8명 달성 +1,500P' },
]

export default function OpenGroupBuyStep3Page() {
  const {
    leaderPickupLocation,
    leaderDetailAddress,
    openVisibilityRange,
    leaderMileage,
    selectedCatalogProductId,
  } = useApp()
  const product = getCatalogProduct(selectedCatalogProductId)
  const leaderShare = product.pricePerPerson
  const tier = getTierFromMileage(leaderMileage)
  const commission = getLeaderCommission(leaderMileage)

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <StatusBar />
      <div className="bg-surface border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/open/step2" aria-label="닫기">
            <X size={22} />
          </Link>
          <h1 className="text-base font-bold text-text">공구 열기</h1>
          <span className="text-sm text-text-secondary">3/3</span>
        </div>
        <StepIndicator current={3} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28 space-y-4">
        <div className="bg-surface rounded-xl border border-border p-4 flex gap-3">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-16 h-16 rounded-lg object-cover shrink-0"
          />
          <div>
            <p className="text-xs text-text-secondary">플랫폼 제공 품목</p>
            <p className="font-bold text-sm text-text">{product.title}</p>
            <p className="text-sm font-semibold text-primary">{formatPrice(leaderShare)}/인 · 고정가</p>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-3">
          <Crown size={20} style={{ color: tier.accent }} className="shrink-0" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <TierBadge tierId={tier.id} size="sm" />
              <span className="text-xs text-text-secondary">
                {formatCommissionShare(tier.commissionShare)} 수수료
              </span>
            </div>
            <p className="text-xs text-text-secondary">
              개설 완료 시 +{MILEAGE_OPEN_GROUP_BUY} 마일리지 ·{' '}
              <Link to="/mypage/tier" className="text-primary font-semibold">
                등급 보기
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-3">
          <MapPin size={20} className="text-primary shrink-0" />
          <div>
            <p className="text-xs text-text-secondary">공유된 수령 위치</p>
            <p className="font-bold text-sm text-text">{leaderPickupLocation.label}</p>
            {leaderDetailAddress && (
              <p className="text-xs text-text-secondary">{leaderDetailAddress} (확정 후 공개)</p>
            )}
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border p-4 flex items-center gap-3">
          <Eye size={20} className="text-primary shrink-0" />
          <div>
            <p className="text-xs text-text-secondary">참여자 노출 범위</p>
            <p className="font-bold text-sm text-text">{rangeLabels[openVisibilityRange]}</p>
          </div>
        </div>

        <div className="bg-primary-light rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-primary" />
            <p className="text-sm font-bold text-text">팀장 수수료 · 보너스</p>
          </div>
          <p className="text-xs text-primary-dark leading-relaxed mb-3">
            {tier.label} 등급 · 참여자 수령 확인 후 인당{' '}
            <strong>{formatPrice(commission)}</strong> ({formatCommissionShare(tier.commissionShare)} of{' '}
            {formatPrice(BASE_COMMISSION)}).
            5명 모집 시 총 {formatPrice(commission * 5)} 예상.
          </p>
          <div className="space-y-2">
            {leaderTiers.map((t) => (
              <div
                key={t.members}
                className="flex justify-between text-xs bg-white/60 rounded-lg px-3 py-2"
              >
                <span className="text-text-secondary">{t.label}</span>
                <span className="font-semibold text-primary">
                  {t.bonus > 0 ? `+${t.bonus}P 보너스` : '기본 수수료'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4">
          <p className="text-xs text-text-secondary mb-3">팀장 1인분 결제 (공구페이)</p>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-secondary">1인 공구 금액</span>
            <span>{formatPrice(leaderShare)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
            <span>결제 금액</span>
            <span>{formatPrice(leaderShare)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-primary bg-primary-light/50">
          <ShieldCheck size={20} className="text-primary" />
          <div>
            <p className="font-bold text-sm">공구페이 안전거래</p>
            <p className="text-xs text-text-secondary">모집 실패 시 자동 환불</p>
          </div>
          <CheckCircle2 size={20} className="text-primary ml-auto" />
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          {[
            '수령 위치·노출 범위가 참여자에게 표시됩니다',
            '팀장도 참여자와 동일하게 에스크로 결제',
            '모집 성공 시 채팅방 자동 생성',
            '참여자 수령 확인 후 등급별 수수료 정산',
          ].map((t) => (
            <div key={t} className="flex items-start gap-2 text-xs text-text-secondary">
              <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4">
        <Link
          to="/recruitment/leader-success"
          className="flex w-full h-12 bg-primary text-white font-bold rounded-xl items-center justify-center gap-2"
        >
          <ShieldCheck size={18} />
          {formatPrice(leaderShare)} 안전결제하고 공구 열기
        </Link>
      </div>
    </div>
  )
}
