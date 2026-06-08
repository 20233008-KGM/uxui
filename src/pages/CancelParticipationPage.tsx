import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, AlertCircle } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { formatPrice } from '../data/groupBuys'

export default function CancelParticipationPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="참여 취소"
        left={<button onClick={() => navigate(-1)} aria-label="뒤로"><ArrowLeft size={22} /></button>}
      />

      <div className="flex-1 px-5 py-4 pb-28 space-y-4">
        <div className="bg-orange-light rounded-xl p-4 flex gap-3">
          <AlertCircle size={18} className="text-orange shrink-0" />
          <p className="text-xs text-text leading-relaxed">
            모집 완료 전까지 참여 취소가 가능합니다.
            취소 시 에스크로 결제금이 즉시 환불됩니다.
          </p>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4">
          <p className="font-bold text-text mb-1">3겹 화장지 30롤 대용량</p>
          <p className="text-sm text-text-secondary mb-3">현재 3/5명 모집중</p>
          <div className="divide-y divide-border text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-text-secondary">환불 금액</span>
              <span className="font-bold text-primary">{formatPrice(4200)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-text-secondary">취소 가능 여부</span>
              <span className="text-primary font-semibold">가능 (모집중)</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-xs text-text-secondary leading-relaxed">
          <strong className="text-text">모집 완료 후</strong>에는 취소가 불가하며,
          분쟁 신고를 통해서만 환불이 가능합니다.
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4 space-y-2">
        <button
          onClick={() => navigate('/refund/tx-cancelled')}
          className="w-full h-12 bg-orange text-white font-bold rounded-xl flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          참여 취소 · 환불받기
        </button>
        <button onClick={() => navigate(-1)} className="w-full h-11 text-sm text-text-secondary">
          돌아가기
        </button>
      </div>
    </div>
  )
}
