import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { useApp } from '../context/AppContext'
import {
  defaultNotifications,
  frequencyLabels,
  frequencyDays,
  type NotificationFrequency,
} from '../data/notifications'

export default function NotificationSettingsPage() {
  const navigate = useNavigate()
  const {
    notificationFrequency,
    setNotificationFrequency,
    skipPurchasedNotifications,
    setSkipPurchasedNotifications,
    skipActiveGroupBuyNotifications,
    setSkipActiveGroupBuyNotifications,
  } = useApp()

  const frequencies = Object.entries(frequencyLabels) as [NotificationFrequency, string][]

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="알림 설정"
        left={
          <button onClick={() => navigate(-1)} aria-label="뒤로">
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="px-5 py-4 space-y-5">
        <div className="bg-primary-light rounded-xl p-4">
          <p className="text-sm font-bold text-text mb-2">중복 알림 방지</p>
          <p className="text-[11px] text-text-secondary mb-3">
            설정은 기기에 저장되어, 이미 산 뒤·참여 중인 공구 알림이 반복되지 않도록 합니다.
          </p>
          <div className="space-y-3">
            <ToggleRow
              label="이미 구매한 품목 알림 제외"
              desc="최근 공구 참여 이력이 있으면 재구매 알림 안 보냄"
              on={skipPurchasedNotifications}
              onChange={setSkipPurchasedNotifications}
            />
            <ToggleRow
              label="진행 중인 공구 알림 제외"
              desc="이미 참여한 공구는 알림 안 보냄"
              on={skipActiveGroupBuyNotifications}
              onChange={setSkipActiveGroupBuyNotifications}
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-text mb-3">알림 주기</p>
          <div className="space-y-2">
            {frequencies.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setNotificationFrequency(key)}
                className={`w-full text-left p-4 rounded-xl border ${
                  notificationFrequency === key ? 'border-primary bg-primary-light' : 'border-border bg-surface'
                }`}
              >
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-text-secondary">소진 {frequencyDays[key]}일 전 알림</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-text mb-3">품목별 사용 주기 알림</p>
          <div className="space-y-2">
            {defaultNotifications.map((n) => (
              <div
                key={n.id}
                className="bg-surface rounded-xl border border-border p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-sm text-text">{n.itemName}</p>
                  <p className="text-xs text-text-secondary">
                    {n.cycleDays}일 주기 · 다음: {n.nextAlarmDate}
                  </p>
                </div>
                <Bell size={18} className={n.enabled ? 'text-primary' : 'text-gray-300'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ToggleRow({
  label,
  desc,
  on,
  onChange,
}: {
  label: string
  desc: string
  on: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="w-full flex items-center justify-between gap-3 text-left"
    >
      <div>
        <p className="text-sm font-medium text-text">{label}</p>
        <p className="text-[11px] text-text-secondary">{desc}</p>
      </div>
      <div
        className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${on ? 'bg-primary' : 'bg-gray-300'}`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`}
        />
      </div>
    </button>
  )
}
