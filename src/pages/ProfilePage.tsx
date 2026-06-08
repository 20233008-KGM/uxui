import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { purchaseHistory, calculateNextPurchaseDate } from '../data/purchaseHistory'

export default function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="프로필 · 구매 주기"
        left={<button onClick={() => navigate(-1)} aria-label="뒤로"><ArrowLeft size={22} /></button>}
      />

      <div className="px-5 py-4 space-y-4">
        <div className="bg-surface rounded-2xl border border-border p-4">
          <p className="text-xs text-text-secondary mb-3">품목별 사용 주기 계산</p>
          <p className="text-xs text-text-secondary leading-relaxed mb-4">
            구매 이력을 바탕으로 재구매 시기를 자동 계산합니다.
            공구 참여 시 맞춤 알림을 제안해요.
          </p>
        </div>

        {purchaseHistory.map((record) => {
          const next = calculateNextPurchaseDate(record.purchasedAt, record.usageCycleDays)
          return (
            <div key={record.id} className="bg-surface rounded-2xl border border-border p-4">
              <div className="flex items-start justify-between mb-2">
                <p className="font-bold text-sm text-text">{record.itemName}</p>
                <span className="text-[10px] bg-primary-light text-primary px-2 py-0.5 rounded-full font-semibold">
                  {record.usageCycleDays}일 주기
                </span>
              </div>
              <div className="text-xs text-text-secondary space-y-1">
                <p>마지막 구매: {record.purchasedAt}</p>
                <p>다음 추천: {next}</p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-primary">
                <RotateCcw size={14} />
                재구매 알림 등록됨
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
