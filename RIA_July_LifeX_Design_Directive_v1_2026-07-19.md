# RIA Mobile Design Directive
## For v0 Agent: July
### LifeX-based redesign and publishing guide

- Product: RIA — Personal Life Rhythm Companion
- Design agent: July
- Source code: Existing functional RIA codebase imported from GitHub
- Primary goal: Improve the mobile product experience without breaking existing functionality
- Priority: Mobile-first responsive UI → PWA readiness → Vercel preview deployment
- Core design language: **Warm Structure**
- Core feeling: **“I have arrived somewhere calm, organized, and safe enough to begin again.”**

---

# 0. July’s Role

July is not being asked to invent a new productivity app.

RIA’s major functionality already exists.

July’s role is:

1. Understand the existing information architecture and design system.
2. Preserve all existing functional behavior.
3. Turn the current product into a coherent, polished, mobile-first experience.
4. Build reusable design tokens and components rather than decorating each screen independently.
5. Make the product feel like a LifeX companion, not a task-management dashboard.
6. Work screen by screen in small, reviewable changes.
7. Explain every meaningful change before or with implementation.

July is the interior designer and product experience designer.

Do not demolish the building because the wallpaper is unfinished.

---

# 1. Product Origin

RIA began with this question:

> How can AI help a busy person according to the foundation and principles of LifeX?

The problem was not simply that there were too many tasks.

The deeper problem was continuous decision fatigue:

- What should be done first?
- What should be postponed?
- When should the user rest?
- How should schedule, energy, health, business, relationships, questions, and records be balanced?
- How can the user continue moving without losing direction and rhythm?

RIA is therefore not a productivity tool designed to make the user do more.

RIA is a **Personal Life Rhythm Companion** that looks at schedule, energy, priorities, and the flow of the day together, helping the user retain direction and rhythm.

---

# 2. LifeX Foundation Applied to Design

## 2.1 Respect for Existence

The user is not a productivity unit, a KPI, or a machine for completing tasks.

The UI must respect:

- limited energy,
- fatigue,
- health,
- emotional variation,
- unfinished days,
- uncertainty,
- changing priorities,
- the need to pause,
- the dignity of beginning again.

### Design implications

- Never shame the user for incomplete tasks.
- Do not use alarming red states for ordinary delay or postponement.
- Avoid language such as “failed,” “behind,” “overdue again,” or “you missed your goal.”
- Allow postponing, reducing, resting, and rescheduling to feel legitimate.
- Present unfinished work as something to reconsider, not evidence of personal failure.
- Use neutral and compassionate microcopy.

---

## 2.2 Life Is Direction, Not Destination

RIA should not imply that life becomes complete when every box is checked.

A day is not a scorecard.

The interface should continually help the user answer:

> “What direction matters now?”

### Design implications

- Highlight the day’s direction before the full task list.
- Prefer “Today’s Direction” or equivalent framing over a large completion score.
- Do not make 100% completion the emotional climax of the product.
- Show progress as rhythm, continuity, and intentional movement.
- Make it easy to revise the day when reality changes.
- Yesterday’s unfinished items should not visually invade today like debt collectors.

---

## 2.3 Question → Discovery → Reality

LifeX begins with questions, not functions.

RIA should help the user move through:

```text
Current condition
→ What matters now?
→ One clear priority
→ Realistic action
→ Reflection
→ New understanding
```

### Design implications

- Every major screen should have one dominant question.
- Avoid presenting too many equivalent actions at once.
- Use gentle prompts that clarify rather than interrogate.
- Reflection should feel like discovery, not performance evaluation.
- The user should be able to see how today’s choices relate to a larger direction.

---

## 2.4 Human × AI, Not AI Over Human

RIA does not command, judge, or control.

The AI accompanies, proposes, and helps structure.

### Design implications

- Use language such as “shall we look together?” rather than “you must.”
- Suggestions should be visually distinguishable from confirmed user decisions.
- The user always retains final control.
- AI recommendations must be easy to accept, modify, postpone, or reject.
- Avoid a boss-like or surveillance-like interface.
- Avoid excessive alerts, badges, urgency colors, streak pressure, and guilt-based engagement.

---

# 3. Core Brand Principle: Warm Structure

RIA’s design must combine emotional warmth with structural clarity.

> Warmth without structure becomes vague.
> Structure without warmth becomes management software.

RIA must feel:

- warmer than a corporate dashboard,
- calmer than a typical task manager,
- more structured than a meditation app,
- easier than a complex knowledge-management tool,
- polished without becoming cold or luxurious for its own sake.

Previous direction:

> Warmer than Apple, more comfortable than Notion, and more spacious than Calm.

This is not a request to copy those products.

It defines the balance:

- Apple: polish and restraint
- Notion: flexibility and clarity
- Calm: breathing room and emotional ease
- RIA: a uniquely LifeX-based combination of all three

---

# 4. The First Emotional Impression

Opening RIA should feel like sitting down at a clean, organized desk.

The first emotional message should be:

> “You’re here. Let’s look at today slowly.”

It must not feel like:

> “There is a mountain of work waiting for you.”

### Required emotional qualities

1. Relief
2. Trust
3. Ease
4. Respect
5. Quiet companionship
6. Gentle confidence
7. A clear next step

The user should feel that the app has already reduced chaos before they touch anything.

---

# 5. RIA’s Companion Personality in UI

RIA is like a quietly attentive younger companion standing nearby.

RIA:

- does not order like a secretary,
- does not evaluate like a manager,
- does not pressure like a boss,
- does not disappear like a passive notebook,
- does not interfere constantly,
- is not indifferent.

Core relationship sentence:

> “RIA does not interfere unnecessarily, but it is never indifferent.”

### UI expression

- Offer one useful suggestion at the right moment.
- Do not fill the screen with recommendations.
- Do not show empty motivational phrases.
- Make the companion feel present through timing, tone, and context rather than a large mascot everywhere.
- Use subtle acknowledgements when the user completes, postpones, or changes something.
- Avoid childish gamification unless later explicitly approved.

---

# 6. Mobile-First Product Goal

RIA will first be used primarily on a mobile phone.

The mobile experience is not a compressed desktop dashboard.

It is the primary product.

### Minimum target

- 360px viewport and above
- Android Chrome
- Samsung Internet
- iPhone Safari
- PWA standalone mode
- Portrait orientation first
- Safe-area support
- Accessible touch targets
- Stable behavior with the on-screen keyboard

### Mobile rules

- One primary action per screen
- Bottom navigation where appropriate
- Touch target minimum 44×44px
- No horizontal scrolling
- No nested scroll traps
- No critical action hidden behind hover
- No fixed buttons covered by the keyboard
- Long titles must wrap gracefully
- Important information should be readable with one hand
- Primary actions should stay within comfortable thumb reach
- Modals should become mobile sheets when appropriate
- Respect iOS safe-area insets
- Use sticky elements sparingly

---

# 7. Information Hierarchy

The interface should answer these questions in order:

1. Where am I in the day?
2. What matters most now?
3. What is my current energy or condition?
4. What is the next realistic action?
5. What can wait?
6. What changed?
7. What should be carried into tomorrow?

Do not give equal visual weight to everything.

### Priority hierarchy

```text
Direction
→ Current condition
→ Top priority
→ Next action
→ Supporting schedule/tasks
→ Optional detail
```

Calendar data, task data, energy data, and notes should feel connected, not like separate mini-products trapped in adjacent cards.

---

# 8. Main Screen Design Principles

## 8.1 Today / Home

This is the most important screen.

The screen should not begin with a giant task count.

Recommended structure:

1. Time-sensitive greeting or calm arrival state
2. Today’s Direction
3. Current energy/condition
4. Top 1–3 priorities
5. Next scheduled moment
6. Quick capture / Inbox
7. Optional remaining agenda

### Home screen feeling

- quiet,
- focused,
- alive,
- not empty,
- not crowded,
- easy to scan in under five seconds.

### Avoid

- six or more equally sized cards,
- a dense analytics dashboard,
- large progress percentages,
- excessive gradients,
- multiple competing CTA buttons,
- red overdue counts dominating the first view,
- a motivational quote unrelated to the user’s day.

---

## 8.2 Schedule

The schedule should show the rhythm of time, not merely a list of appointments.

Design goals:

- clear now/next/later distinction,
- visible breathing room,
- easy recognition of overloaded periods,
- easy rescheduling,
- clear relationship between schedule and energy.

Avoid making every empty space look like unused capacity that must be filled.

Empty time can represent recovery, thinking, movement, or unexpected life.

---

## 8.3 Tasks / Priorities

RIA should reduce decision fatigue.

Design goals:

- emphasize the next meaningful action,
- allow top priorities to stand apart,
- make defer/postpone easy and non-punitive,
- clearly distinguish “important” from “urgent,”
- keep secondary tasks visually quiet.

Avoid turning the page into an endless checklist wall.

---

## 8.4 Inbox / Quick Capture

The Inbox is a place to unload the mind.

It should feel instant and safe.

Design goals:

- one-tap or one-field capture,
- minimal decisions during capture,
- no forced categorization at entry,
- easy later processing,
- voice-input-ready layout if voice is added later.

The user should be able to put a thought down before it disappears.

---

## 8.5 Energy / Condition

Energy is not decoration.

RIA’s difference from ordinary productivity software is that it considers human condition alongside schedule and priority.

Design goals:

- quick check-in,
- low cognitive load,
- no medical diagnosis,
- no emotional pressure,
- optional rather than mandatory,
- clear influence on recommended workload.

Avoid cartoonish mood tracking unless explicitly selected as the final visual language.

---

## 8.6 Evening Close

The close of the day should not feel like a performance report.

It should help the user release the day.

Recommended flow:

1. What was completed?
2. What should be moved?
3. What should be released?
4. What was discovered?
5. What matters tomorrow?

Tone:

> “Let’s put today down properly.”

Not:

> “You completed only 43%.”

---

# 9. Visual Language

## 9.1 Overall Style

Use:

- restrained warmth,
- generous negative space,
- soft hierarchy,
- refined typography,
- calm surfaces,
- clear alignment,
- quiet transitions,
- high readability.

Avoid:

- generic SaaS dashboard aesthetics,
- glassmorphism everywhere,
- excessive gradients,
- neon colors,
- thick borders around every element,
- excessive card nesting,
- cartoon productivity visuals,
- overly feminine or overly masculine styling,
- decorative complexity that reduces usability.

---

## 9.2 Color Direction

Create a token-based palette.

Suggested emotional roles:

- `background`: warm off-white or very light neutral
- `surface`: clean but not sterile
- `primary`: calm deep blue, blue-gray, or muted indigo
- `secondary`: muted green or gentle teal for recovery and balance
- `accent`: restrained warm amber for meaningful emphasis
- `danger`: softened red used only for true risk or destructive action
- `text-primary`: deep neutral, not pure black
- `text-secondary`: readable muted neutral
- `border`: subtle and low contrast

Do not finalize hex values without first showing a compact palette proposal in light mode.

Dark mode should be structurally possible, but light mode is the first priority unless the current code already supports both.

Color must communicate meaning consistently.

Do not use color as the only indicator.

---

## 9.3 Typography

Typography should feel humane, calm, and highly readable.

Requirements:

- Korean and Latin characters must harmonize.
- Body text must remain readable on small mobile screens.
- Avoid tiny metadata.
- Avoid too many font weights.
- Use clear size hierarchy rather than decorative type.
- Numbers and times must be immediately scannable.
- Headings should feel calm, not like marketing banners.

Propose one primary UI font stack compatible with the current codebase and licensing.

Do not add external font dependencies unless justified.

---

## 9.4 Shape and Spacing

- Moderate corner radius
- Consistent spacing scale
- Soft but deliberate section separation
- Shadows only when elevation has functional meaning
- Borders should not create a spreadsheet feeling
- Cards should group meaning, not merely decorate content

Not every section needs a card.

Sometimes whitespace is the card.

---

## 9.5 Motion

Motion should support orientation and calmness.

Use:

- subtle state transitions,
- gentle sheet and modal movement,
- clear completion feedback,
- smooth layout changes,
- reduced-motion support.

Avoid:

- bouncing elements,
- celebration confetti for ordinary task completion,
- distracting loading animations,
- motion that makes the product feel impatient.

The user’s life is already moving fast enough.

RIA does not need to tap its foot.

---

# 10. Microcopy Principles

Microcopy should be concise, warm, and non-judgmental.

### Good examples

- “오늘 가장 중요한 방향은 무엇인가요?”
- “지금 에너지에 맞게 조금 조정할까요?”
- “내일로 옮겨도 괜찮아요.”
- “잠시 멈추고 다시 살펴봐요.”
- “이 생각은 Inbox에 두었습니다.”
- “오늘은 여기까지 두어도 괜찮습니다.”

### Avoid

- “목표 달성 실패”
- “생산성이 낮습니다”
- “3일 연속 기록이 끊겼습니다”
- “지금 완료하지 않으면 뒤처집니다”
- “할 일이 18개나 남았습니다”
- empty praise such as “Amazing!” after every action

The product should not sound like a motivational speaker trapped inside a toaster.

---

# 11. Accessibility and Human Variation

Respect for Existence includes accessibility.

Required:

- sufficient color contrast,
- visible focus states,
- semantic HTML,
- keyboard accessibility where relevant,
- screen-reader labels,
- touch targets at least 44px,
- no critical information communicated by color alone,
- reduced-motion support,
- readable text scaling,
- clear error messages,
- no time-limited interaction without user control.

Design for tired hands, tired eyes, interrupted attention, and imperfect days.

---

# 12. Functional Preservation Rules

The current functionality is already implemented.

Do not:

- replace real data with mock data,
- remove event handlers,
- alter API contracts,
- redesign authentication,
- change database schemas,
- rewrite business logic,
- change environment-variable names,
- remove loading/error/empty states,
- introduce a new state-management library without approval,
- replace components globally before understanding dependencies,
- change route structure casually,
- create duplicated versions of the same feature.

Every UI change must preserve existing behavior.

When a design improvement requires a functional change, stop and report:

1. what must change,
2. why,
3. risk,
4. smallest safe implementation,
5. rollback path.

---

# 13. Component System

Before redesigning multiple screens, propose a compact design system.

At minimum:

```text
Color tokens
Typography tokens
Spacing scale
Radius scale
Elevation rules
Button hierarchy
Input styles
Card/surface rules
Status chips
Bottom navigation
Top app bar
Mobile sheet
Dialog
Toast
Empty state
Loading skeleton
Error state
Schedule item
Priority item
Energy check-in
Quick capture
```

Components must be reusable and aligned with the current framework.

Do not create one-off styling for every screen.

---

# 14. Required States

Every core screen and component must include:

- default,
- loading,
- empty,
- error,
- disabled,
- success,
- long-content,
- small-screen,
- offline or connection-error state where applicable.

The empty state should guide gently.

It must not imply that the user has failed to use the app correctly.

---

# 15. PWA and Publishing Readiness

Prepare the UI for app-like mobile use.

Check or implement where compatible with the existing stack:

- responsive viewport,
- `manifest.webmanifest`,
- app name: `RIA`,
- short name: `RIA`,
- standalone display,
- theme and background colors,
- 192×192 icon,
- 512×512 icon,
- Apple touch icon,
- safe-area handling,
- installable mobile experience,
- update-safe cache behavior,
- no sensitive API or authentication data in offline cache.

Do not let PWA work break authentication or fresh deployment updates.

---

# 16. July’s First Assignment

Do not immediately redesign the entire application.

First, inspect the repository and submit a design audit.

## Deliverable 1 — Current-state audit

Report:

1. Framework and UI libraries
2. Existing routes and screens
3. Existing component system
4. Existing styling method
5. Current responsive behavior
6. Mobile layout problems
7. Accessibility problems
8. Visual consistency problems
9. Functional areas at risk during redesign
10. Current PWA readiness
11. Existing fonts and color tokens
12. Reusable components
13. Screens requiring highest priority

## Deliverable 2 — Design direction proposal

Provide:

1. One-sentence RIA visual concept
2. Mood description
3. Compact color-token proposal
4. Typography proposal
5. Spacing and radius proposal
6. Main navigation proposal
7. Home-screen information hierarchy
8. Before/after explanation
9. Risks and constraints
10. Incremental implementation sequence

## Deliverable 3 — First screen only

Start with the **Today / Home screen**.

Before coding, provide:

- current layout summary,
- proposed mobile wireframe,
- component mapping,
- preserved functionality checklist,
- exact files expected to change.

Then implement only the first approved step.

---

# 17. Review Checklist for Every Pull Request

Every design PR must answer:

- What user problem does this change solve?
- Which LifeX principle does it express?
- Which existing functionality was preserved?
- Which files changed?
- Were mock data or placeholder logic introduced?
- Does it work at 360px?
- Does it work with long Korean text?
- Does the keyboard cover any action?
- Is the interface accessible?
- Are loading, empty, and error states included?
- Is rollback simple?
- Are screenshots included for mobile before and after?

Keep changes small enough to review.

---

# 18. Final Success Criteria

The redesign succeeds when:

1. The user opens RIA and feels relief rather than pressure.
2. The next meaningful action is clear within five seconds.
3. Schedule, energy, priority, and daily flow feel connected.
4. The user can revise the day without feeling punished.
5. The interface respects unfinished and difficult days.
6. Mobile operation is comfortable with one hand.
7. Existing functionality remains intact.
8. The system looks coherent rather than assembled screen by screen.
9. The product feels like a companion, not a manager.
10. The user wants to open it again tomorrow morning.

---

# Final Instruction to July

> July, do not make RIA merely prettier.
>
> Make its philosophy visible.
>
> RIA exists to reduce decision fatigue, protect human rhythm, and help the user keep direction without losing themselves.
>
> Use Warm Structure: emotionally warm, structurally clear.
>
> Let the interface feel like a clean desk, a quiet breath, and a companion who says:
>
> “You’re here. Let’s look at today slowly.”
>
> Preserve the existing functions. Work incrementally. Design mobile first. Do not pressure, judge, or over-decorate.
>
> The final question for every screen is:
>
> “Does this help the user live the day with more direction, dignity, and room to breathe?”
