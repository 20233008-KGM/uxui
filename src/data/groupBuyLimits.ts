/** vision #8 — 공구 모집 인원 하한·상한 */
export const GROUP_BUY_MIN_MEMBERS = 10
export const GROUP_BUY_MAX_MEMBERS = 50

export function clampGroupBuyMembers(count: number) {
  return Math.min(GROUP_BUY_MAX_MEMBERS, Math.max(GROUP_BUY_MIN_MEMBERS, count))
}
