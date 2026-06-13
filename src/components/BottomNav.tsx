import { Link, useLocation } from 'react-router-dom'
import { Home, Search, MessageCircle, User, Plus, Users } from 'lucide-react'

const navItems = [
  { path: '/', label: '홈', icon: Home },
  { path: '/explore', label: '탐색', icon: Search },
  { path: '/open', label: '', icon: Plus, isFab: true },
  { path: '/chats', label: '채팅', icon: MessageCircle },
  { path: '/mypage', label: '마이', icon: User },
]

const sidebarItems = [
  { path: '/', label: '홈', icon: Home },
  { path: '/explore', label: '탐색', icon: Search },
  { path: '/chats', label: '채팅', icon: MessageCircle },
  { path: '/mypage', label: '마이페이지', icon: User },
]

function isNavActive(pathname: string, path: string) {
  return path === '/' ? pathname === '/' : pathname.startsWith(path)
}

/** 데스크톱(lg+) 전용 좌측 사이드바 네비게이션 */
export function DesktopSidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-border bg-surface sticky top-0 h-dvh px-4 py-6">
      <Link to="/" className="flex items-center gap-2 px-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
          <Users size={20} className="text-white" />
        </div>
        <span className="font-bold text-text text-lg tracking-tight">우리동네 공구</span>
      </Link>

      <Link
        to="/open"
        className="flex items-center justify-center gap-2 h-11 bg-primary text-white font-bold rounded-xl mb-5 shadow-[var(--shadow-lr-sm)]"
      >
        <Plus size={20} strokeWidth={2.5} />
        공구 열기
      </Link>

      <nav className="flex flex-col gap-1">
        {sidebarItems.map((item) => {
          const isActive = isNavActive(pathname, item.path)
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                isActive ? 'bg-primary-light text-primary' : 'text-text-secondary hover:bg-gray-50'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface/95 backdrop-blur-md border-t border-border px-2 pb-6 pt-2 z-50 shadow-[var(--shadow-lr-nav)]">
      <div className="flex items-end justify-around">
        {navItems.map((item) => {
          const isActive = isNavActive(location.pathname, item.path)

          if (item.isFab) {
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-label="공구 열기"
                className="flex flex-col items-center -mt-5"
              >
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[var(--shadow-lr-md)] ring-2 ring-white">
                  <Plus size={28} className="text-white" strokeWidth={2.5} />
                </div>
              </Link>
            )
          }

          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center gap-1 py-1 min-w-[48px] ${
                isActive ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function MobileFrame({
  children,
  showNav = true,
  wide = false,
}: {
  children: React.ReactNode
  showNav?: boolean
  /** 데스크톱에서 콘텐츠를 좁은 폼 컬럼이 아닌 넓은 레이아웃으로 채운다 (상세 등) */
  wide?: boolean
}) {
  // 탭 페이지(showNav)와 wide 페이지는 데스크톱에서 넓게, 그 외 폼/흐름 페이지는 좁은 중앙 컬럼
  const fillWidth = showNav || wide
  return (
    <div className="w-full max-w-[430px] lg:max-w-[1320px] min-h-dvh bg-bg lg:bg-surface relative shadow-[var(--shadow-lr-lg)] ring-1 ring-black/[0.06] lg:flex">
      <DesktopSidebar />
      <div className="flex-1 min-w-0 bg-bg lg:min-h-dvh">
        <div
          className={
            fillWidth
              ? 'lg:px-8 lg:py-6'
              : 'lg:max-w-[480px] lg:mx-auto lg:px-6 lg:py-6'
          }
        >
          {children}
        </div>
        {showNav && <div className="h-24 lg:hidden" />}
      </div>
      {showNav && <BottomNav />}
    </div>
  )
}
