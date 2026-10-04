import { REDESIGN_BASE } from "@/data/redesign/base";

export function RedesignFooter() {
  return (
    <footer>
      <div className="wrap">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={`${REDESIGN_BASE}caspa-logo.png`} alt="CASPA" style={{ height: 34 }} />
            <div>
              <div style={{ whiteSpace: "nowrap" }}>© 2026 CASPA · office@caspa.com</div>
              <div className="flinks">
            <a href="https://caspa.com/" target="_blank" rel="noopener noreferrer">
              CASPA official website ↗
            </a>
            <a
              href="https://www.linkedin.com/in/caspa-office-595263a"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          Santa Clara Convention Center
          <br />
          5001 Great America Pkwy, Santa Clara, CA 95054
        </div>
      </div>
    </footer>
  );
}
