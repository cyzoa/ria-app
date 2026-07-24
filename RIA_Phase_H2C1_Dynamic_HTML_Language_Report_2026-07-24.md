# RIA Phase H2C-1 — Dynamic HTML Language 구현 보고서

- 브랜치: `design/ria-mobile`
- 작성일: 2026-07-24
- 상태: 구현 및 검증 완료, 미커밋

## 구현

루트 App Router 레이아웃이 기존 `getRequestLocale()`로 `ria_locale` 쿠키를 해석하고, 기존 `INTL_LOCALES` 매핑을 사용해 서버가 생성하는 `<html lang>`을 요청 locale에 맞게 설정하도록 변경했다.

LocaleProvider, dictionary 로딩, locale 변경 Server Action, 인증, Supabase 및 데이터 흐름은 변경하지 않았다. metadata, viewport, body class, 폰트와 개발 표시기 설정도 그대로 유지했다.

## locale 매핑

| locale | `<html lang>` |
| --- | --- |
| `ko` | `ko-KR` |
| `en` | `en` |
| `ja` | `ja-JP` |
| `es` | `es` |
| `fr` | `fr` |
| `de` | `de` |
| `ru` | `ru` |
| 누락 또는 잘못된 값 | `ko-KR` |

## 변경 파일

- `src/app/layout.tsx`: 루트 레이아웃에서 요청 locale을 해석하고 동적 `lang` 값을 출력한다.
- `RIA_Phase_H2C1_Dynamic_HTML_Language_Report_2026-07-24.md`: 구현 범위와 검증 결과를 기록한다.

## 검증 결과

- 7개 지원 locale의 서버 응답 HTML 및 인증된 Settings DOM에서 기대한 `lang` 값 확인
- locale 쿠키 누락 및 잘못된 값에서 한국어 `ko-KR` fallback 확인
- 언어 변경 후 hydration warning, console error 및 console warning 없음
- 사용자 locale을 검증 후 한국어로 복원
- `git diff --check`: 통과
- `tsc --noEmit --incremental false`: 통과
- `npm run build`: 통과
- `package.json`, `package-lock.json`: 변경 없음

## 영향 범위

요청 locale에 따른 문서 언어 메타데이터만 변경된다. locale-prefixed route, 인증, 데이터베이스, RLS, Server Action 계약, 사용자 데이터 및 패키지에는 영향이 없다.
