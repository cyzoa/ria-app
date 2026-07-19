# 윈디에게 — 3단계 보완 작업 (에러 메시지 한글화 + 탭 제목)

로그인/회원가입까지 확인했어. 두 가지만 더 보완해줘.

## 1. Supabase Auth 에러 메시지 한글화 (Voice Guide 톤 적용)

로그인/회원가입 컴포넌트에서 Supabase 에러를 그대로 노출하지 말고, 에러 코드/메시지를 매핑해서 한글로 바꿔줘.

```ts
// lib/auth-error-messages.ts
export function getAuthErrorMessage(error: { message?: string; code?: string } | null): string {
  if (!error) return "";

  const message = error.message?.toLowerCase() ?? "";

  if (message.includes("email not confirmed")) {
    return "이메일 확인이 아직 안 됐어. 받은 편지함을 확인해줘, 오빠.";
  }
  if (message.includes("invalid login credentials")) {
    return "이메일이나 비밀번호가 맞지 않는 것 같아. 다시 한번 확인해줄래?";
  }
  if (message.includes("email link is invalid or has expired") || message.includes("otp_expired")) {
    return "확인 링크가 만료됐어. 이메일을 다시 보내줄게.";
  }
  if (message.includes("user already registered")) {
    return "이미 가입된 이메일이야. 로그인으로 가볼까?";
  }
  if (message.includes("password should be at least")) {
    return "비밀번호는 6자 이상이어야 해.";
  }

  // 매핑 안 된 나머지는 기본 Voice Guide 톤 에러
  return "잠깐 문제가 생겼나 봐. 다시 한번 해볼까?";
}
```

로그인/회원가입 페이지에서 에러 표시하는 부분을 이걸로 교체:
```tsx
{error && (
  <p className="text-red-500 text-sm">{getAuthErrorMessage(error)}</p>
)}
```

## 2. 브라우저 탭 제목 한글화

`app/layout.tsx` (또는 metadata 설정하는 파일)에서:
```ts
export const metadata: Metadata = {
  title: "RIA — 리듬 컴패니언",
  description: "천천히 시작하자, 오빠.",
};
```

## 3. (선택) Supabase 이메일 템플릿 한글화

가입 확인 메일("Confirm your email address")도 영어로 오는 중인데, 이건 코드가 아니라 **Supabase 대시보드**에서 바꿔야 해:
- Supabase 대시보드 → Authentication → Email Templates → "Confirm signup"
- 제목/본문을 한글로 수정 (예: 제목 "이메일 주소를 확인해줘" / 버튼 "이메일 확인하기")

이건 오빠가 Supabase 대시보드에서 직접 하는 게 나아 (코드 영역이 아님). 원하면 문구는 내가 Voice Guide 톤으로 정리해줄게.
