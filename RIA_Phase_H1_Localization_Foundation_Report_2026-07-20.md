# RIA Phase H1 — Localization Foundation 보고서

- 작성일: 2026-07-20
- 브랜치: `design/ria-mobile`
- 기본 언어: 한국어 (`ko`)
- 상태: 구현 및 검증 완료, 커밋하지 않음

## 1. 기존 문자열 구조 감사

인증 화면의 사용자 문구는 Server Component 페이지, Client Component 내부 상수, JSX의 `aria-label`·placeholder·상태 문구에 분산되어 있었다. Home, Inbox, Notes, Projects, Settings는 각 컴포넌트에서 `formal/casual` 객체나 삼항 연산자를 별도로 관리했고, Tasks·BottomNav·More는 고정 문구를 JSX에 직접 포함했다.

날짜는 `src/lib/utils.ts`, 일정 시간은 `schedule-section.tsx`, 개수와 동적 접근성 문구는 문자열 보간으로 각각 처리되고 있었다. Server Action 오류는 Action이 반환한 한국어 문자열을 컴포넌트가 그대로 표시하는 계약이었다. 사용자 프로필에는 `speech_style`은 있으나 locale 필드는 없다.

## 2. 선택한 localization 구조

대형 프레임워크를 설치하지 않고 `src/locales`에 정적·타입 안전 기반을 만들었다.

```text
src/locales/
├── config.ts   # 기본/지원 locale, Intl locale, 검증·fallback
├── types.ts    # speech-style copy, named-variable formatter, dictionary type widening
├── ko.ts       # 완성된 한국어 의미 기반 사전
└── index.ts    # dictionary registry와 공개 API
```

현재 사전은 `common`, `navigation`, `appShell`, `home`, `tasks`, `inbox`, `notes`, `projects`, `more`, `settings`, `accessibility`로 구분했다. 키는 현재 문장 형태가 아니라 `home.direction.description`, `tasks.item.deleteLabel`처럼 의미를 나타낸다.

## 3. Locale 타입과 fallback 정책

- `DEFAULT_LOCALE`: `ko`
- `SUPPORTED_LOCALES`: 현재는 명시적으로 `ko`만 포함
- `SupportedLocale`: 중앙 배열에서 추론되는 union type
- `isSupportedLocale()`: 외부 문자열 검증
- `resolveLocale()`: 유효하지 않거나 비어 있는 값은 `ko`로 fallback
- `getDictionary()`: 지원 locale 사전을 반환하며 레지스트리 누락 시에도 한국어 fallback
- `getDictionaryForPreference()`: 미래 사용자 설정 입력을 안전하게 해석하는 경계

최종 여섯 언어 목록은 H1에서 임의로 만들지 않았다. 현재 모든 사용자는 저장소·브라우저 언어와 무관하게 한국어를 사용한다.

## 4. 사전 구조

한국어 사전은 현재 인증 화면의 제목, 설명, 도움말, placeholder, empty state, pending/status, destructive action, 접근성 이름을 포함한다. 고정 제품 레이블은 한 번만 정의하고, 실제 문장이 달라지는 곳만 `formal`과 `casual`을 가진다.

동적 문장은 조각 연결 대신 named variable template을 사용한다.

```ts
deleteLabel: "{name} Project 삭제"
taskCount: "연결된 Task {count}개"
editLabel: "오늘의 방향 수정: {title}"
```

`formatMessage()`는 변수 이름을 기준으로 완성 문장을 치환하므로 미래 언어에서 문장 순서를 바꿀 수 있다.

## 5. Formal/Casual 통합

기존 DB 값 `formal`, `casual`과 `SpeechStyle` 타입은 그대로 유지했다. 다음과 같이 실제 어미가 달라지는 문구에만 speech-style variant를 두었다.

- Home 인사, 방향, Top 3, 일정, 빠른 기록, RIA 제안
- AppShell 로그아웃·음성 상태
- Inbox, Notes, Projects의 설명·placeholder·empty state
- Settings 설명, 선택 도움말, 저장 상태

Today, Tasks, Inbox, Notes, More, Projects, Settings 같은 제품 레이블과 공통 동작명은 중복하지 않았다. Settings의 optimistic update, 동기 mutation guard, 실패 rollback, `router.refresh()` 흐름은 변경하지 않았다.

## 6. Server/Client Component 데이터 흐름

사전은 브라우저 API, Context, 비동기 fetch 없이 읽을 수 있는 정적 TypeScript 모듈이다.

- Server Components: `getDictionary()`로 현재 한국어 slice를 직접 읽음
- Client Components: 같은 순수 모듈을 import하여 hydration 전후 동일한 값을 사용
- speech style: 기존처럼 Server query 결과를 필요한 Client Component prop으로 전달
- locale: selector와 저장 값이 없으므로 `DEFAULT_LOCALE`만 사용
- 인증 redirect, dynamic rendering, Server Action 연결은 유지

큰 dictionary 객체를 React prop으로 모든 컴포넌트에 전달하지 않았다. 현재 한국어 사전은 작은 정적 모듈이며 화면은 필요한 semantic group만 참조한다. 실제 추가 locale이 생기는 H2에서는 client bundle 측정을 다시 하고 group 단위 lazy loading 또는 필요한 slice 전달을 결정해야 한다.

## 7. 접근성 문자열 처리

다음을 사전으로 이동했다.

- BottomNav의 `aria-label`
- Home 방향 수정·완료 상태 이름
- Task 완료, Top 3, 보관, 삭제 동적 이름
- Inbox Task 전환·삭제 이름
- Note 수정·저장·취소·삭제 이름
- Project 이름을 포함한 삭제 이름
- Settings 말투 option, 선택/선택됨, legend
- 목록 개수의 screen-reader 이름
- RIA 제안과 음성 버튼 상태

동적 항목명은 `{title}`과 `{name}`을 사용해 그대로 보존한다. 장식 아이콘의 `aria-hidden` 처리와 기존 `aria-current`, `aria-pressed`, `role=status/alert`는 변경하지 않았다.

## 8. 오류 메시지 분류

1. UI 소유 문구
   - 버튼 label, pending 상태, empty state 등은 사전으로 이동했다.
2. Server 반환 문구
   - Action의 `result.error`는 기존 문자열을 그대로 표시한다.
   - Action 파일과 반환 계약은 변경하지 않았다.
3. 미래 error code
   - 다국어 오류가 필요해질 때 Action이 안정된 code와 개발자용 detail을 반환하고 UI가 code를 번역하는 방식이 적절하다.
   - 이는 API 계약 변경이므로 H1에서 구현하지 않았다.

## 9. 날짜·시간·숫자 formatting 경계

- `INTL_LOCALES.ko = "ko-KR"`를 중앙 locale 설정에 정의했다.
- `formatDate()`는 `SupportedLocale`을 받을 수 있지만 기본 한국어 출력은 그대로다.
- 일정 시간도 중앙 `INTL_LOCALES.ko`를 사용해 기존 한국어 오전/오후 표시를 보존한다.
- 개수는 `{count}` 완성 문장으로 사전에 정의했다.
- 한국어 조사, 구두점, 이름 뒤 쉼표는 현재 출력 그대로 유지했다.

H2에서는 날짜, 시간, 숫자 formatter를 locale-aware API로 확장하되 서버와 클라이언트의 timezone·render 결과가 동일하도록 해야 한다. 한국어 조사를 다른 언어의 문장 조각으로 재사용하지 않는다.

## 10. 변경 파일과 이유

기반 파일:

- `src/locales/config.ts`: locale 목록·기본값·Intl mapping·fallback
- `src/locales/types.ts`: speech copy와 named-variable formatter
- `src/locales/ko.ts`: 인증 화면의 완성 한국어 사전
- `src/locales/index.ts`: typed registry와 공개 API
- `src/lib/utils.ts`: 인사·날짜 formatting을 locale 경계에 연결

Server 화면:

- `src/app/(app)/home/page.tsx`
- `src/app/(app)/tasks/page.tsx`
- `src/app/(app)/inbox/page.tsx`
- `src/app/(app)/notes/page.tsx`
- `src/app/(app)/projects/page.tsx`
- `src/app/(app)/more/page.tsx`
- `src/app/(app)/settings/page.tsx`

각 페이지의 제목·설명·Home 조건부 문구를 semantic dictionary key로 교체했다.

Client/표시 컴포넌트:

- `src/components/layout/bottom-nav.tsx`
- `src/components/home/logout-button.tsx`
- `src/components/home/north-star-section.tsx`
- `src/components/home/top3-section.tsx`
- `src/components/home/schedule-section.tsx`
- `src/components/home/ria-message.tsx`
- `src/components/home/today-rhythm-card.tsx`
- `src/components/home/voice-cta.tsx`
- `src/components/tasks/create-task-form.tsx`
- `src/components/tasks/task-list.tsx`
- `src/components/tasks/task-item.tsx`
- `src/components/inbox/create-inbox-form.tsx`
- `src/components/inbox/inbox-list.tsx`
- `src/components/notes/create-note-form.tsx`
- `src/components/notes/note-list.tsx`
- `src/components/projects/create-project-form.tsx`
- `src/components/projects/project-list.tsx`
- `src/components/settings/speech-style-toggle.tsx`

이 파일들은 표시 문자열만 localization 구조에 연결했다. 이벤트 핸들러, form field name, Action 인자와 결과 처리는 보존했다.

## 11. 대표 전후 코드

고정 문구:

```tsx
// 전
<h1>Tasks</h1>

// 후
const copy = getDictionary().tasks;
<h1>{copy.title}</h1>
```

말투 문구:

```tsx
// 전
speechStyle === "casual" ? "...골라봐." : "...선택하세요."

// 후
copy.description[speechStyle]
```

동적 접근성 문구:

```tsx
// 전
aria-label={`${project.name} Project 삭제`}

// 후
aria-label={formatMessage(copy.list.deleteLabel, { name: project.name })}
```

## 12. 검증 결과

- `git diff --check`: 통과(LF→CRLF 안내만 존재)
- `tsc --noEmit --incremental false`: 통과
- `npm.cmd run build`: 통과
- `package.json`, `package-lock.json`: 변경 없음
- 라우트 추가·삭제·이름 변경: 없음
- Action·query 계약 변경: 없음
- Supabase·schema·migration·RLS 변경: 없음
- 인증 변경: 없음
- strict UTF-8 검사: 통과
- replacement character 및 한글 mojibake 검색: 없음
- 인증 화면 직접 한글 문자열 재감사: 사전 밖에는 주석만 남음
- 제외 대상 Landing/Login/Auth 문구: 변경 없음
- 렌더링된 dictionary key: 없음
- hydration warning: 없음
- 신규 브라우저 console error/warning: 없음
- Next.js `devIndicators.position`: `top-right` 유지

빌드에는 기존 `<img>` 3건과 `src/lib/date.ts` 미사용 변수 1건의 lint warning이 남아 있다. H1에서 새로 만든 오류는 아니며 범위 밖이라 변경하지 않았다.

## 13. 기능 회귀 결과

- Home: 한국어 인사·방향·일정·빠른 기록·AppShell 렌더링 확인
- Task: 검증용 Task 생성·삭제 통과
- Inbox: 검증용 항목 생성 → Task 전환 → 전환 Task 삭제 통과
- Notes: 생성 → 편집 취소 → 편집 저장 → 삭제 통과
- Projects: 생성 → 삭제 통과
- Settings: formal → casual 즉시 선택 → 새로고침 유지 → Home 반영 → formal 복원 → 새로고침 유지 통과
- Navigation: Today, Tasks, Inbox, Notes, More 목적지와 현재 상태 유지
- 360×800 및 412×800: 7개 인증 화면 모두 가로 오버플로·dictionary key 노출·BottomNav 가림 없음
- 검증용 Task, Inbox, Note, Project 데이터는 모두 제거했고 말투는 원래 `formal`로 복원했다.

North Star는 현재 계정 값이 비어 있고 삭제/원복 경로가 없어 테스트 데이터를 남기지 않도록 실제 저장 mutation은 수행하지 않았다. 기존 `saveNorthStar(title)` 연결과 Action 계약은 변경되지 않았음을 정적으로 확인했다. Task의 priority·completion·archive와 Project 삭제 후 orphan 처리도 관련 로직·Action·query를 변경하지 않았고 정적 연결을 확인했다.

## 14. 알려진 제한

- 실제 활성 locale은 한국어 하나뿐이다.
- 사용자 locale 저장소와 visible selector가 없다.
- Server Action 오류 문자열은 아직 서버의 한국어 반환값이다.
- 사전은 현재 동기 정적 module이며 여러 언어 추가 후 client chunk 크기를 다시 측정해야 한다.
- 날짜·시간은 locale 경계를 만들었지만 timezone과 복수형·상대시간의 완전한 국제화는 하지 않았다.
- 실기기 OS 글꼴 확대, IME, PWA standalone 조합은 별도 검증이 필요하다.

## 15. 최종 여섯 언어 세트 권고

H1에서는 언어 코드를 임의로 추가하지 않았다. 최종 세트는 다음 기준으로 제품 결정 후 `SUPPORTED_LOCALES` 한 곳에 명시하는 것이 안전하다.

- 실제 사용자·운영 우선순위와 번역 유지보수 책임자
- BCP 47에 맞는 안정된 locale code
- 언어만으로 부족한 지역 변형 여부
- 존댓말/편한 말투가 해당 언어에서 의미 있는지와 대체 tone model
- 날짜·시간·숫자·이름 순서·문장 방향 요구
- 전문 번역 및 언어별 QA 완료 여부

한국어는 계속 default이자 완전한 fallback 사전으로 유지해야 한다. 미완성 사전은 `SUPPORTED_LOCALES`에 등록하지 않는 것을 권장한다.

## 16. H2 번역 구현으로 보류한 항목

- 승인된 다섯 추가 locale과 전문 번역 사전
- 언어 선택 UI
- locale preference 저장 및 동기화
- 권장 저장 우선순위: 인증 사용자 profile 설정 → 서버에서 읽을 수 있는 제한된 preference → 지원 locale 검증 → 한국어 fallback
- DB 저장이 필요할 경우 별도 schema/RLS 검토
- locale별 dictionary chunk loading과 bundle 최적화
- locale-aware 날짜·시간·숫자 formatter 완성
- 번역된 긴 label의 200% 확대·360px·RTL 필요 여부 검증
- error code 기반 Server Action 오류 localization 계약
- 언어 변경 직후 Server/Client hydration 및 cache invalidation 검증

브라우저 `localStorage`는 Server Component가 초기 render에서 읽을 수 없어 hydration mismatch 위험이 있으므로 H1에서 사용하지 않았다.

## 17. 커밋 여부

Phase H1 구현·검증·보고서 작성 후 **커밋하지 않았다**. 변경 사항은 사용자 검토 전 작업 트리에 남아 있다.
