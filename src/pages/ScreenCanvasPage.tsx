import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ZoomIn,
  ZoomOut,
  List,
  Move,
  Monitor,
  LayoutGrid,
  Home,
} from 'lucide-react'
import { screenGroups, PHONE_WIDTH, PHONE_HEIGHT } from '../data/screenRegistry'

const SCALE_MIN = 0.22
const SCALE_MAX = 0.85
const SCALE_STEP = 0.05
/** 첫 렌더·개요 버튼 — 셀 최대 채움 대신 전체가 보이도록 상한 */
const OVERVIEW_SCALE_CAP = 0.36

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
    <div className="flex flex-col items-center w-full">
      <Link
        to={path}
        target="_blank"
        className="block group w-full max-w-[280px] mx-auto"
        title={`${name} — 새 탭에서 열기`}
      >
        <div
          className="rounded-[28px] p-[3px] shadow-2xl transition-transform group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] mx-auto"
          style={{
            background: `linear-gradient(145deg, ${accent}88, #333)`,
            width: w + 6,
          }}
        >
          <div className="rounded-[25px] overflow-hidden bg-[#111] mx-auto" style={{ width: w, height: h }}>
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
          <p className="text-[13px] font-semibold text-white/90 group-hover:text-white truncate">{name}</p>
          {note && <p className="text-[10px] text-white/45 mt-0.5 truncate">{note}</p>}
          <p className="text-[10px] text-white/30 font-mono mt-0.5 truncate">{path}</p>
        </div>
      </Link>
    </div>
  )
}

function getGridCols(width: number) {
  if (width >= 1920) return 5
  if (width >= 1536) return 4
  if (width >= 1280) return 3
  if (width >= 768) return 2
  return 1
}

function calcOverviewScale(viewportWidth: number, viewportHeight: number, sidebarWidth: number, columns: number) {
  const padX = 48
  const padY = 56
  const headerH = 52
  const gapX = 24
  const labelH = 52
  const rowGap = 40
  const groupBlock = 120

  const availW = viewportWidth - sidebarWidth - padX * 2
  const availH = viewportHeight - headerH - padY * 2

  const scaleByWidth = (availW - gapX * (columns - 1)) / columns / (PHONE_WIDTH + 8)

  let totalRows = 0
  for (const group of screenGroups) {
    totalRows += Math.ceil(group.screens.length / columns)
  }
  const fixedH = screenGroups.length * groupBlock + totalRows * (labelH + rowGap)
  const scaleByHeight = (availH - fixedH) / (totalRows * PHONE_HEIGHT)

  const heightScale = Number.isFinite(scaleByHeight) && scaleByHeight > 0 ? scaleByHeight : scaleByWidth
  const fit = Math.min(scaleByWidth, heightScale)
  return Math.min(OVERVIEW_SCALE_CAP, Math.max(SCALE_MIN, +fit.toFixed(2)))
}

export default function ScreenCanvasPage() {
  const [scale, setScale] = useState(() => {
    if (typeof window === 'undefined') return 0.32
    const cols = getGridCols(window.innerWidth)
    const sidebar = window.innerWidth >= 1024 ? 240 : 0
    return calcOverviewScale(window.innerWidth, window.innerHeight, sidebar, cols)
  })
  const [gridCols, setGridCols] = useState(() =>
    typeof window !== 'undefined' ? getGridCols(window.innerWidth) : 4,
  )
  const [activeGroup, setActiveGroup] = useState(0)
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, x: 0, y: 0, scrollLeft: 0, scrollTop: 0 })

  const total = screenGroups.reduce((n, g) => n + g.screens.length, 0)

  const resetOverview = useCallback(() => {
    const w = window.innerWidth
    const h = window.innerHeight
    const cols = getGridCols(w)
    setGridCols(cols)
    setScale(calcOverviewScale(w, h, w >= 1024 ? 240 : 0, cols))
    canvasRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const onResize = () => setGridCols(getGridCols(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    canvasRef.current?.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === '+' || e.key === '=') {
        e.preventDefault()
        setScale((s) => Math.min(SCALE_MAX, +(s + SCALE_STEP).toFixed(2)))
      }
      if (e.key === '-') {
        e.preventDefault()
        setScale((s) => Math.max(SCALE_MIN, +(s - SCALE_STEP).toFixed(2)))
      }
      if (e.key === '0') resetOverview()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [resetOverview])

  const zoom = useCallback((delta: number) => {
    setScale((s) => Math.min(SCALE_MAX, Math.max(SCALE_MIN, +(s + delta).toFixed(2))))
  }, [])

  const scrollToGroup = (index: number) => {
    setActiveGroup(index)
    document.getElementById(`screen-group-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('a, button, aside')) return
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

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#121212] text-white select-none">
      {/* 데스크탑 툴바 */}
      <header className="shrink-0 flex items-center justify-between gap-4 px-4 lg:px-6 py-3 border-b border-white/10 bg-[#1a1a1a]">
        <div className="flex items-center gap-4 min-w-0">
          <div className="hidden sm:flex items-center gap-2 text-white/50">
            <Monitor size={18} />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm lg:text-base font-bold truncate">화면 보드 · 데스크탑</h1>
            <p className="text-[11px] text-white/40 truncate">
              {total}개 화면 · {gridCols}열 그리드
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <button
              onClick={resetOverview}
              className="px-2.5 h-8 flex items-center gap-1.5 text-xs rounded hover:bg-white/10"
              title="전체 개요 보기 (0)"
            >
              <LayoutGrid size={14} />
              개요
            </button>
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
          </div>
          <Link
            to="/"
            className="hidden lg:flex items-center gap-1.5 text-xs text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <Home size={14} />
            앱
          </Link>
          <Link
            to="/screens/list"
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <List size={14} />
            목록
          </Link>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* 사이드바 — lg+ */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-white/10 bg-[#1a1a1a] overflow-y-auto">
          <p className="px-4 pt-4 pb-2 text-[10px] font-bold text-white/30 uppercase tracking-wider">
            섹션 이동
          </p>
          <nav className="flex-1 px-2 pb-4 space-y-0.5">
            {screenGroups.map((group, i) => (
              <button
                key={group.title}
                type="button"
                onClick={() => scrollToGroup(i)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-center gap-2 ${
                  activeGroup === i ? 'bg-white/10 text-white' : 'text-white/55 hover:bg-white/5 hover:text-white/80'
                }`}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: group.color }} />
                <span className="truncate flex-1">{group.title}</span>
                <span className="text-white/30 tabular-nums">{group.screens.length}</span>
              </button>
            ))}
          </nav>
          <div className="px-4 py-3 border-t border-white/10 text-[10px] text-white/30 leading-relaxed">
            <p>+ / − 확대·축소</p>
            <p>0 전체 개요</p>
            <p>Ctrl+휠 줌</p>
          </div>
        </aside>

        {/* 캔버스 */}
        <div
          ref={canvasRef}
          className="flex-1 overflow-auto cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onWheel={onWheel}
        >
          <div className="px-4 sm:px-8 lg:px-10 py-8 max-w-[2400px] mx-auto">
            <div className="flex items-center gap-2 mb-8 text-white/30 text-xs">
              <Move size={14} />
              <span className="hidden sm:inline">드래그 이동 · 프레임 클릭 → 새 탭 ·</span>
              Ctrl+휠로 확대 · 개요에서 시작
            </div>

            {screenGroups.map((group, gi) => (
              <section
                key={group.title}
                id={`screen-group-${gi}`}
                className="mb-16 last:mb-8 scroll-mt-6"
              >
                <div
                  className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10 sticky top-0 z-10 bg-[#121212]/95 backdrop-blur-sm py-2"
                >
                  <div className="w-1 h-7 rounded-full shrink-0" style={{ background: group.color }} />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold text-white/90">{group.title}</h2>
                    {group.description && (
                      <p className="text-[11px] text-white/35 truncate">{group.description}</p>
                    )}
                  </div>
                  <span className="text-xs text-white/25 shrink-0">{group.screens.length} screens</span>
                </div>

                <div
                  className="grid gap-x-6 gap-y-10"
                  style={{
                    gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                  }}
                >
                  {group.screens.map((screen) => (
                      <div key={screen.path}>
                        <ScreenFrame
                          name={screen.name}
                          path={screen.path}
                          scale={scale}
                          accent={group.color}
                          note={screen.note}
                        />
                      </div>
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
