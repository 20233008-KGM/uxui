import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Eye, UserCheck } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { useApp } from '../context/AppContext'
import {
  rangeLabels,
  participationRangeDesc,
  visibilityRangeDesc,
  type NeighborhoodRange,
} from '../data/notifications'

function RangePicker({
  title,
  desc,
  icon: Icon,
  value,
  onChange,
  accent,
}: {
  title: string
  desc: string
  icon: typeof MapPin
  value: NeighborhoodRange
  onChange: (r: NeighborhoodRange) => void
  accent: string
}) {
  const ranges = Object.entries(rangeLabels) as [NeighborhoodRange, string][]

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${accent}18` }}
        >
          <Icon size={20} style={{ color: accent }} />
        </div>
        <div>
          <p className="font-bold text-sm text-text">{title}</p>
          <p className="text-xs text-text-secondary mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>
      <div className="space-y-2">
        {ranges.map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`w-full text-left p-4 rounded-xl border transition-colors ${
              value === key ? 'border-primary bg-primary-light' : 'border-border bg-surface'
            }`}
          >
            <p className="font-semibold text-sm text-text">{label}</p>
            {key === '1km' && <p className="text-xs text-primary mt-0.5">권장</p>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function NeighborhoodSettingsPage() {
  const navigate = useNavigate()
  const {
    participationRange,
    setParticipationRange,
    leaderVisibilityRange,
    setLeaderVisibilityRange,
  } = useApp()

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="동네 범위 설정"
        left={
          <button onClick={() => navigate(-1)} aria-label="뒤로">
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="px-5 py-4 space-y-8 pb-8">
        <div className="bg-primary-light rounded-xl p-4 flex gap-3">
          <MapPin size={20} className="text-primary shrink-0" />
          <p className="text-xs text-primary-dark leading-relaxed">
            범위가 너무 좁으면 모집이 어렵고, 너무 넓으면 수령이 불편해요.
            참여 범위와 노출 범위를 각각 설정할 수 있습니다.
          </p>
        </div>

        <RangePicker
          title="참여 범위 (참여자)"
          desc={participationRangeDesc}
          icon={UserCheck}
          value={participationRange}
          onChange={setParticipationRange}
          accent="#2e9d79"
        />

        <div className="h-px bg-border" />

        <RangePicker
          title="노출 범위 (팀장)"
          desc={visibilityRangeDesc}
          icon={Eye}
          value={leaderVisibilityRange}
          onChange={setLeaderVisibilityRange}
          accent="#0ea5e9"
        />

        <p className="text-[11px] text-text-secondary bg-gray-50 rounded-xl p-4 leading-relaxed">
          공구 열기 시 노출 범위는 여기서 설정한 값이 기본으로 적용됩니다.
          공구마다 1단계에서 따로 조정할 수도 있어요.
        </p>
      </div>
    </div>
  )
}
