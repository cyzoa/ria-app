# RIA Phase C — Today/Home 모바일 개선 보고서

- 작성일: 2026-07-19
- 대상 브랜치: `design/ria-mobile`
- 기준 문서:
  - `RIA_July_LifeX_Design_Directive_v1_2026-07-19.md`
  - `RIA_Design_Audit_2026-07-19.md`
- 구현 커밋: `de093f0 feat: refine RIA Today mobile experience`
- GitHub push: 완료

## 1. 목표

기존 실제 데이터와 기능을 그대로 유지하면서 Today/Home 화면에서 오늘의 방향과 다음 한 걸음이 가장 먼저 보이도록 모바일 정보 위계와 시각 디자인을 개선했다.

한 문장 콘셉트:

> 정돈된 따뜻함 속에서 오늘의 방향과 다음 한 걸음이 먼저 보이는 조용한 동반자.

## 2. 변경 전후 정보 위계

### 변경 전

```text
인사
→ 항상 Calm인 리듬 카드
→ North Star
→ 동등한 Top 3
→ 전체 일정
→ 조건부 RIA 제안
```

### 변경 후

```text
날짜와 짧은 인사
→ 오늘의 방향
→ 첫 번째 우선순위
→ 우선순위 2·3
→ 다음 일정
→ 빠른 기록
→ 조건부 RIA 제안
```

## 3. 구현 내용

### 날짜와 인사

- 날짜와 인사의 간격 및 타이포그래피를 정돈했다.
- Phase B에서 만든 `text-primary`, `text-secondary`, `accent` 토큰을 사용했다.
- 긴 사용자 이름이나 인사말이 자연스럽게 줄바꿈되도록 최대 폭과 line-height를 조정했다.

### 오늘의 방향 — North Star

- North Star를 `primary-soft` 면으로 강조했다.
- 대시보드형 중첩 카드 대신 하나의 의미 있는 표면으로 표현했다.
- 기존 North Star 입력·저장·수정·취소 기능을 그대로 유지했다.
- 긴 한국어 및 향후 긴 번역 문자열을 위해 다음 보호 스타일을 적용했다.
  - `break-words`
  - `overflow-wrap:anywhere`
  - 충분한 line-height
- 편집 버튼과 입력 컨트롤은 전역 44px 터치 기반을 유지한다.

### 지금 가능한 한 걸음 — Top 3

- 첫 번째 우선순위를 `먼저`라는 텍스트 상태와 Surface 배경으로 강조했다.
- 두 번째와 세 번째 우선순위는 구분선과 여백으로 조용하게 표현했다.
- 모든 항목을 동일한 카드로 만드는 방식은 사용하지 않았다.
- 완료 버튼의 실제 터치 영역을 `44×44px`로 확보했다.
- 완료 상태를 색상만으로 표현하지 않고 다음 요소를 함께 사용했다.
  - 체크 표시
  - line-through
  - 접근 가능한 버튼 label
- 기존 `toggleTaskComplete()` Server Action 호출을 그대로 유지했다.
- Top 3가 비어 있을 때 기존 `/tasks` 진입 흐름을 유지했다.

### 다음 일정

- `getHomeData()`에서 시간순으로 전달되는 실제 일정의 첫 항목을 가장 가까운 일정으로 강조했다.
- 나머지 항목은 `이후 일정` 목록으로 배치했다.
- 일정 데이터, 날짜 값, 정렬 query는 변경하지 않았다.
- 긴 일정 제목에 `min-w-0`, `break-words`, `overflow-wrap:anywhere`를 적용했다.
- 일정이 비어 있을 때 기존 안내 문구와 `/tasks` 진입 동작을 유지했다.

### 빠른 기록

- Home에 새로운 DB 쓰기 흐름을 만들지 않았다.
- 기존 `/inbox`로 이동하는 명확한 진입점만 추가했다.
- Inbox 생성 action, 테이블, query는 변경하지 않았다.

### RIA 제안

- 실제 조건이 충족될 때만 화면 마지막에 표시되는 기존 조건부 로직을 유지했다.
- 카드 대신 조용한 왼쪽 강조선과 Balance 색상을 사용했다.
- RIA의 문구는 사용자를 평가하거나 명령하지 않는 기존 문장을 유지했다.
- 생산성 점수나 압박 표현은 추가하지 않았다.

### 고정 Calm 표시

- 실제 사용자 상태 데이터와 연결되지 않은 `TodayRhythmCard`의 고정 `Calm` 표시를 Home에서 제외했다.
- 컴포넌트 파일 자체는 삭제하지 않았다.
- 가짜 Energy 또는 Condition 데이터는 추가하지 않았다.

## 4. 변경 파일

### `src/app/(app)/home/page.tsx`

변경 이유:

- Home 정보 순서 재배치
- 고정 Calm 카드 렌더링 제외
- 기존 `/inbox` 빠른 기록 링크 추가
- Phase B 토큰 기반의 인사 타이포그래피 적용

### `src/components/home/north-star-section.tsx`

변경 이유:

- 오늘의 방향을 가장 중요한 의미 영역으로 강조
- 편집 기능을 보존하면서 모바일 터치 및 긴 문구 대응 강화

### `src/components/home/top3-section.tsx`

변경 이유:

- 첫 번째 우선순위와 2·3순위 사이의 시각적 위계 구축
- 완료 컨트롤의 터치 영역과 접근 가능한 label 개선

### `src/components/home/schedule-section.tsx`

변경 이유:

- 첫 번째 실제 일정을 다음 일정으로 강조
- 이후 일정과 빈 상태를 명확하게 구분
- 긴 일정 제목의 모바일 줄바꿈 보장

### `src/components/home/ria-message.tsx`

변경 이유:

- RIA 제안을 항상 보이는 대형 카드가 아닌 조용한 동반자 메시지로 표현
- Balance 토큰과 텍스트 label을 함께 사용

## 5. 데이터 및 기능 보존

다음 흐름은 변경하지 않았다.

- `getHomeData()`
- Supabase query
- 실제 North Star 데이터
- 실제 Top 3 Task 데이터
- 실제 오늘 일정 데이터
- `saveNorthStar()`
- `toggleTaskComplete()`
- Task 관련 mutation
- 인증과 `/home` 보호
- Server Action 계약
- API 계약
- DB schema
- migration
- RLS
- 라우트 구조

새 mock data나 가짜 Energy/Condition 값은 추가하지 않았다.

## 6. 변경하지 않은 영역

- `AppShell`
- `BottomNav`
- Tasks 화면
- Inbox 화면
- Projects 화면
- Notes 화면
- Settings 화면
- Supabase client/server 코드
- middleware
- 인증 및 Google OAuth
- `package.json`
- `package-lock.json`
- 외부 UI 라이브러리
- 폰트 패키지
- 국제화 프레임워크

## 7. 검증 결과

### Git 및 코드 검증

- `git diff --check`: 통과
- 변경 파일: 허용된 Home 관련 파일 5개
- 금지 파일 변경 없음
- `package.json`, `package-lock.json` 변경 없음

### TypeScript 및 빌드

- TypeScript 검사: 통과
- `npm run build`: 성공
- Next.js production route 생성: 성공
- 기존 빌드 경고 6개만 유지
- Phase C에서 추가된 오류 또는 경고 없음

### 인증 경로

- 비인증 `/home`: HTTP 307
- redirect 대상: `/login`
- 기존 인증 보호 유지

### 정적 기능 경로 검토

다음 연결이 유지되는 것을 확인했다.

- Home page → `getHomeData()`
- North Star UI → `saveNorthStar()`
- Top 3 완료 UI → `toggleTaskComplete()`
- 빠른 기록 → `/inbox`
- 일정 표시 → 기존 `scheduleTasks`

### 긴 콘텐츠와 작은 화면 대응

Home 변경 영역에 다음 스타일을 적용하고 정적으로 검토했다.

- `min-w-0`
- `break-words`
- `overflow-wrap:anywhere`
- `flex-wrap`
- 고정된 수평 너비 대신 유연한 컨테이너
- 충분한 line-height

빈 North Star, 빈 Top 3, 빈 일정 상태에도 고정 폭이 없어 360px에서 자연스럽게 줄바꿈할 수 있는 구조다.

### Focus-visible

Phase B의 전역 `focus-visible` 기반을 제거하거나 덮어쓰지 않았다.

- North Star 입력 및 버튼
- Top 3 완료 버튼
- 빈 상태 진입 버튼
- Inbox 링크

모두 기존 키보드 포커스 outline을 사용한다.

## 8. 검증 제한

인증된 테스트 계정 세션이 없어 실제 Supabase 데이터가 표시된 `/home`을 브라우저에서 직접 캡처하지 못했다.

비인증 redirect는 실제 production 서버에서 검증했다. 인증된 Home의 모바일 검증은 다음 방법으로 진행했다.

- production build
- TypeScript 검사
- 데이터 및 action 연결의 정적 코드 검토
- 360px 폭을 고려한 flex 및 overflow 경로 검토
- 긴 한국어·독일어·러시아어 문자열을 고려한 줄바꿈 방어 확인

브라우저 보안 정책상 일회성 `data:` fixture가 차단되어 이를 우회하지 않았다. 실제 계정 기반의 최종 360×800 시각 QA는 별도 인증 세션에서 추가로 수행하는 것이 좋다.

## 9. Git 결과

구현 커밋:

```text
de093f0 feat: refine RIA Today mobile experience
```

Push 대상:

```text
origin/design/ria-mobile
```

GitHub push는 정상 완료됐다.

## 10. 결과 요약

Phase C는 Today/Home 화면만 변경했다.

사용자가 화면을 열었을 때 고정된 리듬 상태나 동등한 카드 목록보다 다음 내용을 먼저 인식할 수 있도록 개선했다.

1. 오늘의 방향
2. 지금 가능한 첫 번째 행동
3. 이어서 고려할 우선순위
4. 가장 가까운 일정
5. 생각을 내려놓을 Inbox 진입점
6. 실제 조건이 있을 때만 나타나는 RIA 제안

기존 기능과 실제 데이터 흐름은 그대로 보존됐다.
