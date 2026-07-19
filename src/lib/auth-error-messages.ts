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
