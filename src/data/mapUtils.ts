import type { GeoPoint } from './locations'

/** OpenStreetMap 실제 지도 embed (API 키 불필요) */
export function getOsmEmbedUrl(point: GeoPoint, delta = 0.006) {
  const { lat, lng } = point
  const bbox = [lng - delta, lat - delta * 0.8, lng + delta, lat + delta * 0.8].join(',')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`
}

export function getOsmExternalUrl(point: GeoPoint) {
  return `https://www.openstreetmap.org/?mlat=${point.lat}&mlon=${point.lng}#map=16/${point.lat}/${point.lng}`
}
