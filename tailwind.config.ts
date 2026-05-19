import type { Config } from "tailwindcss";

/**
 * Design System School — Tailwind 토큰 매핑.
 * 색·반경·그림자 원천은 globals.css의 CSS 변수이며, 여기서는 그 변수를
 * Tailwind 유틸리티로 노출한다. 노드 타입별 색: 개념=accent(indigo),
 * 패턴=gold(amber), 분석=pop(coral), 학습경로=mint(teal).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-soft": "rgb(var(--bg-soft) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
          mute: "rgb(var(--ink-mute) / <alpha-value>)",
          faint: "rgb(var(--ink-faint) / <alpha-value>)",
        },
        line: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          strong: "rgb(var(--border-strong) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          ink: "rgb(var(--accent-ink) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
        },
        pop: {
          DEFAULT: "rgb(var(--pop) / <alpha-value>)",
          ink: "rgb(var(--pop-ink) / <alpha-value>)",
          soft: "rgb(var(--pop-soft) / <alpha-value>)",
        },
        mint: {
          DEFAULT: "rgb(var(--mint) / <alpha-value>)",
          ink: "rgb(var(--mint-ink) / <alpha-value>)",
          soft: "rgb(var(--mint-soft) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--gold) / <alpha-value>)",
          ink: "rgb(var(--gold-ink) / <alpha-value>)",
          soft: "rgb(var(--gold-soft) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "Apple SD Gothic Neo", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        sm: "9px",
        DEFAULT: "14px",
        md: "14px",
        lg: "20px",
        xl: "26px",
        "2xl": "32px",
        pill: "999px",
      },
      maxWidth: {
        shell: "1240px",
        reader: "760px",
        prose: "64ch",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(22,23,29,0.05), 0 8px 24px -16px rgba(22,23,29,0.18)",
        lift: "0 24px 64px -28px rgba(22,23,29,0.32)",
        glow: "0 12px 40px -12px rgba(91,67,245,0.42)",
        "glow-pop": "0 12px 40px -12px rgba(255,92,56,0.42)",
        "glow-gold": "0 12px 40px -12px rgba(224,154,22,0.42)",
      },
      fontSize: {
        eyebrow: ["12px", { lineHeight: "1.3", letterSpacing: "0.16em" }],
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.6s cubic-bezier(0.2,0.7,0.2,1) both",
        "gradient-pan": "gradient-pan 7s ease infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
