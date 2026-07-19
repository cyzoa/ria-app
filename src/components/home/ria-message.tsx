"use client";

interface Props {
  message?: string;
}

export function RiaMessage({ message = "오늘은 오후 일정이 조금 무거워 보여요. 오전에는 중요한 것 하나만 먼저 끝내볼까요?" }: Props) {
  return (
    <div className="border-divider mb-8 rounded-2xl border bg-card-white p-6 fade-in">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10">
          <span className="text-gold text-[16px]">RIA</span>
        </div>
        <p className="text-[16px] leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
