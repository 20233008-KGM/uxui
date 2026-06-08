import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, ChevronRight } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { demoTransactions, statusLabels, statusColors } from '../data/escrow'
import { formatPrice } from '../data/groupBuys'

export default function TransactionHistoryPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="거래 내역"
        left={
          <button onClick={() => navigate(-1)} aria-label="뒤로">
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="px-5 py-4">
        <div className="bg-primary-light rounded-xl p-4 flex items-center gap-3 mb-4">
          <ShieldCheck size={24} className="text-primary shrink-0" />
          <div>
            <p className="text-sm font-bold text-text">공구페이 안전거래</p>
            <p className="text-xs text-primary-dark">모든 거래는 에스크로로 보호됩니다</p>
          </div>
        </div>

        <div className="space-y-3">
          {demoTransactions.map((tx) => (
            <Link
              key={tx.id}
              to={tx.status === 'ready_pickup' ? `/confirm/${tx.id}` : '#'}
              className="block bg-surface rounded-2xl border border-border p-4"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-bold text-sm text-text">{tx.title}</p>
                <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[tx.status]}`}>
                  {statusLabels[tx.status]}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-text">{formatPrice(tx.amount)}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    팀장 {tx.leaderName} · {tx.paidAt}
                  </p>
                </div>
                {tx.status === 'ready_pickup' && (
                  <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                    수령 확인
                    <ChevronRight size={14} />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
