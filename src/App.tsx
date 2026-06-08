import { Routes, Route, Navigate } from 'react-router-dom'
import { MobileFrame } from './components/BottomNav'
import { RequireAuth, RequireGuest } from './components/RequireAuth'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import ExploreSlidePage from './pages/ExploreSlidePage'
import DetailPage from './pages/DetailPage'
import ChatPage from './pages/ChatPage'
import ChatListPage from './pages/ChatListPage'
import OpenGroupBuyPage from './pages/OpenGroupBuyPage'
import OpenGroupBuyStep2Page from './pages/OpenGroupBuyStep2Page'
import OpenGroupBuyStep3Page from './pages/OpenGroupBuyStep3Page'
import MyPage from './pages/MyPage'
import PaymentPage from './pages/PaymentPage'
import PaymentCompletePage from './pages/PaymentCompletePage'
import ConfirmReceiptPage from './pages/ConfirmReceiptPage'
import TransactionHistoryPage from './pages/TransactionHistoryPage'
import RecruitmentResultPage from './pages/RecruitmentResultPage'
import RefundPage from './pages/RefundPage'
import ReviewPage from './pages/ReviewPage'
import DisputePage from './pages/DisputePage'
import CancelParticipationPage from './pages/CancelParticipationPage'
import NeighborhoodSettingsPage from './pages/NeighborhoodSettingsPage'
import NotificationSettingsPage from './pages/NotificationSettingsPage'
import ProfilePage from './pages/ProfilePage'
import AddressPage from './pages/AddressPage'
import PointsPage from './pages/PointsPage'
import ScreenCatalogPage from './pages/ScreenCatalogPage'
import ScreenCanvasPage from './pages/ScreenCanvasPage'
import LeaderUnavailablePage from './pages/LeaderUnavailablePage'
import MemberCancelAfterRecruitmentPage from './pages/MemberCancelAfterRecruitmentPage'
import InviteFriendsPage from './pages/InviteFriendsPage'
import InviteEventPage from './pages/InviteEventPage'
import LeaderTierPage from './pages/LeaderTierPage'
import PickupOverduePage from './pages/PickupOverduePage'
import StorageIssuePage from './pages/StorageIssuePage'

function AuthFrame({ children, showNav = true }: { children: React.ReactNode; showNav?: boolean }) {
  return (
    <RequireAuth>
      <MobileFrame showNav={showNav}>{children}</MobileFrame>
    </RequireAuth>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/landing" element={<RequireGuest><LandingPage /></RequireGuest>} />
      <Route path="/login" element={<RequireGuest><LoginPage /></RequireGuest>} />
      <Route path="/signup" element={<RequireGuest><SignupPage /></RequireGuest>} />

      <Route path="/" element={<AuthFrame><HomePage /></AuthFrame>} />
      <Route path="/explore" element={<AuthFrame><ExplorePage /></AuthFrame>} />
      <Route path="/explore/slide" element={<AuthFrame><ExploreSlidePage /></AuthFrame>} />
      <Route path="/detail/:id" element={<AuthFrame showNav={false}><DetailPage /></AuthFrame>} />
      <Route path="/payment/:id" element={<AuthFrame showNav={false}><PaymentPage /></AuthFrame>} />
      <Route path="/payment/:id/complete" element={<AuthFrame showNav={false}><PaymentCompletePage /></AuthFrame>} />
      <Route path="/recruitment/:result" element={<AuthFrame showNav={false}><RecruitmentResultPage /></AuthFrame>} />
      <Route path="/refund/:txId" element={<AuthFrame showNav={false}><RefundPage /></AuthFrame>} />
      <Route path="/confirm/:txId" element={<AuthFrame showNav={false}><ConfirmReceiptPage /></AuthFrame>} />
      <Route path="/cancel/:txId" element={<AuthFrame showNav={false}><CancelParticipationPage /></AuthFrame>} />
      <Route path="/dispute/:txId" element={<AuthFrame showNav={false}><DisputePage /></AuthFrame>} />
      <Route path="/review/:txId" element={<AuthFrame showNav={false}><ReviewPage /></AuthFrame>} />
      <Route path="/chat" element={<AuthFrame showNav={false}><ChatPage /></AuthFrame>} />
      <Route path="/chats" element={<AuthFrame showNav={false}><ChatListPage /></AuthFrame>} />
      <Route path="/open" element={<AuthFrame showNav={false}><OpenGroupBuyPage /></AuthFrame>} />
      <Route path="/open/step2" element={<AuthFrame showNav={false}><OpenGroupBuyStep2Page /></AuthFrame>} />
      <Route path="/open/step3" element={<AuthFrame showNav={false}><OpenGroupBuyStep3Page /></AuthFrame>} />
      <Route path="/mypage" element={<AuthFrame><MyPage /></AuthFrame>} />
      <Route path="/mypage/transactions" element={<AuthFrame showNav={false}><TransactionHistoryPage /></AuthFrame>} />
      <Route path="/mypage/profile" element={<AuthFrame showNav={false}><ProfilePage /></AuthFrame>} />
      <Route path="/mypage/points" element={<AuthFrame showNav={false}><PointsPage /></AuthFrame>} />
      <Route path="/mypage/address" element={<AuthFrame showNav={false}><AddressPage /></AuthFrame>} />
      <Route path="/mypage/notifications" element={<AuthFrame showNav={false}><NotificationSettingsPage /></AuthFrame>} />
      <Route path="/mypage/neighborhood" element={<AuthFrame showNav={false}><NeighborhoodSettingsPage /></AuthFrame>} />
      <Route path="/mypage/tier" element={<AuthFrame showNav={false}><LeaderTierPage /></AuthFrame>} />

      <Route path="/pickup/overdue/:txId" element={<AuthFrame showNav={false}><PickupOverduePage /></AuthFrame>} />
      <Route path="/pickup/storage/:txId" element={<AuthFrame showNav={false}><StorageIssuePage /></AuthFrame>} />

      <Route path="/invite/:code" element={<InviteEventPage />} />
      <Route path="/leader/invite" element={<AuthFrame showNav={false}><InviteFriendsPage /></AuthFrame>} />
      <Route path="/leader/unavailable" element={<AuthFrame showNav={false}><LeaderUnavailablePage /></AuthFrame>} />
      <Route path="/recruitment/member-cancel" element={<AuthFrame showNav={false}><MemberCancelAfterRecruitmentPage /></AuthFrame>} />
      <Route path="/screens" element={<ScreenCanvasPage />} />
      <Route path="/screens/list" element={<ScreenCatalogPage />} />

      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  )
}
