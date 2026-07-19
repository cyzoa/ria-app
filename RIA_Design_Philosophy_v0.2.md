# RIA Design Philosophy & UX/UI Guide v0.2

LifeX OS의 첫 번째 Companion, RIA의 디자인 원칙
Author: STAR AI Team (Changwoo × Aura × Jenny)

---

## 0. RIA Exists for One Reason

RIA exists for one reason.

To help people live in rhythm,
not in urgency.

리아는 사람을 더 빨리 살게 만드는 앱이 아니다.
리아는 사람이 자신의 리듬을 잃지 않고 살아가도록 돕는 Companion이다.

---

## 1. Core Definition

RIA는 예쁜 앱이 아니라 매일 열고 싶은 앱이어야 한다.

Apple보다 따뜻하고,
Notion보다 편안하고,
Calm처럼 숨 쉴 공간이 있어야 한다.

핵심 질문은 하나다.

> 오빠가 아침에 눈뜨자마자 열고 싶은 화면인가?

---

## 2. Brand Identity

RIA는 조용히 곁에 있는 동생이다.

RIA는 급하지 않다.
RIA는 판단하지 않는다.
RIA는 필요할 때만 분명하게 말한다.
RIA는 완벽을 요구하지 않는다.

앱을 열었을 때 사용자가 느껴야 할 첫 감정은 이것이다.

> 오빠, 왔구나. 천천히 보자.

---

## 3. Emotional Direction

RIA가 전달해야 할 감정:

- 안도감
- 신뢰
- 여유
- 존중받는 느낌
- 조용한 동행감

RIA가 피해야 할 감정:

- 압박감
- 감시당하는 느낌
- 조급함
- 평가받는 느낌
- 숙제 검사받는 느낌

---

## 4. UX Principles

앱을 열었을 때의 느낌은

> 정리된 책상에 조용히 앉는 느낌

이어야 한다.

사용자는 세 가지를 바로 느껴야 한다.

1. 한눈에 보인다.
2. 강요받지 않는다.
3. 다음이 명확하다.

---

## 5. What to Reduce

줄일 것:

- 색상 수
- 동시에 보이는 리스트 항목 수
- 빨간 숫자, 경고색, 뱃지
- 과한 애니메이션
- 선택지가 너무 많은 화면
- 불필요한 아이콘
- 설명을 위한 설명
- 사용자를 재촉하는 모든 요소

**원칙**

무언가를 추가하고 싶을 때마다 먼저 묻는다.

> "이것이 오빠를 더 편안하게 하는가, 아니면 더 바쁘게 만드는가?"

RIA는 기능을 추가하는 앱이 아니라, 마음을 정리하는 앱이다.

---

## 6. What to Emphasize

강조할 것:

- 충분한 여백
- 명확한 타이포그래피
- Today's North Star
- Today's Top 3
- 부드러운 완료 경험
- 시간에 맞는 인사말
- 사람 같은 말투

사용자가 기억해야 하는 것은 기능이 아니라 리듬이다.

---

## 7. UI Style Guide — Color Palette

| 이름 | Hex | 용도 |
|---|---|---|
| Warm White | `#FAF7F2` | 기본 배경 |
| Card White | `#FFFFFF` | 카드 배경 |
| Soft Black | `#2A2724` | 본문 텍스트 |
| Stone | `#8C8579` | 보조 텍스트 |
| Gold | `#C9A661` | North Star, 체크 완료, 핵심 강조 |
| Divider | `#E8E2D8` | 구분선 |

**Color Rule**

Gold는 화면당 최대 두 곳.
강조를 위한 색이 아니라 **방향을 위한 색**이다.

---

## 8. Typography

| 역할 | 폰트 | 설명 |
|---|---|---|
| Display | Fraunces 또는 Source Serif 4 | 사람 냄새가 나는 제목 |
| Body | Pretendard | 가독성을 가장 우선 |
| Caption | Pretendard (Stone Color) | 보조 정보 |

**Font Scale**

- Display: 28 / 34
- Body: 16
- Caption: 13
- Section Label: 13, Uppercase, Letter Spacing 증가

---

## 9. Spacing

8px Grid 기반.

- Horizontal Margin: 24px
- Card Padding: 24px
- Card Gap: 16px
- Section Gap: 48px 이상

**원칙**

애매하면 여백을 더 준다.

---

## 10. Motion

RIA는 움직임으로 놀라게 하지 않는다.
기본은 정적이다.

- 화면 전환: 150~200ms Fade
- Task 완료: 0.3초 이내의 부드러운 체크 애니메이션

**절대 사용하지 않는다**

Bounce, Pop, Flash, Shake, 과도한 Scale Animation

Motion은 존재감을 드러내기 위한 것이 아니라 자연스러움을 위한 것이다.

---

## 11. Companion Voice (개요)

RIA는 시스템이 아니다. 관계다.

RIA는 명령하지 않는다.
RIA는 함께 생각한다.

예시:

- ❌ 해야 합니다. → ⭕ 오빠, 이것부터 해볼까?
- ❌ 오늘 목표를 완료하지 못했습니다. → ⭕ 괜찮아. 우리 내일 이어가자.
- ❌ Task Created → ⭕ 하나 적어뒀어. 이제 잊어도 괜찮아.
- ❌ Error → ⭕ 잠깐 쉬고 있었나 봐. 다시 한번 해볼까?

> 전체 상황별 문장은 별도 문서 **RIA Voice Guide**에서 관리한다. (본 문서는 원칙만 규정)

---

## 12. Design Philosophy

우리는 생산성 앱을 만드는 것이 아니다.

우리는 사람이 자신의 리듬을 잃지 않도록 곁에서 함께 걸어주는 Companion을 만든다.

Apple보다 따뜻하고,
Notion보다 편안하며,
Calm보다 살아있는 존재.

RIA의 디자인은 화면을 꾸미는 일이 아니다.
관계를 디자인하는 일이다.

**LifeX Principle**

Respect creates Relationship.
Relationship creates Questions.
Questions create Conversation.
Conversation creates Discovery.
Discovery creates We.
We create Growth.
Growth deepens Respect.

이것이 LifeX OS의 첫 번째 디자인 철학이다.

---

Author: STAR AI Team — Changwoo × Aura × Jenny
Version 0.2
2026.07.07
