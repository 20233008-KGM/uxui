import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Share2,
  MapPin,
  Clock,
  ChevronRight,
  MessageCircle,
  Package,
  ShieldCheck,
  Ban,
} from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { SafePayBadge, SafePayBanner } from '../components/SafePayBadge'
import { RepurchaseBanner, PolicySection } from '../components/FlowHelpers'
import { DistanceBadge, DistanceWarning } from '../components/LocationUI'
import {
  groupBuys,
  formatPrice,
  getProgress,
  getStatusStyle,
  getGroupBuyDistance,
} from '../data/groupBuys'
import { getRepurchaseSuggestion } from '../data/purchaseHistory'
import { useApp } from '../context/AppContext'
import { canJoinGroupBuy } from '../data/locations'
import { rangeLabels } from '../data/notifications'

export default function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { participationRange } = useApp()
  const item = groupBuys.find((g) => g.id === id) ?? groupBuys[0]
  const progress = getProgress(item.current, item.max)
  const distance = getGroupBuyDistance(item)
  const canJoin = canJoinGroupBuy(distance, participationRange, item.visibilityRange)
  const discount = item.originalPrice
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : 0
  const repurchase = getRepurchaseSuggestion(item.title)

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="공구 상세"
        left={
          <button onClick={() => navigate(-1)} aria-label="뒤로">
            <ArrowLeft size={22} />
          </button>
        }
        right={
          <button aria-label="공유">
            <Share2 size={20} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="h-52 bg-[#f2f2ee] flex items-center justify-center relative">
          <Package size={64} className="text-gray-400" strokeWidth={1.5} />
          <div className="absolute top-3 left-3">
            <SafePayBadge size="md" />
          </div>
          <div className="absolute top-3 right-3">
            <DistanceBadge meters={distance} />
          </div>
        </div>

        <div className="bg-surface px-5 py-5">
          {repurchase && <RepurchaseBanner suggestion={repurchase} />}
          <DistanceWarning
            meters={distance}
            participationRange={participationRange}
            visibilityRange={item.visibilityRange}
            canJoin={canJoin}
          />
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${getStatusStyle(item.status)}`}
          >
            {item.statusLabel}
          </span>
          <h2 className="text-xl font-bold text-text mb-3">{item.title}</h2>
          <div className="flex items-center gap-4 text-sm text-text-secondary mb-4 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {item.pickupPoint.label} 수령
            </span>
            <DistanceBadge meters={distance} compact />
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {item.daysLeft}
            </span>
          </div>

          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-text">{formatPrice(item.price)} / 1인</span>
            </div>
            {item.originalPrice && (
              <div className="text-right">
                <span className="text-sm text-text-secondary line-through block">
                  {formatPrice(item.originalPrice)}
                </span>
                <span className="text-sm font-semibold text-primary">{discount}% 절약</span>
              </div>
            )}
          </div>

          <div className="flex justify-between text-xs text-text-secondary mb-2">
            <span>현재 {item.current}명 참여중</span>
            <span>목표 {item.max}명</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-2 px-5 py-4 bg-surface">
          <SafePayBanner compact />
        </div>

        <div className="mt-2 bg-surface px-5 py-4">
          <p className="text-xs text-text-secondary mb-3">팀장 정보</p>
          <button className="w-full flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
              김
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-text">김신림</p>
              <p className="text-xs text-text-secondary">거래 12회 · 후기 좋아요 98%</p>
            </div>
            <ChevronRight size={18} className="text-text-secondary" />
          </button>
        </div>

        <div className="mt-2 bg-surface px-5 py-4">
          <p className="text-xs text-text-secondary mb-3">공구 정보</p>
          <div className="divide-y divide-border">
            {[
              ['결제 방식', '공구페이 안전거래 (에스크로)'],
              ['수령 위치', `${item.pickupPoint.label} (팀장 공유)`],
              ['나와의 거리', `${distance < 1000 ? `${distance}m` : `${(distance / 1000).toFixed(1)}km`}`],
              ['팀장 노출 범위', rangeLabels[item.visibilityRange]],
              ['내 참여 범위', rangeLabels[participationRange]],
              ['수령 방법', '팀장 집 방문 수령'],
              ['상세 주소', '모집 확정 후 공개'],
              ['도착 예정', '모집 완료 후 2~3일'],
              ['최소 인원', '3명 (미달 시 자동 환불)'],
              ['정산 시점', '수령 확인 후 팀장 정산'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-3 text-sm gap-4">
                <span className="text-text-secondary shrink-0">{label}</span>
                <span
                  className={`text-right font-medium ${label === '결제 방식' ? 'text-primary' : 'text-text'}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <PolicySection />
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4 flex gap-3">
        <Link
          to="/chat"
          className="w-12 h-12 shrink-0 rounded-xl border border-border flex items-center justify-center"
        >
          <MessageCircle size={22} className="text-text-secondary" />
        </Link>
        {canJoin ? (
          <Link
            to={`/payment/${item.id}`}
            className="flex-1 h-12 bg-primary text-white font-bold rounded-xl text-base flex items-center justify-center gap-2"
          >
            <ShieldCheck size={18} />
            공구페이 · {formatPrice(item.price)}
          </Link>
        ) : (
          <button
            disabled
            className="flex-1 h-12 bg-gray-200 text-text-secondary font-bold rounded-xl text-sm flex items-center justify-center gap-2"
          >
            <Ban size={18} />
            참여 범위 밖
          </button>
        )}
      </div>
    </div>
  )
}
