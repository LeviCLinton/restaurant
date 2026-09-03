import { useSeo } from "@/hooks/useSeo";
import { Hero } from "@/components/marketing/Hero";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { ProductShowcase } from "@/components/marketing/ProductShowcase";
import { SocialProof } from "@/components/marketing/SocialProof";
import { CtaSection } from "@/components/marketing/CtaSection";

export function HomePage() {
  useSeo({
    title: "TABLEFLOW — A smarter way to run and experience restaurants",
    description:
      "Orders, tables, payments, customers and insights — connected in one intelligent restaurant platform.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <SocialProof />
      <ProblemSection />
      <ProductShowcase />
      <CtaSection />
    </>
  );
}
