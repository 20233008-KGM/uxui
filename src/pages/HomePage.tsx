import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { StatusBar, LocationHeader } from '../components/Layout'
import { GroupBuyCardLarge } from '../components/GroupBuyCard'
import ColdStartBanner from '../components/ColdStartBanner'
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
      <LocationHeader />

      <div className="px-5 mb-3">
        <div className="bg-blue-50 rounded-xl px-4 py-2.5 flex items-center gap-2 border border-blue-100">
          <ShieldCheck size={16} className="text-blue-600 shrink-0" />
          <p className="text-xs text-blue-800">
            모든 공구는 <strong>공구페이 안전거래</strong>로 결제 · 수령 확인 후 정산
          </p>
        </div>
      </div>

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
          <div className="flex flex-col gap-4">
            {featured.map((item) => (
              <GroupBuyCardLarge key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
