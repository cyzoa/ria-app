"use client";

import { getDictionary } from "@/locales";

interface Props {
  rhythmType?: "Calm" | "Focus" | "Recovery" | "Light" | "Deep Work";
}

export function TodayRhythmCard({ rhythmType = "Calm" }: Props) {
  const copy = getDictionary().home.rhythm;

  return (
    <div className="border-divider mb-8 rounded-2xl border bg-card-white p-6 fade-in">
      <h2 className="mb-2 text-[13px] font-medium tracking-wide uppercase text-soft-black">
        {copy.title}
      </h2>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[24px] font-light text-gold">{rhythmType}</span>
      </div>
      <p className="text-stone text-[16px]">{copy.descriptions[rhythmType]}</p>
    </div>
  );
}
