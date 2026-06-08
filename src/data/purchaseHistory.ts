export interface PurchaseRecord {
  id: string
  itemName: string
  category: string
  purchasedAt: string
  usageCycleDays: number
  nextSuggestedDate: string
  groupBuyId?: string
}

export const purchaseHistory: PurchaseRecord[] = [
  {
    id: 'ph-1',
    itemName: '3겹 화장지 30롤',
    category: '휴지/티슈',
    purchasedAt: '2024-10-15',
    usageCycleDays: 45,
    nextSuggestedDate: '2024-11-29',
    groupBuyId: '1',
  },
  {
    id: 'ph-2',
    itemName: '액체 세탁세제 3L',
    category: '세제/세탁',
    purchasedAt: '2024-09-01',
    usageCycleDays: 60,
    nextSuggestedDate: '2024-11-01',
    groupBuyId: '2',
  },
]

export function getRepurchaseSuggestion(title: string) {
  const record = purchaseHistory.find(
    (r) => title.includes(r.itemName.split(' ')[0]) || r.itemName.includes(title.split(' ')[0]),
  )
  if (!record) return null

  const today = new Date('2024-12-18')
  const next = new Date(record.nextSuggestedDate)
  const daysUntil = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (daysUntil <= 14) {
    return {
      record,
      daysUntil,
      message:
        daysUntil <= 0
          ? `마지막 구매 후 ${record.usageCycleDays}일 경과 — 재구매 시기예요`
          : `${daysUntil}일 후 소진 예정 — 미리 공구 참여를 추천해요`,
    }
  }
  return null
}

export function calculateNextPurchaseDate(lastPurchase: string, cycleDays: number) {
  const d = new Date(lastPurchase)
  d.setDate(d.getDate() + cycleDays)
  return d.toISOString().split('T')[0]
}
