# RIA Phase F — Projects, Notes & Settings Mobile Experience Report

- 작성일: 2026-07-20
- 대상 브랜치: `design/ria-mobile`
- 작업 상태: 구현 및 검증 완료, 미커밋
- 작업 범위: Projects, Notes, Settings 모바일 경험

## 1. 작업 목표

Phase F의 목표는 Projects, Notes, Settings가 서로 다른 임시 화면처럼 보이지 않고 RIA의 Warm Structure 안에서 일관된 모바일 경험을 갖게 하는 것이었다.

다음 원칙을 유지했다.

- 기존 실제 Supabase 데이터와 사용자별 데이터 흐름 보존
- 기존 query, Server Action, 인증, RLS, URL 보존
- Phase B LifeX 디자인 토큰 재사용
- Phase C Today/Home, Phase D AppShell·BottomNav, Phase E Tasks·Inbox 보존
- 360px 모바일 화면과 최소 44×44px 터치 영역 지원
- 새로운 데이터 모델, route, package, UI 라이브러리 추가 금지
- 문구 전체의 최종 교정은 수행하지 않고 별도 backlog로 기록

## 2. 변경 전 감사 결과

### 2.1 Projects

기존 구조:

1. `Projects` 제목
2. Project 생성 버튼 또는 생성 폼
3. Project 목록
4. 각 Project의 Task 수
5. 삭제 동작

기존 데이터 및 기능:

- `getProjectsData()`로 실제 사용자 Project 조회
- 미보관 Task를 조회해 Project별 Task 수 계산
- `createProject(formData)`로 생성
- `deleteProject(projectId)`로 삭제
- Project 생성·삭제 후 `/projects`, `/tasks` revalidation

확인된 UI 문제:

- 생성 폼에 명시적인 label 연결이 부족했다.
- 색상 선택 input이 44px보다 작았다.
- pending 중 빠른 연속 제출을 완전히 차단하지 못했다.
- 생성 실패 결과가 화면에 표시되지 않았다.
- 삭제가 작은 13px 텍스트 링크에 의존했다.
- Project 이름과 Task 수의 정보 위계가 약했다.
- 긴 Project 이름의 overflow 대응이 부족했다.
- 색상 점에 대한 보조적인 텍스트 정보 구조가 약했다.

### 2.2 Notes

기존 구조:

1. `Notes` 제목
2. Note 작성 textarea
3. Note 목록
4. 수정 및 삭제

기존 데이터 및 기능:

- `getNotesData()`로 실제 사용자 Note 조회
- `createNote(formData)`로 생성
- `updateNote(noteId, content)`로 수정
- `deleteNote(noteId)`로 삭제
- query는 최신 Note가 먼저 오도록 `created_at` 내림차순 정렬

데이터 구조 확인:

- 현재 Note schema와 Action에는 별도 제목 필드가 없다.
- 기존 필드는 `content` 하나다.
- 따라서 Phase F에서는 제목 필드나 가짜 제목을 추가하지 않았다.

확인된 UI 문제:

- 작성 성공 후 textarea가 초기화되지 않았다.
- 작성 및 수정 실패 결과가 화면에 표시되지 않았다.
- 수정·삭제가 작은 13px 링크형 버튼에 의존했다.
- 수정 중과 일반 보기 상태의 의미 구분이 약했다.
- 긴 본문과 공백 없는 긴 문자열에 대한 안전장치가 부족했다.
- 생성·수정·삭제의 빠른 중복 실행을 확실히 차단하지 못했다.

### 2.3 Settings

기존 구조:

1. `설정` 제목
2. 말투 설정 카드
3. 존댓말 또는 반말 버튼
4. 현재 모드 문구

기존 데이터 및 기능:

- `getHomeData()`로 현재 profile의 `speech_style` 조회
- `updateSpeechStyle(style)`로 `formal` 또는 `casual` 저장
- 저장 후 `/home`, `/settings` revalidation
- 성공 시 `router.refresh()` 실행

확인된 UI 문제:

- 선택 상태가 주로 배경색에 의존했다.
- semantic 선택 상태를 나타내는 `aria-pressed`가 없었다.
- 저장 중 상태와 성공·실패 결과가 접근 가능하게 표시되지 않았다.
- optimistic UI 적용 후 실패 시 이전 선택으로 돌아가지 않았다.
- 말투 선택의 실제 차이를 보여주는 짧은 예시가 없었다.

## 3. 변경한 모바일 정보 구조

### Projects

1. 화면 제목과 짧은 안내
2. 새 Project 생성 진입
3. 현재 Project 목록
4. Project별 기존 Task 수
5. 빈 상태

### Notes

1. 화면 제목과 짧은 안내
2. 새 Note 작성
3. 최근 Note 목록
4. 수정 및 삭제
5. 빈 상태

### Settings

1. 화면 제목과 짧은 안내
2. 말투 설정 설명
3. 존댓말 및 반말 선택
4. 각 말투의 짧은 예시
5. 저장 중·성공·실패 상태

## 4. Projects 구현 내용

### 페이지 헤더

- Phase E와 동일한 모바일 좌우 여백과 제목 위계 적용
- “이어가고 있는 일의 방향을 차분히 살펴보세요.” 안내 추가
- 360px에서 좌우 `20px`, 큰 화면에서는 기존 `24px` 여백 유지

### Project 생성 폼

- 전체 너비의 생성 진입 버튼 적용
- 생성 버튼과 form control 최소 48px 높이 확보
- `Project 이름` label을 `name` input과 연결
- `구분 색상` label을 color input과 연결
- 색상 input을 48×48px로 확대
- 색상은 Project 이름과 함께 사용하는 보조 정보임을 안내
- 기존 필드 이름 유지
  - `name`
  - `color`
- 기존 `createProject(formData)` 호출 유지
- 동기식 ref guard로 빠른 연속 클릭과 Enter 중복 제출 차단
- 성공한 경우에만 폼 닫기
- 실패 시 form과 입력값 유지
- 실패 결과를 `role="alert"`로 표시
- submit과 취소 버튼의 type 명시
- disabled 상태의 opacity를 80%로 유지해 가독성 저하 완화

### Project 목록

- `현재 Project` 섹션 제목과 실제 개수 제공
- Project 이름을 가장 먼저 읽히도록 배치
- Task 수를 `연결된 Task n개` 보조 정보로 표시
- Project 색상 점은 `aria-hidden="true"` 처리
- 색상 점과 별도로 Project 이름을 항상 제공
- 긴 이름에 다음 규칙 적용
  - `break-words`
  - `overflow-wrap:anywhere`
- 카드 중첩 대신 얇은 구분선 기반 목록 사용
- 삭제 버튼 최소 44px 높이 적용
- 삭제에만 LifeX Danger 토큰 사용
- 삭제 버튼의 접근 가능한 이름에 Project 이름 포함
- 삭제 중 해당 항목에만 `aria-busy` 적용
- 삭제 실패 결과를 해당 Project 아래 `role="alert"`로 표시
- 동기식 mutation guard로 빠른 중복 삭제 차단

### 빈 상태

격식체와 친근한 말투를 기존 speech style에 따라 유지한다.

빈 상태는 실패나 성과 부족처럼 보이지 않게 중립적으로 구성했다.

## 5. Notes 구현 내용

### 페이지 헤더

- “조금 더 오래 간직하고 싶은 생각을 남겨두세요.” 안내 추가
- Phase E 화면과 동일한 여백 및 제목 구조 적용

### Note 작성

- 실제 schema에 존재하는 `content` 필드만 사용
- 별도 제목, 태그, 카테고리, 검색 기능 추가 없음
- textarea에 `새 Note` label 연결
- textarea 최소 높이 확보
- 16px 글꼴과 읽기 가능한 행간 적용
- 세로 resize 허용
- 저장 버튼을 textarea 바로 아래에 배치
- 저장 버튼 최소 48px 높이 확보
- 동기식 ref guard로 중복 제출 차단
- 성공한 경우에만 form reset
- 실패 시 사용자가 작성한 내용 유지
- 실패 결과를 `role="alert"`로 표시
- 입력 중 BottomNav는 Phase D 키보드 회피 규칙 재사용

### Note 목록

- query의 기존 최신순 정렬을 그대로 사용
- `최근 Note` 제목과 실제 개수 표시
- Note 본문을 가장 중요한 정보로 표현
- 본문 전체의 기존 줄바꿈 유지
- 긴 문자열에 다음 규칙 적용
  - `white-space: pre-wrap`
  - `break-words`
  - `overflow-wrap:anywhere`
- 내용 전체를 임의로 잘라 기능을 숨기지 않음
- 수정 및 삭제 버튼을 최소 44px 높이로 확대
- 삭제에만 Danger 토큰 적용
- 카드 중첩 대신 구분선 기반 목록 사용

### Note 수정

- 수정 진입 시 기존 content를 그대로 textarea에 로드
- `Note 수정 중` label로 작성 상태와 수정 상태를 구분
- textarea 최소 높이와 16px 글꼴 유지
- 저장 및 취소 버튼을 최소 48px 높이로 구성
- 저장 성공 시에만 편집 상태와 입력값 초기화
- 실패 시 편집 상태와 수정 중인 내용 유지
- 실패 결과를 `role="alert"`로 표시
- 동기식 mutation guard로 중복 저장 차단

### Note 삭제

- 기존 `deleteNote(noteId)` 호출 유지
- 삭제 중 해당 Note에만 `aria-busy` 적용
- 동기식 mutation guard로 중복 삭제 차단
- 실패 시 해당 Note 아래 오류 표시

## 6. Settings 구현 내용

### 화면 구조

- “RIA가 어떤 말투로 곁에 있을지 선택하세요.” 안내 추가
- 현재 구현된 말투 설정만 제공
- 미구현 설정 항목이나 비활성 메뉴 추가 없음

### Semantic 선택 상태

- 말투 선택을 `fieldset`과 `legend` 구조로 묶음
- 각 선택 버튼에 `aria-pressed` 적용
- 선택 상태를 다음 세 가지로 함께 표시
  - 배경 및 border
  - 체크 표시
  - `선택됨` 텍스트
- 색상에만 의존하지 않도록 구성
- 버튼 최소 높이 96px 확보
- 모바일에서는 세로 배치, `sm` 이상에서 2열 배치

### 말투 예시

존댓말:

> 오늘도 함께 살펴볼까요?

반말:

> 오늘도 같이 살펴볼까?

예시는 현재 `formal`, `casual` 동작과 일치하는 짧은 문장만 제공한다.

### 저장 상태

- 선택 시 기존 `updateSpeechStyle(style)` 호출
- 빠른 중복 선택 및 저장을 동기식 ref guard로 차단
- 저장 중 fieldset에 `aria-busy` 적용
- 저장 중 문구를 `role="status"`로 표시
- 성공 문구를 `role="status"`로 표시
- 실패 문구를 `role="alert"`로 표시
- 실패 시 optimistic 선택을 이전 값으로 rollback
- 성공 시 기존 `router.refresh()` 유지

## 7. 공통 UI primitive 판단

Phase F에서도 새로운 `src/components/ui/**` primitive를 만들지 않았다.

이유:

- Project 생성, Note 작성, Note 수정, Settings 선택은 상태와 의미가 서로 다르다.
- 현재 범위에서 공통 API를 만들면 실제 재사용보다 variant 설계가 먼저 커질 가능성이 있다.
- 기존 화면 전체를 일괄 마이그레이션하지 않는다는 단계 원칙을 유지했다.

`globals.css`도 변경하지 않았다. Phase B와 Phase D의 다음 기반을 재사용했다.

- LifeX 색상 토큰
- 전역 focus-visible
- 최소 44px control 높이
- 16px form control 글꼴
- reduced motion
- BottomNav safe-area와 키보드 회피

## 8. 보존한 기능과 변경하지 않은 영역

### 보존한 기능

Projects:

- 생성
- 삭제
- Task 수 표시
- 기존 query와 Server Action

Notes:

- 생성
- 수정
- 삭제
- 기존 최신순 query

Settings:

- 현재 말투 조회
- 존댓말·반말 변경
- 기존 저장 및 refresh 방식

### 변경하지 않은 영역

- `src/lib/actions/**`
- `src/lib/queries/**`
- `src/lib/supabase/**`
- `supabase/**`
- middleware
- `package.json`
- `package-lock.json`
- `src/components/layout/**`
- `src/components/home/**`
- `src/components/tasks/**`
- `src/components/inbox/**`
- `/more`
- AppShell
- BottomNav
- 인증 및 Google OAuth feature flag
- DB schema, migration, RLS
- 기존 URL 및 API 계약

## 9. 검증 결과

### 9.1 Git diff 검사

명령:

```bash
git diff --check
```

결과: 통과

LF에서 CRLF로 변환될 수 있다는 Git 안내만 있었으며 whitespace 오류는 없었다.

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
- 전체 라우트: 13개 생성
- `/projects`: 정상 빌드
- `/notes`: 정상 빌드
- `/settings`: 정상 빌드

기존 범위 밖 경고:

- `<img>` 관련 경고 3건
  - login
  - landing
  - Home voice CTA
- `src/lib/date.ts` 미사용 변수 경고 1건

Phase F 변경으로 발생한 TypeScript 또는 build 오류는 없다.

### 9.4 비인증 라우트 보호

```text
/projects → HTTP 307 → /login
/notes → HTTP 307 → /login
/settings → HTTP 307 → /login
```

기존 인증 보호가 유지된다.

### 9.5 Action 연결

다음 호출을 정적으로 확인했다.

```text
createProject(formData)
deleteProject(projectId)
createNote(formData)
updateNote(noteId, editContent)
deleteNote(noteId)
updateSpeechStyle(style)
```

함수 인자와 반환값 처리는 기존 Action 계약과 일치한다.

### 9.6 UTF-8 및 문자열

변경된 8개 파일을 strict UTF-8로 검사했다.

- UTF-8 오류: 0건
- replacement character: 0건
- CJK mojibake 문자: 0건
- 비정상 Unicode escape: 0건

### 9.7 터치 영역 및 긴 문자열

- Project 및 Note 생성 control: 최소 48px
- Project 삭제: 최소 44px
- Note 수정·삭제: 최소 44px
- Note 저장·취소: 최소 48px
- Settings 선택: 최소 96px
- 긴 Project 이름: 강제 줄바꿈 안전장치 적용
- 긴 Note 본문: 원래 줄바꿈 보존 및 강제 줄바꿈 안전장치 적용

### 9.8 360×800 및 focus-visible

로컬 브라우저를 360×800으로 설정해 확인했다.

```text
viewport width: 360px
document scroll width: 360px
```

가로 overflow는 없었다.

focus-visible 확인:

```text
outline style: solid
outline width: 약 2.4px
outline color: rgb(54, 87, 109)
```

LifeX Primary `#36576D` 포커스 표시가 유지된다.

인증된 테스트 계정이 없어 실제 사용자 데이터가 표시되는 세 화면을 브라우저에서 조작하지 않았다. 실제 데이터를 임의로 생성하거나 삭제하지 않기 위한 선택이다. 인증 화면 뒤 UI는 정적 코드, 컴파일 결과, responsive class를 교차 검토했다.

### 9.9 Next.js dev chunk 오류 확인

production build가 실행되는 동안 이전 dev 인스턴스가 같은 `.next` 폴더의 오래된 chunk를 참조해 다음 오류를 한 차례 표시했다.

```text
Cannot find module './543.js'
```

build 이후 새 dev 서버에서 다시 확인한 결과:

- 오류 재현 안 됨
- 브라우저 error log: 0건
- `/login` 정상 렌더링
- Phase F 비인증 redirect 정상

코드 또는 production build 결함이 아니라 build와 동시에 살아 있던 기존 dev 프로세스의 stale chunk 참조로 판단된다.

### 9.10 Package 및 lockfile

```text
package.json: 변경 없음
package-lock.json: 변경 없음
```

새 패키지는 설치하지 않았다.

## 10. 변경 파일과 이유

1. `src/app/(app)/projects/page.tsx`
   - Projects 제목, 안내, 모바일 여백 및 정보 순서 정리
2. `src/components/projects/create-project-form.tsx`
   - label, 터치 크기, 성공·실패 상태, 중복 제출 방지
3. `src/components/projects/project-list.tsx`
   - 이름과 Task 수 위계, 긴 이름, 삭제 접근성 및 오류 상태
4. `src/app/(app)/notes/page.tsx`
   - Notes 제목, 안내, 모바일 여백 및 정보 순서 정리
5. `src/components/notes/create-note-form.tsx`
   - 작성 성공·실패 상태, 입력 보존, 중복 제출 방지
6. `src/components/notes/note-list.tsx`
   - 긴 본문, 수정·삭제 터치 크기, 편집 상태와 오류 처리
7. `src/app/(app)/settings/page.tsx`
   - Settings 제목, 안내 및 모바일 여백 정리
8. `src/components/settings/speech-style-toggle.tsx`
   - semantic 선택 상태, 예시, pending, 성공·실패 및 rollback

## 11. Git diff 요약

```text
8 files changed, 475 insertions(+), 176 deletions(-)
```

이 보고서 파일은 신규 untracked 파일이므로 위 코드 diff 통계에는 포함되지 않는다.

## 12. 남아 있는 기능 위험

### Project 삭제와 연결 Task

Project 삭제 시 연결된 Task가 어떻게 처리되는지는 기존 DB foreign-key 및 Supabase 정책에 의존한다. 이번 단계에서는 DB schema, Action, 삭제 확인 modal을 변경하지 않았다.

### Note의 별도 제목 부재

현재 Note 데이터 모델에는 `title` 필드가 없다. 제목 우선 표시 원칙을 임의 데이터나 첫 줄 파싱으로 흉내 내지 않았다. 별도 제목이 필요하다면 향후 DB·Action 계약을 포함한 별도 기능 단계가 필요하다.

### 빈 Note 수정

기존 `updateNote`는 빈 문자열을 별도로 검증하지 않는다. 기존 계약과 동작을 보존하기 위해 Phase F UI에서 새로운 validation을 강제하지 않았다.

### Action throw 상황

현재 UI는 기존 Action이 반환하는 `{ error }` 결과를 처리한다. 네트워크 단절 등으로 Action 자체가 예외를 throw하는 상황에 대한 공통 error boundary 또는 toast 체계는 아직 없다.

### 인증된 실제 데이터 검증

테스트 계정이 없어 실제 사용자 Project·Note 생성, 수정, 삭제 및 말투 변경을 실행하지 않았다. 테스트 계정이 준비되면 다음 검증이 필요하다.

- 긴 실제 Project 이름과 Task 수
- Project 생성 실패 후 입력 보존
- 연결 Task가 있는 Project 삭제 결과
- 여러 줄 및 매우 긴 Note 작성·수정
- Note 수정 실패 후 편집 내용 보존
- Settings 성공·실패 및 rollback
- 모바일 키보드가 열린 상태의 저장 버튼 접근성

## 13. Copy Polish Backlog

이번 단계에서는 문구 전체를 최종 교정하지 않았다. 다음 항목을 후속 copy 단계에 남긴다.

- `Projects`, `Project`, `Notes`, `Note`, `Task` 영문 제품 용어와 한국어 문장의 혼용 기준
- `반말`과 `친근한 말투` 중 최종 사용자-facing 명칭
- 존댓말·반말 예시 문장의 최종 RIA 브랜드 톤
- Projects, Notes, Settings 안내 문구의 격식체·친근한 말투 적용 범위
- `현재 Project`, `최근 Note` 등 섹션 이름의 번역 정책
- 생성·저장·빈 상태 문구의 6개 언어 확장 길이 검토
- `Project 추가`, `Note 저장`, `변경 저장` 버튼 문구의 최종 일관성
- 설정 저장 성공 문구가 다른 mutation 피드백과 일치하는지 검토

국제화 framework나 dictionary는 추가하지 않았다.

## 14. 최종 확인

- 실제 Supabase 데이터 흐름 보존
- 기존 query와 Server Action 계약 보존
- 인증 및 RLS 보존
- 기존 URL 보존
- AppShell, BottomNav, `/more` 변경 없음
- Phase B~E 변경 없음
- package 및 lockfile 변경 없음
- mock data 없음
- 새 route 및 상세 화면 없음
- 새 profile 필드 없음
- 커밋하지 않음

