import { useNavigate, Link, useParams } from 'react-router-dom'
import { CheckCircle2, XCircle, MessageCircle, Home, RotateCcw, Users, Gift, Sparkles } from 'lucide-react'
import { formatPrice } from '../data/groupBuys'
import { useApp } from '../context/AppContext'
import { MILEAGE_OPEN_GROUP_BUY } from '../data/leaderTier'
import { useEffect, useRef } from 'react'

export default function RecruitmentResultPage() {
  const { result } = useParams<{ result: string }>()
  const navigate = useNavigate()
  const { addLeaderMileage } = useApp()
  const mileageAdded = useRef(false)

  useEffect(() => {
    if (result === 'leader-success' && !mileageAdded.current) {
      mileageAdded.current = true
      addLeaderMileage(MILEAGE_OPEN_GROUP_BUY)
    }
  }, [result, addLeaderMileage])
  const isLeaderSuccess = result === 'leader-success'
  const isSuccess = result === 'success' || isLeaderSuccess
  const isWaiting = result === 'waiting'

  if (isWaiting) {
    return (
      <div className="min-h-dvh bg-bg flex flex-col items-center px-6 py-12">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-5 animate-pulse">
          <Users size={40} className="text-blue-500" />
        </div>
        <h1 className="text-xl font-bold text-text mb-2">모집 진행 중</h1>
        <p className="text-sm text-text-secondary text-center mb-8">
          결제금은 에스크로에 안전하게 보관 중이에요
        </p>
        <div className="w-full flex flex-col gap-3">
          <button onClick={() => navigate('/recruitment/success')} className="w-full h-12 bg-primary text-white font-bold rounded-xl">
            모집 성공 시뮬레이션
          </button>
          <button onClick={() => navigate('/recruitment/failure')} className="w-full h-12 border border-border bg-surface font-semibold rounded-xl">
            모집 실패 시뮬레이션
          </button>
        </div>
      </div>
    )
  }

  if (!isSuccess) {
    return (
      <div className="min-h-dvh bg-bg flex flex-col items-center px-6 py-12">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-5">
          <XCircle size={40} className="text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-text mb-2">모집 실패</h1>
        <p className="text-sm text-text-secondary text-center mb-1">
          최소 인원이 모이지 않아 공구가 무산되었습니다
        </p>
        <p className="text-xs text-text-secondary text-center mb-8">
          결제금 {formatPrice(4200)}은 자동 환불 처리됩니다
        </p>

        <div className="w-full bg-surface rounded-2xl border border-border p-4 mb-6 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-text-secondary">환불 금액</span>
            <span className="font-bold">{formatPrice(4200)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">환불 방법</span>
            <span>공구페이 에스크로 → 원 결제수단</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">예상 소요</span>
            <span>1~3 영업일</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Link to="/refund/tx-failed" className="w-full h-12 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2">
            <RotateCcw size={18} />
            환불 내역 확인
          </Link>
          <button onClick={() => navigate('/')} className="w-full h-12 border border-border bg-surface font-semibold rounded-xl flex items-center justify-center gap-2">
            <Home size={18} />
            메인으로
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-bg flex flex-col items-center px-6 py-12">
      <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mb-5">
        <CheckCircle2 size={40} className="text-primary" />
      </div>
      <h1 className="text-xl font-bold text-text mb-2">모집 성공!</h1>
      <p className="text-sm text-text-secondary text-center mb-1">
        공구가 확정되었습니다
      </p>
      <p className="text-xs text-text-secondary text-center mb-8">
        새로운 채팅방이 생성되었어요. 배송·수령 일정을 확인하세요
      </p>

      <div className="w-full bg-surface rounded-2xl border border-border p-4 mb-6 text-sm">
        <p className="font-bold text-text mb-2">다음 단계</p>
        {['채팅방에서 수령 일정 조율', '물건 도착 시 수령', '수령 확인 → 팀장 정산', '후기 작성'].map((s, i) => (
          <div key={s} className="flex items-center gap-2 py-1.5 text-text-secondary">
            <span className="w-5 h-5 rounded-full bg-primary-light text-primary text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
            {s}
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col gap-3">
        {isLeaderSuccess && (
          <>
            <div className="w-full bg-primary-light rounded-xl p-3 mb-1 flex items-center gap-2 text-sm text-primary-dark">
              <Sparkles size={16} className="text-primary shrink-0" />
              팀장 마일리지 +{MILEAGE_OPEN_GROUP_BUY} 적립!
            </div>
            <Link
              to="/leader/invite"
              className="w-full h-12 bg-gradient-to-r from-orange to-orange/80 text-white font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Gift size={18} />
              지인 초대하고 혜택 받기
            </Link>
            <Link
              to="/mypage/tier"
              className="w-full h-11 border border-primary/30 bg-primary-light text-primary font-semibold rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles size={16} />
              내 등급 확인
            </Link>
          </>
        )}
        <Link to="/chat" className="w-full h-12 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2">
          <MessageCircle size={18} />
          채팅방 입장
        </Link>
        <button onClick={() => navigate('/')} className="w-full h-12 border border-border bg-surface font-semibold rounded-xl">
          메인으로
        </button>
      </div>
    </div>
  )
}
