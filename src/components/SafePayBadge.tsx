import { ShieldCheck } from 'lucide-react'

export function SafePayBadge({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const isMd = size === 'md'
  return (
    <span
      className={`inline-flex items-center gap-1 font-bold text-primary ${
        isMd ? 'text-sm px-3 py-1.5 bg-primary-light rounded-full' : 'text-[11px] px-2 py-0.5 bg-primary-light rounded-full'
      }`}
    >
      <ShieldCheck size={isMd ? 16 : 12} strokeWidth={2.5} />
      공구페이
    </span>
  )
}

export function SafePayBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`bg-primary-light rounded-xl ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 shrink-0 rounded-full bg-primary flex items-center justify-center">
          <ShieldCheck size={20} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-text text-sm">공구페이 안전거래</span>
            <SafePayBadge />
          </div>
          <p className={`text-primary-dark leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>
            결제금은 수령 확인 전까지 안전하게 보관됩니다.
            {!compact && (
              <>
                <br />
                물건을 받고 <strong>수령 확인</strong>을 눌러야 팀장에게 정산돼요.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export function EscrowStatusSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-start justify-between px-2">
      {[
        { label: '결제', sub: '에스크로 보관' },
        { label: '수령', sub: '물건 도착' },
        { label: '확인', sub: '팀장 정산' },
      ].map((step, i) => {
        const done = i < currentStep
        const active = i === currentStep
        return (
          <div key={step.label} className="flex flex-col items-center flex-1 relative">
            {i > 0 && (
              <div
                className={`absolute top-4 right-1/2 w-full h-0.5 -translate-y-1/2 ${
                  done ? 'bg-primary' : 'bg-gray-200'
                }`}
                style={{ width: 'calc(100% - 16px)', right: '50%' }}
              />
            )}
            <div
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                done
                  ? 'bg-primary text-white'
                  : active
                    ? 'bg-primary text-white ring-4 ring-primary/20'
                    : 'bg-gray-200 text-text-secondary'
              }`}
            >
              {done ? '✓' : i + 1}
            </div>
            <p className={`text-xs font-semibold mt-2 ${active || done ? 'text-text' : 'text-text-secondary'}`}>
              {step.label}
            </p>
            <p className="text-[10px] text-text-secondary">{step.sub}</p>
          </div>
        )
      })}
    </div>
  )
}
