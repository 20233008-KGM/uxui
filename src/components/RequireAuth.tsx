import { Navigate, useLocation } from 'react-router-dom'

/** 캔버스 미리보기 iframe용 — 인증 가드 우회 */
export function isCanvasPreview() {
  return new URLSearchParams(window.location.search).get('canvas') === '1'
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  if (isCanvasPreview()) return <>{children}</>

  const loggedIn = sessionStorage.getItem('gonggu_auth') === 'true'
  if (!loggedIn) {
    return <Navigate to="/landing" state={{ from: location.pathname }} replace />
  }
  return <>{children}</>
}

export function RequireGuest({ children }: { children: React.ReactNode }) {
  if (isCanvasPreview()) return <>{children}</>

  const loggedIn = sessionStorage.getItem('gonggu_auth') === 'true'
  if (loggedIn) return <Navigate to="/" replace />
  return <>{children}</>
}
