import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const projects = [
  {
    slug: "lumaskin",
    title: "LumaSkin",
    eyebrow: "Digital health · Product & UX",
    summary: "A guided, multi-channel skin monitoring experience for consistent at-home follow-up.",
    cover: "/assets/lumaskin-cover.jpg",
    year: "2026",
    role: "Research, product concept, user flow, UI and interactive prototype",
    theme: "aqua",
    overview:
      "LumaSkin combines a smartphone attachment with a companion app to capture comparable skin images across visible and optical channels. The experience helps people follow changes over time and prepare clearer evidence for a clinical conversation.",
    challenge:
      "Ordinary smartphone photos vary in lighting, framing and scale. Professional multi-spectral equipment is costly and difficult to use for frequent home follow-up.",
    insight:
      "The design prioritizes controlled capture before analysis. A guided workflow supports attachment setup, multi-channel capture, quality checks and a longitudinal report.",
    detail:
      "The project responds to three connected gaps: the long-term burden of acne scarring, the cost and limited accessibility of clinical multi-spectral equipment, and the inconsistency of ordinary smartphone photographs. LumaSkin combines a compact optical attachment with a guided app workflow so people can capture the same region under comparable conditions, review change across multiple optical indicators, and prepare a clearer trend report for consultation.",
    images: [
      { src: "/assets/lumaskin-system.jpg", alt: "LumaSkin problem framing and monitoring system" },
      { src: "/assets/lumaskin-ui.jpg", alt: "LumaSkin app flow and interface design" },
    ],
    next:
      "The current prototype has not undergone formal usability testing. A next step is to evaluate setup clarity, scan completion and trust in the resulting report with target users.",
    external: { label: "Open prototype", href: "https://lumaskin-puce.vercel.app/" },
  },
  {
    slug: "buffer-zone",
    title: "Buffer Zone",
    eyebrow: "Healthcare experience · Individual project",
    summary: "A psycho-spatial waiting concept for family members of critically ill patients.",
    cover: "/assets/buffer-zone-cover.jpg",
    year: "2025",
    role: "Literature review, interviews, user analysis, concept and interaction workflow",
    theme: "violet",
    overview:
      "Buffer Zone explores the waiting experience of family members who live with uncertainty, information gaps and a prolonged loss of control while a loved one receives critical care.",
    challenge:
      "Clinical waiting areas are often treated as circulation and seating. For secondary patients, they can intensify helplessness, sensory overload and anxiety.",
    insight:
      "Interviews and literature research pointed to three design needs: calming ambient support, clearer information and embodied interaction that restores a small sense of agency.",
    detail:
      "Based on literature review and semi-structured interviews, Buffer Zone reframes relatives in critical-care waiting areas as “secondary patients” affected by uncertainty, sensory overload and loss of agency. The concept brings together calm ambient feedback, more legible updates and simple embodied interactions to support emotional regulation while respecting the sensitivity and privacy of a clinical setting.",
    images: [
      { src: "/assets/buffer-zone-research.jpg", alt: "Buffer Zone interviews, literature study and user analysis" },
      { src: "/assets/buffer-zone-workflow.jpg", alt: "Buffer Zone sketches and interaction workflow" },
    ],
    next:
      "This individual concept has not been prototype-tested. Future work should validate comfort, privacy and emotional appropriateness with family members and clinical staff.",
  },
  {
    slug: "lattice-plus",
    title: "Lattice Plus",
    eyebrow: "Rehabilitation · Product interaction",
    summary: "A wearable muscle recovery system combining modular massage and electrical stimulation.",
    cover: "/assets/lattice-cover.jpg",
    year: "2025",
    role: "Research, product structure, interaction concept, rendering and app UI",
    theme: "blue",
    overview:
      "Lattice Plus supports post-operative, older and long-term bedridden users through a modular wearable system designed for safer and more accessible active recovery.",
    challenge:
      "Home rehabilitation often depends on repeated manual assistance, while professional resources are unevenly distributed and difficult to sustain over time.",
    insight:
      "A distributed module layout adapts to different body areas. Magnetic fluid massage and EMS create complementary recovery modes, while the app coordinates setup and sessions.",
    detail:
      "Lattice Plus addresses the fragile transition from hospital rehabilitation to sustained recovery at home. Its distributed wearable modules adapt to different body areas and combine magnetic-fluid massage with electrical muscle stimulation, while a companion interface coordinates setup and treatment sessions. The system is designed to make repeated training easier to access for post-operative, older and long-term bedridden users.",
    images: [
      { src: "/assets/lattice-research.jpg", alt: "Lattice Plus research, applications and design insight" },
      { src: "/assets/lattice-system.jpg", alt: "Lattice Plus structure and app interface" },
    ],
    next:
      "The project received first prize in the Shanghai University Student Industrial Design Competition. The utility-model patent application is under review.",
  },
  {
    slug: "lasermorph",
    title: "LaserMorph",
    eyebrow: "HCI research · Digital fabrication",
    summary: "A fabrication method that encodes reversible 3D forms into compressed cellulose sheets.",
    cover: "/assets/lasermorph-cover.jpg",
    year: "2026",
    role: "Material and laser testing, modeling tools, visual system and educational platform",
    theme: "orange",
    overview:
      "LaserMorph turns planar laser patterning into rapid volumetric formation. Controlled ablation stores geometric intent in compressed cellulose, which expands into a programmed 3D form when hydrated.",
    challenge:
      "Laser fabrication is widely used for cutting and engraving, but offers limited support for generating continuous, reversible volumetric forms from a flat input.",
    insight:
      "The project links material calibration, process planning, laser encoding and water activation in an end-to-end workflow. A Rhino and Grasshopper tool makes the non-linear behavior more accessible to designers.",
    detail:
      "LaserMorph treats laser processing as a way to encode latent volume rather than only remove material. Controlled ablation produces depth differences in compressed cellulose sponge; hydration releases the stored volume and turns the flat sheet into a continuous 3D form. After drying, the material can be thermally recompressed and activated again. Material calibration and a Rhino-Grasshopper workflow make this non-linear process controllable for rapid prototyping, tangible interfaces and compact deployment.",
    images: [
      { src: "/assets/lasermorph-mechanism.jpg", alt: "LaserMorph material mechanism" },
      { src: "/assets/lasermorph-workflow.jpg", alt: "LaserMorph fabrication workflow" },
      { src: "/assets/lasermorph-design-space.jpg", alt: "LaserMorph design space" },
      { src: "/assets/lasermorph-tool.jpg", alt: "LaserMorph computational design tool and educational platform" },
      { src: "/assets/lasermorph-applications.jpg", alt: "LaserMorph application explorations" },
    ],
    next:
      "LaserMorph was accepted to UIST 2026. The work demonstrates applications in rapid prototyping, compact deployment and tangible interaction.",
    external: { label: "Visit project site", href: "https://lasermorphweb.github.io/" },
  },
];

function useHashRoute() {
  const readRoute = () => window.location.hash.replace(/^#\/?/, "") || "home";
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

function ThemeButton() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button className="theme-button" type="button" onClick={() => setDark((value) => !value)}>
      {dark ? "Light" : "Dark"}
    </button>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#/">Giselle Qin</a>
      <nav aria-label="Primary navigation">
        <a href="#/work">Work</a>
        <a href="#/about">About</a>
        <a href="mailto:giselleqinym@tongji.edu.cn">Email</a>
        <ThemeButton />
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>Open to UX and product design opportunities from September 2026.</p>
      <div>
        <a href="mailto:giselleqinym@tongji.edu.cn">Email</a>
        <a href="https://github.com/giselleqin" target="_blank" rel="noreferrer">GitHub</a>
      </div>
      <small>© 2026 Giselle Qin</small>
    </footer>
  );
}

function ProjectCard({ project, featured = false }) {
  return (
    <a className={`project-card ${featured ? "project-card-featured" : ""}`} href={`#/project/${project.slug}`}>
      <div className="project-image-wrap">
        <img src={project.cover} alt="" loading={featured ? "eager" : "lazy"} />
      </div>
      <div className="project-card-copy">
        <p>{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <span>{project.summary}</span>
      </div>
    </a>
  );
}

function HomePage() {
  return (
    <>
      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <p className="hero-intro">Product & UX Designer</p>
            <h1>Clarity for complex experiences.</h1>
            <p>
              Tongji University product design student working across digital health, physical interaction and emerging technologies.
            </p>
            <a className="text-link" href="#/work">View work <span aria-hidden="true">↘</span></a>
          </div>
          <a className="hero-visual" href="#/project/lumaskin" aria-label="Open the LumaSkin case study">
            <img src="/assets/lumaskin-hero.jpg" alt="LumaSkin multi-channel optical skin monitoring system" />
            <span>LumaSkin, 2026</span>
          </a>
        </section>

        <section className="selected-work shell" id="work">
          <div className="section-heading">
            <h2>Selected work</h2>
            <p>Research-led projects spanning screens, products and material systems.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} featured={index === 0 || index === 3} />
            ))}
          </div>
        </section>

        <section className="profile-strip shell">
          <div className="profile-photo"><img src="/assets/portrait.jpg" alt="Portrait of Giselle Qin" /></div>
          <div>
            <h2>Designing between research and making.</h2>
            <p>
              I am a Product Design student at Tongji University College of Design and Innovation. My practice moves between user research, interface design, physical prototyping and computational fabrication.
            </p>
            <a className="text-link" href="#/about">About me <span aria-hidden="true">↘</span></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function WorkPage() {
  return (
    <main className="shell inner-page work-page">
      <header className="page-lead">
        <p>Selected work</p>
        <h1>Four ways of turning uncertainty into something people can use.</h1>
      </header>
      <div className="work-list">
        {projects.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index % 3 === 0} />)}
      </div>
      <Footer />
    </main>
  );
}

function AboutPage() {
  return (
    <main className="shell inner-page about-page">
      <header className="about-hero">
        <div>
          <p>About</p>
          <h1>I am Giselle, a product and UX designer based in Shanghai.</h1>
        </div>
        <img src="/assets/portrait.jpg" alt="Portrait of Giselle Qin" />
      </header>
      <section className="about-copy">
        <p className="about-large">
          I study Product Design at Tongji University College of Design and Innovation. I am interested in how research, digital interfaces and physical systems can work together to make complex experiences easier to understand and act on.
        </p>
        <div className="about-columns">
          <div>
            <h2>Experience</h2>
            <p><strong>Kohler (China) Investment Co., Ltd.</strong><br />IT Department Intern, 2025</p>
            <p><strong>Shanghai HOTO Technology Co., Ltd.</strong><br />Product Studio Intern, 2026</p>
          </div>
          <div>
            <h2>Recognition</h2>
            <p>UIST 2026 paper accepted</p>
            <p>First Prize, Shanghai University Student Industrial Design Competition</p>
            <p>Tongji University Scholarship</p>
          </div>
          <div>
            <h2>Tools</h2>
            <p>Figma, Rhino, Grasshopper, Illustrator, Photoshop and After Effects</p>
            <p>IELTS 7.0</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function ProjectPage({ project }) {
  const isLaserMorph = project.slug === "lasermorph";

  return (
    <main className={`project-page theme-${project.theme}`}>
      <section className="project-hero shell">
        <a className="back-link" href="#/work">← All work</a>
        <div className="project-title-row">
          <div>
            <p>{project.eyebrow}</p>
            <h1>{project.title}</h1>
          </div>
          <p>{project.summary}</p>
        </div>
        {isLaserMorph ? (
          <>
            <div className="featured-video">
              <iframe
                src="https://www.youtube-nocookie.com/embed/Z6qIfrtLf6Q?rel=0"
                title="LaserMorph project video"
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="project-site-row">
              <p>See the complete research, fabrication process and applications.</p>
              <a className="project-site-cta" href="https://lasermorphweb.github.io/" target="_blank" rel="noreferrer">
                Visit LaserMorph website <span aria-hidden="true">↗</span>
              </a>
            </div>
          </>
        ) : (
          <img src={project.cover} alt={`${project.title} project cover`} />
        )}
      </section>

      <section className="project-meta shell">
        <div><span>Year</span><p>{project.year}</p></div>
        <div><span>Role</span><p>{project.role}</p></div>
        <div><span>Scope</span><p>{project.eyebrow}</p></div>
      </section>

      <section className="case-copy shell">
        <div>
          <p>Overview</p>
          <h2>{project.overview}</h2>
        </div>
        <div className="case-detail">
          <h3>Detailed introduction</h3>
          <p>{project.detail}</p>
        </div>
      </section>

      <section className="case-gallery shell">
        {project.images.map((image) => (
          <figure key={image.src}>
            <img src={image.src} alt={image.alt} loading="lazy" />
          </figure>
        ))}
      </section>

      <section className="reflection shell">
        <p>Outcome and next step</p>
        <h2>{project.next}</h2>
        <div className="reflection-links">
          {project.external && <a className="text-link" href={project.external.href} target="_blank" rel="noreferrer">{project.external.label} <span aria-hidden="true">↗</span></a>}
          <a className="text-link" href="#/work">View all work <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function App() {
  const route = useHashRoute();
  const project = useMemo(() => {
    if (!route.startsWith("project/")) return null;
    return projects.find((item) => item.slug === route.split("/")[1]);
  }, [route]);

  return (
    <>
      <Header />
      {project ? <ProjectPage project={project} /> : route === "work" ? <WorkPage /> : route === "about" ? <AboutPage /> : <HomePage />}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>,
);
