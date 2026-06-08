import { Link } from 'react-router-dom'
import { Gift, Sparkles, ChevronRight, Users } from 'lucide-react'
import { defaultInviteReward } from '../data/inviteEvent'
import { formatPrice } from '../data/groupBuys'

export default function InviteHomeBanner() {
  const { inviteePoints, inviteeDiscount, leaderBonusPoints } = defaultInviteReward

  return (
    <div className="px-5 mb-4">
      <Link
        to="/leader/invite"
        className="block relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#ff6b35] via-[#f97316] to-[#ea580c] p-4 shadow-lg shadow-orange/20 active:scale-[0.99] transition-transform"
      >
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />

        <div className="relative flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Gift size={22} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wide bg-white/25 text-white px-2 py-0.5 rounded-full">
                EVENT
              </span>
              <Sparkles size={12} className="text-yellow-200" />
            </div>
            <p className="text-base font-bold text-white leading-snug mb-2">
              지금 지인 초대하면
              <br />
              <span className="text-yellow-100">혜택이 팡팡!</span>
            </p>
            <ul className="space-y-1 mb-3">
              <li className="flex items-center gap-1.5 text-xs text-white/95">
                <Users size={12} className="shrink-0" />
                지인 · <strong>{inviteePoints.toLocaleString()}P</strong> +{' '}
                <strong>{formatPrice(inviteeDiscount)}</strong> 할인
              </li>
              <li className="flex items-center gap-1.5 text-xs text-white/95">
                <Gift size={12} className="shrink-0" />
                나(팀장) · <strong>{leaderBonusPoints.toLocaleString()}P</strong> 적립
              </li>
            </ul>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-white bg-white/20 px-3 py-1.5 rounded-lg">
              친구 초대하고 받기
              <ChevronRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
