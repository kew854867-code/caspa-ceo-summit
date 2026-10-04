import { useEffect, type RefObject } from "react";

/**
 * Scroll-reveal for `.rv` elements. Content is only hidden once this hook has
 * run (`rv-ready` on the root), so a failed/slow script never leaves blank sections.
 */
export function useReveal(root: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll<HTMLElement>(".rv:not(.in)"));
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((t) => t.classList.add("in"));
      return;
    }
    el.classList.add("rv-ready");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    targets.forEach((t) => io.observe(t));
    // Safety net: never leave content hidden (e.g. deep link jumps, tab restored).
    const t = window.setTimeout(() => targets.forEach((x) => x.classList.add("in")), 4000);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
