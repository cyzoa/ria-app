"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/RIA_20260709_VIDEO.MP4";
    video.preload = "auto";
    video.oncanplaythrough = () => setVideoReady(true);
    video.onerror = () => setVideoReady(false);

    return () => {
      video.oncanplaythrough = null;
      video.onerror = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-warm-white">
      <section className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <div className="relative mx-auto mb-8 flex h-64 w-full max-w-xl items-center justify-center overflow-hidden rounded-[28px] border border-divider bg-card-white shadow-sm">
            <img
              src="/Ria-main.jpg"
              alt="RIA preview"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoReady ? "opacity-0" : "opacity-100"}`}
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/Ria-main.jpg"
              onLoadedData={() => setVideoReady(true)}
              className={`h-full w-full object-cover transition-opacity duration-500 ${videoReady ? "opacity-100" : "opacity-0"}`}
            >
              <source src="/RIA_20260709_VIDEO.MP4" type="video/mp4" />
            </video>
          </div>
          <h1 className="mb-4 text-[56px] font-light leading-tight tracking-tight text-soft-black">
            당신의 하루가 조금 가벼워집니다.
          </h1>
          <p className="mb-12 text-[20px] text-stone">
            RIA는 조용히 당신의 리듬을 지켜줘요.
          </p>
          <Link
            href="/login"
            className="bg-gold inline-block rounded-xl px-8 py-4 text-[18px] font-medium text-card-white transition-opacity hover:opacity-90"
          >
            시작하기
          </Link>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="border-divider rounded-2xl border bg-card-white p-8">
            <h3 className="mb-2 text-[20px] font-medium">일정 정리</h3>
            <p className="text-stone text-[16px]">
              오늘 해야 할 일을 한눈에 정리해요.
            </p>
          </div>

          <div className="border-divider rounded-2xl border bg-card-white p-8">
            <h3 className="mb-2 text-[20px] font-medium">리듬 관리</h3>
            <p className="text-stone text-[16px]">
              에너지와 우선순위에 맞춰 하루의 흐름을 잡아줘요.
            </p>
          </div>

          <div className="border-divider rounded-2xl border bg-card-white p-8">
            <h3 className="mb-2 text-[20px] font-medium">음성 대화</h3>
            <p className="text-stone text-[16px]">
              말로 일정을 추가하고, 바꾸고, 확인할 수 있어요.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-[28px] font-light tracking-tight">
            Today&apos;s Preview
          </h2>
          <div className="border-divider rounded-2xl border bg-card-white p-8">
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-stone w-20 text-[16px]">09:30</span>
                <span className="text-[16px]">아침 정리</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-stone w-20 text-[16px]">11:00</span>
                <span className="text-[16px]">미팅</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-stone w-20 text-[16px]">15:00</span>
                <span className="text-[16px]">병원 예약</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-stone w-20 text-[16px]">20:00</span>
                <span className="text-[16px]">휴식</span>
              </div>
            </div>
            <div className="border-divider border-t pt-6">
              <p className="text-[16px]">
                “오늘은 오후 일정이 조금 무거워 보여요. 오전에는 가볍게 시작해볼까요?”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-[28px] font-light tracking-tight">
            더 나은 하루를 시작해볼까요?
          </h2>
          <p className="mb-8 text-stone text-[16px]">
            RIA와 함께 조용히 하루의 리듬을 만들어보세요.
          </p>
          <Link
            href="/login"
            className="bg-gold inline-block rounded-xl px-8 py-4 text-[18px] font-medium text-card-white transition-opacity hover:opacity-90"
          >
            지금 시작하기
          </Link>
        </div>
      </section>
    </div>
  );
}
