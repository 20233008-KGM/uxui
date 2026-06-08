import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { X, Camera, ChevronDown, Calendar, Minus, Plus, ShieldCheck, MapPin } from 'lucide-react'
import { StatusBar } from '../components/Layout'
import { LocationPicker } from '../components/LocationUI'
import { useApp } from '../context/AppContext'
import { leaderLocationPresets, userHome } from '../data/locations'
import { rangeLabels, type NeighborhoodRange } from '../data/notifications'

import { openGroupBuySamplePhotos } from '../data/productImages'

export default function OpenGroupBuyPage() {
  const navigate = useNavigate()
  const {
    leaderPickupLocation,
    setLeaderPickupLocation,
    leaderDetailAddress,
    setLeaderDetailAddress,
    leaderVisibilityRange,
    openVisibilityRange,
    setOpenVisibilityRange,
  } = useApp()
  const [memberCount, setMemberCount] = useState(4)
  const [locationConfirmed, setLocationConfirmed] = useState(false)
  const [productPhoto, setProductPhoto] = useState(openGroupBuySamplePhotos[0].url)

  const handleUseCurrentLocation = () => {
    setLeaderPickupLocation({ ...userHome, label: '신림동 (현재 위치)' })
    setLocationConfirmed(true)
  }

  const canProceed = locationConfirmed

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <StatusBar />
      <div className="bg-surface border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} aria-label="닫기">
            <X size={22} />
          </button>
          <h1 className="text-base font-bold text-text">공구 열기</h1>
          <span className="text-sm text-text-secondary">1/3</span>
        </div>
        <div className="flex items-center justify-center gap-0 px-8 pb-5">
          {[1, 2, 3].map((step, i) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-text-secondary'
                }`}
              >
                {step}
              </div>
              {i < 2 && <div className="w-16 h-0.5 bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 pb-28">
        <div className="bg-primary-light rounded-xl p-4 flex gap-3 mb-5">
          <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-primary-dark leading-relaxed">
            참여자 결제금은 <strong>공구페이</strong>로 안전 보관됩니다.
            수령 위치를 입력하면 멀리 사는 참여를 줄일 수 있어요.
          </p>
        </div>

        <div className="space-y-5">
          {/* vision.md: 공구 열기 1단계에서 위치 입력 */}
          <div className="bg-surface rounded-2xl border border-primary/20 p-4">
            <label className="block text-sm font-semibold text-text mb-3 flex items-center gap-1.5">
              <MapPin size={16} className="text-primary" />
              수령 위치 (팀장)
              <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded font-bold">필수</span>
            </label>
            <LocationPicker
              selected={leaderPickupLocation}
              onSelect={(loc) => {
                setLeaderPickupLocation(loc)
                setLocationConfirmed(true)
              }}
              presets={leaderLocationPresets}
              detailAddress={leaderDetailAddress}
              onDetailAddressChange={setLeaderDetailAddress}
              onUseCurrentLocation={handleUseCurrentLocation}
              required
            />
          </div>

          <div className="bg-surface rounded-2xl border border-border p-4">
            <label className="block text-sm font-semibold text-text mb-2">
              참여자 노출 범위 (팀장)
            </label>
            <p className="text-xs text-text-secondary mb-3 leading-relaxed">
              수령 위치 기준 이 거리 안의 이웃에게만 공구가 보이고 참여할 수 있어요.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(rangeLabels) as [NeighborhoodRange, string][]).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setOpenVisibilityRange(key)}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-semibold text-left ${
                    openVisibilityRange === key
                      ? 'border-primary bg-primary-light text-primary'
                      : 'border-border bg-gray-50 text-text-secondary'
                  }`}
                >
                  {label.split(' ')[0]}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-text-secondary mt-2">
              마이페이지 기본값: {rangeLabels[leaderVisibilityRange]}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">상품 사진</label>
            <div className="rounded-xl overflow-hidden border border-border mb-2 h-40">
              <img src={productPhoto} alt="상품 미리보기" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {openGroupBuySamplePhotos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setProductPhoto(photo.url)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    productPhoto === photo.url ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                  }`}
                >
                  <img src={photo.url} alt={photo.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="mt-2 w-full h-10 border border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-xs text-text-secondary"
            >
              <Camera size={16} />
              갤러리에서 추가 (데모)
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">상품명</label>
            <input
              type="text"
              placeholder="ex. 3겹 화장지 30롤 대용량"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-text-secondary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">카테고리</label>
            <button className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-text-secondary flex items-center justify-between">
              카테고리 선택
              <ChevronDown size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">총 상품 금액</label>
              <input
                type="text"
                placeholder="0 원"
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-text-secondary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">모집 인원</label>
              <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setMemberCount(Math.max(2, memberCount - 1))}
                  className="w-10 h-11 flex items-center justify-center text-text-secondary"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center font-bold text-text">{memberCount}</span>
                <button
                  onClick={() => setMemberCount(memberCount + 1)}
                  className="w-10 h-11 flex items-center justify-center text-text-secondary"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">모집 마감일</label>
            <button className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-text-secondary flex items-center justify-between">
              날짜 선택
              <Calendar size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4">
        {!canProceed && (
          <p className="text-[11px] text-orange text-center mb-2">수령 위치를 선택해주세요</p>
        )}
        {canProceed ? (
          <Link
            to="/open/step2"
            className="block w-full h-12 bg-primary text-white font-bold rounded-xl text-center leading-[3rem]"
          >
            다음 단계
          </Link>
        ) : (
          <button
            disabled
            className="w-full h-12 bg-gray-200 text-text-secondary font-bold rounded-xl"
          >
            다음 단계
          </button>
        )}
      </div>
    </div>
  )
}
