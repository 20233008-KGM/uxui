import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Share2,
  MapPin,
  Clock,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Ban,
} from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { SafePayBadge, SafePayBanner } from '../components/SafePayBadge'
import { RepurchaseBanner, PolicySection } from '../components/FlowHelpers'
import { DistanceBadge, DistanceWarning } from '../components/LocationUI'
import { ProductImage } from '../components/ProductImage'
import { MapPreview } from '../components/MapPreview'
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
  const distanceText = distance < 1000 ? `${distance}m` : `${(distance / 1000).toFixed(1)}km`

  // 가격·진행 정보 패널 — 모바일은 본문 흐름, 데스크톱은 우측 고정 패널에서 재사용
  const buyPanel = (
    <>
      <span
        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${getStatusStyle(item.status)}`}
      >
        {item.statusLabel}
      </span>
      <h2 className="text-xl lg:text-2xl font-bold text-text mb-3 leading-snug tracking-tight">
        {item.title}
      </h2>
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
        <span className="text-2xl lg:text-3xl font-bold text-text">{formatPrice(item.price)} / 1인</span>
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
        <span>최소 {item.min}명 · 목표 {item.max}명</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
      </div>
    </>
  )

  const ctaButtons = (
    <>
      <Link
        to="/chat"
        aria-label="팀장에게 채팅 문의"
        className="w-12 h-12 lg:w-full lg:h-12 shrink-0 rounded-xl border border-border flex items-center justify-center gap-2 lg:order-2 text-text-secondary"
      >
        <MessageCircle size={22} />
        <span className="hidden lg:inline text-sm font-semibold">채팅 문의</span>
      </Link>
      {canJoin ? (
        <Link
          to={`/payment/${item.id}`}
          className="flex-1 lg:w-full lg:order-1 h-12 bg-primary text-white font-bold rounded-xl text-base flex items-center justify-center gap-2"
        >
          <ShieldCheck size={18} />
          공구페이 · {formatPrice(item.price)}
        </Link>
      ) : (
        <button
          disabled
          className="flex-1 lg:w-full lg:order-1 h-12 bg-gray-200 text-text-secondary font-bold rounded-xl text-sm flex items-center justify-center gap-2"
        >
          <Ban size={18} />
          참여 범위 밖
        </button>
      )}
    </>
  )

  return (
    <div className="min-h-full bg-bg lg:bg-transparent">
      {/* 모바일 헤더 */}
      <div className="lg:hidden">
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
      </div>

      {/* 데스크톱 상단 바 */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-text"
        >
          <ArrowLeft size={18} />
          뒤로
        </button>
        <button aria-label="공유" className="text-text-secondary hover:text-text">
          <Share2 size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 lg:pb-0 lg:overflow-visible lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8 lg:items-start">
        {/* 좌측: 이미지 + 상세 정보 */}
        <div className="lg:space-y-4">
          <div className="relative h-52 lg:h-[460px] lg:rounded-2xl lg:overflow-hidden lg:border lg:border-border">
            <ProductImage item={item} className="h-52 lg:h-[460px]" />
            <div className="absolute top-3 left-3">
              <SafePayBadge size="md" />
            </div>
            <div className="absolute top-3 right-3">
              <DistanceBadge meters={distance} />
            </div>
          </div>

          <div className="bg-surface px-5 py-5 lg:rounded-2xl lg:border lg:border-border">
            {repurchase && <RepurchaseBanner suggestion={repurchase} />}
            <DistanceWarning
              meters={distance}
              participationRange={participationRange}
              visibilityRange={item.visibilityRange}
              canJoin={canJoin}
            />
            {/* 가격 패널 — 모바일에서만 본문에 노출 (데스크톱은 우측 패널) */}
            <div className="lg:hidden">{buyPanel}</div>
            {/* 데스크톱 상세 설명 자리 표시 */}
            <p className="hidden lg:block text-sm text-text-secondary leading-relaxed">
              이웃과 함께 대량으로 구매해 더 저렴하게 받는 공동구매예요. 결제금은 공구페이
              에스크로에 안전하게 보관되며, 모집 인원이 최소 {item.min}명에 도달하지 못하면 자동
              환불됩니다.
            </p>
          </div>

          <div className="mt-2 lg:mt-0 px-5 py-4 bg-surface lg:rounded-2xl lg:border lg:border-border">
            <SafePayBanner compact />
          </div>

          <div className="mt-2 lg:mt-0 bg-surface px-5 py-4 lg:rounded-2xl lg:border lg:border-border">
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

          <div className="mt-2 lg:mt-0 bg-surface px-5 py-4 lg:rounded-2xl lg:border lg:border-border">
            <p className="text-xs text-text-secondary mb-3">공구 정보</p>
            <div className="divide-y divide-border">
              {[
                ['결제 방식', '공구페이 안전거래 (에스크로)'],
                ['수령 위치', `${item.pickupPoint.label} (팀장 공유)`],
                ['나와의 거리', distanceText],
                ['팀장 노출 범위', rangeLabels[item.visibilityRange]],
                ['내 참여 범위', rangeLabels[participationRange]],
                ['수령 방법', '팀장 집 방문 수령'],
                ['상세 주소', '모집 확정 후 공개'],
                ['도착 예정', '모집 완료 후 2~3일'],
                ['최소 인원', `${item.min}명 (미달 시 자동 환불)`],
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

          <div className="mt-2 lg:mt-0 bg-surface px-5 py-4 lg:rounded-2xl lg:border lg:border-border">
            <p className="text-xs text-text-secondary mb-3">수령 위치 지도</p>
            <MapPreview point={item.pickupPoint} height={160} />
            <p className="text-[11px] text-text-secondary mt-2">
              상세 주소는 모집 확정 후 공개 · 거리 {distanceText}
            </p>
          </div>

          <PolicySection />
        </div>

        {/* 우측: 데스크톱 고정 구매 패널 */}
        <aside className="hidden lg:block lg:sticky lg:top-6 self-start">
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-[var(--shadow-lr-md)]">
            {buyPanel}
            <div className="flex gap-3 mt-6 flex-col">{ctaButtons}</div>
          </div>
        </aside>
      </div>

      {/* 모바일 하단 고정 CTA */}
      <div className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4 flex gap-3">
        {ctaButtons}
      </div>
    </div>
  )
}
