import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { formatPrice } from '../data/groupBuys'

export default function RefundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="환불 내역"
        left={<button onClick={() => navigate(-1)} aria-label="뒤로"><ArrowLeft size={22} /></button>}
      />

      <div className="px-5 py-4 space-y-4">
        <div className="bg-primary-light rounded-xl p-4 flex gap-3">
          <RotateCcw size={22} className="text-primary shrink-0" />
          <div>
            <p className="text-sm font-bold text-text">자동 환불 처리됨</p>
            <p className="text-xs text-primary-dark">모집 실패로 에스크로 결제금이 환불되었습니다</p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={18} className="text-primary" />
            <span className="font-bold text-sm">환불 완료</span>
          </div>
          <div className="divide-y divide-border text-sm">
            {[
              ['상품', '3겹 화장지 30롤 대용량'],
              ['사유', '최소 인원 미달 (모집 실패)'],
              ['환불 금액', formatPrice(4200)],
              ['처리일', '2024.12.20'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5">
                <span className="text-text-secondary">{k}</span>
                <span className={`font-medium ${k === '환불 금액' ? 'text-primary font-bold' : 'text-text'}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
