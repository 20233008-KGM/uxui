import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email || 'user@example.com')
    navigate('/')
  }

  return (
    <div className="min-h-dvh bg-bg flex flex-col px-6 py-8 w-full max-w-[440px] mx-auto">
      <button onClick={() => navigate('/landing')} className="mb-6" aria-label="뒤로">
        <ArrowLeft size={22} />
      </button>

      <h1 className="text-2xl font-bold text-text mb-2">로그인</h1>
      <p className="text-sm text-text-secondary mb-8">우리동네 공구에 오신 것을 환영해요</p>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block text-sm font-semibold text-text mb-2">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <button type="submit" className="w-full h-12 bg-primary text-white font-bold rounded-xl mt-4">
          로그인
        </button>
      </form>

      <p className="text-center text-sm text-text-secondary mt-6">
        계정이 없으신가요?{' '}
        <Link to="/signup" className="text-primary font-semibold">
          회원가입
        </Link>
      </p>
    </div>
  )
}
