import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Gift, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { demoInvites, defaultInviteReward } from '../data/inviteEvent'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../data/groupBuys'

export default function InviteEventPage() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const { isLoggedIn, claimInviteReward } = useApp()
  const [claimed, setClaimed] = useState(false)

  const invite = demoInvites[code?.toUpperCase() ?? ''] ?? {
    code: code ?? 'GUEST',
    leaderName: '김신림',
    groupBuyTitle: '3겹 화장지 30롤 대용량',
    groupBuyId: '1',
  }

  const handleClaim = () => {
    claimInviteReward(invite.code)
    setClaimed(true)
    sessionStorage.setItem('gonggu_invite_claimed', invite.code)
  }

  const goNext = () => {
    if (isLoggedIn) {
      navigate(`/detail/${invite.groupBuyId}`)
    } else {
      navigate('/signup', { state: { fromInvite: invite.code } })
    }
  }

  return (
    <div className="min-h-dvh bg-[#1a1a2e] flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-5 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        <Sparkles size={20} className="absolute top-24 right-16 text-yellow-300/60 animate-pulse" />
        <Sparkles size={14} className="absolute top-40 left-8 text-primary/60 animate-pulse" />
      </div>

      <div className="relative w-full max-w-[380px]">
        {/* 이벤트 카드 */}
        <div className="bg-surface rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1a5c45] px-6 py-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift size={32} />
            </div>
            <p className="text-sm opacity-90 mb-1">🎉 초대 이벤트</p>
            <h1 className="text-xl font-bold leading-snug">
              {invite.leaderName}님이
              <br />
              공구에 초대했어요!
            </h1>
          </div>

          <div className="px-6 py-6">
            <p className="text-sm text-text-secondary text-center mb-5">
              「{invite.groupBuyTitle}」
              <br />
              함께 참여하고 혜택 받으세요
            </p>

            <div className="space-y-3 mb-6">
              {[
                { emoji: '🎁', text: `웰컴 포인트 ${defaultInviteReward.inviteePoints.toLocaleString()}P` },
                { emoji: '💰', text: `첫 참여 ${formatPrice(defaultInviteReward.inviteeDiscount)} 할인` },
                { emoji: '🛡️', text: '공구페이 안전거래 적용' },
              ].map(({ emoji, text }) => (
                <div key={text} className="flex items-center gap-3 bg-primary-light rounded-xl px-4 py-3">
                  <span className="text-lg">{emoji}</span>
                  <span className="text-sm font-semibold text-text">{text}</span>
                </div>
              ))}
            </div>

            {!claimed ? (
              <button
                onClick={handleClaim}
                className="w-full h-14 bg-primary text-white font-bold rounded-2xl text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
              >
                <Gift size={20} />
                혜택 받기
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-primary font-bold py-2">
                  <CheckCircle2 size={20} />
                  혜택이 지급되었어요!
                </div>
                <button
                  onClick={goNext}
                  className="w-full h-14 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2"
                >
                  {isLoggedIn ? '공구 보러가기' : '가입하고 참여하기'}
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-white/30 text-[11px] mt-4">
          초대 코드: {invite.code} · {defaultInviteReward.label}
        </p>

        {!claimed && isLoggedIn && (
          <button
            onClick={() => navigate(`/detail/${invite.groupBuyId}`)}
            className="w-full text-center text-white/50 text-xs mt-3 underline"
          >
            혜택 없이 바로 보기
          </button>
        )}
      </div>
    </div>
  )
}
