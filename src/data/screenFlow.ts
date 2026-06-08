import { PHONE_HEIGHT, PHONE_WIDTH } from './screenRegistry'

export type FlowNode = {
  id: string
  name: string
  path: string
  note?: string
}

export type FlowEdge = {
  from: string
  to: string
  label?: string
  dashed?: boolean
}

export type FlowSection = {
  id: string
  title: string
  description?: string
  color: string
  rootId: string
  nodes: FlowNode[]
  edges: FlowEdge[]
}

/** IA · 유저플로우 기준 트리 섹션 (왼쪽→오른쪽 = 시간 순) */
export const flowSections: FlowSection[] = [
  {
    id: 'entry',
    title: '① 진입 · 인증',
    description: '비로그인 접근 → 홈 진입',
    color: '#6366f1',
    rootId: 'landing',
    nodes: [
      { id: 'landing', name: '랜딩', path: '/landing' },
      { id: 'login', name: '로그인', path: '/login' },
      { id: 'signup', name: '회원가입', path: '/signup' },
      { id: 'home', name: '홈', path: '/' },
    ],
    edges: [
      { from: 'landing', to: 'login', label: '로그인' },
      { from: 'landing', to: 'signup', label: '가입' },
      { from: 'login', to: 'home' },
      { from: 'signup', to: 'home' },
    ],
  },
  {
    id: 'join',
    title: '② 참여자 플로우',
    description: '탐색 → 결제 → 모집 → 수령 · 후기',
    color: '#2e9d79',
    rootId: 'home',
    nodes: [
      { id: 'home', name: '홈', path: '/' },
      { id: 'explore', name: '탐색 (목록)', path: '/explore' },
      { id: 'explore-slide', name: '탐색 (슬라이드)', path: '/explore/slide' },
      { id: 'detail', name: '공구 상세', path: '/detail/1' },
      { id: 'detail-far', name: '상세 (멀리)', path: '/detail/5', note: '거리 경고' },
      { id: 'payment', name: '공구페이 결제', path: '/payment/1' },
      { id: 'payment-done', name: '결제 완료', path: '/payment/1/complete' },
      { id: 'recruit-wait', name: '모집 진행', path: '/recruitment/waiting' },
      { id: 'recruit-ok', name: '모집 성공', path: '/recruitment/success' },
      { id: 'recruit-fail', name: '모집 실패', path: '/recruitment/failure' },
      { id: 'chat-list', name: '채팅 목록', path: '/chats' },
      { id: 'chat', name: '채팅방', path: '/chat' },
      { id: 'confirm', name: '수령 확인', path: '/confirm/tx-001' },
      { id: 'pickup-overdue', name: '수령 기한 초과', path: '/pickup/overdue/tx-001' },
      { id: 'pickup-storage', name: '보관 공간 부족', path: '/pickup/storage/tx-001' },
      { id: 'review', name: '후기 작성', path: '/review/tx-001' },
    ],
    edges: [
      { from: 'home', to: 'explore' },
      { from: 'explore', to: 'explore-slide', label: '슬라이드' },
      { from: 'explore', to: 'detail' },
      { from: 'explore', to: 'detail-far', label: '멀리', dashed: true },
      { from: 'detail', to: 'payment', label: '참여' },
      { from: 'payment', to: 'payment-done' },
      { from: 'payment-done', to: 'recruit-wait' },
      { from: 'recruit-wait', to: 'recruit-ok', label: '성공' },
      { from: 'recruit-wait', to: 'recruit-fail', label: '실패' },
      { from: 'recruit-ok', to: 'chat-list' },
      { from: 'chat-list', to: 'chat' },
      { from: 'chat', to: 'confirm', label: '수령' },
      { from: 'confirm', to: 'pickup-overdue', label: '기한초과', dashed: true },
      { from: 'confirm', to: 'pickup-storage', label: '보관부족', dashed: true },
      { from: 'confirm', to: 'review' },
    ],
  },
  {
    id: 'leader',
    title: '③ 팀장 · 공구 열기',
    description: '3단계 개설 → 결제 → 모집 성공',
    color: '#0ea5e9',
    rootId: 'home-leader',
    nodes: [
      { id: 'home-leader', name: '홈', path: '/' },
      { id: 'open1', name: '1/3 품목·위치', path: '/open', note: '위치 필수' },
      { id: 'open2', name: '2/3 수량·일정', path: '/open/step2' },
      { id: 'open3', name: '3/3 결제', path: '/open/step3' },
      { id: 'leader-pay', name: '공구페이 결제', path: '/payment/1' },
      { id: 'leader-done', name: '결제 완료', path: '/payment/1/complete' },
      { id: 'leader-ok', name: '팀장 개설 성공', path: '/recruitment/leader-success' },
      { id: 'leader-invite', name: '지인 초대', path: '/leader/invite' },
    ],
    edges: [
      { from: 'home-leader', to: 'open1', label: '공구 열기' },
      { from: 'open1', to: 'open2' },
      { from: 'open2', to: 'open3' },
      { from: 'open3', to: 'leader-pay' },
      { from: 'leader-pay', to: 'leader-done' },
      { from: 'leader-done', to: 'leader-ok' },
      { from: 'leader-ok', to: 'leader-invite', label: '초대' },
    ],
  },
  {
    id: 'invite',
    title: '④ 초대 이벤트',
    description: '지인 링크 진입 → 혜택',
    color: '#f97316',
    rootId: 'invite-link',
    nodes: [
      { id: 'invite-link', name: '초대 링크', path: '/invite/KIM2024', note: '외부 진입' },
      { id: 'invite-event', name: '초대 이벤트', path: '/invite/KIM2024' },
      { id: 'invite-explore', name: '탐색', path: '/explore' },
    ],
    edges: [
      { from: 'invite-link', to: 'invite-event', label: '혜택' },
      { from: 'invite-event', to: 'invite-explore', label: '공구 참여' },
    ],
  },
  {
    id: 'mypage',
    title: '⑤ 마이페이지 · 설정',
    description: '홈 탭 → 하위 설정',
    color: '#f59e0b',
    rootId: 'mypage-home',
    nodes: [
      { id: 'mypage-home', name: '홈', path: '/' },
      { id: 'mypage', name: '마이', path: '/mypage' },
      { id: 'profile', name: '프로필 · 주기', path: '/mypage/profile' },
      { id: 'points', name: '포인트', path: '/mypage/points' },
      { id: 'address', name: '주소 관리', path: '/mypage/address' },
      { id: 'notifications', name: '알림 · 주기', path: '/mypage/notifications' },
      { id: 'neighborhood', name: '동네 범위', path: '/mypage/neighborhood' },
    ],
    edges: [
      { from: 'mypage-home', to: 'mypage', label: '마이 탭' },
      { from: 'mypage', to: 'profile' },
      { from: 'mypage', to: 'points' },
      { from: 'mypage', to: 'address' },
      { from: 'mypage', to: 'notifications' },
      { from: 'mypage', to: 'neighborhood' },
    ],
  },
  {
    id: 'edge',
    title: '⑥ 예외 · 환불 · 분쟁',
    description: '모집/거래 중 분기',
    color: '#ef4444',
    rootId: 'edge-wait',
    nodes: [
      { id: 'edge-wait', name: '모집 진행', path: '/recruitment/waiting' },
      { id: 'member-cancel', name: '참여자 취소', path: '/recruitment/member-cancel' },
      { id: 'edge-fail', name: '모집 실패', path: '/recruitment/failure' },
      { id: 'refund', name: '환불 내역', path: '/refund/tx-failed' },
      { id: 'transactions', name: '거래 내역', path: '/mypage/transactions' },
      { id: 'cancel', name: '참여 취소', path: '/cancel/tx-new' },
      { id: 'dispute', name: '분쟁 신고', path: '/dispute/tx-001' },
      { id: 'leader-gone', name: '팀장 연락 두절', path: '/leader/unavailable' },
    ],
    edges: [
      { from: 'edge-wait', to: 'member-cancel', label: '취소' },
      { from: 'edge-wait', to: 'edge-fail', label: '실패' },
      { from: 'edge-fail', to: 'refund', label: '환불' },
      { from: 'transactions', to: 'cancel' },
      { from: 'transactions', to: 'dispute' },
      { from: 'transactions', to: 'leader-gone', dashed: true },
    ],
  },
]

export type LayoutNode = FlowNode & { x: number; y: number }

export type SectionLayout = {
  section: FlowSection
  nodes: LayoutNode[]
  width: number
  height: number
  offsetY: number
}

const COL_GAP = 100
const ROW_GAP = 48
const SECTION_GAP = 120
const HEADER_H = 72

function nodeSize(scale: number) {
  const w = PHONE_WIDTH * scale + 24
  const h = PHONE_HEIGHT * scale + 72
  return { w, h }
}

/** BFS 깊이 + 형제 순서로 왼쪽→오른쪽 트리 배치 */
function layoutSection(section: FlowSection, scale: number): Omit<SectionLayout, 'offsetY'> {
  const { w: nw, h: nh } = nodeSize(scale)
  const children = new Map<string, string[]>()
  const incoming = new Set<string>()

  for (const e of section.edges) {
    if (!children.has(e.from)) children.set(e.from, [])
    children.get(e.from)!.push(e.to)
    incoming.add(e.to)
  }

  const depth = new Map<string, number>()
  const queue = [section.rootId]
  depth.set(section.rootId, 0)

  while (queue.length) {
    const id = queue.shift()!
    const d = depth.get(id)!
    for (const child of children.get(id) ?? []) {
      if (!depth.has(child)) {
        depth.set(child, d + 1)
        queue.push(child)
      }
    }
  }

  // 연결 안 된 고립 노드
  for (const n of section.nodes) {
    if (!depth.has(n.id)) depth.set(n.id, 0)
  }

  const byDepth = new Map<number, string[]>()
  let maxDepth = 0
  for (const [id, d] of depth) {
    maxDepth = Math.max(maxDepth, d)
    if (!byDepth.has(d)) byDepth.set(d, [])
    byDepth.get(d)!.push(id)
  }

  const positions = new Map<string, { x: number; y: number }>()

  for (let d = 0; d <= maxDepth; d++) {
    const ids = byDepth.get(d) ?? []
    const totalH = ids.length * nh + (ids.length - 1) * ROW_GAP
    ids.forEach((id, i) => {
      positions.set(id, {
        x: d * (nw + COL_GAP),
        y: i * (nh + ROW_GAP) - totalH / 2 + nh / 2,
      })
    })
  }

  // 세로 중앙 정렬
  let minY = Infinity
  let maxY = -Infinity
  let maxX = 0
  for (const p of positions.values()) {
    minY = Math.min(minY, p.y - nh / 2)
    maxY = Math.max(maxY, p.y + nh / 2)
    maxX = Math.max(maxX, p.x + nw)
  }
  const shiftY = -minY + HEADER_H

  const nodes: LayoutNode[] = section.nodes.map((n) => {
    const p = positions.get(n.id)!
    return { ...n, x: p.x, y: p.y + shiftY }
  })

  return {
    section,
    nodes,
    width: maxX + 48,
    height: maxY - minY + shiftY + 48,
  }
}

export function buildFlowLayout(scale: number): SectionLayout[] {
  const layouts = flowSections.map((s) => layoutSection(s, scale))
  let y = 64
  return layouts.map((layout) => {
    const withOffset = { ...layout, offsetY: y }
    y += layout.height + SECTION_GAP
    return withOffset
  })
}

/** x1/x2 = 노드 왼쪽, y1/y2 = 노드 세로 중심 */
export function edgePath(x1: number, y1: number, x2: number, y2: number, nw: number): string {
  const sx = x1 + nw
  const sy = y1
  const tx = x2
  const ty = y2
  const mx = (sx + tx) / 2
  return `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ty}, ${tx} ${ty}`
}

export { nodeSize }
