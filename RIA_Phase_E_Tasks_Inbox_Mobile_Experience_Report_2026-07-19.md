# RIA Phase E — Tasks & Inbox Mobile Experience Report

- 작성일: 2026-07-19
- 대상 브랜치: `design/ria-mobile`
- 작업 상태: 구현 및 검증 완료, 미커밋
- 작업 범위: Tasks 및 Inbox 모바일 경험

## 1. 작업 목표

Phase E의 목표는 기존 CRUD, Server Action, Supabase 데이터 흐름을 그대로 유지하면서 다음 경험을 만드는 것이었다.

- Tasks에서는 긴 목록에 압도되지 않고 지금 중요한 작업부터 빠르게 파악할 수 있게 한다.
- Inbox에서는 판단이나 분류를 요구하지 않고 생각과 할 일을 빠르게 내려놓을 수 있게 한다.
- Phase B의 LifeX 토큰, Phase C의 Warm Structure, Phase D의 AppShell과 BottomNav 기반을 유지한다.
- 360px 모바일 화면, 긴 문자열, 터치 접근성, 키보드 포커스를 지원한다.

## 2. 변경 전 구조

### Tasks

기존 구성은 다음과 같았다.

1. 단순한 `Tasks` 제목
2. Task 생성 버튼 또는 생성 폼
3. 상태 및 프로젝트 필터
4. 필터된 Task 단일 목록

기존 기능 연결은 다음과 같았다.

- `getTasksData()`를 통한 실제 사용자 Task 및 Project 조회
- Task 생성
- 완료 및 미완료 전환
- Top 3 설정 및 해제
- 우선순위 변경
- 프로젝트 변경
- 보관
- 삭제

확인된 UI 문제는 다음과 같았다.

- Top 3, 진행 중, 완료 항목이 하나의 목록에 섞여 정보 위계가 약했다.
- 완료 체크 영역이 약 20px로 작았다.
- Top 3, 보관, 삭제가 작은 13px 텍스트 링크에 의존했다.
- 생성 폼의 두 select가 360px에서 나란히 배치돼 압축될 가능성이 있었다.
- 긴 제목과 긴 프로젝트명에 대한 명시적인 overflow 대응이 부족했다.
- 일부 한국어 UI 문자열의 인코딩이 손상돼 있었다.
- mutation 실패 결과가 화면에 표시되지 않았다.

### Inbox

기존 구성은 다음과 같았다.

1. 단순한 `Inbox` 제목
2. 기록 입력 폼
3. 미전환 Inbox 항목 목록
4. Task 전환 및 삭제 동작

기존 기능 연결은 다음과 같았다.

- `getInboxData()`를 통한 실제 사용자 Inbox 및 Profile 조회
- Inbox 항목 생성
- Inbox 항목 삭제
- Inbox 항목을 Task로 전환
- speech style에 따른 빈 상태 문구

확인된 UI 문제는 다음과 같았다.

- Quick Capture의 의미적·시각적 우선순위가 충분하지 않았다.
- 제출 및 후속 동작이 작은 버튼이나 텍스트 링크에 의존했다.
- 기록 성공 후 입력 내용이 남을 가능성이 있었다.
- 긴 Inbox 내용의 안전한 줄바꿈 규칙이 부족했다.
- 일부 한국어 UI 문자열의 인코딩이 손상돼 있었다.
- mutation 실패 결과가 화면에 표시되지 않았다.

## 3. 구현한 모바일 정보 구조

### Tasks

다음 순서로 재구성했다.

1. 화면 제목과 짧은 안내
2. 전체 너비의 새 Task 생성 진입점
3. 지금 중요한 작업 — 진행 중인 Top 3
4. 나머지 진행 작업
5. 완료한 작업
6. 상태 및 프로젝트 보기 조정

Top 3, 진행 작업, 완료 작업은 기존 Task 데이터의 `is_top3`와 `status`만 사용해 분류한다. 새로운 상태나 데이터 모델은 추가하지 않았다.

필터는 기존 기능을 유지하되 핵심 작업 목록보다 시각적으로 뒤에 배치해 보조 기능으로 정리했다.

### Inbox

다음 순서로 재구성했다.

1. 화면 제목과 판단을 미루어도 된다는 짧은 안내
2. 강조된 Quick Capture 입력 영역
3. 기록된 생각 목록
4. 각 항목의 Task 전환 및 삭제 동작

가짜 분류, 음성 인식, 자동 추천은 추가하지 않았다.

## 4. Tasks 구현 내용

### 화면 헤더

- 국제화 체계 도입 전 불필요한 영문 혼용을 피하기 위해 영문 보조 레이블을 사용하지 않음
- Tasks 제목의 타이포그래피 위계 강화
- “지금 중요한 일부터 차분히 살펴보세요.” 안내 추가
- 360px 기준 좌우 여백을 `20px`로 조정하고 큰 화면에서는 기존 `24px` 여백 유지

### Task 생성 폼

- 생성 진입점을 최소 48px 높이의 전체 너비 버튼으로 변경
- 제목, 우선순위, 프로젝트, 예정 시간에 명시적인 label 연결
- 제목 input과 모든 select 및 datetime input을 최소 48px로 구성
- 우선순위와 프로젝트를 모바일에서는 세로 배치
- `sm` 이상에서만 2열 배치
- 기존 필드 이름과 값 유지
  - `title`
  - `priority`
  - `project_id`
  - `due_date`
- 기존 `createTask(formData)` 호출 유지
- 성공 시 기존처럼 폼을 닫음
- 실패 시 Server Action의 기존 오류 결과를 `role="alert"`로 표시
- 제출 pending 상태와 비활성 상태를 시각적으로 표시
- 동기식 ref guard로 pending 반영 전의 빠른 연속 제출과 Enter 중복 제출 차단

### Task 목록 정보 위계

기존 데이터를 다음과 같이 중복 없이 분류한다.

- Top 3: `is_top3 === true`이며 `status !== "done"`
- 진행 작업: `is_top3 === false`이며 `status !== "done"`
- 완료 작업: `status === "done"`

완료 작업은 opacity를 낮춰 조용하게 표현하지만 실패나 부정적 평가처럼 보이지 않게 했다.

### Task Item

- 완료 토글 영역을 정확히 44×44px로 확대
- 접근 가능한 이름에 Task 제목과 변경 동작 포함
- 완료 여부를 체크 표시와 상태 텍스트로 함께 제공
- Task 제목을 가장 먼저 읽히도록 배치
- Top 3 항목은 제목의 글꼴 두께로 추가 강조
- 상태, 프로젝트, Top 3를 보조 정보로 배치
- 프로젝트는 색상 점과 프로젝트명을 함께 표시
- 긴 Task 제목에 다음 규칙 적용
  - `break-words`
  - `overflow-wrap:anywhere`
- 긴 프로젝트명은 가용 너비 안에서 truncate 처리
- 우선순위와 프로젝트 변경 select를 최소 44px로 확대
- Top 3, 보관, 삭제를 독립된 44px 이상 버튼으로 변경
- 삭제에만 LifeX Danger 토큰 사용
- 미완료나 일반 지연 상태에는 Danger 색상을 사용하지 않음
- pending 중 중복 조작 방지
- mutation 오류를 해당 항목 아래 `role="alert"`로 표시

### 필터

- 기존 상태 및 프로젝트 필터 유지
- 각 select에 label 연결
- 모바일에서 세로 배치, `sm` 이상에서 2열 배치
- 필터 결과가 없을 때 실패나 평가가 아닌 중립적인 안내 제공
- 필터를 적용하지 않았고 전체 Task가 없을 때 다음 행동을 압박하지 않는 빈 상태 제공

## 5. Inbox 구현 내용

### 화면 헤더

- 국제화 체계 도입 전 불필요한 영문 혼용을 피하기 위해 영문 보조 레이블을 사용하지 않음
- Inbox 제목의 타이포그래피 위계 강화
- “판단은 나중에 해도 괜찮아요. 떠오른 것을 먼저 내려놓으세요.” 안내 추가

### Quick Capture

- 입력 영역을 `Primary soft` 배경으로 구분
- “빠른 기록” label을 textarea와 연결
- placeholder를 “잊기 전에 여기에 적어두세요”로 단순화
- 불필요한 카테고리나 선택 필드 추가 없음
- textarea 글꼴 16px 유지
- 입력 영역 최소 높이 확보 및 세로 크기 조정 허용
- 제출 버튼을 최소 48px 높이와 충분한 너비로 구성
- pending 상태에 “기록 중…” 표시
- 성공 시 textarea 초기화
- 실패 시 기존 Server Action 오류를 `role="alert"`로 표시
- 동기식 ref guard로 pending 반영 전의 빠른 연속 제출과 Enter 중복 제출 차단
- 입력 포커스 중 Phase D의 BottomNav 키보드 회피 규칙을 그대로 사용

### Inbox Item

- 원문을 가장 먼저 읽히는 본문 크기와 행간으로 배치
- 긴 내용에 다음 규칙 적용
  - `white-space: pre-wrap`
  - `break-words`
  - `overflow-wrap:anywhere`
- Task 전환과 삭제를 최소 44px 높이의 독립 버튼으로 변경
- Task 전환은 `Primary soft`를 사용해 보조 행동으로 표현
- 삭제는 Danger 토큰 사용
- mutation 진행 중 해당 항목에 `aria-busy` 적용
- mutation 오류를 해당 항목 아래 `role="alert"`로 표시

### 빈 상태

격식체:

> 지금 내려놓을 생각이 생기면 여기에 적어두세요.

친근한 말투:

> 지금 내려놓을 생각이 생기면 여기에 적어둬.

완료 축하, 생산성 평가, Task 전환 압박 문구는 추가하지 않았다.

## 6. 공통 컴포넌트 판단

Phase E에서는 새로운 `src/components/ui/**` primitive를 만들지 않았다.

Tasks와 Inbox 모두 버튼과 입력 패턴을 사용하지만 다음 이유로 아직 추출하지 않았다.

- Task 생성, Quick Capture, Task Item 행동의 구조와 상태가 서로 다르다.
- 현재 두 화면만을 위해 variant API를 만들면 추상화가 실제 재사용보다 먼저 생길 가능성이 있다.
- 기존 화면 전체를 새로운 primitive로 마이그레이션하지 않는다는 Phase E 원칙을 유지했다.

`globals.css`도 변경하지 않았다. Phase B와 Phase D의 접근성 및 safe-area 규칙을 그대로 재사용했다.

## 7. 보존한 기능과 데이터 흐름

다음 연결을 정적으로 확인했다.

### Tasks

- `createTask`
- `toggleTaskComplete`
- `archiveTask`
- `deleteTask`
- `setTaskTop3`
- `updateTaskPriority`
- `updateTaskProject`

### Inbox

- `createInboxItem`
- `convertToTask`
- `deleteInboxItem`

다음 영역은 변경하지 않았다.

- `src/lib/actions/**`
- `src/lib/queries/**`
- `src/lib/supabase/**`
- `supabase/**`
- middleware
- DB schema 및 migration
- RLS
- 인증
- API 계약
- 라우트
- AppShell
- BottomNav
- Home
- Projects, Notes, Settings
- Google OAuth feature flag
- 이메일 로그인 및 가입

## 8. 접근성 및 모바일 대응

### 터치 대상

- Task 완료 토글: 44×44px
- Task Item select: 최소 44px
- Top 3, 보관, 삭제: 최소 44px
- Inbox Task 전환 및 삭제: 최소 44px
- 생성 및 제출 버튼: 최소 48px
- 생성 폼 input 및 select: 최소 48px
- disabled 상태는 `opacity-80`으로 유지해 텍스트 대비가 과도하게 낮아지지 않도록 함

### 키보드 포커스

Phase B의 전역 `focus-visible` 규칙을 그대로 사용한다.

360×800 브라우저 검사에서 입력 포커스 시 다음 값을 확인했다.

- outline color: `rgb(54, 87, 109)` — LifeX Primary `#36576D`
- outline style: `solid`
- outline width: 약 `2.4px`

### 긴 문자열

- Task 제목과 Inbox 원문에 강제 줄바꿈 안전장치 적용
- 프로젝트명은 가용 너비를 넘지 않게 제한
- 버튼 영역은 `flex-wrap` 사용
- 생성 폼과 필터는 모바일에서 1열 배치
- 입력 및 select의 글꼴은 16px 유지

### BottomNav 및 모바일 키보드

Phase D의 다음 구조를 변경하지 않고 재사용했다.

- AppShell 콘텐츠 하단 여백
- BottomNav safe-area
- 작은 화면에서 form control 포커스 시 BottomNav 회피
- `:has()` 미지원 환경의 기본 내비게이션 표시

## 9. 검증 결과

### 9.1 Git diff 검사

명령:

```bash
git diff --check
```

결과: 통과

Git의 LF → CRLF 안내만 출력됐으며 whitespace 오류는 없었다.

### 9.2 TypeScript 검사

명령:

```bash
.\node_modules\.bin\tsc.cmd --noEmit --incremental false
```

결과: 통과

### 9.3 Production build

명령:

```bash
npm run build
```

결과: 성공

- Next.js: `15.5.20`
- 정적 및 동적 라우트: 13개 생성
- `/tasks`: 정상 빌드
- `/inbox`: 정상 빌드

기존 범위 밖 경고가 남아 있다.

- `<img>` 관련 경고 3건
  - login
  - landing
  - Home voice CTA
- 미사용 변수 경고 2건
  - Notes 생성 폼
  - 날짜 유틸리티

Phase E 변경으로 발생한 TypeScript 또는 build 오류는 없다.

### 9.4 비인증 리다이렉트

결과:

```text
/tasks → HTTP 307 → /login
/inbox → HTTP 307 → /login
```

인증 보호는 유지된다.

### 9.5 Server Action 연결

Tasks의 생성·완료·보관·삭제·Top 3·우선순위·프로젝트 변경 호출을 정적으로 확인했다.

Inbox의 생성·삭제·Task 전환 호출을 정적으로 확인했다.

Action 파일과 계약은 변경하지 않았다.

### 9.6 360×800 및 가로 스크롤

로컬 브라우저를 360×800으로 설정해 확인했다.

- document viewport width: `360px`
- document scroll width: `360px`
- 비인증 상태에서 가로 스크롤 없음

인증된 테스트 계정이 제공되지 않아 실제 사용자 목록을 브라우저에서 조작하지 않았다. 인증 화면 뒤의 Tasks와 Inbox는 다음 항목을 정적 코드 및 컴파일 결과로 교차 검토했다.

- 모든 grid는 모바일에서 1열
- 버튼 행동 영역은 wrap 가능
- 긴 원문과 제목에 overflow 안전장치 적용
- 고정 폭 컨테이너 없음
- select에 `width: 100%` 및 `min-width: 0`을 고려한 부모 구조 적용

### 9.7 package 및 lockfile

결과:

```text
package.json: 변경 없음
package-lock.json: 변경 없음
```

새 패키지는 설치하지 않았다.

## 10. Git diff 요약

```text
7 files changed, 481 insertions(+), 191 deletions(-)
```

변경 파일:

1. `src/app/(app)/tasks/page.tsx`
2. `src/components/tasks/task-list.tsx`
3. `src/components/tasks/create-task-form.tsx`
4. `src/components/tasks/task-item.tsx`
5. `src/app/(app)/inbox/page.tsx`
6. `src/components/inbox/create-inbox-form.tsx`
7. `src/components/inbox/inbox-list.tsx`

이 보고서 파일이 추가된 뒤의 최종 diff에는 본 문서가 별도 신규 파일로 포함된다.

## 11. 남아 있는 기능 위험

### Inbox → Task 전환의 비원자성

기존 `convertToTask`는 다음 두 작업을 순서대로 실행한다.

1. Task 생성
2. Inbox 항목의 `converted_to_task` 업데이트

두 작업은 하나의 DB 트랜잭션이 아니다. Task 생성 후 Inbox 업데이트가 실패하면 중복 전환 위험이 있다.

Phase E는 디자인 단계이므로 데이터 로직을 변경하지 않고 위험만 기록한다.

### 즉시 삭제

Task와 Inbox 삭제는 기존처럼 즉시 실행된다. Dialog, Sheet, Toast 또는 custom modal은 Phase E 금지 범위이므로 추가하지 않았다.

### 기존 Server Action 오류 문구

일부 Server Action 내부의 한국어 오류 문구에 기존 인코딩 손상 가능성이 있다. Phase E 금지 파일인 `src/lib/actions/**`는 수정하지 않았다. 실패 상황에서 해당 문자열이 UI의 오류 영역에 표시될 수 있으므로 별도 기능 안정화 단계에서 확인해야 한다.

### 인증된 실제 데이터 브라우저 검증

인증된 테스트 계정이 없어 브라우저에서 실제 CRUD를 실행하지 않았다. 실제 사용자 데이터를 임의로 생성하거나 변경하지 않기 위한 선택이다.

테스트 계정이 준비되면 다음을 추가 검증하는 것이 좋다.

- 긴 실제 Task 제목과 프로젝트명
- Top 3 최대 3개 제한 오류 표시
- Task 생성과 필터 조합
- 완료 및 미완료 전환
- 보관 후 목록 제거
- Inbox 기록 후 입력 초기화
- Inbox → Task 전환 후 양쪽 목록 revalidation
- 360×800에서 모바일 키보드가 열린 상태의 제출 버튼 접근성

## 12. 최종 확인

- 실제 Supabase 데이터 흐름 보존
- Server Action 계약 보존
- 인증 및 라우트 보호 보존
- 기존 URL 보존
- AppShell 및 BottomNav 변경 없음
- DB schema, migration, RLS 변경 없음
- package 변경 없음
- mock data 없음
- 새로운 기능이나 상태 없음
- 커밋하지 않음
