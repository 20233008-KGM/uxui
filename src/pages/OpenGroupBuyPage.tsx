import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { X, Calendar, Minus, Plus, ShieldCheck, MapPin, Package, CheckCircle2 } from 'lucide-react'
import { StatusBar } from '../components/Layout'
import { LocationPicker } from '../components/LocationUI'
import { useApp } from '../context/AppContext'
import { leaderLocationPresets, userHome } from '../data/locations'
import { rangeLabels, type NeighborhoodRange } from '../data/notifications'
import { productCatalog } from '../data/productCatalog'
import { formatPrice } from '../data/groupBuys'

export default function OpenGroupBuyPage() {
  const navigate = useNavigate()
  const {
    leaderPickupLocation,
    setLeaderPickupLocation,
    leaderDetailAddress,
    setLeaderDetailAddress,
    openVisibilityRange,
    setOpenVisibilityRange,
    selectedCatalogProductId,
    setSelectedCatalogProductId,
  } = useApp()
  const [memberCount, setMemberCount] = useState(4)
  const [locationConfirmed, setLocationConfirmed] = useState(false)

  const selected = productCatalog.find((p) => p.id === selectedCatalogProductId) ?? productCatalog[0]

  const handleUseCurrentLocation = () => {
    setLeaderPickupLocation({ ...userHome, label: '신림동 (현재 위치)' })
    setLocationConfirmed(true)
  }

  const canProceed = locationConfirmed && !!selectedCatalogProductId

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
          <Package size={20} className="text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-primary-dark leading-relaxed">
            <strong>플랫폼 제공 품목</strong>만 선택할 수 있어요. 가격은 대량 공구 기준으로
            이미 정해져 있습니다.
          </p>
        </div>

        <div className="space-y-5">
          {/* vision #7: 카탈로그 품목 선택 (가격 입력 없음) */}
          <div className="bg-surface rounded-2xl border border-border p-4">
            <label className="block text-sm font-semibold text-text mb-3 flex items-center gap-1.5">
              <Package size={16} className="text-primary" />
              공구 품목 선택
              <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded font-bold">필수</span>
            </label>
            <div className="space-y-2">
              {productCatalog.map((product) => {
                const active = product.id === selectedCatalogProductId
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setSelectedCatalogProductId(product.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors ${
                      active
                        ? 'border-primary bg-primary-light ring-1 ring-primary/20'
                        : 'border-border bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-16 h-16 rounded-lg object-cover bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-text truncate">{product.title}</p>
                      <p className="text-xs text-text-secondary">{product.category} · {product.bulkNote}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-primary">
                          {formatPrice(product.pricePerPerson)}/인
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-text-secondary line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    {active && <CheckCircle2 size={20} className="text-primary shrink-0" />}
                  </button>
                )
              })}
            </div>
            <p className="text-[11px] text-text-secondary mt-3 bg-gray-50 rounded-lg p-2.5">
              선택: <strong>{selected.title}</strong> · {formatPrice(selected.pricePerPerson)} (가격 수정 불가)
            </p>
          </div>

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
            <label className="block text-sm font-semibold text-text mb-2">참여자 노출 범위 (팀장)</label>
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
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">모집 인원</label>
            <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden max-w-[200px]">
              <button
                type="button"
                onClick={() => setMemberCount(Math.max(selected.recommendedMin, memberCount - 1))}
                className="w-10 h-11 flex items-center justify-center text-text-secondary"
              >
                <Minus size={16} />
              </button>
              <span className="flex-1 text-center font-bold text-text">{memberCount}명</span>
              <button
                type="button"
                onClick={() => setMemberCount(Math.min(selected.recommendedMax, memberCount + 1))}
                className="w-10 h-11 flex items-center justify-center text-text-secondary"
              >
                <Plus size={16} />
              </button>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              권장 {selected.recommendedMin}~{selected.recommendedMax}명 · 최소 미달 시 자동 환불
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">모집 마감일</label>
            <button
              type="button"
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-text-secondary flex items-center justify-between"
            >
              날짜 선택
              <Calendar size={18} />
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 flex gap-3">
            <ShieldCheck size={18} className="text-primary shrink-0" />
            <p className="text-xs text-text-secondary leading-relaxed">
              참여자 결제금은 <strong>공구페이</strong>로 보관됩니다. 팀장은 품목·가격을
              임의로 정할 수 없어 허위 등록을 줄일 수 있어요.
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-surface border-t border-border px-5 py-4">
        {!canProceed && (
          <p className="text-[11px] text-orange text-center mb-2">
            {!selectedCatalogProductId ? '품목을 선택해주세요' : '수령 위치를 선택해주세요'}
          </p>
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
