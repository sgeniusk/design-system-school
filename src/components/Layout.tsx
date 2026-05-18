// 사이트 공통 셸 — Container, SiteHeader, SiteFooter.
import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-shell px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/**
 * 별자리 로고 — 디자인 지식 그래프(온톨로지)를 직역한 마크.
 * 노드 색이 의미를 담는다: 인디고=개념, 코랄=분석.
 */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className="shrink-0"
    >
      <g
        stroke="#5B43F5"
        strokeOpacity="0.45"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <line x1="8" y1="8.5" x2="15.5" y2="16.5" />
        <line x1="23.5" y1="7" x2="15.5" y2="16.5" />
        <line x1="15.5" y1="16.5" x2="8.5" y2="24.5" />
        <line x1="15.5" y1="16.5" x2="24.5" y2="23" />
        <line x1="23.5" y1="7" x2="24.5" y2="23" />
      </g>
      <circle cx="15.5" cy="16.5" r="4" fill="#5B43F5" />
      <circle cx="8" cy="8.5" r="2.6" fill="#5B43F5" />
      <circle cx="24.5" cy="23" r="2.6" fill="#5B43F5" />
      <circle cx="23.5" cy="7" r="2.6" fill="#FF5C38" />
      <circle cx="8.5" cy="24.5" r="2.6" fill="#FF5C38" />
    </svg>
  );
}

const navLinks = [
  { href: "/learn", label: "배우기" },
  { href: "/wiki", label: "위키" },
  { href: "/collection", label: "컬렉션" },
  { href: "/design-md", label: "DESIGN.md" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandMark />
          <span className="text-[15px] font-bold tracking-tight text-ink">
            Design System School
          </span>
        </Link>
        <nav
          aria-label="주요 메뉴"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-pill px-3.5 py-2 text-[14px] font-medium text-ink-mute transition-colors hover:bg-bg-soft hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/learn"
          className="rounded-pill bg-ink px-4 py-2 text-[13.5px] font-semibold text-bg transition-transform hover:-translate-y-0.5"
        >
          학습 시작
        </Link>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-line bg-bg-soft/60">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark size={24} />
              <span className="text-[14px] font-bold text-ink">
                Design System School
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-ink-mute">
              디자인을 배우고, 성공한 디자인을 분석하고, 그 결과를 AI 코딩
              에이전트가 쓰는 DESIGN.md로 남기는 온톨로지 기반 디자인 지식
              플랫폼. AI Builder School의 형제 사이트.
            </p>
          </div>
          <FooterCol
            title="둘러보기"
            links={[
              { href: "/learn", label: "배우기" },
              { href: "/wiki", label: "위키" },
              { href: "/collection", label: "컬렉션" },
              { href: "/design-md", label: "DESIGN.md란" },
            ]}
          />
          <FooterCol
            title="레퍼런스"
            links={[
              { href: "/collection/toss", label: "토스" },
              { href: "/collection/krds", label: "KRDS" },
              { href: "/collection/gmarket", label: "G마켓" },
              { href: "/collection/wanted", label: "원티드" },
            ]}
          />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-6 text-[12.5px] text-ink-faint">
          <span>© {new Date().getFullYear()} Design System School</span>
          <span className="font-mono">v0.1 · ontology-driven</span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h4 className="eyebrow text-ink-faint">{title}</h4>
      <ul className="mt-4 grid gap-2.5">
        {links.map((l) => (
          <li key={`${l.href}-${l.label}`}>
            <Link
              href={l.href}
              className="text-[13.5px] text-ink-mute transition-colors hover:text-accent-ink"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
