import { useState } from "react";
import { Link } from "wouter";
import { REDESIGN_BASE } from "@/data/redesign/base";

type RedesignNavProps = {
  active?: "speakers" | "agenda" | "sponsors" | "tickets";
};

export function RedesignNav({ active }: RedesignNavProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav className={open ? "menu-open" : undefined}>
      <div className="wrap">
        <Link href="/summit" aria-label="CASPA CEO Summit home">
          <img src={`${REDESIGN_BASE}caspa-logo.png`} alt="CASPA" />
        </Link>
        <div className="links" onClick={close}>
          <Link href="/speakers" className={active === "speakers" ? "on" : undefined}>
            Speakers
          </Link>
          <Link href="/agenda" className={active === "agenda" ? "on" : undefined}>
            Agenda
          </Link>
          <Link href="/sponsors" className={active === "sponsors" ? "on" : undefined}>
            Sponsors
          </Link>
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
