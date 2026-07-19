import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col justify-center px-5">
      <div className="mb-8 text-center">
        <img
          src="/Ria-main.jpg"
          alt="RIA"
          className="mx-auto mb-6 h-48 w-auto object-contain"
        />
        <p className="text-gold text-sm tracking-wide uppercase">RIA</p>
        <h1 className="mt-2 text-2xl font-light">안녕하세요. 오늘도 함께 하루를 시작해볼까요?</h1>
        <p className="text-stone mt-2 text-sm">Build for calm, not productivity.</p>
      </div>
      <LoginForm />
    </div>
  );
}
