import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, PhoneOff, MessageCircle, ShieldCheck } from 'lucide-react'
import { PageHeader } from '../components/Layout'

/** edge_case: 팀장 연락 두절 / 이사·사정 */
export default function LeaderUnavailablePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="팀장 연락 두절"
        left={<button onClick={() => navigate(-1)} aria-label="뒤로"><ArrowLeft size={22} /></button>}
      />

      <div className="px-5 py-4 space-y-4">
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
          <PhoneOff size={22} className="text-red-500 shrink-0" />
          <div>
            <p className="text-sm font-bold text-text">팀장에게 연락이 안 돼요</p>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              팀장이 이사·개인 사정으로 연락 두절된 경우, 결제금은 에스크로에 보관된 상태입니다.
            </p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4 space-y-3 text-sm">
          <p className="font-bold text-text">대응 방법</p>
          {[
            '1. 채팅방에서 @팀장 멘션 후 48시간 대기',
            '2. 응답 없으면 분쟁 신고 접수',
            '3. 공구페이 중재 → 전원 환불 또는 대체 팀장 배정',
          ].map((step) => (
            <p key={step} className="text-text-secondary text-xs leading-relaxed">{step}</p>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/dispute/tx-001"
            className="w-full h-12 bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <ShieldCheck size={18} />
            분쟁 신고 (먹튀/연락 두절)
          </Link>
          <Link
            to="/chat"
            className="w-full h-12 border border-border bg-surface font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} />
            채팅방 확인
          </Link>
        </div>
      </div>
    </div>
  )
}
