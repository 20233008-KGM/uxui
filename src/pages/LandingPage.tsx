import { Link } from 'react-router-dom'
import { ShieldCheck, Users, Bell, TrendingDown } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-bg flex flex-col w-full max-w-[440px] mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
          <Users size={40} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-2 text-center">우리동네 공구</h1>
        <p className="text-sm text-text-secondary text-center leading-relaxed mb-8">
          이웃과 함께 생필품을 공동구매로
          <br />
          더 싸게, 더 안전하게
        </p>

        <div className="w-full space-y-3 mb-10">
          {[
            { icon: TrendingDown, text: '대량구매로 30% 이상 절약' },
            { icon: ShieldCheck, text: '공구페이 안전거래 (에스크로)' },
            { icon: Bell, text: '사용 주기 맞춤 재구매 알림' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 bg-surface rounded-xl p-3 border border-border">
              <Icon size={20} className="text-primary shrink-0" />
              <span className="text-sm text-text">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-10 space-y-3">
        <Link
          to="/signup"
          className="block w-full h-12 bg-primary text-white font-bold rounded-xl text-center leading-[3rem]"
        >
          시작하기
        </Link>
        <Link
          to="/login"
          className="block w-full h-12 border border-border bg-surface text-text font-semibold rounded-xl text-center leading-[3rem]"
        >
          로그인
        </Link>
      </div>
    </div>
  )
}
