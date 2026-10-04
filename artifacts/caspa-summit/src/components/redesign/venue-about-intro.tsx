import { REDESIGN_BASE } from "@/data/redesign/base";

export function VenueAbout() {
  return (
    <>
      <section className="about">
        <div className="wrap rv about-g">
          <div>
            <span className="eyebrow">About CASPA</span>
            <h2 className="about-h">
              A non-profit community
              <br />
              of semiconductor professionals
              <br />
              since <em>1991.</em>
            </h2>
            <p className="dim" style={{ marginTop: 20, fontSize: 19, maxWidth: 540 }}>
              CASPA is a registered non-profit organization. Proceeds from our annual conference help support the
              work we do throughout the year, including:
            </p>
            <ul className="gl">
              <li>Student scholarships, presented at our annual banquet</li>
              <li>The CASPA Mentorship Program</li>
              <li>Symposia, job fairs, and career events throughout the year</li>
            </ul>
            <div className="stats2">
              <div>
                <b>35</b>
                <span>years of CASPA</span>
              </div>
              <div>
                <b>6,000+</b>
                <span>individual members</span>
              </div>
              <div>
                <b>11</b>
                <span>chapters worldwide</span>
              </div>
            </div>
          </div>
          <div className="mosaic2">
            <img className="wide" src={`${REDESIGN_BASE}img/scholar.jpg`} alt="CASPA scholarship recipients on stage" />
            <img src={`${REDESIGN_BASE}img/net.jpg`} alt="" />
            <img src={`${REDESIGN_BASE}img/lisa.jpg`} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export function IntroSection() {
  return (
    <section className="intro">
      <div className="wrap">
        <blockquote className="rv">
          “Behind every technological revolution are the leaders <em>bold enough to shape it.</em> The CEO Summit
          was created to unite those leaders under <em>one stage.</em>”
        </blockquote>
        <div className="who rv">
          <b>Jimmy Cheng</b>
          <span>Creator of the CEO Summit, CASPA President 2026–2027</span>
        </div>
      </div>
    </section>
  );
}
