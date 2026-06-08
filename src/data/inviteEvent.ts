export interface InviteReward {
  inviteePoints: number
  inviteeDiscount: number
  leaderBonusPoints: number
  label: string
}

export const defaultInviteReward: InviteReward = {
  inviteePoints: 1000,
  inviteeDiscount: 500,
  leaderBonusPoints: 300,
  label: '지인 초대 이벤트',
}

export interface InviteInfo {
  code: string
  leaderName: string
  groupBuyTitle: string
  groupBuyId: string
}

export const demoInvites: Record<string, InviteInfo> = {
  KIM2024: {
    code: 'KIM2024',
    leaderName: '김신림',
    groupBuyTitle: '3겹 화장지 30롤 대용량',
    groupBuyId: '1',
  },
  FRIEND: {
    code: 'FRIEND',
    leaderName: '김신림',
    groupBuyTitle: '3겹 화장지 30롤 대용량',
    groupBuyId: '1',
  },
}

export function getInviteLink(code: string) {
  return `${window.location.origin}/invite/${code}`
}

export function getLeaderInviteCode(userName: string) {
  return userName.slice(0, 2).toUpperCase() + '2024'
}
