import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, PackageX, MapPin, ShieldCheck } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { demoTransactions } from '../data/escrow'

const options = [
  '팀장이 지정한 대체 수령 장소 이용',
  '인근 편의점/무인함 보관 (팀장 동의)',
  '참여자 직접 수령 (일정 재조율)',
  '분쟁 접수 후 환불 검토',
]

export default function StorageIssuePage() {
  const { txId } = useParams()
  const navigate = useNavigate()
  const tx = demoTransactions.find((t) => t.id === txId) ?? demoTransactions[0]

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="보관 공간 부족"
        left={
          <button onClick={() => navigate(-1)} aria-label="뒤로">
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 pb-28">
        <div className="bg-orange-light rounded-2xl p-5 border border-orange/20">
          <PackageX size={36} className="text-orange mb-3" />
          <p className="font-bold text-text mb-2">팀장 보관 공간이 부족해요</p>
          <p className="text-xs text-text-secondary leading-relaxed">
            {tx.title} · 팀장 {tx.leaderName}님이 보관 한도에 도달했다고 알려왔습니다.
            대체 수령 방안을 선택하거나 분쟁을 접수할 수 있어요.
          </p>
        </div>

        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-sm font-bold text-text mb-3">가능한 조치</p>
          <div className="space-y-2">
            {options.map((opt) => (
              <div
                key={opt}
                className="flex items-start gap-2 text-xs text-text-secondary bg-gray-50 rounded-lg p-3"
              >
                <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                {opt}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary-light rounded-xl p-4 text-xs text-primary-dark leading-relaxed">
          에스크로 결제금은 수령 확인 전까지 보호됩니다. 대체 수령이 어려우면 분쟁 신고를 이용하세요.
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4 space-y-2">
        <Link
          to="/chat"
          className="flex w-full h-12 bg-primary text-white font-bold rounded-xl items-center justify-center"
        >
          팀장과 대체 수령 협의
        </Link>
        <Link
          to={`/dispute/${txId}`}
          className="flex w-full h-11 items-center justify-center gap-2 text-sm text-red-500 font-medium"
        >
          <ShieldCheck size={16} />
          분쟁 신고 · 환불 요청
        </Link>
      </div>
    </div>
  )
}
