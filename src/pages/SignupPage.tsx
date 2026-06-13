import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Gift } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { defaultInviteReward } from '../data/inviteEvent'

export default function SignupPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signup } = useApp()
  const fromInvite = (location.state as { fromInvite?: string })?.fromInvite
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [neighborhood, setNeighborhood] = useState('관악구 신림동')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signup(name || '공구러버', email || 'user@example.com')
    navigate('/')
  }

  return (
    <div className="min-h-dvh bg-bg flex flex-col px-6 py-8 w-full max-w-[440px] mx-auto">
      <button onClick={() => navigate('/landing')} className="mb-6" aria-label="뒤로">
        <ArrowLeft size={22} />
      </button>

      <h1 className="text-2xl font-bold text-text mb-2">회원가입</h1>
      {fromInvite ? (
        <div className="bg-primary-light rounded-xl p-3 flex gap-2 mb-6">
          <Gift size={18} className="text-primary shrink-0" />
          <p className="text-xs text-primary-dark">
            초대 혜택 적용! 가입 시 <strong>{defaultInviteReward.inviteePoints}P</strong>가 지급됩니다
          </p>
        </div>
      ) : (
        <p className="text-sm text-text-secondary mb-8">동네 공구를 시작해보세요</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-text mb-2">닉네임</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="공구러버"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text mb-2">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text mb-2">동네</label>
          <input
            type="text"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <button type="submit" className="w-full h-12 bg-primary text-white font-bold rounded-xl mt-4">
          가입하기
        </button>
      </form>

      <p className="text-center text-sm text-text-secondary mt-6">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="text-primary font-semibold">
          로그인
        </Link>
      </p>
    </div>
  )
}
