import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { X, Calendar, Minus, Plus } from 'lucide-react'
import { StatusBar } from '../components/Layout'
import { LocationSummary } from '../components/LocationUI'
import { useApp } from '../context/AppContext'

export default function OpenGroupBuyStep2Page() {
  const navigate = useNavigate()
  const { leaderPickupLocation, leaderDetailAddress } = useApp()
  const [minMembers, setMinMembers] = useState(3)
  const [maxMembers, setMaxMembers] = useState(5)

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <StatusBar />
      <div className="bg-surface border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} aria-label="닫기"><X size={22} /></button>
          <h1 className="text-base font-bold text-text">공구 열기</h1>
          <span className="text-sm text-text-secondary">2/3</span>
        </div>
        <StepIndicator current={2} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28 space-y-5">
        <LocationSummary location={leaderPickupLocation} detail={leaderDetailAddress || undefined} />
        <Link to="/open" className="block text-center text-xs text-primary font-semibold -mt-2">
          위치 수정하기 →
        </Link>

        <div>
          <label className="block text-sm font-semibold text-text mb-2">모집 인원</label>
          <div className="grid grid-cols-2 gap-4">
            <NumberStepper label="최소 인원" value={minMembers} onChange={setMinMembers} min={2} />
            <NumberStepper label="최대 인원" value={maxMembers} onChange={setMaxMembers} min={minMembers} />
          </div>
          <p className="text-xs text-text-secondary mt-2">최소 인원 미달 시 공구 무산 · 자동 환불</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text mb-2">모집 마감일</label>
          <button className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-text-secondary flex items-center justify-between">
            2024년 12월 25일
            <Calendar size={18} />
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text mb-2">수령 일정</label>
          <button className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-text-secondary flex items-center justify-between">
            2024년 12월 28일 ~ 30일
            <Calendar size={18} />
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text mb-2">수령 방법</label>
          <select className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none">
            <option>팀장 집 방문 수령</option>
            <option>공동 수령 장소 (아파트 관리실 등)</option>
          </select>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4">
        <Link to="/open/step3" className="block w-full h-12 bg-primary text-white font-bold rounded-xl text-center leading-[3rem]">
          다음 단계
        </Link>
      </div>
    </div>
  )
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 px-8 pb-5">
      {[1, 2, 3].map((step, i) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step <= current ? 'bg-primary text-white' : 'bg-gray-200 text-text-secondary'
          }`}>{step}</div>
          {i < 2 && <div className={`w-16 h-0.5 ${step < current ? 'bg-primary' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  )
}

function NumberStepper({ label, value, onChange, min }: { label: string; value: number; onChange: (v: number) => void; min: number }) {
  return (
    <div>
      <p className="text-xs text-text-secondary mb-1">{label}</p>
      <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
        <button onClick={() => onChange(Math.max(min, value - 1))} className="w-10 h-11 flex items-center justify-center"><Minus size={16} /></button>
        <span className="flex-1 text-center font-bold">{value}</span>
        <button onClick={() => onChange(value + 1)} className="w-10 h-11 flex items-center justify-center"><Plus size={16} /></button>
      </div>
    </div>
  )
}

export { StepIndicator }
