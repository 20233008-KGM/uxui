import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { NotificationFrequency, NeighborhoodRange } from '../data/notifications'
import type { GeoPoint } from '../data/locations'
import { leaderLocationPresets } from '../data/locations'
import { getRandomDemoMileage } from '../data/leaderTier'

interface User {
  name: string
  email: string
  neighborhood: string
  points: number
}

interface AppContextValue {
  isLoggedIn: boolean
  user: User | null
  login: (email: string) => void
  signup: (name: string, email: string) => void
  logout: () => void
  /** @deprecated participationRange 사용 */
  neighborhoodRange: NeighborhoodRange
  /** @deprecated setParticipationRange 사용 */
  setNeighborhoodRange: (r: NeighborhoodRange) => void
  /** 참여자: 내가 참여할 공구 거리 (Y) */
  participationRange: NeighborhoodRange
  setParticipationRange: (r: NeighborhoodRange) => void
  /** 팀장: 내 공구 노출·참여 허용 거리 (X) — 마이페이지 기본값 */
  leaderVisibilityRange: NeighborhoodRange
  setLeaderVisibilityRange: (r: NeighborhoodRange) => void
  /** 공구 열기 시 이번 공구 노출 범위 */
  openVisibilityRange: NeighborhoodRange
  setOpenVisibilityRange: (r: NeighborhoodRange) => void
  notificationFrequency: NotificationFrequency
  setNotificationFrequency: (f: NotificationFrequency) => void
  skipPurchasedNotifications: boolean
  setSkipPurchasedNotifications: (v: boolean) => void
  skipActiveGroupBuyNotifications: boolean
  setSkipActiveGroupBuyNotifications: (v: boolean) => void
  coldStartMode: boolean
  setColdStartMode: (v: boolean) => void
  leaderPickupLocation: GeoPoint
  setLeaderPickupLocation: (loc: GeoPoint) => void
  leaderDetailAddress: string
  setLeaderDetailAddress: (v: string) => void
  /** 공구 열기 선택 품목 (플랫폼 카탈로그) */
  selectedCatalogProductId: string
  setSelectedCatalogProductId: (id: string) => void
  inviteRewardClaimed: boolean
  claimInviteReward: (code: string) => void
  /** 팀장 마일리지 (공구 열기 등으로 적립) */
  leaderMileage: number
  addLeaderMileage: (amount: number) => void
}

const AppContext = createContext<AppContextValue | null>(null)

const defaultUser: User = {
  name: '공구러버',
  email: 'user@example.com',
  neighborhood: '관악구 신림동',
  points: 500,
}

function readRange(key: string, fallback: NeighborhoodRange): NeighborhoodRange {
  const v = localStorage.getItem(key)
  if (v === '500m' || v === '1km' || v === '2km' || v === 'dong') return v
  return fallback
}

function readBool(key: string, fallback: boolean) {
  const v = localStorage.getItem(key)
  if (v === 'true') return true
  if (v === 'false') return false
  return fallback
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem('gonggu_auth') === 'true',
  )
  const [user, setUser] = useState<User | null>(
    () => (sessionStorage.getItem('gonggu_auth') === 'true' ? defaultUser : null),
  )
  const [participationRange, setParticipationRangeState] = useState<NeighborhoodRange>(() =>
    readRange('gonggu_participation_range', '1km'),
  )
  const [leaderVisibilityRange, setLeaderVisibilityRangeState] = useState<NeighborhoodRange>(() =>
    readRange('gonggu_leader_visibility_range', '1km'),
  )
  const [openVisibilityRange, setOpenVisibilityRange] = useState<NeighborhoodRange>(() =>
    readRange('gonggu_leader_visibility_range', '1km'),
  )
  const [notificationFrequency, setNotificationFrequencyState] = useState<NotificationFrequency>(
    () => (localStorage.getItem('gonggu_notif_freq') as NotificationFrequency) || 'normal',
  )
  const [skipPurchasedNotifications, setSkipPurchasedState] = useState(() =>
    readBool('gonggu_skip_purchased', true),
  )
  const [skipActiveGroupBuyNotifications, setSkipActiveGroupBuyState] = useState(() =>
    readBool('gonggu_skip_active', true),
  )
  const [coldStartMode, setColdStartMode] = useState(false)
  const [leaderPickupLocation, setLeaderPickupLocation] = useState<GeoPoint>(leaderLocationPresets[0])
  const [leaderDetailAddress, setLeaderDetailAddress] = useState('')
  const [selectedCatalogProductId, setSelectedCatalogProductId] = useState('1')
  const [inviteRewardClaimed, setInviteRewardClaimed] = useState(
    () => sessionStorage.getItem('gonggu_invite_claimed') !== null,
  )
  const [leaderMileage, setLeaderMileage] = useState(getRandomDemoMileage)

  const setParticipationRange = useCallback((r: NeighborhoodRange) => {
    setParticipationRangeState(r)
    localStorage.setItem('gonggu_participation_range', r)
  }, [])

  const setLeaderVisibilityRange = useCallback((r: NeighborhoodRange) => {
    setLeaderVisibilityRangeState(r)
    setOpenVisibilityRange(r)
    localStorage.setItem('gonggu_leader_visibility_range', r)
  }, [])

  const setNotificationFrequency = useCallback((f: NotificationFrequency) => {
    setNotificationFrequencyState(f)
    localStorage.setItem('gonggu_notif_freq', f)
  }, [])

  const setSkipPurchasedNotifications = useCallback((v: boolean) => {
    setSkipPurchasedState(v)
    localStorage.setItem('gonggu_skip_purchased', String(v))
  }, [])

  const setSkipActiveGroupBuyNotifications = useCallback((v: boolean) => {
    setSkipActiveGroupBuyState(v)
    localStorage.setItem('gonggu_skip_active', String(v))
  }, [])

  const addLeaderMileage = useCallback((amount: number) => {
    setLeaderMileage((m) => m + amount)
  }, [])

  const claimInviteReward = useCallback(
    (code: string) => {
      setInviteRewardClaimed(true)
      sessionStorage.setItem('gonggu_invite_claimed', code)
      if (user) {
        setUser({ ...user, points: user.points + 1000 })
      }
    },
    [user],
  )

  const login = useCallback((email: string) => {
    setIsLoggedIn(true)
    setUser({ ...defaultUser, email })
    sessionStorage.setItem('gonggu_auth', 'true')
  }, [])

  const signup = useCallback((name: string, email: string) => {
    setIsLoggedIn(true)
    setUser({ ...defaultUser, name, email })
    sessionStorage.setItem('gonggu_auth', 'true')
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUser(null)
    sessionStorage.removeItem('gonggu_auth')
  }, [])

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        signup,
        logout,
        neighborhoodRange: participationRange,
        setNeighborhoodRange: setParticipationRange,
        participationRange,
        setParticipationRange,
        leaderVisibilityRange,
        setLeaderVisibilityRange,
        openVisibilityRange,
        setOpenVisibilityRange,
        notificationFrequency,
        setNotificationFrequency,
        skipPurchasedNotifications,
        setSkipPurchasedNotifications,
        skipActiveGroupBuyNotifications,
        setSkipActiveGroupBuyNotifications,
        coldStartMode,
        setColdStartMode,
        leaderPickupLocation,
        setLeaderPickupLocation,
        leaderDetailAddress,
        setLeaderDetailAddress,
        selectedCatalogProductId,
        setSelectedCatalogProductId,
        inviteRewardClaimed,
        claimInviteReward,
        leaderMileage,
        addLeaderMileage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
