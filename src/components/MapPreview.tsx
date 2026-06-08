import type { GeoPoint } from '../data/locations'
import { getOsmEmbedUrl, getOsmExternalUrl } from '../data/mapUtils'
import { MapPin, ExternalLink } from 'lucide-react'

export function MapPreview({
  point,
  height = 144,
  showLabel = true,
  className = '',
}: {
  point: GeoPoint
  height?: number
  showLabel?: boolean
  className?: string
}) {
  return (
    <div className={`rounded-xl border-2 border-primary/30 overflow-hidden bg-gray-100 ${className}`}>
      <div className="relative" style={{ height }}>
        <iframe
          title={`${point.label} 지도`}
          src={getOsmEmbedUrl(point)}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 pointer-events-none">
          {showLabel && (
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-sm flex items-center gap-1.5 pointer-events-auto">
              <MapPin size={14} className="text-primary shrink-0" />
              <span className="text-xs font-semibold text-text truncate">{point.label}</span>
            </div>
          )}
          <a
            href={getOsmExternalUrl(point)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white/95 backdrop-blur-sm rounded-lg p-1.5 shadow-sm pointer-events-auto"
            aria-label="지도 크게 보기"
          >
            <ExternalLink size={14} className="text-primary" />
          </a>
        </div>
      </div>
    </div>
  )
}
