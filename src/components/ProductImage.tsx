import { useState } from 'react'
import { Package, Droplets, FlaskConical } from 'lucide-react'
import type { GroupBuy } from '../data/groupBuys'
import { getProductImage } from '../data/productImages'

function ProductIcon({ icon, size = 40 }: { icon: GroupBuy['icon']; size?: number }) {
  const props = { size, className: 'text-gray-400', strokeWidth: 1.5 as const }
  switch (icon) {
    case 'droplet':
      return <Droplets {...props} />
    case 'bottle':
      return <FlaskConical {...props} />
    default:
      return <Package {...props} />
  }
}

export function ProductImage({
  item,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  fallbackSize = 40,
}: {
  item: Pick<GroupBuy, 'id' | 'icon' | 'imageUrl' | 'title'>
  className?: string
  imgClassName?: string
  fallbackSize?: number
}) {
  const src = getProductImage(item)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={item.title}
          className={imgClassName}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <ProductIcon icon={item.icon} size={fallbackSize} />
        </div>
      )}
    </div>
  )
}
