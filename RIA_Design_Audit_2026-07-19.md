# RIA 현재 상태 감사 보고서

- 작성일: 2026-07-19
- 대상 브랜치: `design/ria-mobile`
- 기준 문서: `RIA_July_LifeX_Design_Directive_v1_2026-07-19.md`
- 감사 원칙: 기존 기능·인증·데이터베이스·API·라우트 보존, 코드 및 패키지 미변경

## 요약

현재 저장소는 기능형 MVP 구조가 잘 보존된 Next.js/Supabase 앱이며 로컬 빌드도 성공한다. 다만 모바일 디자인에 들어가기 전에 해결하거나 보호해야 할 런타임·PWA·접근성 위험이 있다.

감사 과정에서는 코드·패키지·설정을 변경하지 않았으며, 감사 종료 시점의 작업 트리는 clean 상태였다.

## 1. 프레임워크와 패키지

- Next.js App Router
- React 19
- Tailwind CSS 4
- TypeScript strict mode
- Supabase Auth + Postgres + SSR
- Server Components, Server Actions
- Zustand 설치됨
- Vercel 배포 전제

실제 설치 버전:

| 패키지 | 선언 | 실제 설치 |
|---|---:|---:|
| Next.js | `^15.3.3` | `15.5.20` |
| React | `^19.1.0` | `19.2.7` |
| Tailwind CSS | `^4.1.8` | `4.3.2` |
| TypeScript | `^5.8.3` | `5.9.3` |
| Supabase JS | `^2.49.8` | `2.110.0` |
| Supabase SSR | `^0.6.1` | `0.6.1` |
| Zustand | `^5.0.5` | `5.0.14` |

로컬 런타임은 Node `24.18.0`, npm `11.16.0`이다. 범위 버전과 실제 설치 버전 차이가 커서, 향후 패키지를 다시 설치할 때 동작이 달라지지 않도록 주의해야 한다. 현재 감사에서는 lockfile을 변경하지 않았다.

참조:

- `package.json`
- `tsconfig.json`

## 2. 화면과 라우트

| URL | 화면 | 주요 기능 |
|---|---|---|
| `/` | 랜딩 | 제품 소개, 영상, 로그인 진입 |
| `/login` | 인증 | 이메일 로그인·가입, Google OAuth |
| `/auth/callback` | OAuth 콜백 | Supabase 세션 교환 |
| `/home` | Today/Home | 인사, 리듬, North Star, Top 3, 오늘 일정, RIA 제안 |
| `/tasks` | Tasks | 생성, 완료, 보관, 삭제, Top 3, 우선순위·프로젝트 변경 |
| `/projects` | Projects | 프로젝트 생성·삭제, Task 수 표시 |
| `/inbox` | Inbox | 빠른 기록, Task 전환, 삭제 |
| `/notes` | Notes | 생성, 수정, 삭제 |
| `/settings` | Settings | 존댓말/반말 변경 |

현재 별도 라우트가 없는 영역:

- Schedule 전용 화면
- Energy/Condition
- Evening Close
- Discoveries

`discoveries`, `evening_reviews` 테이블 타입과 스키마는 있지만 화면·쿼리가 연결되지 않았다.

## 3. 기능과 데이터 흐름

핵심 흐름은 다음과 같다.

```text
Server Page
→ Supabase SSR query
→ auth.getUser()
→ 사용자별 실제 데이터 조회
→ Client Component
→ Server Action
→ Supabase mutation
→ revalidatePath()
```

인증은 세 겹으로 보호된다.

- 브라우저 로그인: `src/components/auth/login-form.tsx`
- 세션 갱신·라우트 보호: `src/lib/supabase/middleware.ts`
- DB 사용자 격리: `supabase/migrations/001_initial_schema.sql`의 RLS 정책

실제 데이터 흐름은 유지되고 있으며 mock data로 대체된 핵심 화면은 없다. 다만 다음은 실제 데이터와 연결되지 않은 표현이다.

- `TodayRhythmCard`는 기본값이 항상 `Calm`
- Voice CTA는 음성 인식 없이 3초 타이머만 실행
- 랜딩의 Today Preview는 마케팅용 정적 예시
- Zustand store는 현재 어떤 화면에서도 사용되지 않음

Home 데이터는 `users`, `north_stars`, `tasks`를 병렬 조회한다.

## 4. 모바일 위험

360×800에서 랜딩과 로그인을 실제 렌더링해 확인했다.

확인된 문제:

- 랜딩 H1이 모바일에서도 `56px`, 3줄·210px 높이로 첫 화면을 과점유한다.
- 하단 내비게이션에 6개 항목이 있어 360px에서 밀도가 지나치게 높다.
- 고정 하단 내비게이션에 `safe-area-inset-bottom` 처리가 없다.
- 콘텐츠 하단 여백이 고정 `pb-20`이라 iPhone PWA 모드에서 겹칠 수 있다.
- Task 완료 버튼은 `20×20px`로 44px 터치 기준 미달이다.
- 다수의 수정·삭제·취소 링크가 13px 텍스트만으로 구성된다.
- Task 생성 폼의 두 `<select>`가 한 줄에 배치되어 긴 번역과 좁은 화면에서 압축된다.
- 키보드가 열린 경우 고정 요소와 폼 액션을 보호하는 처리가 없다.
- 랜딩 영상 5.37MiB는 모바일 초기 로딩 비용이 크다.
- 랜딩·로그인·Voice CTA의 `<img>`에 Next.js 성능 경고가 발생한다.
- 인증된 화면은 계정 없이 시각 실행하지 않았으며, 해당 화면의 판단은 소스 구조를 기준으로 했다.

긍정적인 점:

- 공개 화면에서 가로 스크롤은 재현되지 않았다.
- 로그인 입력과 주요 버튼은 약 48–50px로 양호하다.
- 입력 글꼴이 16px여서 iOS 자동 확대 위험은 낮다.
- `max-w-lg`로 앱 폭을 제한하고 있어 모바일 기반 자체는 명확하다.

## 5. 디자인 시스템과 재사용 요소

현재 전역 토큰은 `src/app/globals.css`에 있다.

- `warm-white`
- `card-white`
- `soft-black`
- `stone`
- `gold`
- `divider`
- `font-sans`
- `font-display`

재사용 가능한 구성요소:

- `AppShell`, `BottomNav`
- `NorthStarSection`
- `Top3Section`
- `ScheduleSection`
- `RiaMessage`
- `TaskItem`
- 각 도메인의 Create Form/List
- Supabase browser/server client
- `cn()` 클래스 병합 유틸리티

한계:

- 공통 Button, Input, Surface, Dialog, Sheet, Toast, 상태 컴포넌트가 없다.
- 동일한 Tailwind 클래스가 각 컴포넌트에 반복된다.
- `border-border`, `text-muted`는 정의되지 않은 토큰이다.
- Pretendard와 Fraunces는 이름만 선언되어 있고 폰트 파일이나 외부 로딩이 없다.
- 현재 금색 `#C9A661` 위 흰 글자는 주요 버튼의 명도 대비가 부족할 가능성이 높다.
- `outline-none` 뒤 명확한 `focus-visible` 스타일이 없다.

## 6. 하드코딩된 UI 문구

한국어가 직접 포함된 소스 파일은 35개다. 문구가 다음 위치에 분산되어 있다.

- 페이지 제목과 랜딩 카피
- Home 인사와 빈 상태
- 폼 placeholder와 버튼
- Server Action 오류 메시지
- 인증 오류 매핑
- 내비게이션 영문/한글 혼용
- 날짜·시간 locale

특히 문제되는 문구:

- 로그아웃: “다음에 또 봐, 오빠” — 일반 사용자 제품 문구로 재사용하기 어려움
- formal/casual 문구가 일부 컴포넌트에만 이중 작성됨
- Server Action 오류는 대부분 반말로 고정
- `Home`, `Tasks`, `Projects`, `Inbox`, `Notes`, `설정`이 혼용됨
- `Low`, `Med`, `High`, `Todo`, `Doing`, `Done`이 번역 체계 없이 고정됨

## 7. 6개 언어 국제화 준비 상태

현재 준비도는 낮다.

- `<html lang="ko">` 고정
- 날짜와 시간이 `ko-KR` 고정
- 저장용 날짜 일부는 `en-CA`, 시간대는 `Asia/Seoul` 고정
- locale 라우팅 없음
- 번역 dictionary 없음
- 메시지 키 체계 없음
- pluralization, 숫자·날짜 포맷 계층 없음
- 언어 설정 UI·사용자 locale 필드 없음
- 긴 번역 문자열 레이아웃 검증 없음

따라서 “6개 언어 번역” 전에 먼저 문구를 키 기반 dictionary로 추출하고, 라우트 구조를 바꾸지 않는 locale provider를 도입하는 편이 안전하다.

## 8. PWA 준비 상태

현재는 초기 준비만 되어 있다.

있는 것:

- responsive viewport
- `themeColor`
- `min-h-dvh`
- 앱 아이콘 후보 이미지

없는 것:

- `manifest.webmanifest`
- manifest metadata 연결
- 192×192 / 512×512 규격 연결
- Apple touch icon
- standalone 설정
- service worker
- offline/error 화면
- 캐시 정책
- install prompt
- safe-area 처리
- 업데이트 전략

추가 문제:

- `maximum-scale=1`은 사용자 확대를 막아 접근성상 제거 대상이다.
- `/manifest.webmanifest` 요청이 현재 미들웨어에서 `/login`으로 리다이렉트된다.
- 인증·API 응답을 오프라인 캐시에 넣지 않는 명시적 정책이 필요하다.

## 9. Bolt Preview Next.js 오류 재현

동일한 일반 컴파일 오류는 로컬에서 재현되지 않았다.

검증 결과:

- `npm run build`: 성공
- TypeScript 검사: 성공
- 12개 정적 페이지 생성: 성공
- 개발 서버 시작: 성공
- `/`, `/login`: HTTP 200
- 비인증 `/home`: 정상적으로 `/login` 307 리다이렉트
- 작업 트리: clean

빌드 경고는 6개였다.

- `<img>` 사용 3건
- 미사용 import 2건
- 미사용 변수 1건

대신 Bolt/Linux 배포에서 문제가 될 가능성이 높은 결함을 확인했다.

1. 코드는 `/RIA_20260709_VIDEO.MP4`를 요청하지만 실제 Git 파일은 `RIA_20260709_VIDEO.mp4`다. Windows에서는 통과하지만 Linux/Vercel에서는 대소문자 불일치로 404가 발생한다.
2. 미들웨어의 정적 자산 예외에 `mp4`가 없어, 비로그인 영상 요청이 `/login`으로 307 리다이렉트된다.
3. 실제 360px 브라우저 검사에서도 영상은 `readyState 0`, opacity 0으로 남고 포스터만 표시됐다.

따라서 Bolt 오류 로그가 별도로 없다면 “Next.js 자체 오류”보다는 랜딩 자산 경로·미들웨어 동작을 우선 의심해야 한다.

## 10. 변경 위험이 높은 파일

높은 순서대로 보면:

1. `src/lib/supabase/middleware.ts`  
   인증 경계와 공개 자산 요청을 동시에 제어한다.

2. `src/components/layout/app-shell.tsx`, `src/components/layout/bottom-nav.tsx`  
   모든 인증 화면의 모바일 레이아웃에 영향이 간다.

3. `src/app/(app)/home/page.tsx`, `src/lib/queries/home.ts`  
   Today 정보 구조와 실제 데이터 결합 지점이다.

4. `src/lib/actions/tasks.ts`, `src/lib/actions/north-star.ts`  
   `/home` 대신 `/`를 revalidate하고 있어 Home 갱신 누락 위험이 있다.

5. `src/app/globals.css`  
   토큰 변경 시 모든 화면에 영향이 간다.

6. `src/components/auth/login-form.tsx`, Supabase client/server, DB 타입과 migrations  
   디자인 단계에서는 로직을 건드리지 않아야 한다.

추가 기능 위험:

- `getHomeData()`가 모든 예외를 `null`로 바꿔 DB 장애도 로그인 만료처럼 처리한다.
- 여러 쿼리의 오류를 검사하지 않고 빈 배열로 표시한다.
- Inbox→Task 전환이 트랜잭션이 아니어서 Task 생성 후 Inbox 업데이트만 실패할 수 있다.
- 사용자 작업 오류가 UI에 표시되지 않는 컴포넌트가 많다.
- Home 일정 범위가 KST 날짜 문자열과 timezone 없는 timestamp를 조합해 경계 시각 오류 가능성이 있다.

## 11. LifeX 디자인 토큰 제안

아래는 확정안이 아닌 라이트 모드 출발 팔레트다.

| 역할 | 제안 | 의미 |
|---|---|---|
| Background | `#F7F4EE` | 따뜻한 여백 |
| Surface | `#FFFCF8` | 깨끗하지만 비임상적 |
| Surface muted | `#EFEAE1` | 조용한 구분 |
| Text primary | `#262923` | 순검정보다 부드러운 본문 |
| Text secondary | `#64685F` | 읽을 수 있는 보조색 |
| Primary | `#36576D` | 차분한 방향·주요 행동 |
| Primary soft | `#E6EDF1` | AI 제안·선택 배경 |
| Balance | `#5F7968` | 회복·에너지·균형 |
| Accent | `#B47732` | 중요한 순간의 온기 |
| Danger | `#A8544E` | 실제 삭제·위험에만 사용 |
| Border | `#DDD7CC` | 낮은 대비 구분선 |

타이포그래피:

```css
-apple-system, BlinkMacSystemFont, "Segoe UI",
"Noto Sans KR", "Apple SD Gothic Neo", sans-serif
```

외부 의존성 없이 시작하고, Pretendard를 사용할 경우 이후 self-host 여부를 별도 승인받는 편이 안전하다.

간격은 `4, 8, 12, 16, 24, 32, 40, 48, 64`, 반경은 control `10`, surface `16`, sheet `24`를 제안한다.

## 12. Today/Home 모바일 개선안

한 문장 콘셉트:

> 정돈된 따뜻함 속에서 오늘의 방향과 다음 한 걸음이 먼저 보이는 조용한 동반자.

제안 구조:

```text
[날짜 · 짧은 인사]                 [RIA]

오늘의 방향
[North Star — 가장 큰 의미 영역]

지금 가능한 한 걸음
[Top priority 1]
[Priority 2 · 3은 조용하게]

다음 일정
[시간] [일정명]
[나머지 일정 보기]

빠른 기록
[Inbox 한 줄 진입]

RIA의 제안
[조건이 있을 때만 한 문장]

[Today] [Tasks] [Inbox] [Notes] [More]
```

중요한 제약:

- 현재 Energy 데이터 모델이 없으므로 가짜 에너지 값을 표시하지 않는다.
- 항상 `Calm`인 `TodayRhythmCard`를 실제 사용자 상태처럼 강조하면 안 된다.
- 첫 단계에서는 현재 North Star, Top 3, schedule query와 mutation을 그대로 매핑한다.
- Projects와 Settings는 `More`로 이동하되 기존 URL은 보존한다.
- 모든 완료·수정·이동 기능은 현재 Server Action을 그대로 사용한다.

첫 승인 단계에서 예상되는 변경 파일:

- `src/app/globals.css`
- `src/app/(app)/home/page.tsx`
- `src/components/home/north-star-section.tsx`
- `src/components/home/top3-section.tsx`
- `src/components/home/schedule-section.tsx`
- `src/components/home/ria-message.tsx`

`AppShell`, `BottomNav`, 미들웨어, DB, 인증은 별도 작은 단계로 분리하는 것이 안전하다.

## 13. 권장 작업 순서

1. **기준선 고정**  
   기능 체크리스트, 360px 스크린샷, 인증·CRUD smoke test 정의

2. **배포 결함 분리 수정**  
   MP4 대소문자, 미들웨어 정적 자산 예외, 잘못된 revalidation 경로

3. **토큰 기반 만들기**  
   색상·타입·간격·반경·focus·touch target만 정리

4. **Today/Home 첫 화면**  
   데이터 흐름을 건드리지 않고 정보 위계와 모바일 배치 개선

5. **AppShell·내비게이션**  
   5개 이하 주요 항목, More, safe-area, 키보드 대응

6. **Tasks·Inbox**  
   다음 행동 강조, 44px 컨트롤, 빠른 기록 강화

7. **Projects·Notes·Settings**  
   공통 Surface/Form/Empty/Error 패턴 적용

8. **문구 및 6개 언어 기반**  
   하드코딩 문구 추출, locale formatter, 긴 문자열 검증

9. **PWA**  
   manifest, 아이콘, standalone, 안전한 캐시·업데이트 정책

10. **최종 검증**  
    Android Chrome, Samsung Internet, iPhone Safari, PWA standalone, reduced motion, 키보드·스크린리더

현재 상태에서는 **2번의 확인된 런타임 결함과 3번의 최소 토큰 기반을 먼저 분리한 뒤, Today/Home만 작업하는 방식**이 가장 안전하다. 사용자 승인 전에는 구현 변경을 진행하지 않는다.
