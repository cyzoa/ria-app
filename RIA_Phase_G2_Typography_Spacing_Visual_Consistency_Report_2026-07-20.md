# RIA Phase G2 — Typography, Spacing and Visual Consistency 보고서

- 작성일: 2026-07-20
- 브랜치: `design/ria-mobile`
- 범위: 인증된 화면의 타이포그래피·간격·정렬·반응형 시각 일관성
- 상태: 구현 및 검증 완료, 커밋하지 않음

## 1. 시각 감사 요약

Phase B의 LifeX 토큰과 Phase C–F의 Warm Structure는 유지하면서 화면 사이에서 실제로 눈에 띄던 차이만 정리했다. 주요 불일치는 페이지 설명문이 일부 화면에서 `15px/24px`, 다른 화면에서 `16px/28px`로 섞여 있던 점, Inbox 헤더와 본문 사이 간격, More 화면의 제목 계층과 상단 여백, 긴 페이지에서 데스크톱 스크롤바 생성 여부에 따라 셸이 미세하게 좌우 이동하던 점이었다.

새 카드, 새 컴포넌트 시스템, 새 색상, 새 라우트는 만들지 않았다. 기능·데이터 흐름·Server Action 계약은 변경하지 않았다.

## 2. 타이포그래피 계층 전후

| 역할 | 변경 전 | 변경 후 |
| --- | --- | --- |
| 페이지 제목 | 화면별 기존 LifeX 제목 규칙, More만 별도 계층 | 인증 화면의 `2rem`, semibold 계층에 More를 정렬 |
| 페이지 설명 | 일부 `15px/24px`, 일부 `16px/28px` | Tasks, Inbox, Notes, Projects, Settings를 `text-base leading-7`로 정렬 |
| 주요 본문 | 일부 Home/RIA 메시지 `15px` | 빠른 기록 핵심 문구와 RIA 메시지를 `16px`, 편안한 행간으로 조정 |
| 목록 보조 설명 | `text-sm`이나 행간이 암시적 | `text-sm leading-5`로 읽기 리듬 명시 |
| 메타데이터·상태 | 기존 보조 계층 | 변경 없음 |
| 입력·버튼·BottomNav | 기존 16px 입력 및 최소 터치 영역 | 변경 없음 |

본문을 일괄 확대하지 않고 페이지 설명, 핵심 본문, 목록 보조 설명이라는 의미 역할에만 맞춰 조정했다.

## 3. 간격 시스템 결정

- 페이지 좌우 여백은 기존 `px-5 sm:px-6`를 유지했다.
- 인증 화면 상단은 기존 `pt-10 sm:pt-12` 흐름을 유지하고 More에도 동일한 `sm:pt-12`를 적용했다.
- Inbox 헤더 하단 간격만 `mb-6`에서 `mb-7`로 조정해 다른 목록 화면과 맞췄다.
- 페이지 설명은 제목 아래 `mt-2`, 본문 행간 `leading-7`을 공통 기준으로 삼았다.
- 목록 제목 아래 보조 설명은 `mt-1`, `leading-5`를 사용했다.
- 폼, 리스트 아이템, BottomNav 위 콘텐츠 여백과 safe-area 계산은 기존 구현을 그대로 유지했다.

## 4. 정렬 및 콘텐츠 폭 결정

Tasks, Inbox, Notes, Projects, Settings, More의 제목·설명은 같은 기본 콘텐츠 시작선과 `max-w-xl`/`max-w-md` 읽기 폭을 사용한다. 운영 폼과 목록은 중앙 정렬로 바꾸지 않았고 모바일 우선 단일 열 구조를 유지했다.

Home은 감정적 중심 화면이라는 기존 구성을 유지해 다른 운영 화면과 시각 구조를 강제로 동일화하지 않았다. 데스크톱에서는 기존 AppShell 최대 폭 512px을 유지했다. 긴 페이지의 세로 스크롤바로 생기던 약 8px 좌우 흔들림은 인증 셸이 있는 문서에만 `scrollbar-gutter: stable`을 적용해 해소했다.

## 5. 컨트롤 일관성 변경

G2에서는 정상 동작 중인 입력·버튼 스타일이나 이벤트 핸들러를 재작성하지 않았다. 기존 최소 44×44px 터치 영역, 16px 입력 글꼴, focus-visible outline, pending/disabled 표현을 유지했다.

검증 과정에서 Notes 편집/취소/저장/삭제, Inbox Task 전환, Projects 삭제, Settings 말투 선택 버튼의 접근 가능한 이름과 상태가 정상임을 확인했다. 아이콘·컨트롤 라이브러리는 추가하지 않았다.

## 6. 목록 및 섹션 일관성 변경

- Inbox, Notes, Projects 목록의 섹션 보조 설명에 `leading-5`를 명시했다.
- 목록의 제목, 설명, 개수, 항목 순서와 데이터 렌더링은 유지했다.
- 기존 surface, divider, item padding, destructive Danger 표현을 유지했다.
- 중첩 카드나 추가 장식은 만들지 않았다.
- Tasks는 정보 밀도가 더 높은 기존 구조를 보존하되 페이지 설명의 크기와 행간만 다른 화면과 맞췄다.

## 7. Home 전용 시각 결정

Home의 인사, 날짜, North Star, Top 3, 일정, RIA 제안 순서와 기능은 유지했다. 빠른 기록 진입의 주요 문구를 `text-base leading-6`으로 조정하고 RIA 메시지 본문을 `text-base leading-7`로 맞춰 핵심 본문 가독성만 개선했다. 카드 수, 데이터, 조건부 노출, 사용자 방향 저장 로직은 변경하지 않았다.

## 8. BottomNav 및 AppShell 검증

- Today, Tasks, Inbox, Notes, More의 다섯 목적지 유지
- 360px과 412px에서 균등 배치, 가로 오버플로 없음
- 모든 내비게이션 터치 영역 44×44px 이상
- 현재 경로와 `aria-current` 동작 유지
- 하단 safe-area와 콘텐츠 여백 유지, 콘텐츠 가림 없음
- 768px 및 1280px에서 AppShell 최대 폭 512px 유지
- 긴 페이지와 짧은 페이지 사이 데스크톱 좌우 흔들림 제거
- Next.js 개발 표시기는 오른쪽 위에 있으며 Today를 가리지 않음

## 9. G2 변경 파일과 이유

| 파일 | 이유 |
| --- | --- |
| `src/app/globals.css` | 인증 셸의 데스크톱 스크롤바 폭 안정화 |
| `src/app/(app)/home/page.tsx` | 빠른 기록 핵심 문구의 본문 계층 정렬 |
| `src/app/(app)/tasks/page.tsx` | 페이지 설명을 16px/28px 계층으로 정렬 |
| `src/app/(app)/inbox/page.tsx` | 설명 타이포그래피와 헤더 간격 정렬 |
| `src/app/(app)/notes/page.tsx` | 설명 타이포그래피 정렬 |
| `src/app/(app)/projects/page.tsx` | 설명 타이포그래피 정렬 |
| `src/app/(app)/settings/page.tsx` | 설명 타이포그래피 정렬 |
| `src/app/(app)/more/page.tsx` | 제목 의미 순서, 설명 폭, 반응형 상단 간격 정렬 |
| `src/components/home/ria-message.tsx` | RIA 본문 크기와 한국어 행간 개선 |
| `src/components/inbox/inbox-list.tsx` | 목록 보조 설명 행간 명시 |
| `src/components/notes/note-list.tsx` | 목록 보조 설명 행간 명시 |
| `src/components/projects/project-list.tsx` | 목록 보조 설명 행간 명시 |

이 목록은 Phase G2의 시각 변경만 나타낸다. 작업 트리에는 커밋 전 Phase F/G1 변경도 함께 남아 있다.

## 10. 대표 전후 예시

1. Tasks/Notes/Projects/Settings 설명
   - 전: `text-[15px] leading-6`
   - 후: `text-base leading-7`
   - 결과: 모바일 본문 최소 16px 기준과 한국어 읽기 행간 일치
2. Inbox
   - 전: 헤더 `mb-6`, 설명 `15px/24px`
   - 후: 헤더 `mb-7`, 설명 `16px/28px`
   - 결과: 입력 섹션과의 호흡이 다른 목록 화면과 일치
3. More
   - 전: 작은 `More` 레이블 아래 문장형 제목
   - 후: `More`를 실제 H1으로 두고 설명을 아래에 배치
   - 결과: 다른 인증 화면과 제목 계층 및 접근성 의미 일치
4. 데스크톱 긴 페이지
   - 전: 스크롤바 생성 여부에 따라 콘텐츠 중심선이 약 8px 이동
   - 후: 인증 셸에 stable gutter 적용
   - 결과: 화면 전환 시 중심선 유지

## 11. 반응형 검증 결과

| 검증 | 결과 |
| --- | --- |
| 360×800 전체 인증 화면 | 가로 오버플로·잘림·컨트롤 겹침 없음 |
| 412×800 전체 인증 화면 | 가로 오버플로·잘림·컨트롤 겹침 없음 |
| 긴 Task/Inbox/Note/Project 문자열 | 안전하게 줄바꿈, 가로 스크롤 없음 |
| 768px | 단일 열과 셸 폭 유지 |
| 1280px | 512px 콘텐츠 폭, 일관된 중심선 유지 |
| BottomNav | 콘텐츠 가림 없음, safe-area 유지 |
| 200% 텍스트 위험 | 고정 너비 텍스트 버튼을 추가하지 않았으며 긴 레이블 줄바꿈 구조 유지 |

## 12. 기능 회귀 검증 결과

- Task: 검증용 긴 Task 생성 → 완료 영역 1회 표시 → 삭제 통과
- Inbox: 검증용 긴 항목 생성 → Task 전환 → 전환된 Task 삭제 통과
- Notes: 생성 → 편집 취소 → 편집 저장 → 삭제 통과
- Projects: 긴 이름 Project 생성 → 삭제 통과
- Settings: 존댓말 → 편한 말투 저장 → 새로고침 유지 → 존댓말 복원 → 새로고침 유지 통과
- Home: 복원된 존댓말이 인사와 AppShell 문구에 반영됨을 확인
- Home 방향 저장: 현재 계정의 값이 비어 있고 빈 값은 저장할 수 없으며 삭제/원복 경로가 없어 테스트 데이터를 남기지 않기 위해 실제 mutation은 수행하지 않았다. 기존 action 연결과 필드 계약이 변경되지 않았음을 정적으로 확인했다.
- Project 삭제 후 연결 Task 유지: G2에서 생성한 Project에는 연결 Task가 없어 실제 연결 상태 회귀는 재현하지 않았다. 관련 action·query 계약은 변경하지 않았고 Phase F에서 확인된 동작을 보존한다.
- 모든 검증용 Task, Inbox, Note, Project 데이터는 제거했으며 최종 말투는 원래 `formal`로 복원했다.

정적 검증:

- `git diff --check`: 통과(LF→CRLF 안내만 존재)
- `tsc --noEmit --incremental false`: 통과
- `npm.cmd run build`: 통과
- 빌드의 기존 `<img>` 및 미사용 변수 lint 경고 4건은 실패가 아니며 G2 범위에서 변경하지 않음
- 변경/미추적 파일 strict UTF-8 디코딩: 통과
- replacement character 및 지정 mojibake 표식 검색: 없음
- 브라우저 콘솔의 신규 error: 없음
- focus-visible: 2.4px solid outline과 offset 확인
- reduced-motion: 기존 전역 미디어 쿼리 유지 확인

## 13. 알려진 잔여 시각 이슈

- 200% 텍스트 확대는 구조·줄바꿈·터치 영역 기준으로 검토했지만 실제 모바일 OS의 시스템 글꼴 확대 조합은 실기기 확인이 필요하다.
- 모바일 키보드와 BottomNav 회피는 브라우저 규칙이 유지되지만 iOS/Android 실기기별 키보드 높이 차이는 별도 실기기 검증이 필요하다.
- 빌드에 기존 `<img>` 최적화 경고가 남아 있으나 이미지 컴포넌트 전환은 이번 시각 정렬 범위 밖이다.
- Home 방향 저장은 안전한 원복 경로가 없는 계정 상태 때문에 비파괴 E2E를 수행하지 못했다.

## 14. 국제화·PWA 단계로 보류한 항목

- 독일어·러시아어 등 실제 번역 문자열을 적용한 레이블 길이 검증
- 언어별 고아줄·문장부호·복합어 줄바꿈 세부 조정
- 국제화 dictionary/framework 도입
- iPhone/Android standalone 실기기 safe-area 및 키보드 검증
- manifest, service worker, 설치 흐름, offline 상태
- OS별 시스템 폰트 렌더링 차이와 PWA 개발 표시기 외 production 설치 UI 검증

## 15. 커밋 여부

Phase G2 구현·검증·보고서 작성 후 **커밋하지 않았다**. 현재 변경 사항은 사용자의 diff 검토와 커밋 승인 전 상태로 남아 있다.
