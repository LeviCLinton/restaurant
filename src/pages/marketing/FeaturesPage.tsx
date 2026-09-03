import { useSeo } from "@/hooks/useSeo";
import { ProductShowcase } from "@/components/marketing/ProductShowcase";
import { CtaSection } from "@/components/marketing/CtaSection";

export function FeaturesPage() {
  useSeo({
    title: "Features",
    description: "Everything TABLEFLOW connects: QR ordering, tables, kitchen display, reservations, CRM, and analytics.",
    path: "/features",
  });

  return (
    <>
      <header className="border-b border-paper-300 px-5 py-16 text-center sm:px-8 sm:py-20">
        <h1 className="font-display text-4xl font-semibold text-ink-950">Every part of the floor, in one system.</h1>
        <p className="mx-auto mt-3 max-w-lg text-slate-600">
          TABLEFLOW isn't a bundle of separate tools — an action in one place updates everything
          downstream.
        </p>
      </header>
      <ProductShowcase />
      <CtaSection />
    </>
  );
}
