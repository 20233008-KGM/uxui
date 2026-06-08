export type EscrowStatus =
  | 'pending_payment'
  | 'held'
  | 'ready_pickup'
  | 'completed'
  | 'refunded'
  | 'disputed'

export interface EscrowTransaction {
  id: string
  groupBuyId: string
  title: string
  amount: number
  status: EscrowStatus
  paidAt?: string
  pickupAt?: string
  completedAt?: string
  leaderName: string
}

export const ESCROW_STEPS = [
  { key: 'held', label: '결제 완료', desc: '에스크로 보관' },
  { key: 'ready_pickup', label: '수령 가능', desc: '물건 도착' },
  { key: 'completed', label: '수령 확인', desc: '팀장 정산' },
] as const

export const statusLabels: Record<EscrowStatus, string> = {
  pending_payment: '결제 대기',
  held: '에스크로 보관중',
  ready_pickup: '수령 가능',
  completed: '거래 완료',
  refunded: '환불 완료',
  disputed: '분쟁 처리중',
}

export const statusColors: Record<EscrowStatus, string> = {
  pending_payment: 'bg-gray-100 text-text-secondary',
  held: 'bg-blue-50 text-blue-600',
  ready_pickup: 'bg-orange-light text-orange',
  completed: 'bg-primary-light text-primary',
  refunded: 'bg-gray-100 text-text-secondary',
  disputed: 'bg-red-50 text-red-500',
}

export const demoTransactions: EscrowTransaction[] = [
  {
    id: 'tx-001',
    groupBuyId: '1',
    title: '3겹 화장지 30롤 대용량',
    amount: 4200,
    status: 'ready_pickup',
    paidAt: '2024.12.18',
    pickupAt: '2024.12.20',
    leaderName: '김신림',
  },
  {
    id: 'tx-002',
    groupBuyId: '2',
    title: '액체 세탁세제 3L',
    amount: 5800,
    status: 'held',
    paidAt: '2024.12.15',
    leaderName: '박봉천',
  },
]

export function getEscrowStepIndex(status: EscrowStatus) {
  switch (status) {
    case 'held':
      return 0
    case 'ready_pickup':
      return 1
    case 'completed':
      return 2
    default:
      return -1
  }
}
