import { MapPin, Navigation, AlertTriangle, Crosshair, Search } from 'lucide-react'
import type { GeoPoint } from '../data/locations'
import { formatDistance, getDistanceMeters, userHome } from '../data/locations'
import type { NeighborhoodRange } from '../data/notifications'
import { isWithinRange } from '../data/locations'

export function DistanceBadge({
  meters,
  compact = false,
}: {
  meters: number
  compact?: boolean
}) {
  const far = meters > 2000
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full ${
        compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      } ${far ? 'bg-orange-light text-orange' : 'bg-primary-light text-primary'}`}
    >
      <Navigation size={compact ? 10 : 12} />
      {formatDistance(meters)}
    </span>
  )
}

export function LocationPicker({
  selected,
  onSelect,
  presets,
  detailAddress = '',
  onDetailAddressChange,
  onUseCurrentLocation,
  required = false,
}: {
  selected: GeoPoint
  onSelect: (loc: GeoPoint) => void
  presets: GeoPoint[]
  detailAddress?: string
  onDetailAddressChange?: (v: string) => void
  onUseCurrentLocation?: () => void
  required?: boolean
}) {
  return (
    <div className="space-y-3">
      {required && (
        <p className="text-xs text-primary font-semibold flex items-center gap-1">
          <MapPin size={12} />
          필수 · 참여자에게 거리와 함께 표시됩니다
        </p>
      )}

      <div className="h-36 bg-gray-100 rounded-xl border-2 border-primary/30 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(#ccc_1px,transparent_1px),linear-gradient(90deg,#ccc_1px,transparent_1px)] bg-[length:20px_20px]" />
        <MapPin size={28} className="text-primary relative z-10 mb-1" />
        <p className="text-sm font-bold text-text relative z-10">{selected.label}</p>
        <p className="text-xs text-text-secondary relative z-10">{selected.dong} · 미리보기</p>
      </div>

      {onUseCurrentLocation && (
        <button
          type="button"
          onClick={onUseCurrentLocation}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-primary/40 bg-primary-light/50 text-sm font-semibold text-primary"
        >
          <Crosshair size={18} />
          현재 위치로 설정
        </button>
      )}

      <div>
        <label className="block text-xs font-semibold text-text-secondary mb-2">수령 동네 선택</label>
        <div className="space-y-2">
          {presets.map((loc) => (
            <button
              key={loc.label}
              type="button"
              onClick={() => onSelect(loc)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm flex items-center justify-between ${
                selected.label === loc.label
                  ? 'border-primary bg-primary-light ring-1 ring-primary/20'
                  : 'border-border bg-surface'
              }`}
            >
              <span className="font-medium">{loc.label}</span>
              <span className="text-xs text-text-secondary">{loc.dong}</span>
            </button>
          ))}
        </div>
      </div>

      {onDetailAddressChange && (
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-2">
            상세 주소 (선택 · 모집 확정 후 공개)
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={detailAddress}
              onChange={(e) => onDetailAddressChange(e.target.value)}
              placeholder="ex. 신림동 123-45 (아파트명)"
              className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-text-secondary"
            />
          </div>
          <p className="text-[11px] text-text-secondary mt-1.5">
            동 단위는 즉시 공유되고, 상세 주소는 참여 확정 후에만 보여요
          </p>
        </div>
      )}

      <p className="text-xs text-text-secondary leading-relaxed bg-gray-50 rounded-lg p-3">
        멀리 사는 이웃의 무리한 참여를 막기 위해 공구 열 때 수령 위치를 꼭 입력해주세요.
      </p>
    </div>
  )
}

export function LocationSummary({ location, detail }: { location: GeoPoint; detail?: string }) {
  return (
    <div className="bg-surface rounded-xl border border-border p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0">
        <MapPin size={18} className="text-primary" />
      </div>
      <div>
        <p className="text-xs text-text-secondary">등록된 수령 위치</p>
        <p className="font-bold text-sm text-text">{location.label}</p>
        {detail && <p className="text-xs text-text-secondary mt-0.5">{detail} (확정 후 공개)</p>}
        <p className="text-[11px] text-primary mt-1">
          참여자 기준 약 {formatDistance(getDistanceMeters(userHome, location))}
        </p>
      </div>
    </div>
  )
}

export function DistanceWarning({
  meters,
  participationRange,
  visibilityRange,
  canJoin,
}: {
  meters: number
  participationRange: NeighborhoodRange
  visibilityRange: NeighborhoodRange
  canJoin: boolean
}) {
  if (canJoin) return null

  const outOfParticipation = !isWithinRange(meters, participationRange)
  const outOfVisibility = !isWithinRange(meters, visibilityRange)

  return (
    <div className="bg-orange-light border border-orange/20 rounded-xl p-4 flex gap-3 mb-4">
      <AlertTriangle size={18} className="text-orange shrink-0" />
      <div>
        <p className="text-sm font-bold text-text">참여할 수 없는 거리예요</p>
        <p className="text-xs text-text-secondary mt-1 leading-relaxed">
          수령지까지 {formatDistance(meters)}입니다.
          {outOfParticipation && ' 내 참여 범위를 넘어요.'}
          {outOfParticipation && outOfVisibility && ' · '}
          {outOfVisibility && ' 팀장이 설정한 노출 범위 밖이에요.'}
          {' '}마이페이지에서 참여 범위를 넓히거나 가까운 공구를 찾아보세요.
        </p>
      </div>
    </div>
  )
}

export function calcDistanceFromHome(pickup: GeoPoint, home: GeoPoint) {
  return getDistanceMeters(home, pickup)
}
