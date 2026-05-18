// MDX 본문(개념·분석 노드)의 HTML 요소를 사이트 디자인 토큰에 맞춰 렌더링한다.
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-14 mb-4 text-2xl font-bold tracking-tight text-ink scroll-mt-28 first:mt-0"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="mt-9 mb-3 text-lg font-bold tracking-tight text-ink" {...props} />
    ),
    p: (props) => (
      <p className="my-4 text-[16px] leading-[1.75] text-ink-soft" {...props} />
    ),
    ul: (props) => (
      <ul className="my-4 ml-1 grid gap-2 text-[15px] leading-[1.7] text-ink-soft [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.62em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-pill [&>li]:before:bg-accent" {...props} />
    ),
    ol: (props) => (
      <ol className="my-4 ml-5 grid list-decimal gap-2 text-[15px] leading-[1.7] text-ink-soft marker:font-mono marker:text-ink-faint" {...props} />
    ),
    li: (props) => <li {...props} />,
    strong: (props) => <strong className="font-semibold text-ink" {...props} />,
    em: (props) => <em className="text-ink" {...props} />,
    a: ({ href = "#", ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const external = href.startsWith("http");
      const cls =
        "font-medium text-accent-ink underline decoration-accent/40 underline-offset-2 hover:decoration-accent";
      return external ? (
        <a href={href} target="_blank" rel="noreferrer" className={cls} {...rest} />
      ) : (
        <Link href={href} className={cls} {...rest} />
      );
    },
    blockquote: (props) => (
      <blockquote
        className="my-6 rounded-lg border-l-2 border-accent bg-accent-soft/60 px-5 py-4 text-[15px] leading-[1.7] text-ink-soft [&>p]:my-0"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded-[6px] bg-bg-soft px-1.5 py-0.5 font-mono text-[0.86em] text-accent-ink"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg border border-line bg-ink px-5 py-4 font-mono text-[13px] leading-[1.7] text-bg [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-bg"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-line" />,
    table: (props) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-line">
        <table className="w-full border-collapse text-left text-[14px]" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b border-line bg-bg-soft px-4 py-2.5 font-semibold text-ink"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-line px-4 py-2.5 align-top text-ink-soft" {...props} />
    ),
    ...components,
  };
}
