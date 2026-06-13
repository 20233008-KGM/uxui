import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, MapPin, Search, Bell } from 'lucide-react'
import { StatusBar, LocationHeader } from '../components/Layout'
import { GroupBuyCardLarge } from '../components/GroupBuyCard'
import ColdStartBanner from '../components/ColdStartBanner'
import InviteHomeBanner from '../components/InviteHomeBanner'
import { groupBuys, filterVisibleGroupBuys } from '../data/groupBuys'
import { useApp } from '../context/AppContext'

export default function HomePage() {
  const { coldStartMode, setColdStartMode, participationRange } = useApp()

  const visible = useMemo(
    () => filterVisibleGroupBuys(
      groupBuys.filter((g) => g.status !== 'complete'),
      participationRange,
    ),
    [participationRange],
  )
  const featured = visible.slice(0, 2)

  useEffect(() => {
    setColdStartMode(visible.length === 0)
  }, [visible.length, setColdStartMode])

  return (
    <div className="min-h-full bg-bg">
      <StatusBar />
      {/* 모바일 헤더 */}
      <div className="lg:hidden">
        <LocationHeader />
      </div>
      {/* 데스크톱 헤더 */}
      <div className="hidden lg:flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-text-secondary mb-0.5">우리동네 공동구매</p>
          <h1 className="text-2xl font-bold text-text flex items-center gap-1.5">
            <MapPin size={22} className="text-primary" />
            관악구 신림동
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/explore"
            aria-label="검색"
            className="w-10 h-10 rounded-xl border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-text"
          >
            <Search size={18} />
          </Link>
          <button
            aria-label="알림"
            className="w-10 h-10 rounded-xl border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-text"
          >
            <Bell size={18} />
          </button>
        </div>
      </div>

      <div className="px-5 mb-3">
        <div className="bg-blue-50 rounded-xl px-4 py-2.5 flex items-center gap-2 border border-blue-100">
          <ShieldCheck size={16} className="text-blue-600 shrink-0" />
          <p className="text-xs text-blue-800">
            모든 공구는 <strong>공구페이 안전거래</strong>로 결제 · 수령 확인 후 정산
          </p>
        </div>
      </div>

      <InviteHomeBanner />

      {coldStartMode && <ColdStartBanner />}

      {!coldStartMode && (
        <div className="px-5 mb-5">
          <div className="bg-primary-light rounded-2xl p-4 flex items-center justify-between">
            <p className="text-sm font-bold text-primary-dark leading-snug">
              첫 공구 참여하면
              <br />
              500 포인트 지급!
            </p>
            <Link
              to="/explore/slide"
              className="shrink-0 bg-surface text-primary text-sm font-semibold px-4 py-2 rounded-xl border border-primary/30"
            >
              참여하기
            </Link>
          </div>
        </div>
      )}

      <div className="px-5">
        <h2 className="text-base font-bold text-text mb-4">
          {coldStartMode ? '근처 공구' : '우리 동네 공구 모집 중'}
        </h2>
        {featured.length === 0 ? (
          <p className="text-sm text-text-secondary text-center py-6">
            설정한 참여 범위 안에 모집 중인 공구가 없어요.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {featured.map((item) => (
              <GroupBuyCardLarge key={item.id} item={item} />
            ))}
            {/* 데스크톱에서는 빈 공간을 채우기 위해 추가 공구를 더 노출 */}
            {visible.slice(2, 9).map((item) => (
              <div key={item.id} className="hidden lg:block">
                <GroupBuyCardLarge item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
