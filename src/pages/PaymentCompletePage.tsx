import { useParams, useNavigate, Link } from 'react-router-dom'
import { ShieldCheck, Users, Clock } from 'lucide-react'
import { EscrowStatusSteps } from '../components/SafePayBadge'
import { groupBuys, formatPrice } from '../data/groupBuys'

export default function PaymentCompletePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = groupBuys.find((g) => g.id === id) ?? groupBuys[0]
  const isAlmostFull = item.current >= item.max - 1

  return (
    <div className="min-h-dvh bg-bg flex flex-col items-center px-5 py-10">
      <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mb-5">
        <ShieldCheck size={40} className="text-primary" strokeWidth={2} />
      </div>

      <h1 className="text-xl font-bold text-text mb-2">안전결제 완료</h1>
      <p className="text-sm text-text-secondary text-center mb-1">
        {formatPrice(item.price)}이 에스크로에 보관되었어요
      </p>
      <p className="text-xs text-text-secondary text-center mb-6">
        모집 결과에 따라 채팅방 생성 또는 자동 환불됩니다
      </p>

      <div className="w-full bg-surface rounded-2xl border border-border p-5 mb-4">
        <EscrowStatusSteps currentStep={0} />
      </div>

      <div className="w-full bg-surface rounded-2xl border border-border p-4 mb-4">
        <p className="text-xs text-text-secondary mb-2">모집 현황</p>
        <div className="flex items-center gap-2 mb-2">
          <Users size={16} className="text-primary" />
          <span className="font-bold text-text">{item.current + 1}/{item.max}명</span>
          <span className="text-xs text-text-secondary">(내 참여 포함)</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <Clock size={14} />
          {isAlmostFull ? '곧 모집 완료 예정' : `모집 마감 ${item.daysLeft}`}
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <Link
          to={isAlmostFull ? '/recruitment/success' : `/recruitment/waiting?id=${item.id}`}
          className="w-full h-12 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2"
        >
          모집 결과 확인
        </Link>
        <button
          onClick={() => navigate('/mypage/transactions')}
          className="w-full h-12 border border-border bg-surface text-text font-semibold rounded-xl"
        >
          거래 내역 보기
        </button>
        <Link to={`/cancel/tx-new`} className="text-center text-xs text-text-secondary underline">
          참여 취소 (모집 완료 전)
        </Link>
      </div>
    </div>
  )
}
