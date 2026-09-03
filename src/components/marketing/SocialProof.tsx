const DEMO_RESTAURANTS = ["Ember", "Copper & Vine", "The Nairobi Grill", "Salt House", "Baobab Kitchen"];

export function SocialProof() {
  return (
    <section className="border-y border-paper-300 bg-paper-100/60 px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Built for modern restaurants · Fictional demo businesses shown for illustration
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {DEMO_RESTAURANTS.map((name) => (
            <span key={name} className="font-display text-lg font-medium text-ink-700/70">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
