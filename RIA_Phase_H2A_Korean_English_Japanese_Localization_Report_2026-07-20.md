# RIA Phase H2A — Korean, English and Japanese Localization Report

- 작성일: 2026-07-20
- 브랜치: `design/ria-mobile`
- 상태: 구현 및 검증 완료, 미커밋
- 기준: Phase H1 localization foundation 및 Phase H2A directive

## 1. 활성 언어와 향후 언어

현재 UI에서 활성화된 언어는 다음 세 가지다.

- `ko`: 한국어, Intl locale `ko-KR`
- `en`: English, Intl locale `en`
- `ja`: 日本語, Intl locale `ja-JP`

향후 계획 언어 `es`, `fr`, `de`, `ru`는 설정에 별도로 기록되어 있지만 UI에는 노출하지 않는다. 국기 아이콘과 locale-prefixed route는 도입하지 않았다.

## 2. Locale cookie와 해석 정책

- cookie 이름: `ria_locale`
- 허용 값: `ko`, `en`, `ja`만 허용
- 유효 기간: 365일
- 속성: `HttpOnly`, `SameSite=Lax`, `path=/`, production에서 `Secure`
- 개인 데이터는 저장하지 않음
- 해석 우선순위: 유효한 cookie → 한국어 fallback
- cookie가 없거나 값이 잘못되면 `resolveLocale()`가 `ko`를 반환
- 브라우저 언어 자동 감지는 H2A에서 사용하지 않음

언어 변경은 독립된 `updateLocalePreference` Server Action에서만 cookie를 기록한다. 기존 Server Action 계약은 변경하지 않았다.

## 3. Settings 언어 선택기

Settings에 한국어, English, 日本語를 native label로 표시한다. 선택기는 `fieldset`/`legend` 구조, `aria-pressed`, 체크 표시, 현지화된 선택 상태 및 오류 문구를 사용한다. 각 선택지는 최소 44px 이상의 터치 영역을 확보한다.

선택 직후 optimistic state를 표시하고, 저장 성공 후 현재 route를 refresh한다. 실패하면 이전 locale로 rollback하고 현재 언어의 오류 메시지를 표시한다. 실제 새로고침 후에도 선택 언어가 유지되는 것을 세 언어에서 확인했다.

## 4. 언어별 톤 정책

- 한국어: 기존 RIA의 차분하고 따뜻한 동반자 어조 유지
- English formal: 공손하고 자연스러운 완전한 문장, 과도하게 사무적이지 않은 온기
- English casual: 따뜻하고 간결한 대화체, slang이나 의존적 표현 배제
- 日本語 formal: 자연스러운 です・ます조, 고객 응대식 과잉 존경어 배제
- 日本語 casual: 부드러운 보통체, 명령적·유아적·캐릭터식 표현 배제

RIA, Today, Tasks, Inbox, Notes, More, Projects, Settings 등 제품명은 문맥상 필요한 경우를 제외하고 유지했다.

## 5. 언어별 formal/casual 매핑

DB 저장 값은 기존 계약 그대로 `formal`과 `casual`이다.

| Locale | formal UI | casual UI |
|---|---|---|
| ko | 존댓말 | 편한 말투 |
| en | Respectful | Relaxed |
| ja | 丁寧な話し方 | 親しみのある話し方 |

한국어·영어·일본어 각각에서 두 옵션의 `aria-pressed`, 체크 표시, “선택됨/Selected/選択中” 상태와 Home 문구 변화를 확인했다.

## 6. 사전 완전성과 컴파일 타임 검증

- 한국어 `ko`가 전체 사전 구조의 canonical source다.
- `Dictionary`는 `WidenDictionary<typeof ko>`로 전체 shape를 파생한다.
- `en.ts`와 `ja.ts`는 각각 `as const satisfies Dictionary`를 사용한다.
- registry는 `satisfies Record<SupportedLocale, Dictionary>`를 사용한다.

따라서 향후 `SUPPORTED_LOCALES`에 언어를 추가하면서 사전을 등록하지 않거나, 필수 key·speech-style object·값 형식이 누락 또는 잘못되면 TypeScript 오류가 발생한다. `tsc --noEmit --incremental false`가 통과했다.

## 7. Server/Client locale 데이터 흐름

인증 app layout의 server boundary가 cookie에서 locale과 dictionary를 한 번 해석한다. Server Components는 cached request locale/dictionary를 사용하고, Client Components는 `LocaleProvider`가 제공하는 현재 locale과 선택된 dictionary만 소비한다.

Client Component에서 전체 locale registry를 직접 import하는 경로는 없다. Server Component를 localization만을 위해 Client Component로 전환하지 않았으며, cookie 기반 첫 응답과 hydration이 같은 locale을 사용한다. 개발 검증 중 locale 전환 flash, hydration 경고 또는 dictionary key 노출은 발견되지 않았다.

## 8. 날짜와 시간 현지화

중앙 `INTL_LOCALES` mapping과 `Intl.DateTimeFormat`을 사용해 Home 날짜·요일과 일정 시간을 표시한다. 기존 timezone과 원본 날짜 값은 변경하지 않았다.

- ko 예: `2026년 7월 20일 월요일`, `오전 7:30`
- en 예: `Monday, July 20, 2026`, `7:30 AM`
- ja 예: `2026年7月20日月曜日`, `午前7:30`

수작업 월·요일 배열이나 relative-time은 추가하지 않았다.

## 9. Named variable과 count message

인사·로그아웃 등 문장은 `{name}` 같은 named variable을 포함한 완전한 문장으로 사전에 저장한다. 번역된 prefix/suffix와 사용자 데이터를 임의로 이어 붙이지 않는다.

count 문구는 `{ one, other }` 구조와 `formatCountMessage`를 사용한다. 현재 한국어도 동일한 typed 구조를 사용해 향후 복수형 규칙 확대 시 key shape가 흔들리지 않게 했다.

## 10. 접근성 현지화

다음 항목을 현재 locale로 제공한다.

- navigation과 주요 region의 accessible name
- 생성·수정·완료·보관·삭제 버튼 이름
- 입력 label과 placeholder
- 선택됨, loading, success, error 상태
- Project 및 Task count의 접근 가능한 표현

선택 상태는 색상만으로 전달하지 않으며 체크와 `aria-pressed`를 함께 사용한다. 360·412·768·1280px 검증에서 표시된 button/link/form control 중 44px 미만 주요 터치 대상은 발견되지 않았다.

## 11. 변경 파일과 이유

### Locale 기반

- `src/locales/config.ts`: 활성/계획 locale, metadata, cookie 상수, fallback
- `src/locales/types.ts`: typed message 및 count formatter
- `src/locales/schema.ts`: canonical dictionary 기반 `Dictionary` shape
- `src/locales/ko.ts`: 완전한 한국어 canonical dictionary
- `src/locales/en.ts`: 완전한 영어 dictionary
- `src/locales/ja.ts`: 완전한 일본어 dictionary
- `src/locales/index.ts`: typed registry와 locale exports
- `src/lib/locale.ts`: server-only cookie locale/dictionary resolution
- `src/lib/formatting.ts`: locale-aware server date/time formatting
- `src/lib/actions/locale.ts`: 독립된 locale preference cookie action
- `src/lib/utils.ts`: client utility에서 dictionary registry 의존 제거

### Provider, shell, navigation, Settings

- `src/components/providers/locale-provider.tsx`: 선택된 dictionary의 client context
- `src/components/settings/language-selector.tsx`: Settings 언어 선택 UI
- `src/components/settings/speech-style-toggle.tsx`: 현재 dictionary로 말투 UI 표시
- `src/components/layout/app-shell.tsx`: locale provider 및 speech-style shell copy
- `src/components/layout/bottom-nav.tsx`: 현지화된 navigation accessibility copy
- `src/app/(app)/layout.tsx`: locale/dictionary server resolution과 AppShell 전달
- `src/app/(app)/settings/page.tsx`: 언어 선택 섹션과 현지화된 Settings copy

### 인증 화면 Server pages

- `src/app/(app)/home/page.tsx`
- `src/app/(app)/tasks/page.tsx`
- `src/app/(app)/inbox/page.tsx`
- `src/app/(app)/notes/page.tsx`
- `src/app/(app)/projects/page.tsx`
- `src/app/(app)/more/page.tsx`

각 page는 request locale의 dictionary를 사용하며 기존 query와 route 구조는 유지한다.

### Home 표시 컴포넌트

- `src/components/home/logout-button.tsx`
- `src/components/home/north-star-section.tsx`
- `src/components/home/ria-message.tsx`
- `src/components/home/schedule-section.tsx`
- `src/components/home/today-rhythm-card.tsx`
- `src/components/home/top3-section.tsx`
- `src/components/home/voice-cta.tsx`

### Tasks, Inbox, Notes, Projects 표시 컴포넌트

- `src/components/tasks/create-task-form.tsx`
- `src/components/tasks/task-item.tsx`
- `src/components/tasks/task-list.tsx`
- `src/components/inbox/create-inbox-form.tsx`
- `src/components/inbox/inbox-list.tsx`
- `src/components/notes/create-note-form.tsx`
- `src/components/notes/note-list.tsx`
- `src/components/projects/create-project-form.tsx`
- `src/components/projects/project-list.tsx`

위 컴포넌트는 dictionary copy를 소비하도록 변경했으며 기존 action 인자, mutation 흐름, 사용자 데이터는 변경하지 않았다.

## 12. 대표 번역

| 의미 | ko | en | ja |
|---|---|---|---|
| Home formal | 오후 리듬을 같이 볼까요, {name} | Good afternoon, {name}. Shall we take a moment to see how your afternoon is flowing? | 午後のリズムを一緒に見てみましょうか、{name}。 |
| Home casual | 좋은 오후야, {name} | Good afternoon, {name}. | こんにちは、{name}。 |
| 빠른 기록 | 빠른 기록 | Quick capture | クイックメモ |
| Project 없음 | Project 없음 | No Project | Project未設定 |
| 선택 상태 | 선택됨 | Selected | 選択中 |

사용자가 저장한 literal nickname `오빠`는 사용자 데이터이므로 영어·일본어 화면에서도 번역하지 않고 그대로 보존한다.

## 13. Client bundle 영향 검토

전체 세 언어 registry를 Client Component에서 직접 import하지 않는다. Server layout이 선택된 dictionary 하나를 provider에 전달하므로, 세 개의 완전한 dictionary가 모든 client chunk에 함께 포함되는 구조를 피했다.

production build 결과:

- shared First Load JS: `102 kB`
- `/home`: `117 kB`
- `/tasks`: `115 kB`
- `/settings`: `105 kB`
- `/inbox`: `104 kB`
- `/notes`: `105 kB`
- `/projects`: `105 kB`
- `/more`: `106 kB`

선택된 dictionary의 RSC payload 비용은 남지만, 모든 locale dictionary를 client bundle에 중복 포함시키는 구조는 아니다.

## 14. 반응형 검증 결과

한국어·영어·일본어 각각에서 `/home`, `/tasks`, `/inbox`, `/notes`, `/projects`, `/more`, `/settings`를 확인했다.

| Width | ko | en | ja |
|---|---|---|---|
| 360×800 | 가로 overflow 없음 | 가로 overflow 없음 | 가로 overflow 없음 |
| 412×800 | 가로 overflow 없음 | 가로 overflow 없음 | 가로 overflow 없음 |
| 768px | 가로 overflow 없음 | 가로 overflow 없음 | 가로 overflow 없음 |
| 1280px | 가로 overflow 없음 | 가로 overflow 없음 | 가로 overflow 없음 |

영어 Settings 설명, 일본어 줄바꿈, BottomNav label, 말투 선택 label을 포함해 clipped text나 44px 미만 주요 control은 발견되지 않았다. 기존 BottomNav safe-area 구조는 변경하지 않았다.

## 15. 여섯 조합 수동 검증

| 조합 | Settings 선택 상태 | Home 말투 | refresh 유지 |
|---|---|---|---|
| ko + formal | 통과 | 통과 | 통과 |
| ko + casual | 통과 | 통과 | 통과 |
| en + formal | 통과 | 통과 | 통과 |
| en + casual | 통과 | 통과 | 통과 |
| ja + formal | 통과 | 통과 | 통과 |
| ja + casual | 통과 | 통과 | 통과 |

각 조합에서 AppShell과 Settings를 확인했고, 세 언어별 인증 화면 전체 route를 확인했다. 언어 변경은 speech style을 바꾸지 않았고, speech-style 변경은 locale을 바꾸지 않았다. 최종 테스트 상태는 한국어 + formal로 복구했다.

## 16. CRUD 회귀 결과

H2A 식별자를 포함한 실제 테스트 Project, Task, Inbox item, Note를 생성했다. 해당 데이터가 존재하는 상태에서 ko → ja → en → ko로 전환하며 원문 `한국어/日本語/English` 혼합 문자열이 변경되지 않는 것을 Tasks, Inbox, Notes, Projects 화면에서 확인했다.

- 생성 및 삭제 action의 실제 UI 경로: 통과
- 언어 전환 중 사용자 데이터 원문 보존: 통과
- 기존 Task completion/priority/archive, Inbox→Task, Note edit/cancel, Project 연결 해제 action wiring: 함수 인자와 기존 Server Action 연결을 정적으로 재검토했으며 변경 없음
- 테스트 데이터 cleanup: Task, Inbox item, Note, Project 모두 삭제 후 H2A 식별자 0건 확인

DB schema, query, RLS 또는 기존 mutation 계약은 변경하지 않았다.

## 17. 한국어로 남는 server error

기존 Server Action의 error return contract는 변경하지 않았다. 따라서 기존 action이 한국어 message string을 직접 반환하는 실패 경로에서는 영어·일본어 UI에서도 해당 한국어 오류가 표시될 수 있다.

Locale 저장 자체의 UI-owned 오류는 세 언어로 번역했다. 서버 오류 code 체계로의 전환은 별도 단계로 남긴다.

## 18. 알려진 제한

- 사용자 profile에 저장된 literal nickname `오빠`는 사용자 생성 데이터로 취급해 번역하지 않는다.
- 최상위 document의 정적 `<html lang="ko">`는 유지되며, 인증 AppShell subtree에 실제 선택 locale의 `lang`을 지정한다.
- browser-language 자동 감지와 onboarding locale 추천은 구현하지 않았다.
- 기존 한국어 server error string은 section 17의 제한을 가진다.
- 실제 iOS/Android 기기의 네이티브 키보드·PWA 조합은 별도 실기기 QA가 필요하다.

## 19. Phase H2B로 연기한 작업

- `es`, `fr`, `de`, `ru` 완전한 typed dictionary와 UI 활성화
- 각 언어 formal/casual linguistic QA
- 각 언어의 date/time, 복수형 및 긴 label responsive QA
- 신규 사용자 onboarding에서의 선택적 browser-language 제안
- 기존 Server Action error code 기반 localization
- root document language metadata를 locale별로 확장할지에 대한 별도 검토

## 20. 최종 검증과 커밋 상태

- `git diff --check`: 통과. Windows line-ending 안내만 있었고 whitespace error 없음
- `tsc --noEmit --incremental false`: 통과
- `npm run build`: 통과, exit code 0
- production build의 기존 lint warning 4건: `<img>` 3건, 기존 unused variable 1건
- invalid/missing locale runtime 확인: `ko`; valid `ja`: `ja`
- cookie 저장 후 세 언어 모두 browser refresh persistence: 통과
- language/speech-style 상호 독립성: 통과
- UTF-8 strict decode: 변경 대상 40개 파일 통과, replacement character 없음
- `package.json`, `package-lock.json`: 변경 없음
- route, DB, migration, RLS, 인증, 기존 query/action contract: 변경 없음
- 보고서 작성 시점에 commit 및 push를 수행하지 않음
