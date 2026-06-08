import { Link } from 'react-router-dom'
import type { GroupBuy } from '../data/groupBuys'
import { formatPrice, getProgress, getStatusStyle, getGroupBuyDistance, isBelowMinimum, getMinMembersLabel } from '../data/groupBuys'
import { SafePayBadge } from './SafePayBadge'
import { DistanceBadge } from './LocationUI'
import { ProductImage } from './ProductImage'

export function GroupBuyCardLarge({ item }: { item: GroupBuy }) {
  const progress = getProgress(item.current, item.max)
  const distance = getGroupBuyDistance(item)
  const belowMin = isBelowMinimum(item)

  return (
    <Link
      to={`/detail/${item.id}`}
      className="block lr-card lr-card-interactive overflow-hidden"
    >
      <ProductImage item={item} className="h-36 lr-image-well" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-text text-[15px] leading-snug tracking-tight">{item.title}</h3>
          <span className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${getStatusStyle(item.status)}`}>
            {item.statusLabel}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-secondary mb-3 flex-wrap">
          <span>📍 {item.pickupPoint.label}</span>
          <DistanceBadge meters={distance} compact />
          <span>👥 {item.current}/{item.max}명</span>
          <span
            className={`font-semibold px-1.5 py-0.5 rounded ${
              belowMin ? 'bg-orange-light text-orange' : 'bg-primary-light text-primary'
            }`}
          >
            {getMinMembersLabel(item.min)}부터 진행
          </span>
        </div>
        <div className="flex items-end justify-between mb-2">
          <span className="text-lg font-bold text-text">{formatPrice(item.price)} / 1인</span>
          <SafePayBadge />
        </div>
        <div className="flex justify-end mb-2">
          <span className="text-xs text-text-secondary">{item.daysLeft}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${item.status === 'complete' ? 'bg-gray-300' : 'bg-primary'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Link>
  )
}

export function GroupBuyCardCompact({ item }: { item: GroupBuy }) {
  const progress = getProgress(item.current, item.max)
  const distance = getGroupBuyDistance(item)
  const belowMin = isBelowMinimum(item)

  return (
    <Link
      to={`/detail/${item.id}`}
      className="flex gap-3 lr-card lr-card-interactive p-3"
    >
      <ProductImage item={item} className="w-20 h-20 shrink-0 rounded-xl lr-image-well" imgClassName="w-full h-full object-cover rounded-xl" fallbackSize={32} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-sm text-text truncate">{item.title}</h3>
          <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${getStatusStyle(item.status)}`}>
            {item.statusLabel}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-secondary mb-1 flex-wrap">
          <span>📍 {item.pickupPoint.label}</span>
          <DistanceBadge meters={distance} compact />
          <span>👥 {item.current}/{item.max}명</span>
          <span
            className={`font-semibold px-1.5 py-0.5 rounded text-[10px] ${
              belowMin ? 'bg-orange-light text-orange' : 'bg-primary-light text-primary'
            }`}
          >
            {getMinMembersLabel(item.min)}부터
          </span>
        </div>
        <div className="flex items-end justify-between mb-1.5">
          <span className="text-sm font-bold text-text">{formatPrice(item.price)}/인</span>
          <span className="text-[11px] text-text-secondary">{item.daysLeft}</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${item.status === 'complete' ? 'bg-gray-300' : 'bg-primary'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Link>
  )
}
