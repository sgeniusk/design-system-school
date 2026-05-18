import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Layout";
import { PageHead } from "@/components/Section";
import {
  CATEGORY_LABEL,
  DIFFICULTY_LABEL,
} from "@/lib/types";
import { getPath, getPathConcepts, getPaths } from "@/lib/content";

export function generateStaticParams() {
  return getPaths().map((p) => ({ path: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string }>;
}): Promise<Metadata> {
  const { path } = await params;
  const learnPath = getPath(path);
  if (!learnPath) return { title: "경로를 찾을 수 없음" };
  return {
    title: `${learnPath.title} — 배우기`,
    description: learnPath.description,
  };
}

export default async function LearnPathPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  const learnPath = getPath(path);
  if (!learnPath) notFound();
  const concepts = getPathConcepts(path);

  return (
    <>
      <PageHead
        eyebrow={`Learn · ${learnPath.tagline}`}
        accent="mint"
        title={learnPath.title}
        lede={learnPath.description}
      />

      <Container className="py-14">
        <div className="mx-auto max-w-reader">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-pill bg-mint" aria-hidden />
            <h2 className="eyebrow text-ink-faint">
              {concepts.length}개 개념 · 순서대로
            </h2>
          </div>

          <ol className="mt-6 grid gap-3">
            {concepts.map((c, i) => (
              <li key={c.slug}>
                <Link
                  href={`/wiki/${c.slug}`}
                  className="group flex items-center gap-4 rounded-lg border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-mint/40 hover:shadow-soft"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint-soft font-mono text-[15px] font-bold text-mint-ink">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[16px] font-bold text-ink">
                        {c.title}
                      </h3>
                      <span className="rounded-pill bg-bg-soft px-2 py-0.5 text-[11px] text-ink-mute">
                        {CATEGORY_LABEL[c.category]}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-[13px] text-ink-mute">
                      {c.summary}
                    </p>
                  </div>
                  <span className="hidden shrink-0 text-[12px] text-ink-faint sm:block">
                    {DIFFICULTY_LABEL[c.difficulty]} · {c.readingMinutes}분
                  </span>
                  <span className="font-mono text-[14px] text-mint-ink transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-xl border border-line bg-bg-soft/60 p-6 text-center">
            <p className="text-[14px] text-ink-mute">
              경로를 마쳤다면, 배운 개념이 실제로 어떻게 쓰이는지{" "}
              <Link
                href="/collection"
                className="font-semibold text-pop-ink hover:underline"
              >
                컬렉션의 디자인 분석
              </Link>
              에서 확인하세요.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/learn"
              className="font-mono text-[13.5px] text-ink-mute hover:text-ink"
            >
              ← 모든 학습 경로
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
