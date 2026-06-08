import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Package, AlertTriangle, Clock } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { EscrowStatusSteps } from '../components/SafePayBadge'
import { demoTransactions } from '../data/escrow'
import { formatPrice } from '../data/groupBuys'

export default function ConfirmReceiptPage() {
  const { txId } = useParams()
  const navigate = useNavigate()
  const tx = demoTransactions.find((t) => t.id === txId) ?? demoTransactions[0]

  const handleConfirm = () => {
    navigate(`/review/${txId}`)
  }

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="수령 확인"
        left={
          <button onClick={() => navigate(-1)} aria-label="뒤로">
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-28 px-5 py-4 space-y-4">
        <div className="bg-surface rounded-2xl border border-border p-5">
          <EscrowStatusSteps currentStep={1} />
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
              <Package size={28} className="text-gray-400" />
            </div>
            <div>
              <p className="font-bold text-text">{tx.title}</p>
              <p className="text-sm text-text-secondary">팀장 {tx.leaderName}</p>
            </div>
          </div>
          <div className="divide-y divide-border text-sm">
            <div className="flex justify-between py-2.5">
              <span className="text-text-secondary">결제 금액</span>
              <span className="font-bold text-text">{formatPrice(tx.amount)}</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-text-secondary">에스크로 상태</span>
              <span className="font-semibold text-orange">수령 가능</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-text-secondary">결제일</span>
              <span className="text-text">{tx.paidAt}</span>
            </div>
          </div>
        </div>

        <div className="bg-orange-light rounded-xl p-4 flex gap-3">
          <Clock size={18} className="text-orange shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-text mb-1">수령 기한 D-2</p>
            <p className="text-xs text-text-secondary leading-relaxed">
              수령 가능일로부터 7일 내 미수령 시 보관료가 발생할 수 있습니다.
              기한 초과 시{' '}
              <Link to={`/pickup/overdue/${txId}`} className="text-primary font-semibold">
                수령 기한 초과 안내
              </Link>
              를 확인하세요.
            </p>
          </div>
        </div>

        <div className="bg-orange-light rounded-xl p-4 flex gap-3">
          <AlertTriangle size={18} className="text-orange shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-text mb-1">보관 공간 부족</p>
            <p className="text-xs text-text-secondary leading-relaxed">
              팀장이 보관 한도에 도달했다면{' '}
              <Link to={`/pickup/storage/${txId}`} className="text-primary font-semibold">
                대체 수령 협의
              </Link>
              를 요청하세요.
            </p>
          </div>
        </div>

        <div className="bg-orange-light rounded-xl p-4 flex gap-3">
          <AlertTriangle size={18} className="text-orange shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-text mb-1">수령 확인 전 꼭 확인하세요</p>
            <p className="text-xs text-text-secondary leading-relaxed">
              수령 확인을 누르면 {formatPrice(tx.amount)}이 팀장에게 정산됩니다.
              물건 상태(수량, 품질)를 확인한 후 눌러주세요.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-text mb-2">문제가 있나요?</p>
          <p className="text-xs text-text-secondary leading-relaxed">
            물건이 불량이거나 수량이 부족하면 수령 확인 대신{' '}
            <strong>분쟁 신고</strong>를 접수할 수 있어요. 분쟁 접수 시 결제금은 계속 보관됩니다.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4 space-y-2">
        <button
          onClick={handleConfirm}
          className="w-full h-12 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2"
        >
          <ShieldCheck size={20} />
          수령 확인 · 팀장 정산
        </button>
        <Link to={`/dispute/${txId}`} className="block w-full h-11 text-sm text-red-500 font-medium text-center leading-[2.75rem]">
          분쟁 신고하기
        </Link>
      </div>
    </div>
  )
}
