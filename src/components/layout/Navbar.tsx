import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button, IconButton } from "@/components/ui";
import { Logo } from "@/components/layout/Logo";

const NAV_LINKS = [
  { to: "/features", label: "Features" },
  { to: "/solutions", label: "Solutions" },
  { to: "/pricing", label: "Pricing" },
  { to: "/demo", label: "Demo" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-paper-300/70 bg-paper-50/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="TABLEFLOW home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-[var(--radius-sm)] px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-ink-950" : "text-slate-600 hover:text-ink-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/login" className="rounded-[var(--radius-sm)] px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-ink-900">
            Log in
          </Link>
          <Link to="/signup">
            <Button size="sm">Start Free</Button>
          </Link>
        </div>

        <IconButton
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </IconButton>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-paper-300 bg-paper-50 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-[var(--radius-sm)] px-3 py-3 text-[0.9375rem] font-medium text-ink-900 hover:bg-paper-100"
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-paper-300 pt-3">
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="secondary" fullWidth>
                  Log in
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                <Button fullWidth>Start Free</Button>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
