import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, MapPin } from 'lucide-react'
import { PageHeader } from '../components/Layout'

export default function AddressPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="주소 관리"
        left={<button onClick={() => navigate(-1)} aria-label="뒤로"><ArrowLeft size={22} /></button>}
      />

      <div className="px-5 py-4 space-y-4">
        <div className="bg-primary-light rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <EyeOff size={16} className="text-primary" />
            <p className="text-sm font-bold text-text">프라이버시 보호</p>
          </div>
          <p className="text-xs text-primary-dark leading-relaxed">
            팀장 주소는 모집 확정 후 참여자에게만 공개됩니다.
            참여 전에는 동(洞) 단위만 표시돼요.
          </p>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4">
          <p className="text-xs text-text-secondary mb-3">내 수령 주소</p>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-text">관악구 신림동</p>
              <p className="text-sm text-text-secondary mt-1">신림동 *** (상세주소 비공개)</p>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4">
          <p className="text-xs text-text-secondary mb-3">팀장 수령 주소 (참여 확정 후)</p>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Eye size={16} />
            <span>모집 확정 시 공개 · 현재: 신림동 OOO</span>
          </div>
        </div>

        <div className="bg-orange-light rounded-xl p-4 text-xs text-text-secondary leading-relaxed">
          <strong className="text-text">수령 기간 내 미수령</strong> 시 보관료가 발생할 수 있으며,
          7일 경과 후 팀장 보관 공간 부족 시 분쟁 처리 절차가 시작됩니다.
        </div>
      </div>
    </div>
  )
}
