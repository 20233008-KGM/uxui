import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, MoreVertical, Megaphone, Plus, Send, Truck, ShieldCheck } from 'lucide-react'
import { StatusBar } from '../components/Layout'
import { formatPrice } from '../data/groupBuys'

interface Message {
  id: number
  type: 'system' | 'incoming' | 'outgoing' | 'card' | 'escrow'
  name?: string
  avatar?: string
  avatarColor?: string
  text?: string
  time?: string
  highlight?: string
}

const messages: Message[] = [
  { id: 0, type: 'system', text: '2024년 12월 18일' },
  { id: 1, type: 'system', text: '5명 모집 완료! 공구가 확정되었습니다.' },
  { id: 2, type: 'escrow' },
  {
    id: 3,
    type: 'incoming',
    name: '김신림 (팀장)',
    avatar: '김',
    avatarColor: 'bg-primary-light text-primary',
    text: '안녕하세요! 모집이 완료됐어요. 물건은 20일 도착 예정이에요.',
    time: '오전 10:02',
    highlight: '20일',
  },
  {
    id: 4,
    type: 'incoming',
    name: '미봉천',
    avatar: '이',
    avatarColor: 'bg-purple-100 text-purple-600',
    text: '감사합니다! 수령 시간은 언제가 가능할까요?',
    time: '오전 10:04',
  },
  {
    id: 5,
    type: 'outgoing',
    text: '저도 궁금해요!',
    time: '오전 10:06',
  },
  { id: 6, type: 'card' },
]

function MessageBubble({ msg }: { msg: Message }) {
  if (msg.type === 'system') {
    if (msg.text?.includes('년')) {
      return (
        <div className="text-center py-3">
          <span className="text-xs text-text-secondary">{msg.text}</span>
        </div>
      )
    }
    return (
      <div className="flex justify-center py-2">
        <span className="text-xs text-text-secondary bg-gray-200/60 px-4 py-1.5 rounded-full">
          {msg.text}
        </span>
      </div>
    )
  }

  if (msg.type === 'escrow') {
    return (
      <div className="mx-4 my-2">
        <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={18} className="text-blue-600" />
            <span className="font-bold text-sm text-text">공구페이 안전결제 완료</span>
          </div>
          <p className="text-xs text-text-secondary mb-3">
            {formatPrice(4200)}이 에스크로에 보관 중이에요. 수령 확인 후 팀장에게 정산됩니다.
          </p>
          <Link
            to="/confirm/tx-001"
            className="block w-full text-center py-2.5 bg-primary text-white text-sm font-bold rounded-xl"
          >
            수령 확인하기
          </Link>
        </div>
      </div>
    )
  }

  if (msg.type === 'card') {
    return (
      <div className="mx-4 my-2">
        <div className="bg-surface rounded-2xl border border-border p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Truck size={18} className="text-primary" />
            <span className="font-bold text-sm text-text">배송 현황</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">출발지</span>
              <span className="text-text">쿠팡 물류센터</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">도착 예정</span>
              <span className="font-bold text-primary">12월 20일</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="text-text-secondary">결제 상태</span>
              <span className="font-semibold text-blue-600">에스크로 보관중</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (msg.type === 'outgoing') {
    return (
      <div className="flex justify-end items-end gap-2 px-4 py-1">
        <span className="text-[10px] text-text-secondary shrink-0">{msg.time}</span>
        <div className="bg-primary text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[70%] text-sm leading-relaxed">
          {msg.text}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2 px-4 py-1">
      <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${msg.avatarColor}`}>
        {msg.avatar}
      </div>
      <div>
        <p className="text-xs text-text-secondary mb-1">{msg.name}</p>
        <div className="bg-surface px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[260px] text-sm leading-relaxed shadow-sm border border-border/50">
          {msg.highlight ? (
            <span>
              안녕하세요! 모집이 완료됐어요. 물건은 <strong>{msg.highlight}</strong> 도착 예정이에요.
            </span>
          ) : (
            msg.text
          )}
        </div>
        <p className="text-[10px] text-text-secondary mt-1">{msg.time}</p>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <StatusBar />
      <div className="bg-surface border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} aria-label="뒤로">
            <ArrowLeft size={22} />
          </button>
          <button aria-label="메뉴">
            <MoreVertical size={20} />
          </button>
        </div>
        <div className="px-5 pb-3">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-lg font-bold text-text">화장지 30롤 공구방</h1>
            <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">
              공구페이
            </span>
          </div>
          <p className="text-sm text-text-secondary">5명 참여중 · 에스크로 보관중</p>
        </div>
        <div className="bg-primary-light px-5 py-2.5 flex items-center gap-2">
          <Megaphone size={14} className="text-primary shrink-0" />
          <p className="text-xs text-primary-dark font-medium">
            [팀장] 물건 도착 예정일: 12월 20일 (목)
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
      </div>

      <div className="bg-surface border-t border-border px-4 py-3 flex items-center gap-3">
        <button className="text-text-secondary" aria-label="첨부">
          <Plus size={24} />
        </button>
        <input
          type="text"
          placeholder="메시지 입력"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-text-secondary"
        />
        <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center" aria-label="전송">
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  )
}
