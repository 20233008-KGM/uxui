import { Link } from 'react-router-dom'
import { LayoutGrid, ExternalLink, Columns3 } from 'lucide-react'
import { screenGroups } from '../data/screenRegistry'

export default function ScreenCatalogPage() {
  const total = screenGroups.reduce((n, g) => n + g.screens.length, 0)

  return (
    <div className="min-h-dvh bg-bg">
      <div className="sticky top-0 bg-surface border-b border-border px-5 py-4 z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutGrid size={20} className="text-primary" />
              <h1 className="text-lg font-bold text-text">화면 목록</h1>
            </div>
            <p className="text-xs text-text-secondary">총 {total}개 화면</p>
          </div>
          <Link
            to="/screens"
            className="flex items-center gap-1.5 text-sm text-primary font-semibold bg-primary-light px-3 py-2 rounded-xl"
          >
            <Columns3 size={16} />
            보드 보기
          </Link>
        </div>
      </div>

      <div className="px-5 py-4 space-y-6 pb-10">
        {screenGroups.map((group) => (
          <section key={group.title}>
            <h2 className="text-sm font-bold text-text mb-2">{group.title}</h2>
            <div className="bg-surface rounded-xl border border-border divide-y divide-border overflow-hidden">
              {group.screens.map((screen) => (
                <Link
                  key={screen.path}
                  to={screen.path}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-medium text-text">{screen.name}</p>
                    <p className="text-[11px] text-text-secondary font-mono">{screen.path}</p>
                  </div>
                  <ExternalLink size={14} className="text-text-secondary" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export { screenGroups }
