"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getAuthErrorMessage } from "@/lib/auth-error-messages";

const googleAuthEnabled = process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === "true";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage("Google 로그인 설정이 필요해요. 관리자에게 문의해주세요.");
    }

    setLoading(false);
  }

  async function handleGoogleSignUp() {
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage("Google 회원가입 설정이 필요해요. 관리자에게 문의해주세요.");
    }

    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage(getAuthErrorMessage(error));
      } else {
        setMessage("가입 완료! 이제 로그인해봐.");
        setMode("signin");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(getAuthErrorMessage(error));
      } else {
        window.location.href = "/home";
      }
    }

    setLoading(false);
  }

  return (
    <div className="space-y-4">
      {googleAuthEnabled && (
        <>
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="border-divider w-full rounded-xl border bg-card-white py-3 text-[16px] font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Google로 로그인
            </button>
            <button
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="border-divider w-full rounded-xl border bg-card-white py-3 text-[16px] font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              Google로 회원가입
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-divider" />
            <span className="text-stone text-[13px]">또는</span>
            <div className="flex-1 border-t border-divider" />
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-stone mb-1 block text-[13px]">
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-divider w-full rounded-xl border bg-card-white px-4 py-3 text-[16px] outline-none focus:border-gold"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-stone mb-1 block text-[13px]">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="border-divider w-full rounded-xl border bg-card-white px-4 py-3 text-[16px] outline-none focus:border-gold"
          placeholder="6자 이상"
        />
      </div>

      {message && <p className="text-[13px] text-red-500">{message}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-gold w-full rounded-xl py-3 text-[16px] font-medium text-card-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "잠깐만..." : mode === "signup" ? "가입하기" : "로그인"}
      </button>

      <button
        type="button"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="text-stone w-full text-[13px] underline"
      >
        {mode === "signin" ? "처음이야? 가입하기" : "이미 계정 있어? 로그인"}
      </button>
    </form>
    </div>
  );
}
