import { Link } from 'react-router-dom'
import { Users, MapPin, Plus, Gift } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ColdStartBanner() {
  const { setColdStartMode } = useApp()

  return (
    <div className="mx-5 mb-4 bg-orange-light rounded-2xl p-5 border border-orange/20">
      <div className="flex items-center gap-2 mb-2">
        <Users size={20} className="text-orange" />
        <p className="font-bold text-text text-sm">아직 이 동네 공구가 없어요</p>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed mb-4">
        콜드스타트 상태입니다. 첫 공구를 열거나, 동네 범위를 넓히거나, 지인을 초대해 모집을 시작해보세요.
      </p>
      <div className="flex gap-2 mb-2">
        <Link
          to="/open"
          onClick={() => setColdStartMode(false)}
          className="flex-1 h-10 bg-primary text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1"
        >
          <Plus size={14} />
          공구 열기
        </Link>
        <Link
          to="/mypage/neighborhood"
          className="flex-1 h-10 border border-border bg-surface text-text text-xs font-semibold rounded-xl flex items-center justify-center gap-1"
        >
          <MapPin size={14} />
          범위 설정
        </Link>
      </div>
      <Link
        to="/leader/invite"
        className="w-full h-10 border border-primary/30 bg-primary-light text-primary text-xs font-semibold rounded-xl flex items-center justify-center gap-1"
      >
        <Gift size={14} />
        지인 초대로 모집 돕기
      </Link>
    </div>
  )
}
