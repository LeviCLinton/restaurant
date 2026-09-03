export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  const color = dark ? "#FBFAF6" : "#14120D";
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="1" y="5" width="24" height="4" rx="1.5" fill="#B1823E" />
        <rect x="4" y="11" width="3" height="11" rx="1" fill={color} />
        <rect x="19" y="11" width="3" height="11" rx="1" fill={color} />
      </svg>
      <span
        className="font-display text-[1.05rem] font-semibold tracking-tight"
        style={{ color: dark ? "#FBFAF6" : "#14120D" }}
      >
        TABLEFLOW
      </span>
    </span>
  );
}
