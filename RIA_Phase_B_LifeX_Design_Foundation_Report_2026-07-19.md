# RIA Phase B — LifeX 모바일 디자인 기반 구현 보고서

- 작성일: 2026-07-19
- 대상 브랜치: `design/ria-mobile`
- 기준 문서: `RIA_July_LifeX_Design_Directive_v1_2026-07-19.md`
- 커밋 상태: 미커밋

## 요약

Phase B에서는 Today/Home 화면을 재설계하지 않고 LifeX 모바일 디자인 기반만 구현했다.

구현 변경 파일은 `src/app/globals.css` 하나다.

```text
1 file changed, 71 insertions(+), 9 deletions(-)
```

## 1. 구현 내용

### LifeX 색상 토큰

다음 의미 기반 색상 토큰을 추가했다.

| 역할 | 값 |
|---|---|
| Background | `#F7F4EE` |
| Surface | `#FFFCF8` |
| Surface muted | `#EFEAE1` |
| Text primary | `#262923` |
| Text secondary | `#64685F` |
| Primary | `#36576D` |
| Primary soft | `#E6EDF1` |
| Balance | `#5F7968` |
| Accent | `#B47732` |
| Danger | `#A8544E` |
| Border | `#DDD7CC` |

기존 화면의 스타일이 한 번에 깨지지 않도록 기존 토큰을 새 의미 토큰에 호환 매핑했다.

- `warm-white` → `background`
- `card-white` → `surface`
- `soft-black` → `text-primary`
- `stone` → `text-secondary`
- `gold` → `accent`
- `divider` → `border`
- `muted` → `text-secondary`

기존에 정의되지 않았던 `border-border`, `text-muted` 클래스도 새 토큰을 통해 정상적으로 값을 갖게 됐다.

### 시스템 폰트

실제로 로딩되지 않던 Pretendard, Fraunces, Source Serif 선언을 제거하고 다음 시스템 폰트 스택을 적용했다.

```css
-apple-system, BlinkMacSystemFont, "Segoe UI",
"Noto Sans KR", "Apple SD Gothic Neo", sans-serif
```

기존 `font-display` 토큰을 사용하는 화면이 추가되더라도 외부 폰트 누락이 발생하지 않도록 `font-display`는 시스템 폰트 alias로 보존했다.

### 전역 접근성 기반

다음 접근성 기반을 추가했다.

- Primary 색상의 명확한 `focus-visible` outline
- 키보드 포커스 outline offset
- 버튼·입력·select·textarea 최소 높이 44px
- 버튼·내비게이션 링크 최소 너비 44px
- 입력·select·textarea 글꼴 최소 16px
- 터치 조작을 위한 `touch-action: manipulation`
- hover 없이도 확인되는 `:active` 피드백
- 본문 기본 line-height `1.5`
- 읽기 가능한 본문·보조 텍스트 대비
- `prefers-reduced-motion` 지원
- 텍스트 선택 상태 색상

## 2. UI Primitive 판단

Button, Input, Surface/Card에 해당하는 Tailwind 스타일이 여러 컴포넌트에 반복되는 것은 확인했다.

그러나 이번 단계에서는 기존 화면 전체를 새 컴포넌트로 교체하지 않는다는 제약이 있었고, 아직 사용하지 않을 추상 컴포넌트를 미리 만드는 것은 불필요하다고 판단했다.

따라서 다음 파일이나 컴포넌트는 만들지 않았다.

- `src/components/ui/Button`
- `src/components/ui/Input`
- `src/components/ui/Surface`
- Dialog
- Sheet
- Toast

실제 화면을 단계적으로 개선할 때 최소 두 곳 이상에서 같은 API가 검증된 primitive만 추출하는 것이 안전하다.

## 3. 검증 결과

### 코드 검증

- `git diff --check`: 통과
- TypeScript 검사: 통과
- `npm run build`: 성공
- 변경 금지 파일 변경 없음
- `package.json`, `package-lock.json` 변경 없음

기존 빌드 경고 6개는 그대로이며, Phase B에서 추가된 오류나 경고는 없다.

### HTTP 렌더링

| 경로 | 결과 |
|---|---|
| `/` | HTTP 200 |
| `/login` | HTTP 200 |

### 360×800 모바일 검증

| 항목 | 결과 |
|---|---|
| `/` 가로 스크롤 | 없음 |
| `/login` 가로 스크롤 | 없음 |
| 입력 글꼴 | 16px |
| 이메일·비밀번호 입력 높이 | 약 49.6px |
| 로그인 버튼 높이 | 48px |
| 보조 가입 버튼 높이 | 기존 19.5px에서 44px로 개선 |
| Google OAuth 버튼 | 기본 비활성 상태에서 미노출 |

### Focus-visible 검증

키보드 포커스를 적용한 로그인 입력에서 다음 계산 스타일을 확인했다.

- outline style: `solid`
- outline color: Primary `#36576D`
- outline offset 적용
- 마우스 hover에 의존하지 않는 키보드 식별 가능

### Reduced motion 검증

빌드된 CSS에 `prefers-reduced-motion: reduce` 미디어 규칙이 정상적으로 로드되는 것을 확인했다.

해당 환경에서는 다음 동작을 최소화한다.

- animation duration
- animation iteration
- transition duration
- smooth scrolling

## 4. 변경 파일과 변경 이유

### `src/app/globals.css`

변경 이유:

- LifeX 의미 기반 색상 체계 구축
- 기존 토큰의 점진적 호환 유지
- 외부 의존성 없는 시스템 폰트 적용
- 전역 접근성 및 모바일 터치 기반 마련
- 이후 화면별 디자인 변경이 공통 기준을 사용하도록 준비

새 UI primitive는 생성하지 않았다.

## 5. 보존 확인

다음 영역은 변경하지 않았다.

- Today/Home 화면과 정보 구조
- AppShell
- BottomNav
- 라우트 구조
- 인증 방식
- Google OAuth 구현
- 이메일 로그인·가입
- Supabase 설정과 클라이언트
- 데이터베이스 schema와 migration
- RLS
- API 계약
- query
- Server Action
- 실제 데이터 흐름
- mock data
- `package.json`
- `package-lock.json`

## 6. 현재 Git 상태

Phase B 구현은 커밋하지 않았다.

구현 변경 파일:

```text
M src/app/globals.css
```

이 보고서 파일은 사용자 요청에 따라 구현 완료 후 별도로 추가했다.

사용자가 diff와 검증 결과를 검토하고 커밋을 승인하기 전까지 Phase B 구현은 커밋하지 않는다.
