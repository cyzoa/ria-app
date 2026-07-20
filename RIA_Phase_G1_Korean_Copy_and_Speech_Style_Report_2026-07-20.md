# RIA Phase G1 — Korean Copy and Speech-Style Consistency Report

- 작성일: 2026-07-20
- 대상 브랜치: `design/ria-mobile`
- 상태: 구현 및 검증 완료, 미커밋
- 범위: 인증된 RIA 화면의 한국어 문구와 `formal`/`casual` 말투 일관성

## 1. 문구 감사 요약

인증 영역의 화면 제목, 설명, placeholder, 빈 상태, 상태 메시지, 오류 표시,
파괴적 동작, aria-label, screen-reader 문구를 분류했다.

| 분류 | 주요 예 | 처리 원칙 |
| --- | --- | --- |
| 고정 라벨 | Today, Tasks, Inbox, Notes, More, Projects, Settings | 영문 제품명과 대소문자 유지 |
| 조작 라벨 | 저장, 삭제, 수정, 취소, 보관 | 짧고 직접적인 고정 문구 유지 |
| 말투 분기 | 안내, 제안, 빈 상태, placeholder | `formal`과 `casual`을 명시적으로 분리 |
| 상태 | 저장 중, 저장 성공 | 현재 선택한 말투에 맞게 표시 |
| 오류 | Server Action이 반환하는 오류 | 계약을 보존하고 기존 오류를 그대로 표시 |
| 접근성 | 선택, 수정, 삭제, 음성 입력 | 실제 동작을 설명하는 이름 사용 |

주요 결함은 Home의 일부 섹션 설명이 항상 존댓말이었던 점, AppShell의
로그아웃 문구가 항상 반말이었던 점, Projects·Notes·Inbox·Settings의 안내가
항상 존댓말이었던 점, `프로젝트`와 `Project`가 혼용되던 점이었다.

## 2. 최종 용어 정책

다음 기능명은 영문과 정확한 대소문자를 유지한다.

- Today
- Tasks
- Inbox
- Notes
- More
- Projects
- Settings
- Project
- Task
- Note

라우트명, DB entity, 내부 상태 값은 변경하지 않았다. Settings의 사용자 노출
말투 이름은 다음으로 확정했다.

- `formal`: 존댓말
- `casual`: 편한 말투

저장값은 기존 `formal`, `casual`을 그대로 사용한다.

## 3. formal/casual 규칙

### 존댓말

- 문장 종결을 `-요`, `-세요`, `-까요` 계열로 일관되게 사용한다.
- 선택을 강요하지 않고 현재 상태와 다음 행동을 부드럽게 설명한다.
- 예: `오늘을 이끌 한 가지를 천천히 정해보세요.`

### 편한 말투

- 문장 종결을 자연스러운 반말로 사용한다.
- 존댓말 어미를 섞지 않는다.
- 예: `오늘을 이끌 한 가지를 천천히 정해봐.`

### 공통

- 저장, 삭제, 수정, 취소 같은 조작 라벨은 말투에 따라 바꾸지 않는다.
- Tasks와 More처럼 기존 query에서 말투를 제공하지 않는 화면 설명은
  `살펴보기`, `흐름 확인` 같은 중립형 표현을 사용했다.
- 생산성 평가, 실패 표현, 명령형 압박 문구를 추가하지 않았다.

## 4. 변경 파일

### Phase F 마감

- `next.config.ts`
  - 기존 설정을 보존하고 개발 표시기를 `top-right`로 이동
- `RIA_Phase_F_Projects_Notes_Settings_Mobile_Experience_Report_2026-07-20.md`
  - 실제 계정 수동 검증과 Next.js 표시기 결과 추가

### 공통 셸과 말투 전달

- `src/app/(app)/layout.tsx`
- `src/components/layout/app-shell.tsx`
- `src/components/home/logout-button.tsx`
- `src/components/home/voice-cta.tsx`
- `src/lib/utils.ts`

기존 `getHomeData()` 결과의 `speech_style`을 AppShell의 문구에 전달했다.
query 함수나 반환 계약은 변경하지 않았다.

### Home

- `src/app/(app)/home/page.tsx`
- `src/components/home/north-star-section.tsx`
- `src/components/home/top3-section.tsx`
- `src/components/home/schedule-section.tsx`
- `src/components/home/ria-message.tsx`

### Tasks와 More

- `src/app/(app)/tasks/page.tsx`
- `src/components/tasks/create-task-form.tsx`
- `src/components/tasks/task-list.tsx`
- `src/components/tasks/task-item.tsx`
- `src/app/(app)/more/page.tsx`

### Inbox

- `src/app/(app)/inbox/page.tsx`
- `src/components/inbox/create-inbox-form.tsx`
- `src/components/inbox/inbox-list.tsx`

### Notes

- `src/app/(app)/notes/page.tsx`
- `src/components/notes/create-note-form.tsx`
- `src/components/notes/note-list.tsx`

### Projects

- `src/app/(app)/projects/page.tsx`
- `src/components/projects/create-project-form.tsx`
- `src/components/projects/project-list.tsx`

### Settings

- `src/app/(app)/settings/page.tsx`
- `src/components/settings/speech-style-toggle.tsx`

## 5. 대표 변경 전후

| 위치 | 변경 전 | 변경 후 |
| --- | --- | --- |
| AppShell formal | 다음에 또 봐, 오빠 | 다음에 또 봬요, 오빠 |
| Home casual 방향 | 오늘을 이끌 한 가지를 천천히 정해보세요. | 오늘을 이끌 한 가지를 천천히 정해봐. |
| Home casual 일정 | 시간의 흐름을 한 번만 가볍게 살펴봐요. | 시간의 흐름을 한 번만 가볍게 살펴봐. |
| Home formal 인사 | 좋은 아침이에요., 오빠 | 좋은 아침이에요, 오빠 |
| Inbox casual | 판단은 나중에 해도 괜찮아요. | 판단은 나중에 해도 괜찮아. |
| Notes casual | 생각을 남겨두세요. | 생각을 남겨둬. |
| Settings label | 반말 | 편한 말투 |
| Task Project 없음 | 프로젝트 없음 | Project 없음 |

## 6. 접근성 문구 변경

- 말투 버튼: `존댓말 말투 선택됨`, `편한 말투 선택됨`
- Note: `Note 수정`, `Note 수정 내용 저장`, `Note 수정 취소`, `Note 삭제`
- Inbox: `Inbox 항목을 Task로 옮기기`, `Inbox 항목 삭제`
- Task: 제목을 포함한 Top 3, 보관, 삭제 동작 이름
- Project: 기존 Project 이름을 포함한 삭제 이름 유지
- 음성 버튼: `RIA 음성 입력 열기`, `RIA 음성 입력 듣는 중`

색상에만 의존하지 않는 `aria-pressed`, 체크 표시, `선택됨` 문구는 유지했다.

## 7. 검증 결과

### 정적 검사

- `git diff --check`: 통과
- `tsc --noEmit --incremental false`: 통과
- `npm run build`: 성공
- `package.json`, `package-lock.json`: 변경 없음
- Action, query, Supabase, migration, RLS diff: 없음
- route URL 추가·삭제·이름 변경: 없음
- strict UTF-8 decode: 통과
- replacement character 및 확인 대상 mojibake: 없음

build에는 기존 범위의 경고만 남았다.

- `<img>` 관련 경고 3건
- `src/lib/date.ts`의 미사용 변수 경고 1건

### 말투 저장과 화면 반영

- formal에서 casual 저장 성공
- 저장 중 즉시 `aria-pressed`, 체크, `선택됨` 반영
- 새로고침 후 casual 유지
- Home, Inbox, Notes, Projects, Settings와 AppShell 문구에 casual 반영
- casual에서 formal 복원 성공
- 새로고침 후 formal 유지
- 검증 종료 시 원래 상태인 formal로 복원

### 모바일 폭

인증된 7개 화면을 360×800과 412×800에서 확인했다.

- `/home`
- `/tasks`
- `/inbox`
- `/notes`
- `/projects`
- `/more`
- `/settings`

모든 화면에서 `documentElement.scrollWidth ≤ window.innerWidth`였고 가로 overflow가
없었다. BottomNav 레이블과 주요 터치 영역도 그대로 유지됐다.

### CRUD 회귀

실제 계정에서 검증용 데이터만 사용했다.

- Note: 생성 → 수정 → 삭제 성공
- Task: 생성 → 우선순위 변경 → 완료 → 삭제 성공
- 검증용 Note와 Task는 모두 삭제해 잔여 데이터가 없다.
- 기존 Project 삭제 후 연결 Task가 유지되고 `Project 없음`으로 표시되는 수동
  검증 결과를 Phase F 보고서에 반영했다.

## 8. 남아 있는 문구 항목

- Server Action이 반환하는 오류 문구는 Action 변경 금지 조건에 따라 그대로
  사용한다. 따라서 casual 모드의 실패 상황에서 일부 존댓말 오류가 표시될 수 있다.
- `today-rhythm-card.tsx`는 현재 렌더링 경로에서 사용되지 않는다. 기능이 다시
  연결될 때 실제 상태 데이터와 함께 말투 분기가 필요하다.
- 실제 모바일 기기의 가상 키보드 동작은 아직 검증하지 못했다.

## 9. 6개 언어 현지화로 이관할 항목

- 문구 dictionary와 locale fallback 구조
- 언어별 문장 길이와 BottomNav 축약 정책
- 조사 결합이 필요한 Project, Task, Note 문장
- 날짜·시간 locale 정책
- aria-label과 status/error 문구 번역
- formal/casual과 언어별 존대 체계의 매핑

이번 단계에서는 i18n framework, 번역 패키지, locale route를 추가하지 않았다.

## 10. 최종 범위 확인

- 화면 레이아웃 재설계 없음
- 새 기능 없음
- DB schema, migration, RLS 변경 없음
- Server Action 및 query 계약 변경 없음
- 인증과 Google OAuth 변경 없음
- package 및 환경변수 변경 없음
- 기존 URL 변경 없음
- mock data 추가 없음
- 커밋하지 않음
