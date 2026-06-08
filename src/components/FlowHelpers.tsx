import { Link } from 'react-router-dom'
import { Bell, RotateCcw } from 'lucide-react'
import type { PurchaseRecord } from '../data/purchaseHistory'

export function RepurchaseBanner({
  suggestion,
}: {
  suggestion: { record: PurchaseRecord; daysUntil: number; message: string }
}) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
      <div className="flex items-start gap-3">
        <Bell size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-bold text-text mb-1">구매 이력 기반 추천</p>
          <p className="text-xs text-text-secondary leading-relaxed mb-2">{suggestion.message}</p>
          <p className="text-[10px] text-text-secondary">
            사용 주기: {suggestion.record.usageCycleDays}일 · 마지막 구매: {suggestion.record.purchasedAt}
          </p>
        </div>
        <RotateCcw size={16} className="text-blue-400 shrink-0" />
      </div>
    </div>
  )
}

export function PolicySection() {
  return (
    <div className="mt-2 bg-surface px-5 py-4">
      <p className="text-xs text-text-secondary mb-3">환불 · 취소 정책</p>
      <div className="space-y-2 text-xs text-text-secondary leading-relaxed">
        <p>• <strong className="text-text">모집 실패</strong>: 최소 인원 미달 시 자동 전액 환불</p>
        <p>• <strong className="text-text">참여 취소</strong>: 모집 완료 전까지 취소 가능 (에스크로 즉시 환불)</p>
        <p>• <strong className="text-text">분쟁</strong>: 불량·수량부족·허위등록 시 분쟁 신고 → 결제금 보관 유지</p>
        <Link to="/cancel/tx-new" className="inline-block text-primary font-semibold mt-2">
          참여 취소하기 →
        </Link>
        <Link to="/leader/unavailable" className="inline-block text-red-500 font-semibold mt-1 ml-3">
          팀장 연락 두절 →
        </Link>
      </div>
    </div>
  )
}
