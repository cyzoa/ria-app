"use client";

interface Props {
  rhythmType?: "Calm" | "Focus" | "Recovery" | "Light" | "Deep Work";
}

export function TodayRhythmCard({ rhythmType = "Calm" }: Props) {
  const rhythmMessages: Record<string, string> = {
    Calm: "오늘은 무리하지 않고 안정적으로 가는 날이에요.",
    Focus: "오늘은 중요한 것에 집중하는 날이에요.",
    Recovery: "오늘은 충분히 쉬고 회복하는 날이에요.",
    Light: "오늘은 가볍게 흐르는 날이에요.",
    "Deep Work": "오늘은 깊이 있는 작업에 몰입하는 날이에요.",
  };

  return (
    <div className="border-divider mb-8 rounded-2xl border bg-card-white p-6 fade-in">
      <h2 className="mb-2 text-[13px] font-medium tracking-wide uppercase text-soft-black">
        오늘의 리듬
      </h2>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[24px] font-light text-gold">{rhythmType}</span>
      </div>
      <p className="text-stone text-[16px]">{rhythmMessages[rhythmType]}</p>
    </div>
  );
}
