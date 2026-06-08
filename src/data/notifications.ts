export type NotificationFrequency = 'early' | 'normal' | 'minimal'

export interface CycleNotification {
  id: string
  itemName: string
  cycleDays: number
  nextAlarmDate: string
  enabled: boolean
}

export const defaultNotifications: CycleNotification[] = [
  { id: 'n-1', itemName: '3겹 화장지 30롤', cycleDays: 45, nextAlarmDate: '2024-11-29', enabled: true },
  { id: 'n-2', itemName: '액체 세탁세제 3L', cycleDays: 60, nextAlarmDate: '2024-11-01', enabled: true },
]

export const frequencyLabels: Record<NotificationFrequency, string> = {
  early: '소진 14일 전 (여유)',
  normal: '소진 7일 전 (권장)',
  minimal: '소진 3일 전 (최소)',
}

export const frequencyDays: Record<NotificationFrequency, number> = {
  early: 14,
  normal: 7,
  minimal: 3,
}

export type NeighborhoodRange = '500m' | '1km' | '2km' | 'dong'

export const rangeLabels: Record<NeighborhoodRange, string> = {
  '500m': '500m (가까운 이웃)',
  '1km': '1km (권장)',
  '2km': '2km (넓은 범위)',
  dong: '동 단위 (신림동)',
}

/** 참여자: 내가 참여할 공구 거리 (vision #3) */
export const participationRangeDesc =
  '나와 수령지 사이 거리가 이 범위 안인 공구만 탐색·참여할 수 있어요.'

/** 팀장: 내 공구를 노출할 거리 (vision #3) */
export const visibilityRangeDesc =
  '수령 위치 기준 이 범위 안의 이웃에게만 공구가 보이고 참여할 수 있어요.'
