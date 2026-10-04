import { REDESIGN_BASE } from "@/data/redesign/base";

export function WaysSection({
  onSponsor,
  onPress,
}: {
  onSponsor: () => void;
  onPress: () => void;
}) {
  return (
    <section id="ways">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">Three Ways In</span>
            <h2>
              Be part of the <em>35th.</em>
            </h2>
          </div>
        </div>
        <div className="ways rv">
          <div className="way">
            <div className="wimg" style={{ backgroundImage: `url(${REDESIGN_BASE}img/panel.jpg)` }} />
            <div className="wb">
              <span className="eyebrow">Attend</span>
              <h3>Hear It From The People Deciding</h3>
              <a href="#tickets">GET TICKETS →</a>
            </div>
          </div>
          <div className="way">
            <div className="wimg" style={{ backgroundImage: `url(${REDESIGN_BASE}img/award.jpg)` }} />
            <div className="wb">
              <span className="eyebrow">Sponsor</span>
              <h3>Put Your Team In The Room</h3>
              <button type="button" className="waybtn" onClick={onSponsor}>
                REQUEST THE SPONSORSHIP PACKAGE →
              </button>
            </div>
          </div>
          <div className="way">
            <div className="wimg" style={{ backgroundImage: `url(${REDESIGN_BASE}img/snap.jpg)` }} />
            <div className="wb">
              <span className="eyebrow">Media</span>
              <h3>Cover The Summit</h3>
              <button type="button" className="waybtn" onClick={onPress}>
                APPLY FOR A MEDIA PASS →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
