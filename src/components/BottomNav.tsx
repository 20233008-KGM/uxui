import { Link, useLocation } from 'react-router-dom'
import { Home, Search, MessageCircle, User, Plus } from 'lucide-react'

const navItems = [
  { path: '/', label: '홈', icon: Home },
  { path: '/explore', label: '탐색', icon: Search },
  { path: '/open', label: '', icon: Plus, isFab: true },
  { path: '/chats', label: '채팅', icon: MessageCircle },
  { path: '/mypage', label: '마이', icon: User },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-2 pb-6 pt-2 z-50">
      <div className="flex items-end justify-around">
        {navItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path) && item.path !== '/'

          if (item.isFab) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center -mt-5"
              >
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
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

export function MobileFrame({ children, showNav = true }: { children: React.ReactNode; showNav?: boolean }) {
  return (
    <div className="w-full max-w-[430px] min-h-dvh bg-bg relative shadow-2xl">
      {children}
      {showNav && <div className="h-24" />}
      {showNav && <BottomNav />}
    </div>
  )
}
