import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, Layers, MapPin, X } from 'lucide-react'
import { StatusBar } from '../components/Layout'
import { GroupBuyCardCompact } from '../components/GroupBuyCard'
import { groupBuys, filterVisibleGroupBuys, getGroupBuyDistance } from '../data/groupBuys'
import { useApp } from '../context/AppContext'
import { rangeLabels } from '../data/notifications'

const categories = ['전체', '세제/세탁', '휴지/티슈', '욕실용품']

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [query, setQuery] = useState('')
  const { participationRange } = useApp()

  const filtered = useMemo(() => {
    let list =
      activeCategory === '전체'
        ? groupBuys
        : groupBuys.filter((item) => item.category === activeCategory)

    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      )
    }

    list = filterVisibleGroupBuys(list, participationRange).sort(
      (a, b) => getGroupBuyDistance(a) - getGroupBuyDistance(b),
    )

    return list
  }, [activeCategory, participationRange, query])
  return (
    <div className="min-h-full bg-bg">
      <StatusBar />

      <div className="px-5 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-text">공구 탐색</h1>
          <p className="text-[11px] text-text-secondary flex items-center gap-1 mt-0.5">
            <MapPin size={11} />
            {rangeLabels[participationRange]} 이내 · {filtered.length}개
          </p>
        </div>
        <Link to="/explore/slide" className="flex items-center gap-1 text-xs text-primary font-semibold">
          <Layers size={14} />
          슬라이드
        </Link>
      </div>

      <div className="px-5 pb-3">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-surface rounded-xl px-3 py-2.5 border border-border focus-within:border-primary transition-colors">
            <Search size={18} className="text-text-secondary shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="품목·동네 검색"
              aria-label="공구 품목 또는 동네 검색"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-secondary"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="검색어 지우기"
                className="shrink-0 text-text-secondary"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            aria-label="필터"
            className="w-11 h-11 bg-surface rounded-xl border border-border flex items-center justify-center"
          >
            <SlidersHorizontal size={18} className="text-text-secondary" />
          </button>
        </div>
      </div>

      <div className="px-5 pb-3 flex gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-white border-primary'
                : 'bg-surface text-text border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="px-5 py-8 text-center">
          {query.trim() ? (
            <>
              <p className="text-sm text-text-secondary mb-2">
                '{query.trim()}' 검색 결과가 없어요
              </p>
              <button onClick={() => setQuery('')} className="text-sm text-primary font-semibold">
                검색 초기화
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-text-secondary mb-2">설정 범위 내 공구가 없어요</p>
              <Link to="/mypage/neighborhood" className="text-sm text-primary font-semibold">
                동네 범위 넓히기 →
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="px-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 pb-4">
          {filtered.map((item) => (
            <GroupBuyCardCompact key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
