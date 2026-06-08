import { Link, useNavigate } from 'react-router-dom'
import { StatusBar } from '../components/Layout'
import { ChevronRight, User, Receipt, MapPin, Bell, ShieldCheck, LogOut, Gift, Crown } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { SparkleName, TierBadge, TierProgressCard } from '../components/TierUI'
import { getTierFromMileage } from '../data/leaderTier'

const menuItems = [
  { icon: Crown, label: '팀장 등급 · 마일리지', sub: '등급별 수수료 혜택', highlight: true, path: '/mypage/tier' },
  { icon: Gift, label: '지인 초대 이벤트', sub: '친구 초대하고 포인트 받기', highlight: true, path: '/leader/invite' },
  { icon: ShieldCheck, label: '공구페이 거래내역', sub: '에스크로 1건 수령 대기', highlight: true, path: '/mypage/transactions' },
  { icon: User, label: '프로필 · 구매 주기', sub: '품목별 사용 주기 계산', path: '/mypage/profile' },
  { icon: Receipt, label: '포인트', sub: '500P', highlight: true, path: '/mypage/points' },
  { icon: MapPin, label: '주소 관리', sub: '프라이버시 보호', path: '/mypage/address' },
  { icon: Bell, label: '알림 · 사용 주기', sub: '재구매 알림 설정', path: '/mypage/notifications' },
]

export default function MyPage() {
  const { user, logout, leaderMileage } = useApp()
  const navigate = useNavigate()
  const tier = getTierFromMileage(leaderMileage)

  const handleLogout = () => {
    logout()
    navigate('/landing')
  }

  return (
    <div className="min-h-full bg-bg">
      <StatusBar />

      <div className="bg-surface px-5 py-6 mb-2">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ring-2"
            style={{
              background: `${tier.accent}18`,
              color: tier.accent,
              boxShadow: `0 0 0 2px ${tier.accent}55`,
            }}
          >
            나
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg text-text">
              <SparkleName name={user?.name ?? '공구러버'} mileage={leaderMileage} />
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <TierBadge tierId={tier.id} size="sm" />
              <p className="text-sm text-text-secondary">{user?.neighborhood ?? '관악구 신림동'}</p>
            </div>
          </div>
        </div>
      </div>

      <TierProgressCard mileage={leaderMileage} compact />

      <div className="mx-5 mb-4">
        <div className="bg-primary-light rounded-xl p-4 flex items-center gap-3">
          <ShieldCheck size={22} className="text-primary shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold text-text">공구페이 안전거래</p>
            <p className="text-xs text-primary-dark">수령 확인 전까지 결제금 보호</p>
          </div>
          <Link to="/mypage/transactions" className="text-xs font-semibold text-primary">
            내역 →
          </Link>
        </div>
      </div>

      <div className="bg-surface divide-y divide-border">
        {menuItems.map(({ icon: Icon, label, sub, highlight, path }) => (
          <Link
            key={label}
            to={path}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Icon size={20} className={label.includes('공구페이') || label.includes('등급') ? 'text-primary' : 'text-text-secondary'} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-text">{label}</p>
              {sub && (
                <p className={`text-xs ${highlight ? 'text-primary font-semibold' : 'text-text-secondary'}`}>
                  {sub}
                </p>
              )}
            </div>
            <ChevronRight size={18} className="text-text-secondary" />
          </Link>
        ))}

        <Link to="/mypage/neighborhood" className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <MapPin size={20} className="text-text-secondary" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-text">동네 범위 설정</p>
            <p className="text-xs text-text-secondary">참여·노출 범위 (팀장/참여자)</p>
          </div>
          <ChevronRight size={18} className="text-text-secondary" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 text-red-500 hover:bg-red-50"
        >
          <LogOut size={20} />
          <span className="font-semibold text-sm">로그아웃</span>
        </button>
      </div>
    </div>
  )
}
