import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ZoomIn, ZoomOut, Maximize2, List, Move } from 'lucide-react'
import { screenGroups, PHONE_WIDTH, PHONE_HEIGHT } from '../data/screenRegistry'

const SCALE_MIN = 0.35
const SCALE_MAX = 1
const SCALE_STEP = 0.05

function ScreenFrame({
  name,
  path,
  scale,
  accent,
  note,
}: {
  name: string
  path: string
  scale: number
  accent: string
  note?: string
}) {
  const w = PHONE_WIDTH * scale
  const h = PHONE_HEIGHT * scale

  return (
    <div className="shrink-0 flex flex-col items-center" style={{ width: w + 24 }}>
      <Link
        to={path}
        target="_blank"
        className="block group"
        title={`${name} — 새 탭에서 열기`}
      >
        <div
          className="rounded-[28px] p-[3px] shadow-2xl transition-transform group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          style={{ background: `linear-gradient(145deg, ${accent}88, #333)` }}
        >
          <div className="rounded-[25px] overflow-hidden bg-[#111]" style={{ width: w, height: h }}>
            <iframe
              src={`${path}?canvas=1`}
              title={name}
              loading="lazy"
              className="border-0 pointer-events-none"
              style={{
                width: PHONE_WIDTH,
                height: PHONE_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            />
          </div>
        </div>
        <div className="mt-3 text-center px-1">
          <p className="text-[13px] font-semibold text-white/90 group-hover:text-white">{name}</p>
          {note && <p className="text-[10px] text-white/45 mt-0.5">{note}</p>}
          <p className="text-[10px] text-white/35 font-mono mt-0.5">{path}</p>
        </div>
      </Link>
    </div>
  )
}

export default function ScreenCanvasPage() {
  const [scale, setScale] = useState(0.55)
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, x: 0, y: 0, scrollLeft: 0, scrollTop: 0 })

  const zoom = useCallback((delta: number) => {
    setScale((s) => Math.min(SCALE_MAX, Math.max(SCALE_MIN, +(s + delta).toFixed(2))))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('a')) return
    const el = canvasRef.current
    if (!el) return
    dragRef.current = {
      active: true,
      x: e.clientX,
      y: e.clientY,
      scrollLeft: el.scrollLeft,
      scrollTop: el.scrollTop,
    }
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active || !canvasRef.current) return
    const dx = e.clientX - dragRef.current.x
    const dy = e.clientY - dragRef.current.y
    canvasRef.current.scrollLeft = dragRef.current.scrollLeft - dx
    canvasRef.current.scrollTop = dragRef.current.scrollTop - dy
  }

  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current.active = false
    canvasRef.current?.releasePointerCapture(e.pointerId)
  }

  const onWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      zoom(e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP)
    }
  }

  const total = screenGroups.reduce((n, g) => n + g.screens.length, 0)

  return (
    <div className="h-dvh flex flex-col bg-[#161616] text-white select-none">
      <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#1e1e1e] z-20">
        <div>
          <h1 className="text-sm font-bold">화면 보드</h1>
          <p className="text-[11px] text-white/40">{total}개 화면 · Figma처럼 배치</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => zoom(-SCALE_STEP)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10"
              aria-label="축소"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-xs w-12 text-center tabular-nums">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => zoom(SCALE_STEP)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10"
              aria-label="확대"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setScale(0.55)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10"
              aria-label="맞춤"
            >
              <Maximize2 size={14} />
            </button>
          </div>
          <Link
            to="/screens/list"
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <List size={14} />
            목록
          </Link>
        </div>
      </div>

      <div
        ref={canvasRef}
        className="flex-1 overflow-auto cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      >
        <div className="p-16 min-w-max min-h-max">
          <div className="flex items-center gap-2 mb-12 text-white/30 text-xs">
            <Move size={14} />
            드래그로 이동 · 프레임 클릭 시 새 탭 · Ctrl+휠 확대/축소
          </div>

          {screenGroups.map((group) => (
            <section key={group.title} className="mb-20 last:mb-8">
              <div className="flex items-center gap-3 mb-8 sticky left-16 z-10">
                <div className="w-1 h-6 rounded-full" style={{ background: group.color }} />
                <div>
                  <h2 className="text-sm font-bold text-white/80">{group.title}</h2>
                  {group.description && (
                    <p className="text-[11px] text-white/35">{group.description}</p>
                  )}
                </div>
                <span className="text-[10px] text-white/25 ml-2">{group.screens.length} screens</span>
              </div>

              <div className="flex gap-10 items-start flex-nowrap pb-4">
                {group.screens.map((screen) => (
                  <ScreenFrame
                    key={screen.path}
                    name={screen.name}
                    path={screen.path}
                    scale={scale}
                    accent={group.color}
                    note={screen.note}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
