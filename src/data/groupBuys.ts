import type { GeoPoint } from './locations'
import { canJoinGroupBuy, userHome } from './locations'
import type { NeighborhoodRange } from './notifications'

export interface GroupBuy {
  id: string
  title: string
  icon: 'box' | 'droplet' | 'bottle'
  /** 상품 대표 이미지 URL */
  imageUrl?: string
  status: 'recruiting' | 'closing' | 'complete'
  statusLabel: string
  location: string
  pickupPoint: GeoPoint
  /** 팀장이 설정한 참여자 노출 범위 */
  visibilityRange: NeighborhoodRange
  current: number
  max: number
  price: number
  originalPrice?: number
  daysLeft: string
  category: string
}

export const groupBuys: GroupBuy[] = [
  {
    id: '1',
    title: '3겹 화장지 30롤 대용량',
    icon: 'box',
    status: 'recruiting',
    statusLabel: '모집중',
    location: '신림동',
    pickupPoint: { lat: 37.4842, lng: 126.9297, label: '신림동', dong: '신림동' },
    visibilityRange: '1km',
    imageUrl: '/products/1.svg',
    current: 3,
    max: 5,
    price: 4200,
    originalPrice: 6000,
    daysLeft: '2일 남음',
    category: '휴지/티슈',
  },
  {
    id: '2',
    title: '액체 세탁세제 3L',
    icon: 'droplet',
    status: 'closing',
    statusLabel: '마감임박',
    location: '신림동',
    pickupPoint: { lat: 37.4810, lng: 126.9320, label: '신림역 인근', dong: '신림동' },
    visibilityRange: '1km',
    imageUrl: '/products/2.svg',
    current: 4,
    max: 5,
    price: 5800,
    daysLeft: '1일 남음',
    category: '세제/세탁',
  },
  {
    id: '3',
    title: '주방세제 1L 2개',
    icon: 'bottle',
    status: 'recruiting',
    statusLabel: '모집중',
    location: '봉천동',
    pickupPoint: { lat: 37.4775, lng: 126.9410, label: '봉천동', dong: '봉천동' },
    visibilityRange: '500m',
    imageUrl: '/products/3.svg',
    current: 1,
    max: 4,
    price: 3500,
    daysLeft: '5일 남음',
    category: '욕실용품',
  },
  {
    id: '4',
    title: '샴푸+린스 세트',
    icon: 'box',
    status: 'complete',
    statusLabel: '모집완료',
    location: '신림동',
    pickupPoint: { lat: 37.4842, lng: 126.9297, label: '신림동', dong: '신림동' },
    visibilityRange: '1km',
    imageUrl: '/products/4.svg',
    current: 5,
    max: 5,
    price: 8900,
    daysLeft: '마감',
    category: '욕실용품',
  },
  {
    id: '5',
    title: '물티슈 80매 10팩',
    icon: 'box',
    status: 'recruiting',
    statusLabel: '모집중',
    location: '남현동',
    pickupPoint: { lat: 37.4900, lng: 126.9180, label: '남현동', dong: '남현동' },
    visibilityRange: '2km',
    imageUrl: '/products/5.svg',
    current: 2,
    max: 6,
    price: 12000,
    daysLeft: '4일 남음',
    category: '휴지/티슈',
  },
]

export function formatPrice(price: number) {
  return price.toLocaleString('ko-KR') + '원'
}

export function getProgress(current: number, max: number) {
  return Math.round((current / max) * 100)
}

export function getStatusStyle(status: GroupBuy['status']) {
  switch (status) {
    case 'recruiting':
      return 'bg-primary-light text-primary'
    case 'closing':
      return 'bg-orange-light text-orange'
    case 'complete':
      return 'bg-gray-100 text-text-secondary'
  }
}

export function filterVisibleGroupBuys(
  items: GroupBuy[],
  participationRange: NeighborhoodRange,
  home = userHome,
) {
  return items.filter((item) => {
    const d = getGroupBuyDistance(item, home)
    return canJoinGroupBuy(d, participationRange, item.visibilityRange)
  })
}

export function getGroupBuyDistance(item: GroupBuy, home = userHome) {
  const R = 6371000
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(item.pickupPoint.lat - home.lat)
  const dLng = toRad(item.pickupPoint.lng - home.lng)
  const lat1 = toRad(home.lat)
  const lat2 = toRad(item.pickupPoint.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)))
}
