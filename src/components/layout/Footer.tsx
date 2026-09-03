import { Link } from "react-router-dom";
import { Logo } from "@/components/layout/Logo";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { to: "/features", label: "Features" },
      { to: "/solutions", label: "Solutions" },
      { to: "/pricing", label: "Pricing" },
      { to: "/demo", label: "Demo" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { to: "/demo/order", label: "Customer ordering" },
      { to: "/dashboard", label: "Restaurant dashboard" },
      { to: "/kitchen", label: "Kitchen display" },
    ],
  },
  {
    heading: "Account",
    links: [
      { to: "/login", label: "Log in" },
      { to: "/signup", label: "Start free" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-paper-300 bg-ink-950 text-paper-200">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-3 max-w-xs text-sm text-paper-200/70">
              Orders, tables, payments, customers and insights — connected in one restaurant
              platform.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-medium uppercase tracking-wide text-paper-200/50">{col.heading}</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-paper-200/80 hover:text-paper-50">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-paper-50/10 pt-6 text-xs text-paper-200/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TABLEFLOW. A demo restaurant technology platform.</p>
          <p>Ember is a fictional demo restaurant used for illustration.</p>
        </div>
      </div>
    </footer>
  );
}
