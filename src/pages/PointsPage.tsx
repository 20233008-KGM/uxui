import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Gift, TrendingUp } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { useApp } from '../context/AppContext'

const leaderBonusTiers = [
  { label: '3명 모집', reward: '기본 수수료 ₩800/인' },
  { label: '5명 모집', reward: '+500P 보너스' },
  { label: '8명 모집', reward: '+1,500P 보너스' },
  { label: '지인 초대 1명', reward: '+300P' },
]

export default function PointsPage() {
  const navigate = useNavigate()
  const { user } = useApp()

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="포인트"
        left={
          <button onClick={() => navigate(-1)} aria-label="뒤로">
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="px-5 py-4 space-y-4">
        <div className="bg-primary rounded-2xl p-6 text-white text-center">
          <p className="text-sm opacity-80 mb-1">보유 포인트</p>
          <p className="text-3xl font-bold">{user?.points ?? 500}P</p>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-primary" />
            <p className="font-bold text-sm">팀장 인센티브 (수수료 부족 대응)</p>
          </div>
          <div className="space-y-2">
            {leaderBonusTiers.map((t) => (
              <div key={t.label} className="flex justify-between text-xs bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-text-secondary">{t.label}</span>
                <span className="font-semibold text-primary">{t.reward}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <Gift size={18} className="text-primary" />
            <p className="font-bold text-sm">포인트 적립 안내</p>
          </div>
          <div className="space-y-2 text-xs text-text-secondary">
            <p>• 첫 공구 참여: 500P</p>
            <p>• 후기 작성: 100P</p>
            <p>• 팀장 수수료 정산 시 추가 보너스</p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border divide-y divide-border">
          {[
            ['첫 공구 참여', '+500P', '2024.12.01'],
            ['후기 작성', '+100P', '2024.11.15'],
          ].map(([desc, pts, date]) => (
            <div key={desc} className="flex justify-between p-4 text-sm">
              <div>
                <p className="text-text">{desc}</p>
                <p className="text-xs text-text-secondary">{date}</p>
              </div>
              <span className="font-bold text-primary">{pts}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
