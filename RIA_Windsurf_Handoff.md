# 윈디에게 — RIA 2단계 작업 (디자인 & 보이스 적용)

안녕. 나는 RIA 프로젝트를 진행 중이고, 방금 Cursor에서 여기로 작업을 옮겨왔어.

지금 상태:
- Next.js + Supabase 기반 RIA MVP가 이미 로컬에서 정상 작동 중 (`npm run dev`로 확인됨)
- Home 화면(Daily Brief)까지 완성돼있고, Task/Project/Inbox/Notes 기본 구조도 있음
- 이제 여기에 디자인 시스템이랑 카피 톤을 입히는 작업이 필요해

프로젝트 폴더 안에 있는 이 두 문서를 기준으로 작업해줘:
- `RIA_Design_Philosophy_v0.2.md` — 색상/타이포/스페이싱/모션 규칙
- `RIA_Voice_Guide_v0.1.md` — 모든 화면의 실제 카피(문구)

## 작업 순서

**1단계: 디자인 토큰 세팅**
Design Philosophy의 Color Palette / Typography / Spacing / Motion 섹션 기준으로 `tailwind.config.ts`에 커스텀 토큰 추가.
- Gold는 하드코딩 금지, 반드시 토큰으로만 참조, 화면당 2곳 이하로 제한

**2단계: 기존 화면에 토큰 적용**
Home 화면부터 시작해서 배경/카드/타이포/여백을 문서 기준으로 재조정.

**3단계: Voice Guide 카피 전체 적용**
Empty state, Task 생성/완료/삭제, 시간대별 인사말, Error/Offline/Loading 메시지를 전부 Voice Guide 문구로 교체. 금지어 목록에 있는 시스템 용어는 코드 어디에도 남아있으면 안 됨.

**4단계: 모션 적용**
화면 전환 150~200ms fade, Task 완료 체크 0.3초 이내 부드러운 애니메이션. Bounce/Pop/Shake 계열은 전부 금지.

---

한 번에 다 바꾸지 말고, 1~2단계(토큰 + Home 화면)부터 끝내고 스크린샷으로 보여줘. 확인되면 다음 단계로 넘어갈게.
