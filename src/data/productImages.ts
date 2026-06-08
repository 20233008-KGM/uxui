import type { GroupBuy } from './groupBuys'
import { productCatalog } from './productCatalog'

const byId = Object.fromEntries(productCatalog.map((p) => [p.id, p.imageUrl]))

/** 로컬 public/products 이미지 (외부 CDN 불필요) */
export const productImageById: Record<string, string> = byId

export function getProductImage(item: Pick<GroupBuy, 'id' | 'imageUrl'>) {
  return item.imageUrl ?? productImageById[item.id] ?? '/products/1.webp'
}

export function getProductImageById(id: string) {
  return productImageById[id] ?? '/products/1.webp'
}
