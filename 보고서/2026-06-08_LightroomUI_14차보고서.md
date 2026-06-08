# 우리동네 공구 — 14차 업데이트 보고서 (Lightroom UI · screens 개요)

**작성일:** 2026-06-08  
**기준 문서:** `mds/spec.md`, `mds/vision.md`, `mds/edge_case.md`

---

## 1. spec.md

Ryzen 5 5500U · 16GB `npm run build` ✅ (약 6초)

---

## 2. vision #11 — Lightroom 기반 가시성 개선

### 원문 요청
> lightroom기반해서 앱 가시성 개선해줘

### 수행 내용

Adobe Lightroom UI 특성(중립 그레이 톤 · 선명한 텍스트 대비 · 은은한 패널 그림자 · 사진 중심 레이아웃)을 반영했습니다.

| 영역 | 변경 |
|------|------|
| **디자인 토큰** (`index.css`) | `#f0f0f0` 배경, `#1d1d1d` 본문, `#6e6e6e` 보조 텍스트, `--shadow-lr-*` 그림자 |
| **유틸 클래스** | `.lr-card`, `.lr-panel`, `.lr-image-well` — 카드·이미지 영역 통일 |
| **공구 카드** | `GroupBuyCard` — lr-card + 이미지 웰 그라데이션 |
| **상품 이미지** | `ProductImage` — 회색 박스 대신 lr-image-well |
| **앱 프레임** | `MobileFrame` — 데스크탑에서 은은한 링·깊은 그림자 |
| **하단 네비** | 반투명 blur + 상단 그림자 |
| **페이지 헤더** | blur + 미세 shadow |
| **meta** | `theme-color` #f0f0f0 |

### 확인
- `/`, `/explore` — 카드 대비·그림자 개선
- `/detail/1` — 상품 히어로 이미지 영역

---

## 3. screens 페이지 개요 줌 (미커밋분 포함)

- 첫 렌더 **전체 개요 스케일**(최대 36%)로 시작
- 리사이즈 시 줌 자동 변경 제거 → **Ctrl+휠**로 사용자 확대
- 「개요」 버튼 / `0` 키로 초기 보기 복귀

---

## 4. edge_case.md

| § | 상태 |
|---|:----:|
| 1~5 | ✅ 기존 유지 |
| 6 | 내용 없음 |

가시성 개선은 §2(허위 등록)·§5(위치 확인) 등 **정보 가독성** 보조.

---

## 5. vision.md 전체 (#1~#11)

| # | 상태 |
|---|:----:|
| 1~10 | ✅ 기존 완료 |
| 11 | ✅ **이번 작업** |

---

## 6. 변경 파일

- `src/index.css`, `index.html`
- `src/components/GroupBuyCard.tsx`, `BottomNav.tsx`, `Layout.tsx`, `ProductImage.tsx`
- `src/pages/ScreenCanvasPage.tsx`
- `mds/vision.md`

**배포:** https://uxui-ecru.vercel.app
