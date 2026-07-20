# RIA Phase H2B — Spanish, French, German and Russian Localization Report

- 작성일: 2026-07-20
- 브랜치: `design/ria-mobile`
- 상태: 구현·검증 완료, 미커밋

## 1. 최종 7개 locale

| Locale | Native label | Intl locale |
|---|---|---|
| ko | 한국어 | ko-KR |
| en | English | en |
| ja | 日本語 | ja-JP |
| es | Español | es |
| fr | Français | fr |
| de | Deutsch | de |
| ru | Русский | ru |

한국어는 계속 기본값이자 invalid/missing locale의 fallback이다. 국기와 locale-prefixed route는 추가하지 않았다.

## 2. 추가 사전과 완전성 검증

`src/locales/es.ts`, `fr.ts`, `de.ts`, `ru.ts`를 완전한 object 사전으로 추가했다. 네 파일 모두 `as const satisfies Dictionary`를 직접 사용한다. registry는 `satisfies Record<SupportedLocale, Dictionary>`로 7개 locale 등록을 강제한다. optional section, `as any`, TODO, 한국어 placeholder는 없다.

## 3. Spanish 톤 정책

formal은 국제적으로 자연스러운 존중 표현과 필요한 경우 `usted/su`를 사용하며 관료적 표현을 피했다. casual은 `tú/tu` 계열을 일관되게 사용하며 지역 slang, `vos`, `vosotros`를 쓰지 않았다.

## 4. French 톤 정책

formal은 `vous/votre`를, casual은 `tu/ton`을 일관되게 사용한다. 과도한 고객 응대 표현과 slang을 피했다. 실제 렌더링에서 발견한 부자연스러운 `Prenons-nous`, `Commençons-nous` 형태는 `Prenons…`, `Souhaitez-vous…`로 교정했다.

## 5. German 톤 정책

formal은 `Sie/Ihnen/Ihr`를 올바르게 대문자로 사용하고, casual은 `du/dir/dein`을 사용한다. 긴 합성어와 접근성 label은 360px 줄바꿈을 전제로 유지했으며 행정적 표현을 피했다.

## 6. Russian 톤 정책

formal은 소문자 `вы` 계열의 존중 표현, casual은 `ты` 계열을 사용한다. 불필요한 성별 과거형과 관료적·의존적 표현을 피하고 Cyrillic 원문을 UTF-8로 유지한다.

## 7. formal/casual 표시 매핑

| Locale | formal | casual |
|---|---|---|
| ko | 존댓말 | 편한 말투 |
| en | Respectful | Relaxed |
| ja | 丁寧な話し方 | 親しみのある話し方 |
| es | Trato respetuoso | Trato cercano |
| fr | Ton respectueux | Ton familier |
| de | Respektvolle Ansprache | Vertraute Ansprache |
| ru | Уважительное обращение | Дружеское обращение |

저장 값은 기존 `formal`, `casual` 그대로다.

## 8. plural 처리 구조

`CountMessage`는 필수 `one`, `few`, `many`, `other`를 가진다. `formatCountMessage()`는 `Intl.PluralRules(locale)`의 category를 선택하고 named `{count}`를 치환한다. 모든 호출 지점이 현재 `LocaleProvider`의 locale을 넘기므로 Server/Client 결과가 일치한다.

러시아어 확인 결과: `1/21 → one`, `2/22 → few`, `0/5/25 → many`, `1.5 → other`.

## 9. count-bearing key

- `common.count`
- `accessibility.itemCount`
- `projects.list.taskCount`

ko/en/ja도 동일한 필수 4-category shape로 확장했으며 기존 표시 문구는 유지했다.

## 10. Settings locale selector

기존 selector가 `SUPPORTED_LOCALES`를 사용하므로 설정 확장만으로 7개 native label을 노출한다. `fieldset/legend`, `aria-pressed`, 체크 표시, localized selected/pending/success/error, keyboard control, 최소 44px touch target을 보존한다. 언어 변경과 말투 변경은 서로의 값을 수정하지 않는다.

## 11. 날짜와 시간 결과

같은 `2026-07-20 07:30 Asia/Seoul` 값을 중앙 Intl mapping으로 확인했다.

- es: `lunes, 20 de julio de 2026` / `07:30`
- fr: `lundi 20 juillet 2026` / `07:30`
- de: `Montag, 20. Juli 2026` / `07:30`
- ru: `понедельник, 20 июля 2026 г.` / `07:30`

원본 날짜, timezone, schedule 값과 relative-time 정책은 변경하지 않았다.

## 12. 접근성 현지화

navigation/region 이름, 입력 label, 상태, 선택 상태, pending, destructive action, 동적 Task/Project/Note 이름을 네 언어로 제공한다. product name과 사용자 데이터만 의도적으로 원문을 유지한다. 4개 viewport에서 주요 control 44px 기준과 색상 외 선택 표시를 확인했다.

## 13. Server/Client locale 데이터 흐름

H2A 구조를 유지했다. App layout server boundary가 cookie에서 locale과 선택 dictionary를 해석하고, Client Components는 `LocaleProvider`의 선택된 dictionary만 사용한다. leaf Client Component가 7개 전체 registry를 직접 import하지 않는다. hydration warning이나 한국어 flash는 관찰되지 않았다.

## 14. bundle 영향

production build의 shared First Load JS는 `102 kB`로 H2A와 동일하다. 주요 route는 `/home 118 kB`, `/tasks 115 kB`, `/settings 105 kB`, `/inbox 105 kB`, `/notes 105 kB`, `/projects 105 kB`, `/more 106 kB`다. 선택 dictionary의 RSC payload는 늘지만 7개 전체 사전이 leaf client bundle에 중복 포함되지는 않는다.

## 15. 변경 파일과 이유

### 신규

- `src/locales/es.ts`: 완전한 Spanish dictionary
- `src/locales/fr.ts`: 완전한 French dictionary
- `src/locales/de.ts`: 완전한 German dictionary
- `src/locales/ru.ts`: 완전한 Russian dictionary
- `RIA_Phase_H2B_Spanish_French_German_Russian_Localization_Report_2026-07-20.md`: 본 보고서

### 수정

- `src/locales/config.ts`: 7개 활성 locale과 native/Intl metadata
- `src/locales/index.ts`: 7개 typed registry
- `src/locales/types.ts`: Intl.PluralRules 기반 4-category count helper
- `src/locales/ko.ts`, `en.ts`, `ja.ts`: 기존 count key의 필수 few/many 보완
- `src/components/tasks/task-list.tsx`
- `src/components/inbox/inbox-list.tsx`
- `src/components/notes/note-list.tsx`
- `src/components/projects/project-list.tsx`

위 4개 component는 기존 count formatter에 현재 locale을 전달하는 최소 변경만 포함한다.

## 16. 대표 번역

| 의미 | es | fr | de | ru |
|---|---|---|---|---|
| 빠른 기록 | Captura rápida | Note rapide | Schnelle Notiz | Быстрая заметка |
| Project 미설정 | Project sin asignar | Project non défini | Kein Project festgelegt | Project не задан |
| 설정 저장 | Guardar | Enregistrer | Speichern | Сохранить |
| 언어 선택 | Elegir el idioma de RIA | Choisir la langue de RIA | RIAs Sprache wählen | Выбрать язык RIA |

## 17. 신규 locale responsive 결과

각 locale에서 `/home`, `/tasks`, `/inbox`, `/notes`, `/projects`, `/more`, `/settings`를 확인했다.

| Locale | 360×800 | 412×800 | 768px | 1280px |
|---|---|---|---|---|
| es | 통과 | 통과 | 통과 | 통과 |
| fr | 통과 | 통과 | 통과 | 통과 |
| de | 통과 | 통과 | 통과 | 통과 |
| ru | 통과 | 통과 | 통과 | 통과 |

가로 overflow, dictionary key 노출, 44px 미만 주요 control, BottomNav obstruction은 발견되지 않았다.

## 18. 8개 조합 테스트

| 조합 | 전체 7개 화면 | 말투 반영 | locale refresh 유지 |
|---|---|---|---|
| es + formal | 통과 | 통과 | 통과 |
| es + casual | 통과 | 통과 | 통과 |
| fr + formal | 통과 | 통과 | 통과 |
| fr + casual | 통과 | 통과 | 통과 |
| de + formal | 통과 | 통과 | 통과 |
| de + casual | 통과 | 통과 | 통과 |
| ru + formal | 통과 | 통과 | 통과 |
| ru + casual | 통과 | 통과 | 통과 |

## 19. ko/en/ja 회귀

- ko + formal: 7개 화면 통과
- en + casual: 7개 화면 통과
- ja + formal: 7개 화면 통과
- 기존 H2A copy, route, locale persistence 유지
- 최종 사용자 preference를 ko + formal로 복구

## 20. CRUD 회귀

실제 사용자별 Supabase 흐름으로 다음을 확인했다.

- Project 생성
- 높은 우선순위와 Project가 지정된 Task 생성
- Task 완료 및 다시 미완료 처리
- 연결 Project 삭제 후 Task 유지 및 `Project 없음` 표시
- Task 삭제
- Inbox item 생성, Task 전환, 전환된 Task 삭제
- Note 생성, 수정 취소, 수정 저장, 삭제
- 혼합 문자열 Note를 es/fr/de/ru에서 그대로 표시
- 모든 H2B 테스트 데이터 cleanup 완료

archive와 직접 Inbox 삭제의 action 연결은 정적으로 유지됨을 확인했다. 테스트 데이터 cleanup을 보장하기 위해 숨겨지는 archive mutation은 실행하지 않았다.

## 21. invalid cookie fallback

`resolveLocale("")`, `resolveLocale("xx")`, `resolveLocale(undefined)`가 모두 `ko`를 반환했다. locale action은 `isSupportedLocale()`를 통과한 값만 cookie에 기록한다. cookie 이름, max-age, SameSite, Secure, path, 우선순위는 변경하지 않았다.

## 22. 한국어 server error 제한

기존 Server Action 계약은 변경하지 않았으므로 create/update/delete action이 한국어 message를 직접 반환하는 실패 경로는 다른 locale에서도 한국어로 보일 수 있다. locale selector처럼 UI 소유 error는 7개 언어로 현지화했다. 향후 error-code migration이 필요하다.

## 23. 알려진 번역·문법 위험

- 사용자 profile의 literal nickname `오빠`는 사용자 데이터라 번역하지 않는다.
- product feature 이름은 의도적으로 영어를 유지한다.
- 전문 원어민의 최종 linguistic QA는 별도 권장 사항이다.
- 러시아어 fractional count의 `other` 표현은 실제 제품에서 소수 count를 사용하지 않지만 문법 fallback을 제공한다.

## 24. 남은 실기기 이슈

- iOS Safari/PWA의 실제 키보드와 safe-area
- Android Chrome의 긴 Cyrillic/독일어 label 확대
- Voice CTA의 실제 microphone permission 흐름
- screen reader별 mixed product-name 발음

## 25. PWA·production readiness로 연기

- service worker와 offline locale resource 정책
- manifest locale/name 확장
- root document `lang`의 request locale 동적 처리 검토
- server error-code localization
- 전문 번역가/원어민 linguistic QA
- 실제 iOS/Android 및 200% text zoom QA

## 26. 최종 검증과 커밋 상태

- `git diff --check`: 통과, Windows line-ending 안내만 존재
- `tsc --noEmit --incremental false`: 통과
- `npm run build`: 통과, exit code 0
- strict UTF-8: 통과, replacement character/mojibake 없음
- browser console error/warning: 없음
- Next.js development indicator: 기존 `top-right` 설정 유지, config 무변경
- focus-visible, reduced-motion, BottomNav safe-area: 기존 전역 기반 유지
- package.json/package-lock.json: 변경 없음
- route, DB, migration, RLS, auth, 기존 Action/query contract: 변경 없음
- 기존 lint warning 4건만 유지
- commit/push: 수행하지 않음
