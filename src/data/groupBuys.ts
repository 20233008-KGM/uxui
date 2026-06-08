import type { GeoPoint } from './locations'
import { canJoinGroupBuy, userHome } from './locations'
import type { NeighborhoodRange } from './notifications'

export { GROUP_BUY_MIN_MEMBERS, GROUP_BUY_MAX_MEMBERS, clampGroupBuyMembers } from './groupBuyLimits'

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
    imageUrl: '/products/1.webp',
    current: 8,
    max: 20,
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
    imageUrl: '/products/2.webp',
    current: 27,
    max: 30,
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
    imageUrl: '/products/3.webp',
    current: 5,
    max: 15,
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
    imageUrl: '/products/4.webp',
    current: 25,
    max: 25,
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
    imageUrl: '/products/5.webp',
    current: 12,
    max: 40,
    price: 12000,
    daysLeft: '4일 남음',
    category: '휴지/티슈',
  },
  {
    id: '6',
    title: '3겹 화장지 30롤 대용량',
    icon: 'box',
    status: 'recruiting',
    statusLabel: '모집중',
    location: '신림동',
    pickupPoint: { lat: 37.4825, lng: 126.9260, label: '신림역 2번 출구', dong: '신림동' },
    visibilityRange: '1km',
    imageUrl: '/products/1.webp',
    current: 22,
    max: 50,
    price: 4200,
    originalPrice: 6000,
    daysLeft: '3일 남음',
    category: '휴지/티슈',
  },
  {
    id: '7',
    title: '액체 세탁세제 3L',
    icon: 'droplet',
    status: 'recruiting',
    statusLabel: '모집중',
    location: '봉천동',
    pickupPoint: { lat: 37.4790, lng: 126.9380, label: '봉천역 인근', dong: '봉천동' },
    visibilityRange: '2km',
    imageUrl: '/products/2.webp',
    current: 9,
    max: 20,
    price: 5800,
    daysLeft: '6일 남음',
    category: '세제/세탁',
  },
  {
    id: '8',
    title: '주방세제 1L 2개',
    icon: 'bottle',
    status: 'closing',
    statusLabel: '마감임박',
    location: '신림동',
    pickupPoint: { lat: 37.4855, lng: 126.9310, label: '신림사거리', dong: '신림동' },
    visibilityRange: '500m',
    imageUrl: '/products/3.webp',
    current: 14,
    max: 15,
    price: 3500,
    daysLeft: '12시간 남음',
    category: '욕실용품',
  },
  {
    id: '9',
    title: '샴푸+린스 세트',
    icon: 'box',
    status: 'recruiting',
    statusLabel: '모집중',
    location: '남현동',
    pickupPoint: { lat: 37.4885, lng: 126.9210, label: '남현역 인근', dong: '남현동' },
    visibilityRange: '1km',
    imageUrl: '/products/4.webp',
    current: 7,
    max: 18,
    price: 8900,
    originalPrice: 12000,
    daysLeft: '7일 남음',
    category: '욕실용품',
  },
  {
    id: '10',
    title: '물티슈 80매 10팩',
    icon: 'box',
    status: 'recruiting',
    statusLabel: '모집중',
    location: '신림동',
    pickupPoint: { lat: 37.4830, lng: 126.9340, label: '신림동 주민센터 앞', dong: '신림동' },
    visibilityRange: 'dong',
    imageUrl: '/products/5.webp',
    current: 31,
    max: 45,
    price: 12000,
    daysLeft: '2일 남음',
    category: '휴지/티슈',
  },
  {
    id: '11',
    title: '3겹 화장지 30롤 대용량',
    icon: 'box',
    status: 'recruiting',
    statusLabel: '모집중',
    location: '봉천동',
    pickupPoint: { lat: 37.4760, lng: 126.9430, label: '봉천동 골목길', dong: '봉천동' },
    visibilityRange: '1km',
    imageUrl: '/products/1.webp',
    current: 16,
    max: 35,
    price: 4200,
    daysLeft: '5일 남음',
    category: '휴지/티슈',
  },
  {
    id: '12',
    title: '액체 세탁세제 3L',
    icon: 'droplet',
    status: 'recruiting',
    statusLabel: '모집중',
    location: '남현동',
    pickupPoint: { lat: 37.4915, lng: 126.9150, label: '남현동 아파트 단지', dong: '남현동' },
    visibilityRange: '2km',
    imageUrl: '/products/2.webp',
    current: 4,
    max: 12,
    price: 5800,
    daysLeft: '8일 남음',
    category: '세제/세탁',
  },
]

/** vision #9 — 탐색·홈용 공구 목록 */
export function getGroupBuyById(id: string) {
  return groupBuys.find((g) => g.id === id)
}

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
