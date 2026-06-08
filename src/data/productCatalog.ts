export interface CatalogProduct {
  id: string
  title: string
  category: string
  icon: 'box' | 'droplet' | 'bottle'
  imageUrl: string
  pricePerPerson: number
  originalPrice?: number
  bulkNote: string
  recommendedMin: number
  recommendedMax: number
}

/** 플랫폼 제공 공구 품목 (쿠팡형 · 가격 고정 · vision #7) */
export const productCatalog: CatalogProduct[] = [
  {
    id: '1',
    title: '3겹 화장지 30롤 대용량',
    category: '휴지/티슈',
    icon: 'box',
    imageUrl: '/products/1.svg',
    pricePerPerson: 4200,
    originalPrice: 6000,
    bulkNote: '10명 공구 기준 특가',
    recommendedMin: 3,
    recommendedMax: 6,
  },
  {
    id: '2',
    title: '액체 세탁세제 3L',
    category: '세제/세탁',
    icon: 'droplet',
    imageUrl: '/products/2.svg',
    pricePerPerson: 5800,
    originalPrice: 7900,
    bulkNote: '20명 공구 기준 특가',
    recommendedMin: 4,
    recommendedMax: 8,
  },
  {
    id: '3',
    title: '주방세제 1L 2개',
    category: '욕실용품',
    icon: 'bottle',
    imageUrl: '/products/3.svg',
    pricePerPerson: 3500,
    originalPrice: 4800,
    bulkNote: '10명 공구 기준 특가',
    recommendedMin: 3,
    recommendedMax: 5,
  },
  {
    id: '4',
    title: '샴푸+린스 세트',
    category: '욕실용품',
    icon: 'box',
    imageUrl: '/products/4.svg',
    pricePerPerson: 8900,
    originalPrice: 12000,
    bulkNote: '15명 공구 기준 특가',
    recommendedMin: 4,
    recommendedMax: 6,
  },
  {
    id: '5',
    title: '물티슈 80매 10팩',
    category: '휴지/티슈',
    icon: 'box',
    imageUrl: '/products/5.svg',
    pricePerPerson: 12000,
    originalPrice: 15000,
    bulkNote: '20명 공구 기준 특가',
    recommendedMin: 5,
    recommendedMax: 10,
  },
]

export function getCatalogProduct(id: string) {
  return productCatalog.find((p) => p.id === id) ?? productCatalog[0]
}
