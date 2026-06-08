import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Clock, AlertTriangle, ShieldCheck } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { demoTransactions } from '../data/escrow'
import { formatPrice } from '../data/groupBuys'

export default function PickupOverduePage() {
  const { txId } = useParams()
  const navigate = useNavigate()
  const tx = demoTransactions.find((t) => t.id === txId) ?? demoTransactions[0]

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="수령 기한 초과"
        left={
          <button onClick={() => navigate(-1)} aria-label="뒤로">
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 pb-28">
        <div className="bg-orange-light rounded-2xl p-5 border border-orange/20 text-center">
          <Clock size={40} className="text-orange mx-auto mb-3" />
          <p className="font-bold text-text mb-1">수령 가능일로부터 7일이 지났어요</p>
          <p className="text-xs text-text-secondary leading-relaxed">
            {tx.title} · {formatPrice(tx.amount)}
          </p>
        </div>

        <div className="bg-surface rounded-xl border border-border p-4 space-y-3 text-sm">
          <p className="font-bold text-text">안내</p>
          <ul className="text-xs text-text-secondary space-y-2 list-disc pl-4">
            <li>미수령 상태가 계속되면 일일 보관료가 발생할 수 있습니다.</li>
            <li>팀장에게 채팅으로 수령 일정을 조율하세요.</li>
            <li>장기 미수령 시 분쟁·환불 절차가 시작될 수 있습니다.</li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 flex gap-3">
          <AlertTriangle size={18} className="text-orange shrink-0" />
          <p className="text-xs text-text-secondary leading-relaxed">
            팀장 보관 공간이 부족한 경우{' '}
            <Link to={`/pickup/storage/${txId}`} className="text-primary font-semibold">
              보관 공간 부족 신고
            </Link>
            를 통해 대체 수령 방안을 요청할 수 있어요.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4 space-y-2">
        <Link
          to="/chat"
          className="flex w-full h-12 bg-primary text-white font-bold rounded-xl items-center justify-center gap-2"
        >
          팀장에게 연락하기
        </Link>
        <Link
          to={`/confirm/${txId}`}
          className="flex w-full h-11 items-center justify-center gap-2 text-sm text-primary font-semibold"
        >
          <ShieldCheck size={16} />
          수령 완료했어요
        </Link>
        <Link
          to={`/dispute/${txId}`}
          className="block w-full h-10 text-xs text-red-500 text-center leading-10"
        >
          분쟁 신고
        </Link>
      </div>
    </div>
  )
}
