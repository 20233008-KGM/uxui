import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { GroupBuyCardLarge } from '../components/GroupBuyCard'
import { groupBuys, filterVisibleGroupBuys } from '../data/groupBuys'
import { useApp } from '../context/AppContext'
import { rangeLabels } from '../data/notifications'

export default function ExploreSlidePage() {
  const [index, setIndex] = useState(0)
  const { participationRange } = useApp()

  const items = useMemo(
    () =>
      filterVisibleGroupBuys(
        groupBuys.filter((g) => g.status !== 'complete'),
        participationRange,
      ),
    [participationRange],
  )

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(items.length - 1, i + 1))

  if (items.length === 0) {
    return (
      <div className="min-h-full bg-bg flex flex-col items-center justify-center px-8 text-center">
        <MapPin size={40} className="text-text-secondary mb-4" />
        <p className="text-sm text-text-secondary mb-4">
          {rangeLabels[participationRange]} 이내 공구가 없어요
        </p>
        <Link to="/mypage/neighborhood" className="text-primary font-semibold text-sm">
          동네 범위 넓히기
        </Link>
      </div>
    )
  }

  const safeIndex = Math.min(index, items.length - 1)

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-text">근처 공구 탐색</h1>
          <p className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
            <MapPin size={12} />
            {rangeLabels[participationRange]} · 가까운 순 · {items.length}개
          </p>
        </div>
        <Link to="/explore" className="text-xs text-primary font-semibold">목록 보기</Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-4">
        <GroupBuyCardLarge item={items[safeIndex]} />

        <div className="flex items-center gap-6 mt-6">
          <button
            onClick={prev}
            disabled={safeIndex === 0}
            className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-text-secondary">{safeIndex + 1} / {items.length}</span>
          <button
            onClick={next}
            disabled={safeIndex === items.length - 1}
            className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex gap-1.5 mt-4">
          {items.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === safeIndex ? 'bg-primary' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
