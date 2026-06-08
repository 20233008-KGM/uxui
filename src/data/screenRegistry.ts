export type ScreenGroup = {
  title: string
  description?: string
  color: string
  screens: { name: string; path: string; note?: string }[]
}

export const screenGroups: ScreenGroup[] = [
  {
    title: '이벤트 · 초대',
    color: '#f97316',
    screens: [
      { name: '팀장 지인 초대', path: '/leader/invite' },
      { name: '초대 이벤트 (지인)', path: '/invite/KIM2024', note: '혜택 받기' },
    ],
  },
  {
    title: '진입 · 인증',
    description: '로그인 없이 접근',
    color: '#6366f1',
    screens: [
      { name: '랜딩', path: '/landing' },
      { name: '로그인', path: '/login' },
      { name: '회원가입', path: '/signup' },
    ],
  },
  {
    title: '메인 · 탐색',
    color: '#2e9d79',
    screens: [
      { name: '홈', path: '/' },
      { name: '탐색 (목록)', path: '/explore' },
      { name: '탐색 (슬라이드)', path: '/explore/slide' },
      { name: '공구 상세', path: '/detail/1' },
      { name: '공구 상세 (멀리)', path: '/detail/5', note: '거리 경고' },
    ],
  },
  {
    title: '공구 열기 (팀장)',
    color: '#0ea5e9',
    screens: [
      { name: '1/3 품목·위치', path: '/open', note: '위치 필수 입력' },
      { name: '2/3 수량·일정', path: '/open/step2' },
      { name: '3/3 결제', path: '/open/step3' },
    ],
  },
  {
    title: '결제 · 모집',
    color: '#8b5cf6',
    screens: [
      { name: '공구페이 결제', path: '/payment/1' },
      { name: '결제 완료', path: '/payment/1/complete' },
      { name: '모집 진행 중', path: '/recruitment/waiting' },
      { name: '모집 성공', path: '/recruitment/success' },
      { name: '모집 실패', path: '/recruitment/failure' },
      { name: '팀장 개설 성공', path: '/recruitment/leader-success' },
    ],
  },
  {
    title: '채팅 · 수령 · 후기',
    color: '#ec4899',
    screens: [
      { name: '채팅 목록', path: '/chats' },
      { name: '채팅방', path: '/chat' },
      { name: '수령 확인', path: '/confirm/tx-001' },
      { name: '수령 기한 초과', path: '/pickup/overdue/tx-001' },
      { name: '보관 공간 부족', path: '/pickup/storage/tx-001' },
      { name: '후기 작성', path: '/review/tx-001' },
    ],
  },
  {
    title: '예외 · 환불 · 분쟁',
    color: '#ef4444',
    screens: [
      { name: '거래 내역', path: '/mypage/transactions' },
      { name: '환불 내역', path: '/refund/tx-failed' },
      { name: '참여 취소', path: '/cancel/tx-new' },
      { name: '참여자 취소', path: '/recruitment/member-cancel' },
      { name: '팀장 연락 두절', path: '/leader/unavailable' },
      { name: '분쟁 신고', path: '/dispute/tx-001' },
    ],
  },
  {
    title: '마이페이지',
    color: '#f59e0b',
    screens: [
      { name: '마이', path: '/mypage' },
      { name: '팀장 등급', path: '/mypage/tier', note: '마일리지·반짝 이름' },
      { name: '프로필 · 구매 주기', path: '/mypage/profile' },
      { name: '포인트', path: '/mypage/points' },
      { name: '주소 관리', path: '/mypage/address' },
      { name: '알림 · 사용 주기', path: '/mypage/notifications' },
      { name: '동네 범위', path: '/mypage/neighborhood', note: '참여·노출 이중 설정' },
    ],
  },
]

export const PHONE_WIDTH = 430
export const PHONE_HEIGHT = 880
