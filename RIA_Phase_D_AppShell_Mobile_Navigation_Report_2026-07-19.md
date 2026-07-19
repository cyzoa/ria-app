# RIA Phase D — AppShell 및 모바일 내비게이션 개선 보고서

- 작성일: 2026-07-19
- 대상 브랜치: `design/ria-mobile`
- 커밋 상태: 미커밋
- 기준 문서:
  - `RIA_July_LifeX_Design_Directive_v1_2026-07-19.md`
  - `RIA_Design_Audit_2026-07-19.md`
  - Phase C Today/Home 디자인

## 1. 목표

모든 인증 화면에서 안정적으로 작동하는 모바일 AppShell과 명확하고 편안한 하단 내비게이션을 구축했다.

주요 목표는 다음과 같다.

- 360px 화면에서 기존 6개 항목의 과밀 문제 해결
- iPhone과 Android PWA 환경의 safe-area 지원
- 콘텐츠가 고정 BottomNav 뒤에 가려지는 문제 방지
- 입력 중 모바일 키보드와 BottomNav의 불필요한 간섭 완화
- 현재 경로를 시각적·의미적으로 명확하게 표시
- Projects와 Settings의 기존 URL 보존

## 2. 변경 전후 내비게이션

### 변경 전

```text
Home
Tasks
Projects
Inbox
Notes
설정
```

6개 항목을 `justify-around`로 배치해 360px 화면에서 밀도가 높았다.

### 변경 후

```text
Today  → /home
Tasks  → /tasks
Inbox  → /inbox
Notes  → /notes
More   → /more
```

5개 항목을 동일한 폭의 grid column으로 배치했다.

## 3. More 허브

새로운 `/more` 허브 페이지를 추가했다.

제공하는 링크:

```text
Projects → /projects
Settings → /settings
```

기존 URL은 삭제하거나 변경하지 않았다.

- `/projects`
- `/settings`

복잡한 팝업, custom modal, focus trap은 만들지 않았다.

로그아웃은 기존 AppShell의 `LogoutButton`을 그대로 유지하며 `/more`에 중복 구현하지 않았다.

## 4. AppShell 개선

### 하단 콘텐츠 공간

기존의 고정 `pb-20` 대신 AppShell과 BottomNav가 동일한 CSS custom property를 사용한다.

- 기본 BottomNav 공간
- `env(safe-area-inset-bottom)`

```css
:root {
  --app-bottom-nav-height: 5.5rem;
}

.app-shell-content {
  padding-bottom: calc(var(--app-bottom-nav-height) + env(safe-area-inset-bottom));
}

.app-bottom-nav {
  min-height: calc(var(--app-bottom-nav-height) + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
}

.app-bottom-nav-inner {
  min-height: var(--app-bottom-nav-height);
}
```

예약된 콘텐츠 공간과 BottomNav의 기본 높이가 함께 변경되므로 서로 어긋나는 위험을 줄였다. `rem` 기반 값이어서 사용자 기본 글꼴 크기 확대에도 함께 확장된다. iPhone standalone PWA 환경에서는 safe-area가 두 위치에 동일하게 더해진다.

### 상단 safe-area

AppShell header에 다음 규칙을 적용했다.

```css
.app-shell-header {
  padding-top: max(3rem, calc(env(safe-area-inset-top) + 1.5rem));
}
```

일반 브라우저의 기존 상단 여백을 유지하면서 iPhone notch 및 PWA standalone 상단 inset을 고려한다.

### 키보드 대응

`:has()`를 지원하는 터치 기기에서 input, textarea, select가 포커스를 받고 viewport 높이가 키보드로 인해 짧아진 경우에만 BottomNav를 화면 아래로 이동하고 pointer event를 비활성화한다.

```css
@supports selector(:has(*)) {
  @media (pointer: coarse) and (max-height: 32rem) {
    body:has(:is(input, textarea, select):focus) .app-bottom-nav {
      pointer-events: none;
      opacity: 0;
      transform: translateY(100%);
    }
  }
}
```

키보드가 닫혀 viewport 높이가 회복되면 input 포커스가 남아 있어도 BottomNav가 다시 나타난다. `:has()` 미지원 환경에서는 전체 규칙이 무시되어 기본 내비게이션이 계속 표시된다. Phase B의 reduced-motion 규칙이 transition 시간을 최소화할 수 있도록 기존 기반을 유지했다.

## 5. BottomNav 개선

### 5열 grid

BottomNav 내부를 `grid-cols-5`로 구성했다.

- 모든 항목이 같은 가용 폭을 사용
- `min-w-0`으로 grid item의 overflow 방지
- `break-words`, `overflow-wrap:anywhere`로 긴 레이블 대응
- 가로 스크롤을 유발하는 고정 item width 미사용

### 터치 영역

각 내비게이션 링크에 최소 높이 56px를 적용했다.

```text
min-h-14 = 56px
```

360px에서 nav 내부 가용 폭은 약 344px이며, 5열 각 항목은 약 65px의 폭을 갖는다. 따라서 최소 `44×44px` 터치 기준을 충족한다.

### 현재 경로 표시

활성 상태는 색상에만 의존하지 않는다.

- Primary Soft 배경
- Primary 텍스트
- 굵은 label
- icon의 Surface 배경
- `aria-current="page"`

### 접근 가능한 이름

- BottomNav: `aria-label="주요 내비게이션"`
- 각 링크: label 기반 `aria-label`
- icon: `aria-hidden="true"`
- 화면 읽기 프로그램은 텍스트 label을 링크 이름으로 인식

### 경로 판정

다음 경로는 More를 활성 상태로 표시한다.

- `/more`
- `/projects`
- `/settings`

중첩 경로도 안전하게 지원한다.

```text
/more/...
/projects/...
/settings/...
```

`/project`처럼 문자열 일부만 유사한 경로는 `/projects`로 잘못 판정하지 않는다.

## 6. 변경 파일 및 이유

### `src/components/layout/app-shell.tsx`

변경 이유:

- 고정 `pb-20` 제거
- safe-area 기반 하단 공간 적용
- PWA 상단 inset을 위한 header class 적용
- 기존 `max-w-lg`, `min-h-dvh` 구조 유지
- 기존 LogoutButton과 Voice CTA 유지

### `src/components/layout/bottom-nav.tsx`

변경 이유:

- 6개 항목을 5개 항목으로 정리
- Projects와 Settings를 More 아래로 이동
- 5열 grid 적용
- 활성 경로 판정 개선
- `aria-current`, 접근 가능한 label 추가
- 긴 레이블과 44px 터치 기준 대응

### `src/app/(app)/more/page.tsx`

변경 이유:

- Projects와 Settings의 기존 URL을 유지하면서 접근 가능한 단순 허브 제공
- custom modal 없이 Server Component 기반 정적 링크 사용
- Phase B 토큰과 Phase C Warm Structure 사용

### `src/app/globals.css`

변경 이유:

- AppShell 상단 및 하단 safe-area 규칙 추가
- 콘텐츠가 BottomNav 뒤에 가리지 않도록 하단 공간 계산
- 터치 환경에서 입력 포커스 시 BottomNav 회피
- Phase B focus-visible 및 reduced-motion 기반 유지

## 7. 기능 및 데이터 보존

다음 영역은 변경하지 않았다.

- 기존 모든 URL
- 각 화면 내부 기능
- Supabase 인증
- 이메일 로그인·가입
- Google OAuth feature flag
- Server Components
- Server Actions
- 데이터베이스
- migration
- RLS
- 실제 사용자 데이터
- API 계약
- Home query 및 화면 구조
- Tasks 내부 화면
- Inbox 내부 화면
- Notes 내부 화면
- Projects 내부 화면
- Settings 내부 화면
- Phase B 디자인 토큰
- Phase C Today/Home 구조
- `package.json`
- `package-lock.json`

mock data나 새로운 상태 관리 로직은 추가하지 않았다.

## 8. 검증 결과

### Git 및 코드

- `git diff --check`: 통과
- 허용된 후보 파일만 변경
- package 및 lockfile 변경 없음
- Supabase, 인증, Server Action 변경 없음

### TypeScript 및 production build

- TypeScript 검사: 통과
- `npm run build`: 성공
- 총 13개 route 생성 성공
- `/more` route 생성 확인
- 기존 경고 6개만 유지
- Phase D에서 추가된 오류 또는 경고 없음

### 비인증 접근

| 경로 | 결과 |
|---|---|
| `/home` | HTTP 307 → `/login` |
| `/tasks` | HTTP 307 → `/login` |
| `/more` | HTTP 307 → `/login` |

새 `/more` 페이지도 기존 인증 미들웨어의 보호를 정상적으로 받는다.

### 링크 경로

다음 경로를 정적으로 검토했다.

- Today → `/home`
- Tasks → `/tasks`
- Inbox → `/inbox`
- Notes → `/notes`
- More → `/more`
- Projects → `/projects`
- Settings → `/settings`

### 활성 상태 판정

다음 경로의 활성 결과를 확인했다.

| 경로 | 활성 항목 |
|---|---|
| `/home` | Today |
| `/tasks/123` | Tasks |
| `/inbox` | Inbox |
| `/notes/archive` | Notes |
| `/more` | More |
| `/projects` | More |
| `/settings/profile` | More |
| `/project` | More 비활성 |

### safe-area

빌드된 CSS에서 다음 값이 포함된 것을 확인했다.

- `env(safe-area-inset-top)`
- `env(safe-area-inset-bottom)`

### Focus-visible

내비게이션은 `<Link>`로 구현되어 Phase B의 전역 anchor `focus-visible` outline을 그대로 사용한다.

별도의 `outline-none` 또는 focus 제거 스타일은 추가하지 않았다.

## 9. 360×800 검토

인증된 세션이 없어 AppShell과 BottomNav가 렌더링된 실제 인증 화면을 브라우저에서 직접 캡처하지 못했다.

다음 정적 조건을 기준으로 검토했다.

- viewport 내부 nav width: 약 344px
- 5개 grid column: 각 약 65px
- 각 링크 최소 높이: 56px
- 링크 최소 너비 전역 기준: 44px
- label: `min-w-0`, `break-words`, `overflow-wrap:anywhere`
- content bottom padding: `var(--app-bottom-nav-height) + safe-area-inset-bottom`
- BottomNav minimum height: `var(--app-bottom-nav-height) + safe-area-inset-bottom`
- 기본 nav 높이보다 넓은 콘텐츠 보호 공간

현재 짧은 영문 label 기준으로 360px에서 가로 스크롤이나 콘텐츠 겹침을 만들 구조는 확인되지 않았다.

## 10. 200% 텍스트 및 긴 번역 위험

현재 label은 다음과 같이 짧다.

- Today
- Tasks
- Inbox
- Notes
- More

현재 label은 200% 텍스트 확대에서도 수용 가능한 길이다.

레이블을 자르거나 `nowrap`으로 강제하지 않았기 때문에 긴 문자열은 줄바꿈되고 가로 스크롤을 만들지 않는다.

다만 향후 독일어·러시아어의 매우 긴 nav 번역을 그대로 적용하면 여러 줄이 되어 BottomNav 높이가 증가할 수 있다. 국제화 단계에서는 다음 검증이 필요하다.

- 짧은 nav 전용 번역 사용
- 200% 텍스트 확대
- 360px 폭
- safe-area가 큰 iPhone standalone 모드
- nav의 실제 높이와 콘텐츠 하단 공간 재측정

## 11. 현재 Git 상태

Phase D 구현은 커밋하지 않았다.

```text
M  src/app/globals.css
M  src/components/layout/app-shell.tsx
M  src/components/layout/bottom-nav.tsx
?? src/app/(app)/more/page.tsx
```

이 보고서 파일은 사용자 요청에 따라 구현 검증 후 별도로 추가했다.

사용자가 diff와 결과를 검토하고 승인하기 전까지 Phase D 구현 및 보고서는 커밋하지 않는다.
