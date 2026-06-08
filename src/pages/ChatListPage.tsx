import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageCircle, ShieldCheck } from 'lucide-react'
import { PageHeader } from '../components/Layout'

const chats = [
  { id: '1', title: '화장지 30롤 공구방', members: 5, lastMsg: '물건 도착 예정일: 12월 20일', unread: 2, escrow: true },
  { id: '2', title: '세탁세제 3L 공구방', members: 4, lastMsg: '모집 마감임박!', unread: 0, escrow: true },
]

export default function ChatListPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full bg-bg flex flex-col">
      <PageHeader
        title="채팅"
        left={<button onClick={() => navigate(-1)} aria-label="뒤로"><ArrowLeft size={22} /></button>}
      />

      <div className="divide-y divide-border bg-surface">
        {chats.map((chat) => (
          <Link key={chat.id} to="/chat" className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center shrink-0">
              <MessageCircle size={22} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm text-text truncate">{chat.title}</p>
                {chat.escrow && (
                  <ShieldCheck size={12} className="text-primary shrink-0" />
                )}
              </div>
              <p className="text-xs text-text-secondary truncate">{chat.lastMsg}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] text-text-secondary">{chat.members}명</p>
              {chat.unread > 0 && (
                <span className="inline-block mt-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full leading-5 text-center">
                  {chat.unread}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
