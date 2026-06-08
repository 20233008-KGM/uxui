import type { NeighborhoodRange } from './notifications'

export interface GeoPoint {
  lat: number
  lng: number
  label: string
  dong: string
}

/** 사용자 기본 위치 (신림동) */
export const userHome: GeoPoint = {
  lat: 37.4842,
  lng: 126.9297,
  label: '관악구 신림동',
  dong: '신림동',
}

/** 팀장 수령 위치 프리셋 (공구 열기 시 선택) */
export const leaderLocationPresets: GeoPoint[] = [
  { lat: 37.4842, lng: 126.9297, label: '신림동 (현재 위치)', dong: '신림동' },
  { lat: 37.4810, lng: 126.9320, label: '신림역 인근', dong: '신림동' },
  { lat: 37.4775, lng: 126.9410, label: '봉천동', dong: '봉천동' },
  { lat: 37.4900, lng: 126.9180, label: '남현동', dong: '남현동' },
]

const rangeMeters: Record<NeighborhoodRange, number> = {
  '500m': 500,
  '1km': 1000,
  '2km': 2000,
  dong: 3000,
}

export function getRangeMeters(range: NeighborhoodRange) {
  return rangeMeters[range]
}

/** Haversine 거리 (미터) */
export function getDistanceMeters(a: GeoPoint, b: GeoPoint) {
  const R = 6371000
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)))
}

export function formatDistance(meters: number) {
  if (meters < 1000) return `${meters}m`
  return `${(meters / 1000).toFixed(1)}km`
}

export function isWithinRange(meters: number, range: NeighborhoodRange) {
  return meters <= getRangeMeters(range)
}

/** 참여자 범위 + 팀장 노출 범위 모두 충족해야 참여 가능 */
export function canJoinGroupBuy(
  distanceMeters: number,
  participationRange: NeighborhoodRange,
  visibilityRange: NeighborhoodRange,
) {
  return (
    isWithinRange(distanceMeters, participationRange) &&
    isWithinRange(distanceMeters, visibilityRange)
  )
}

export function getDistanceLabel(from: GeoPoint, to: GeoPoint) {
  return formatDistance(getDistanceMeters(from, to))
}
