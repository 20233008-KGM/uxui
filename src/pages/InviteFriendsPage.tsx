import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Gift, Copy, Check, Share2, Users } from 'lucide-react'
import { PageHeader } from '../components/Layout'
import { useApp } from '../context/AppContext'
import { defaultInviteReward, getInviteLink, getLeaderInviteCode } from '../data/inviteEvent'

export default function InviteFriendsPage() {
  const navigate = useNavigate()
  const { user } = useApp()
  const code = getLeaderInviteCode(user?.name ?? '김')
  const inviteLink = getInviteLink(code)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="지인 초대"
        left={<button onClick={() => navigate(-1)} aria-label="뒤로"><ArrowLeft size={22} /></button>}
      />

      <div className="px-5 py-4 space-y-4">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
          <Gift size={32} className="mb-3 opacity-90" />
          <h2 className="text-lg font-bold mb-1">지인 초대 이벤트</h2>
          <p className="text-sm opacity-90 leading-relaxed">
            지인이 초대 링크로 가입·참여하면
            <br />
            <strong>지인 {defaultInviteReward.inviteePoints}P</strong> ·
            <strong> 팀장 {defaultInviteReward.leaderBonusPoints}P</strong> 지급!
          </p>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4">
          <p className="text-xs text-text-secondary mb-2">내 초대 코드</p>
          <p className="text-2xl font-bold text-primary tracking-widest mb-3">{code}</p>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 h-11 bg-primary text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? '복사됨!' : '링크 복사'}
            </button>
            <button className="w-11 h-11 border border-border rounded-xl flex items-center justify-center">
              <Share2 size={18} className="text-text-secondary" />
            </button>
          </div>
          <p className="text-[10px] text-text-secondary mt-2 break-all">{inviteLink}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '초대 발송', value: '3명' },
            { label: '참여 완료', value: '1명' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-surface rounded-xl border border-border p-4 text-center">
              <Users size={20} className="text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-text">{value}</p>
              <p className="text-xs text-text-secondary">{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-xs text-text-secondary space-y-1.5">
          <p className="font-semibold text-text">혜택 안내</p>
          <p>• 지인: 가입 시 {defaultInviteReward.inviteePoints}P + 첫 참여 {defaultInviteReward.inviteeDiscount}원 할인</p>
          <p>• 팀장: 지인 첫 참여 완료 시 {defaultInviteReward.leaderBonusPoints}P</p>
          <p>• 콜드스타트 해소 · 모집 인원 빠르게 채우기에 도움!</p>
        </div>

        <Link
          to={`/invite/${code}?canvas=1`}
          className="block text-center text-sm text-primary font-semibold"
        >
          초대 받은 화면 미리보기 →
        </Link>
      </div>
    </div>
  )
}
