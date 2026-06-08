import { ChevronDown, Wifi, BatteryFull } from 'lucide-react'

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1 text-xs font-semibold text-text">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <Wifi size={14} />
        <BatteryFull size={14} />
      </div>
    </div>
  )
}

export function LocationHeader() {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <button className="flex items-center gap-1 text-base font-bold text-text">
        <span>📍</span>
        <span>관악구 신림동</span>
        <ChevronDown size={16} className="text-text-secondary" />
      </button>
      <div className="flex items-center gap-4 text-text">
        <button aria-label="검색">🔍</button>
        <button aria-label="알림">🔔</button>
      </div>
    </div>
  )
}

export function PageHeader({
  title,
  left,
  right,
}: {
  title: string
  left?: React.ReactNode
  right?: React.ReactNode
}) {
  return (
    <>
      <StatusBar />
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/95 backdrop-blur-sm shadow-[var(--shadow-lr-sm)]">
        <div className="w-10">{left}</div>
        <h1 className="text-base font-bold text-text">{title}</h1>
        <div className="w-10 flex justify-end">{right}</div>
      </div>
    </>
  )
}
