import type { GroupBuy } from './groupBuys'

/** 품목별 상품 이미지 (Unsplash · 데모용) */
export const productImageById: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1584438784890-9614966b6596?w=800&h=600&fit=crop&q=80',
  '2': 'https://images.unsplash.com/photo-1610557892470-55d9e80d2aab?w=800&h=600&fit=crop&q=80',
  '3': 'https://images.unsplash.com/photo-1563453392213-326e394794ed?w=800&h=600&fit=crop&q=80',
  '4': 'https://images.unsplash.com/photo-1571781926291-c477ebfd3b91?w=800&h=600&fit=crop&q=80',
  '5': 'https://images.unsplash.com/photo-1584838949495-644271778397?w=800&h=600&fit=crop&q=80',
}

export const openGroupBuySamplePhotos = [
  { id: 'tissue', label: '화장지', url: productImageById['1'] },
  { id: 'detergent', label: '세탁세제', url: productImageById['2'] },
  { id: 'kitchen', label: '주방세제', url: productImageById['3'] },
  { id: 'shampoo', label: '샴푸', url: productImageById['4'] },
]

export function getProductImage(item: Pick<GroupBuy, 'id' | 'imageUrl'>) {
  return item.imageUrl ?? productImageById[item.id] ?? productImageById['1']
}
