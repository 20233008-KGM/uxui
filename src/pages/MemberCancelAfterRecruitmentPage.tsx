import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UserMinus, RotateCcw } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { formatPrice } from '../data/groupBuys'

/** edge_case: 모집 완료 후 참여자 1명 취소 */
export default function MemberCancelAfterRecruitmentPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="참여자 취소 알림"
        left={<button onClick={() => navigate(-1)} aria-label="뒤로"><ArrowLeft size={22} /></button>}
      />

      <div className="px-5 py-4 space-y-4">
        <div className="bg-orange-light rounded-xl p-4 flex gap-3">
          <UserMinus size={22} className="text-orange shrink-0" />
          <div>
            <p className="text-sm font-bold text-text">모집 완료 후 참여 취소</p>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              미봉천님이 공구 확정 후 참여를 취소했습니다.
              {formatPrice(4200)}은 에스크로에서 환불 처리됩니다.
            </p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4 text-sm space-y-3">
          <div className="flex justify-between">
            <span className="text-text-secondary">현재 참여</span>
            <span className="font-bold">4/5명</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">최소 인원</span>
            <span className="text-primary font-semibold">3명 — 공구 유지</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">처리</span>
            <span>취소자 환불 · 나머지 진행</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-xs text-text-secondary leading-relaxed">
          최소 인원(3명) 이상이면 공구는 계속 진행됩니다.
          최소 인원 미만이 되면 공구 무산 및 전원 자동 환불됩니다.
        </div>

        <button
          onClick={() => navigate('/chat')}
          className="w-full h-12 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          채팅방에서 안내하기
        </button>
      </div>
    </div>
  )
}
