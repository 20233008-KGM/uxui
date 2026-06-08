import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, ShieldCheck } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { formatPrice } from '../data/groupBuys'

const disputeTypes = [
  { id: 'defect', label: '불량 / 수량 부족', desc: '물건 상태가 좋지 않거나 수량이 부족해요' },
  { id: 'mismatch', label: '허위 등록', desc: '주문한 상품과 실제 상품이 달라요' },
  { id: 'scam', label: '먹튀 / 연락 두절', desc: '팀장이 연락이 안 되거나 물건을 안 줘요' },
  { id: 'wrong_item', label: '내 것이 아님', desc: '수령 후 다른 사람 물건을 받았어요' },
]

export default function DisputePage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('')
  const [detail, setDetail] = useState('')

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="분쟁 신고"
        left={<button onClick={() => navigate(-1)} aria-label="뒤로"><ArrowLeft size={22} /></button>}
      />

      <div className="flex-1 px-5 py-4 pb-28 space-y-4">
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
          <AlertTriangle size={18} className="text-red-500 shrink-0" />
          <p className="text-xs text-red-700 leading-relaxed">
            분쟁 접수 시 결제금 {formatPrice(4200)}은 에스크로에 계속 보관됩니다.
            팀장에게는 정산되지 않아요.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-text mb-3">분쟁 유형</p>
          <div className="space-y-2">
            {disputeTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selected === t.id ? 'border-red-400 bg-red-50' : 'border-border bg-surface'
                }`}
              >
                <p className="font-semibold text-sm text-text">{t.label}</p>
                <p className="text-xs text-text-secondary mt-0.5">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text mb-2">상세 내용</label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="상황을 자세히 설명해주세요"
            rows={4}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none resize-none"
          />
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-text mb-2">처리 절차</p>
          <p className="text-xs text-text-secondary leading-relaxed">
            1. 분쟁 접수 → 2. 양측 확인 (48시간) → 3. 공구페이 중재 → 4. 환불 또는 정산
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4">
        <button
          disabled={!selected}
          onClick={() => navigate('/mypage/transactions')}
          className="w-full h-12 bg-red-500 text-white font-bold rounded-xl disabled:opacity-40 flex items-center justify-center gap-2"
        >
          <ShieldCheck size={18} />
          분쟁 신고 접수
        </button>
      </div>
    </div>
  )
}
