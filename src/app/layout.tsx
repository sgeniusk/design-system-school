import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/Layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://design-system-school.local"),
  title: {
    default: "Design System School — 온톨로지 기반 디자인 지식 플랫폼",
    template: "%s · Design System School",
  },
  description:
    "디자인 기초·UI/UX를 배우고, 토스·KRDS·G마켓·원티드 같은 성공한 디자인을 분석하고, 그 결과를 AI 코딩 에이전트가 쓰는 DESIGN.md로 남기는 디자인 지식 플랫폼. AI Builder School의 형제 사이트.",
};

// 사전 페인트 스크립트 — 첫 페인트 전에 data-theme을 적용해 다크 모드 깜빡임을 막는다.
// localStorage > prefers-color-scheme 순으로 결정한다.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
