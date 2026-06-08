import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, CreditCard, CheckCircle2, Ban } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { SafePayBanner } from '../components/SafePayBadge'
import { groupBuys, formatPrice, getGroupBuyDistance } from '../data/groupBuys'
import { ProductImage } from '../components/ProductImage'
import { useApp } from '../context/AppContext'
import { defaultInviteReward } from '../data/inviteEvent'
import { canJoinGroupBuy } from '../data/locations'

export default function PaymentPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { inviteRewardClaimed, participationRange } = useApp()
  const item = groupBuys.find((g) => g.id === id) ?? groupBuys[0]
  const distance = getGroupBuyDistance(item)
  const canJoin = canJoinGroupBuy(distance, participationRange, item.visibilityRange)
  const discount = inviteRewardClaimed ? defaultInviteReward.inviteeDiscount : 0
  const total = item.price - discount

  useEffect(() => {
    if (!canJoin) navigate(`/detail/${item.id}`, { replace: true })
  }, [canJoin, item.id, navigate])

  const handlePay = () => {
    if (!canJoin) return
    navigate(`/payment/${item.id}/complete`)
  }

  if (!canJoin) {
    return (
      <div className="min-h-full bg-bg flex flex-col items-center justify-center px-8 text-center">
        <Ban size={40} className="text-text-secondary mb-4" />
        <p className="text-sm text-text-secondary">참여 범위 밖 공구는 결제할 수 없어요.</p>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="공구페이 안전결제"
        left={
          <button onClick={() => navigate(-1)} aria-label="뒤로">
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto pb-28 px-5 py-4 space-y-4">
        <SafePayBanner />

        <div className="bg-surface rounded-2xl border border-border p-4 flex gap-3">
          <ProductImage
            item={item}
            className="w-16 h-16 shrink-0 rounded-xl"
            imgClassName="w-full h-full object-cover rounded-xl"
            fallbackSize={28}
          />
          <div>
            <p className="text-xs text-text-secondary mb-1">주문 상품</p>
            <p className="font-bold text-text mb-1">{item.title}</p>
            <p className="text-sm text-text-secondary">📍 {item.location} · 팀장 김신림</p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-bold text-text">결제 수단</p>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-primary bg-primary-light/50">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-text">공구페이 안전거래</p>
                <p className="text-xs text-text-secondary">수령 확인 전까지 결제금 보관</p>
              </div>
              <CheckCircle2 size={20} className="text-primary shrink-0" />
            </div>
            <div className="mt-3 flex items-center gap-3 p-3 rounded-xl border border-border opacity-40">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <CreditCard size={20} className="text-text-secondary" />
              </div>
              <div>
                <p className="font-medium text-sm text-text-secondary line-through">직접 송금</p>
                <p className="text-xs text-text-secondary">안전거래만 이용 가능</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">1인 공구 금액</span>
            <span className="text-text">{formatPrice(item.price)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">공구페이 수수료</span>
            <span className="text-primary font-semibold">무료</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">초대 이벤트 할인</span>
              <span className="text-primary font-semibold">-{formatPrice(discount)}</span>
            </div>
          )}
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-bold text-text">총 결제 금액</span>
            <span className="font-bold text-lg text-text">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <p className="text-xs font-semibold text-text">안전거래 안내</p>
          {[
            '결제금은 팀장에게 바로 전달되지 않아요',
            '물건 수령 후 [수령 확인]을 눌러야 정산돼요',
            '공구 무산 시 자동 전액 환불',
            '분쟁 발생 시 공구페이가 중재해요',
          ].map((text) => (
            <div key={text} className="flex items-start gap-2 text-xs text-text-secondary">
              <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4">
        <button
          onClick={handlePay}
          className="w-full h-12 bg-primary text-white font-bold rounded-xl text-base flex items-center justify-center gap-2"
        >
          <ShieldCheck size={20} />
          {formatPrice(total)} 안전결제하기
        </button>
        <p className="text-center text-[10px] text-text-secondary mt-2">
          결제 시 공구페이 안전거래 이용약관에 동의합니다
        </p>
      </div>
    </div>
  )
}
