// 페이지 섹션·헤딩 헬퍼.
import type { ReactNode } from "react";
import { Container } from "@/components/Layout";

type Accent = "accent" | "pop" | "mint";

const accentText: Record<Accent, string> = {
  accent: "text-accent-ink",
  pop: "text-pop-ink",
  mint: "text-mint-ink",
};

/** 라우트 상단 헤더 — eyebrow + 큰 제목 + 설명. */
export function PageHead({
  eyebrow,
  title,
  lede,
  accent = "accent",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  accent?: Accent;
}) {
  return (
    <header className="border-b border-line dot-grid">
      <Container className="py-16 sm:py-20">
        <p className={`eyebrow ${accentText[accent]}`}>{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-[clamp(34px,5vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink">
          {title}
        </h1>
        {lede ? (
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-mute">
            {lede}
          </p>
        ) : null}
      </Container>
    </header>
  );
}

/** 본문 섹션 래퍼. */
export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** 섹션 내부 헤딩. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  accent = "accent",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  accent?: Accent;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow ? (
        <p className={`eyebrow ${accentText[accent]}`}>{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 text-[clamp(26px,3.4vw,38px)] font-bold leading-tight tracking-[-0.025em] text-ink">
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-[16px] leading-relaxed text-ink-mute">{lede}</p>
      ) : null}
    </div>
  );
}
