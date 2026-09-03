import { Link } from "react-router-dom";
import { Button } from "@/components/ui";

export function CtaSection() {
  return (
    <section className="bg-ink-950 px-5 py-20 text-center text-paper-50 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-xl">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          See what your restaurant looks like connected.
        </h2>
        <p className="mt-3 text-paper-200/75">
          Explore the customer, restaurant, and kitchen views — no account needed.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/demo">
            <Button size="lg">Explore Demo</Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="dark" className="border border-paper-50/15">
              Start Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
