import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, ShieldCheck } from 'lucide-react'
import { PageHeader } from '../components/Layout'

export default function ReviewPage() {
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="후기 작성"
        left={<button onClick={() => navigate(-1)} aria-label="뒤로"><ArrowLeft size={22} /></button>}
      />

      <div className="flex-1 px-5 py-4 pb-28 space-y-5">
        <div className="bg-surface rounded-2xl border border-border p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">김</div>
          <div>
            <p className="font-bold text-text">김신림 (팀장)</p>
            <p className="text-xs text-text-secondary">3겹 화장지 30롤 공구</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-text mb-3">팀장 평가</p>
          <div className="flex gap-2 justify-center py-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setRating(n)} aria-label={`${n}점`}>
                <Star size={32} className={n <= rating ? 'text-orange fill-orange' : 'text-gray-300'} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text mb-2">후기</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="수령 경험, 팀장 응대 등을 알려주세요"
            rows={4}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none resize-none"
          />
        </div>

        <div className="bg-primary-light rounded-xl p-3 flex gap-2">
          <ShieldCheck size={16} className="text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-primary-dark">
            후기 작성 후 사용 주기 알림이 자동 등록됩니다
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4">
        <button
          onClick={() => navigate('/mypage/notifications')}
          disabled={rating === 0}
          className="w-full h-12 bg-primary text-white font-bold rounded-xl disabled:opacity-40"
        >
          후기 등록
        </button>
      </div>
    </div>
  )
}
