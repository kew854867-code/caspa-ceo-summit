import { useState } from "react";
import { RECAP_VIDEOS } from "@/data/redesign/sponsors";

export function RecapSection() {
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <section id="recap" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">History</span>
            <h2>
              Past CASPA <em>summits.</em>
            </h2>
          </div>
          <a className="btn line" href="https://www.youtube.com/@CASPAOFFICE/videos" target="_blank" rel="noopener">
            More on YouTube ↗
          </a>
        </div>
        <div className="vids rv">
          {RECAP_VIDEOS.map((v) => (
            <div key={v.id} className="vid" onClick={() => setPlaying(v.id)}>
              <div className={`th${playing === v.id ? " play" : ""}`} style={{ backgroundImage: `url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)` }}>
                {playing === v.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title={v.title}
                  />
                ) : (
                  <i />
                )}
              </div>
              <h4>{v.title}</h4>
              <span>{v.meta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
