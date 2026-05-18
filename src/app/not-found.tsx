import Link from "next/link";
import { Container } from "@/components/Layout";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="eyebrow text-accent-ink">404</p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">
        이 노드는 아직 그래프에 없습니다
      </h1>
      <p className="mt-3 text-[15px] text-ink-mute">
        주소를 다시 확인하거나, 위키에서 다른 개념을 둘러보세요.
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-pill bg-ink px-5 py-3 text-[14px] font-semibold text-bg"
        >
          홈으로
        </Link>
        <Link
          href="/wiki"
          className="rounded-pill border border-line-strong px-5 py-3 text-[14px] font-semibold text-ink"
        >
          위키 둘러보기
        </Link>
      </div>
    </Container>
  );
}
