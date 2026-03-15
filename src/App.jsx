import { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Menu,
  X,
  Database,
  Globe,
  Cpu,
  Github,
  Linkedin,
  Send,
  Code2,
  Server,
  Layers,
  Briefcase,
  GraduationCap,
  Calendar,
  Building2,
  Languages,
  Star,
} from "lucide-react";

/* ─── Smooth-scroll helper ─── */
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ─── useActiveSection hook ─── */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);
  return active;
}

/* ─── useFadeIn hook ─── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── FadeIn wrapper ─── */
const Fade = ({ children, delay = 0, className = "" }) => {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={`fade-in ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ─── Badge ─── */
const Badge = ({ children }) => <span className="badge">{children}</span>;

/* ─── SkillBar ─── */
const SkillBar = ({ label, pct, delay }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.width = `${pct}%`;
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct, delay]);

  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-label">{label}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div ref={ref} className="skill-fill" />
      </div>
    </div>
  );
};

/* ════════════ DATA FROM CV ════════════ */

const SKILLS = [
  { label: "PHP / MySQL", pct: 95 },
  { label: "JavaScript / jQuery", pct: 88 },
  { label: "APIs REST / OAuth2", pct: 90 },
  { label: "Web Scraping", pct: 88 },
  { label: "React.js / Node.js", pct: 72 },
  { label: "HTML5 / CSS3", pct: 92 },
  { label: "CRM SuiteCRM", pct: 93 },
  { label: "Excel Avancé", pct: 95 },
];

const EXPERIENCES = [
  {
    role: "Gestionnaire de données Web — Développement Web & API",
    type: "CDI",
    company: "SimplyDesk",
    sector: "Informatique / Télécoms",
    period: "Déc. 2019 — Aujourd'hui",
    duration: "6 ans 2 mois",
    color: "var(--accent)",
    bullets: [
      "Développement et optimisation de CRM (Frontend & Backend) orientés performance",
      "Conception, développement et maintenance de sites et extensions WordPress",
      "Intégration et automatisation des échanges de données via API (REST / OAuth2)",
      "Extraction et structuration de données web via scripts PHP/MySQL (Web Scraping)",
      "Gestion opérationnelle des BDD : qualité, nettoyage, déduplication, fiabilisation",
      "Campagnes d'email marketing orientées conversion et engagement",
      "Suivi de la performance digitale : SEO, KPI, Matomo Analytics",
      "Administration quotidienne des données clients au sein de SuiteCRM",
    ],
  },
  {
    role: "Agent de Production",
    type: "CDI",
    company: "Nextcare Health",
    sector: "Banque / Finance / Assurances",
    period: "Fév. 2019 — Déc. 2019",
    duration: "10 mois",
    color: "#22d3ee",
    bullets: [
      "Préparation de rapports de production et de performance périodiques",
      "Gestion de l'inclusion de nouveaux membres dans la base de données clients",
      "Corrections, mises à niveau et suppressions dans la BDD clients",
      "Participation à la R&D pour l'innovation continue du système d'information",
    ],
  },
  {
    role: "Agent Base de Données",
    type: "SIVP",
    company: "Databiz",
    sector: "Informatique / Télécoms",
    period: "Oct. 2018 — Fév. 2019",
    duration: "4 mois",
    color: "#a78bfa",
    bullets: [
      "Traitement de bases de données via le système de gestion Autobiz",
    ],
  },
  {
    role: "Agent Base de Données",
    type: "SIVP",
    company: "SOGEFOIRE INTERNATIONAL",
    sector: "Autres",
    period: "Nov. 2017 — Oct. 2018",
    duration: "11 mois",
    color: "#34d399",
    bullets: [
      "Gestion de bases de données MariaDB / MySQL",
      "Développement d'une application de gestion de données PHP/MySQL",
    ],
  },
];

const EDUCATION = [
  {
    title: "MERN Stack Developer",
    school: "RebootKamp (RBK)",
    period: "Nov. 2024 — Nov. 2025",
    mention: "Mention Bien",
    icon: <Code2 size={20} />,
  },
  {
    title: "BTS Informatique de Gestion",
    school: "ISFT — Tunis",
    period: "Sept. 2015 — Sept. 2017",
    mention: "Mention Très Bien",
    icon: <GraduationCap size={20} />,
  },
  {
    title: "Baccalauréat Sciences de la Vie",
    school: "Lycée Bougatfa 2",
    period: "Sept. 2013 — Juin 2014",
    mention: "Mention Moyenne",
    icon: <GraduationCap size={20} />,
  },
];

const LANGUAGES = [
  { lang: "Arabe", level: "Courant", pct: 100 },
  { lang: "Français", level: "Avancé", pct: 90 },
  { lang: "Anglais", level: "Avancé", pct: 85 },
];

const NAV_ITEMS = [
  { id: "about", label: "À propos" },
  { id: "experience", label: "Expérience" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

/* ════════════════════════════════════════════
   APP
════════════════════════════════════════════ */
export default function App() {
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClick = (id) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  return (
    <>
      {/* ── NAV ── */}
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <button className="nav__logo" onClick={() => scrollTo("hero")}>
            <span className="logo-bracket">&lt;</span>Maher
            <span className="logo-bracket">/&gt;</span>
          </button>

          <nav className="nav__links">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                className={`nav__link ${active === id ? "nav__link--active" : ""}`}
                onClick={() => navClick(id)}
              >
                {label}
                <span className="nav__link-dot" />
              </button>
            ))}
          </nav>

          <button
            className="btn btn--primary nav__cta"
            onClick={() => navClick("contact")}
          >
            Me contacter
          </button>

          <button
            className="nav__hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div className={`nav__drawer ${menuOpen ? "nav__drawer--open" : ""}`}>
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              className={`nav__drawer-link ${active === id ? "active" : ""}`}
              onClick={() => navClick(id)}
            >
              {label}
            </button>
          ))}
          <button
            className="btn btn--primary"
            onClick={() => navClick("contact")}
          >
            Me contacter
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="hero">
        <div className="hero__bg-grid" />
        <div className="container hero__inner">
          <div className="hero__text">
            <Fade>
              <Badge>Gestionnaire de Données Web &amp; Développeur Web</Badge>
            </Fade>
            <Fade delay={100}>
              <h1 className="hero__title">
                Jebali <span className="accent">Maher</span>
              </h1>
            </Fade>
            <Fade delay={180}>
              <p className="hero__role">
                PHP · MySQL · APIs REST · Web Scraping · CRM SuiteCRM
              </p>
            </Fade>
            <Fade delay={260}>
              <p className="hero__sub">
                8 ans d'expérience en développement CRM, intégration d'APIs,
                gestion de bases de données et automatisation de processus
                métier. Actuellement en poste chez{" "}
                <strong>SimplyDesk</strong>, Tunis.
              </p>
            </Fade>
            <Fade delay={340}>
              <div className="hero__actions">
                <button
                  className="btn btn--primary btn--lg"
                  onClick={() => navClick("experience")}
                >
                  Mon parcours <ArrowRight size={18} />
                </button>
                <a
                  className="btn btn--ghost btn--lg"
                  href="/cv_Maher.pdf"
                  download
                >
                  <Download size={18} /> Télécharger CV
                </a>
              </div>
            </Fade>
          </div>

          <Fade delay={200} className="hero__card-wrap">
            <div className="hero__card">
              <div className="hero__card-ring hero__card-ring--1" />
              <div className="hero__card-ring hero__card-ring--2" />
              <div className="hero__card-center">
                <Code2 size={52} strokeWidth={1.4} />
              </div>
              <div className="hero__stat hero__stat--tl">
                <span className="stat-n">8+</span>
                <span className="stat-l">ans</span>
              </div>
              <div className="hero__stat hero__stat--br">
                <span className="stat-n">4</span>
                <span className="stat-l">postes</span>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── VALUE PROPS ── */}
      <section className="values">
        <div className="container">
          <div className="values__grid">
            {[
              {
                icon: <CheckCircle2 size={24} />,
                title: "8+ ans d'expérience",
                desc: "Expert PHP, MySQL, JavaScript, CRM SuiteCRM et gestion de données",
              },
              {
                icon: <Layers size={24} />,
                title: "Stack complète",
                desc: "Frontend, Backend, APIs REST, Web Scraping, WordPress & MERN Stack",
              },
              {
                icon: <Server size={24} />,
                title: "Data & Automatisation",
                desc: "Nettoyage BDD, email marketing, SEO et Matomo Analytics",
              },
            ].map(({ icon, title, desc }, i) => (
              <Fade key={title} delay={i * 120}>
                <div className="value-card">
                  <div className="value-card__icon">{icon}</div>
                  <h3 className="value-card__title">{title}</h3>
                  <p className="value-card__desc">{desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about">
        <div className="container about__inner">
          <div className="about__text">
            <Fade>
              <p className="section-label">À propos</p>
              <h2 className="section-title">
                Passionné par les <span className="accent">données</span> et le
                code
              </h2>
            </Fade>
            <Fade delay={100}>
              <p className="about__para">
                Développeur web et gestionnaire de données basé à{" "}
                <strong>Sidi Hassine, Tunis</strong>, je travaille depuis
                décembre 2019 chez <strong>SimplyDesk</strong> où je développe
                et optimise des systèmes CRM, automatise des flux de données
                via APIs et pilote des campagnes d'email marketing.
              </p>
              <p className="about__para">
                Titulaire d'un <strong>BTS Informatique de Gestion</strong>{" "}
                (mention Très Bien) et d'une formation{" "}
                <strong>MERN Stack Developer</strong> chez RebootKamp, je
                combine rigueur technique et sens analytique pour livrer des
                solutions fiables et performantes.
              </p>
              <p className="about__para">
                Sérieux, curieux et passionné — disponible avec préavis pour de
                nouvelles opportunités.
              </p>
            </Fade>

            {/* Languages */}
            <Fade delay={200}>
              <div className="lang-section">
                <p className="lang-title">
                  <Languages size={15} /> Langues
                </p>
                <div className="lang-grid">
                  {LANGUAGES.map(({ lang, level, pct }) => (
                    <div key={lang} className="lang-item">
                      <div className="lang-header">
                        <span>{lang}</span>
                        <span className="lang-level">{level}</span>
                      </div>
                      <div className="skill-track">
                        <div
                          className="skill-fill"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          </div>

          {/* Skills */}
          <div className="about__skills">
            <Fade>
              <p className="section-label">Compétences techniques</p>
            </Fade>
            {SKILLS.map(({ label, pct }, i) => (
              <Fade key={label} delay={i * 70}>
                <SkillBar label={label} pct={pct} delay={i * 100} />
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="experience">
        <div className="container">
          <Fade>
            <p className="section-label center">Parcours</p>
            <h2 className="section-title center">
              Expériences professionnelles
            </h2>
            <p className="section-sub center">
              8 ans d'expérience dans la data, le web et les APIs
            </p>
          </Fade>

          <div className="timeline">
            {EXPERIENCES.map(
              ({ role, type, company, sector, period, duration, color, bullets }, i) => (
                <Fade key={company + role} delay={i * 120}>
                  <div className="timeline__item">
                    <div
                      className="timeline__dot"
                      style={{ background: color }}
                    />
                    <div className="timeline__card">
                      <div className="timeline__header">
                        <div>
                          <h3 className="timeline__role">
                            {role}{" "}
                            <span className="timeline__type">{type}</span>
                          </h3>
                          <div className="timeline__meta">
                            <span>
                              <Building2 size={13} /> {company}
                            </span>
                            <span className="meta-sep">·</span>
                            <span>{sector}</span>
                          </div>
                        </div>
                        <div className="timeline__dates">
                          <span>
                            <Calendar size={13} /> {period}
                          </span>
                          <span className="timeline__duration">{duration}</span>
                        </div>
                      </div>
                      <ul className="timeline__bullets">
                        {bullets.map((b) => (
                          <li key={b}>
                            <CheckCircle2 size={13} style={{ color }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Fade>
              )
            )}
          </div>

          {/* Education */}
          <Fade>
            <p className="section-label center edu-label">Formation</p>
          </Fade>
          <div className="edu-grid">
            {EDUCATION.map(({ title, school, period, mention, icon }, i) => (
              <Fade key={title} delay={i * 110}>
                <div className="edu-card">
                  <div className="edu-card__icon">{icon}</div>
                  <div>
                    <h4 className="edu-card__title">{title}</h4>
                    <p className="edu-card__school">{school}</p>
                    <p className="edu-card__meta">
                      <Calendar size={12} /> {period}&nbsp;·&nbsp;
                      <Star size={12} /> {mention}
                    </p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="services">
        <div className="container">
          <Fade>
            <p className="section-label center">Services</p>
            <h2 className="section-title center">Ce que je propose</h2>
            <p className="section-sub center">
              Solutions complètes pour vos projets web et data
            </p>
          </Fade>

          <div className="services__grid">
            {[
              {
                icon: <Database size={28} />,
                title: "Développement CRM",
                desc: "Développement, customisation et maintenance de systèmes CRM (SuiteCRM, WordPress) avec PHP et MySQL",
                items: [
                  "Applications CRM Frontend & Backend",
                  "Extensions et plugins WordPress sur mesure",
                  "Optimisation des performances & SEO",
                  "Administration SuiteCRM & reporting",
                ],
              },
              {
                icon: <Globe size={28} />,
                title: "Intégration d'APIs",
                desc: "Intégration et automatisation des échanges de données entre outils métiers",
                items: [
                  "APIs REST / OAuth2",
                  "Web Scraping PHP/MySQL & JavaScript",
                  "Automatisation de processus métier",
                  "Suivi KPI & Matomo Analytics",
                ],
              },
              {
                icon: <Cpu size={28} />,
                title: "Gestion & Data",
                desc: "Maintenance, enrichissement et optimisation de bases de données et campagnes marketing",
                items: [
                  "Nettoyage, déduplication, fiabilisation BDD",
                  "Enrichissement et qualification prospects",
                  "Campagnes email marketing (conversion)",
                  "Reporting Excel avancé (niveau expert)",
                ],
              },
            ].map(({ icon, title, desc, items }, i) => (
              <Fade key={title} delay={i * 140}>
                <div className="service-card">
                  <div className="service-card__icon">{icon}</div>
                  <h3 className="service-card__title">{title}</h3>
                  <p className="service-card__desc">{desc}</p>
                  <ul className="service-card__list">
                    {items.map((it) => (
                      <li key={it}>
                        <CheckCircle2 size={15} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact">
        <div className="container">
          <Fade>
            <p className="section-label center">Contact</p>
            <h2 className="section-title center">Travaillons ensemble</h2>
            <p className="section-sub center">Discutons de votre projet</p>
          </Fade>

          <div className="contact__inner">
            <Fade className="contact__info">
              {[
                {
                  icon: <Mail size={22} />,
                  label: "Email",
                  val: "meher.jbeli21@gmail.com",
                },
                {
                  icon: <Phone size={22} />,
                  label: "Téléphone",
                  val: "+216 28 819 958",
                },
                {
                  icon: <MapPin size={22} />,
                  label: "Localisation",
                  val: "Sidi Hassine, Tunis 🇹🇳",
                },
                {
                  icon: <Briefcase size={22} />,
                  label: "Disponibilité",
                  val: "En poste — avec préavis",
                },
              ].map(({ icon, label, val }) => (
                <div key={label} className="contact-info-card">
                  <div className="contact-info-card__icon">{icon}</div>
                  <div>
                    <p className="contact-info-card__label">{label}</p>
                    <p className="contact-info-card__val">{val}</p>
                  </div>
                </div>
              ))}

              <div className="contact__socials">
                <a href="https://github.com/Maher-Jb" className="social-btn" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/jebali-maher-875767172/" className="social-btn" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:meher.jbeli21@gmail.com"
                  className="social-btn"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </Fade>

            <Fade delay={160} className="contact__form-wrap">
              <form
                className="contact__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message envoyé !");
                }}
              >
                <div className="form__row">
                  <div className="form__field">
                    <label>Nom</label>
                    <input type="text" placeholder="Votre nom" />
                  </div>
                  <div className="form__field">
                    <label>Email</label>
                    <input type="email" placeholder="votre@email.com" />
                  </div>
                </div>
                <div className="form__field">
                  <label>Sujet</label>
                  <input type="text" placeholder="Sujet de votre message" />
                </div>
                <div className="form__field">
                  <label>Message</label>
                  <textarea rows={5} placeholder="Décrivez votre projet…" />
                </div>
                <button type="submit" className="btn btn--primary btn--lg">
                  Envoyer le message <Send size={18} />
                </button>
              </form>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer__inner">
          <button className="nav__logo" onClick={() => scrollTo("hero")}>
            <span className="logo-bracket">&lt;</span>Maher
            <span className="logo-bracket">/&gt;</span>
          </button>
          <p className="footer__copy">
           © {new Date().getFullYear()} Jebali Maher. Tous droits réservés.
          </p>
          <p className="footer__love">Made with ❤️</p>
        </div>
      </footer>
    </>
  );
}