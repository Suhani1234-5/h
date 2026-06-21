import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import community1 from "@/assets/community/girls.webp.asset.json";
import community2 from "@/assets/community/kunal.webp.asset.json";
import gltLogo from "@/assets/glt-logo.png";
import tavishiImg from "@/assets/team/Tavishi.webp.asset.json";
import ankithaImg from "@/assets/team/ankitha.webp.asset.json";
import aakritiImg from "@/assets/team/aakriti.webp.asset.json";
import pratikshaImg from "@/assets/team/pratiksha.webp.asset.json";
import shaifaliImg from "@/assets/team/shaifali.webp.asset.json";
import bhavniImg from "@/assets/team/bhavni.webp.asset.json";
import rhythmImg from "@/assets/team/rhythm.webp.asset.json";
import sukruthaImg from "@/assets/team/sukrutha.webp.asset.json";
import suhaniImg from "@/assets/team/suhani.webp.asset.json";
import tejashwaniImg from "@/assets/team/tejashwani.webp.asset.json";
import nandiniImg from "@/assets/team/nandini.webp.asset.json";
import ishaImg from "@/assets/team/isha.webp.asset.json";
import sruthiImg from "@/assets/team/sruthi.webp.asset.json";
import akshitaImg from "@/assets/team/akshita.webp.asset.json";
import vijayLaxmiImg from "@/assets/team/vijay-laxmi.webp.asset.json";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GLT DSA & Internship Guidance Cohort — Girls Leading Tech" },
      {
        name: "description",
        content:
          "A focused 4-week DSA and internship guidance cohort. Learn data structures, build projects, crack interviews, and land your first internship — guided by women already in tech.",
      },
      { property: "og:title", content: "GLT DSA & Internship Guidance Cohort" },
      {
        property: "og:description",
        content:
          "Master DSA fundamentals and land your first internship in 4 weeks with mentors who've done it.",
      },
    ],
  }),
  component: LandingPage,
});

const APPLY_FORM_URL = "https://airtable.com/appygJDzQSoSiPzuR/pageFJqBGak4pli3Y/form";

function LandingPage() {
  // Master GSAP setup: scroll reveals, parallax, 3D tilts
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Generic reveal for [data-reveal]
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      // 3D tilt-in reveals for cards
      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          rotateX: 35,
          rotateY: -15,
          transformPerspective: 1200,
          transformOrigin: "center bottom",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // Smooth one-by-one bottom-to-top stagger for grids
      gsap.utils.toArray<HTMLElement>("[data-stagger-up]").forEach((container) => {
        const items = Array.from(container.children) as HTMLElement[];
        gsap.from(items, {
          y: 80,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: container, start: "top 85%" },
        });
      });

      // Floating shape parallax
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.3");
        gsap.to(el, {
          y: () => window.innerHeight * speed * -1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Scroll-driven 3D rotation for [data-spin3d]
      gsap.utils.toArray<HTMLElement>("[data-spin3d]").forEach((el) => {
        gsap.to(el, {
          rotateY: 360,
          rotateX: 25,
          ease: "none",
          transformPerspective: 1000,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });

      // Mousemove 3D tilt for [data-mouse3d]
      gsap.utils.toArray<HTMLElement>("[data-mouse3d]").forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(el, {
            rotateY: x * 18,
            rotateX: -y * 18,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out",
          });
        };
        const onLeave = () =>
          gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power3.out" });
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      });

      // Hero headline word-by-word
      const headline = document.querySelector("[data-headline]");
      if (headline) {
        const words = headline.querySelectorAll("[data-word]");
        gsap.from(words, {
          y: 80,
          opacity: 0,
          rotateX: -60,
          duration: 0.9,
          stagger: 0.07,
          ease: "power4.out",
        });
      }

      // Section titles slide-in
      gsap.utils.toArray<HTMLElement>("[data-section-title]").forEach((el) => {
        gsap.from(el, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Timeline cards
      gsap.utils.toArray<HTMLElement>("[data-week-card]").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -80 : 80,
          rotateY: i % 2 === 0 ? -25 : 25,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          transformPerspective: 1000,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <MarqueeBar />
        <WhyThisExists />
        <ProgramOverview />
        <Timeline />
        <Mentors />
        <WhoShouldApply />
        <Process />
        <CommunityProof />
        <AssetGenerator />
        <OrganizingTeam />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

/* ----------------------------- Scroll to top ---------------------------- */
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-[var(--brand-red)] text-white shadow-pop transition-transform hover:-translate-y-1 sm:bottom-6 sm:right-6"
      style={{ borderColor: "var(--ink)" }}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 15 12 9 18 15" />
      </svg>
    </button>
  );
}

/* -------------------------------- Navbar -------------------------------- */
function Navbar() {
  const links = [
    { label: "About", href: "#why" },
    { label: "Program", href: "#program" },
    { label: "Timeline", href: "#timeline" },
    { label: "Mentors", href: "#mentors" },
    { label: "Studio", href: "#generator" },
    { label: "FAQs", href: "#faq" },
  ];
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4 sm:px-4">
      <nav
        className="pointer-events-auto flex max-w-[calc(100vw-1.5rem)] items-center gap-1 overflow-x-auto rounded-full border-2 border-ink bg-white/60 px-2 py-2 shadow-pop backdrop-blur-xl supports-[backdrop-filter]:bg-white/40 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ borderColor: "var(--ink)" }}
      >
        <a
          href="#top"
          className="flex flex-shrink-0 items-center gap-2 rounded-full pl-1 pr-2 whitespace-nowrap"
        >
          <img
            src={gltLogo}
            alt="Girls Leading Tech"
            className="h-8 w-8 rounded-full border-2 border-ink object-cover sm:h-9 sm:w-9"
            style={{ borderColor: "var(--ink)" }}
          />
          <span
            className="sm:hidden text-[11px] font-extrabold uppercase tracking-wider text-ink"
            style={{ color: "var(--ink)" }}
          >
            GLT · DSA
          </span>
        </a>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-[var(--brand-yellow)] sm:inline-block whitespace-nowrap"
          >
            {l.label}
          </a>
        ))}
        <a
          href={APPLY_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-red)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--brand-blue)] whitespace-nowrap"
        >
          Apply
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-yellow)]" />
        </a>
      </nav>
    </header>
  );
}

/* --------------------------------- Hero --------------------------------- */
function Hero() {
  const headline = "Get Guidance in DSA and Cracking Internships from Women in Tech Who've Done It.";
  const words = headline.split(" ");

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-hero pt-28 pb-16 sm:pt-40 sm:pb-28"
    >
      {/* Bauhaus floating shapes */}
      <div
        data-parallax="0.25"
        className="pointer-events-none absolute -left-16 top-32 h-32 w-32 rounded-full bg-[var(--brand-red)] opacity-90 sm:h-40 sm:w-40"
      />
      <div
        data-parallax="0.4"
        data-spin3d
        className="pointer-events-none absolute right-6 top-20 h-20 w-20 rotate-12 bg-[var(--brand-yellow)] sm:right-10 sm:top-24 sm:h-24 sm:w-24"
      />
      <div
        data-parallax="0.2"
        data-spin3d
        className="pointer-events-none absolute left-1/3 bottom-12 hidden h-32 w-32 rotate-45 border-4 border-ink sm:block"
        style={{ borderColor: "var(--ink)" }}
      />
      <svg
        data-parallax="0.35"
        data-spin3d
        className="pointer-events-none absolute -right-10 bottom-20 h-32 w-32 text-[var(--brand-blue)] sm:h-48 sm:w-48"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <polygon points="50,5 95,95 5,95" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-[var(--brand-yellow)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink sm:text-xs"
            style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
          >
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--brand-red)]" />
            DSA & Internship Guidance Cohort
          </span>

          <h1
            data-headline
            className="mt-5 font-display text-[2.25rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pr-2 align-bottom sm:pr-3">
                <span
                  data-word
                  className={`inline-block ${
                    w === "Women" || w === "Tech" ? "text-[var(--brand-red)]" : ""
                  } ${w === "Internship" ? "text-[var(--brand-blue)]" : ""}`}
                >
                  {w === "Women" ? (
                    <span className="relative">
                      {w}
                      <svg
                        className="absolute -bottom-2 left-0 h-3 w-full text-[var(--brand-yellow)]"
                        viewBox="0 0 100 10"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,5 Q25,0 50,5 T100,5"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                      </svg>
                    </span>
                  ) : (
                    w
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-base text-foreground/75 sm:text-lg">
            A focused 4-week DSA & internship guidance cohort — taught by women already building
            careers in tech. Roadmaps, mock interviews, resume reviews, and a community that
            actually shows up.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full border-2 border-ink bg-[var(--brand-red)] text-white shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              style={{ borderColor: "var(--ink)" }}
            >
              <a href={APPLY_FORM_URL} target="_blank" rel="noopener noreferrer">Apply as Mentee →</a>
            </Button>
          </div>

          <dl
            className="mt-10 grid grid-cols-3 gap-3 border-t-4 border-ink pt-6 sm:mt-12 sm:gap-4 sm:pt-8"
            style={{ borderColor: "var(--ink)" }}
          >
            <Stat value="4,000+" label="Girls in community" color="red" />
            <Stat value="1,100+" label="Colleges" color="blue" />
            <Stat value="23+" label="States" color="yellow" />
          </dl>
        </div>

        <div className="relative" data-mouse3d style={{ transformStyle: "preserve-3d" }}>
          <div
            className="relative rotate-2 rounded-3xl border-4 border-ink bg-card p-2 shadow-soft"
            style={{ borderColor: "var(--ink)" }}
          >
            <img
              src={community2.url}
              alt="Girls Leading Tech community at a tech meetup"
              width={1024}
              height={1024}
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: "red" | "blue" | "yellow";
}) {
  const colorMap = {
    red: "var(--brand-red)",
    blue: "var(--brand-blue)",
    yellow: "var(--brand-yellow)",
  };
  return (
    <div>
      <dt
        className="font-display text-3xl font-extrabold sm:text-4xl"
        style={{ color: colorMap[color] }}
      >
        {value}
      </dt>
      <dd className="mt-1 text-xs font-semibold uppercase tracking-wider text-foreground/70 sm:text-sm">
        {label}
      </dd>
    </div>
  );
}

function MentorPreviewCard({
  img,
  name,
  role,
  className,
  color,
}: {
  img: string;
  name: string;
  role: string;
  className?: string;
  color: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border-2 border-ink p-3 shadow-card backdrop-blur ${className ?? ""}`}
      style={{ background: color, borderColor: "var(--ink)" }}
    >
      <img
        src={img}
        alt={name}
        width={48}
        height={48}
        loading="lazy"
        className="h-12 w-12 rounded-full border-2 border-ink object-cover"
        style={{ borderColor: "var(--ink)" }}
      />
      <div>
        <div className="text-sm font-bold text-ink" style={{ color: "var(--ink)" }}>
          {name}
        </div>
        <div className="text-xs font-medium text-ink/80" style={{ color: "var(--ink)" }}>
          {role}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Marquee Bar ----------------------------- */
function MarqueeBar() {
  const items = [
    "You don't have to be ready — you have to start.",
    "She believed she could, so she did.",
    "Every expert was once a beginner.",
    "Talent is everywhere. Opportunity is what we build here.",
    "Your first internship is closer than you think.",
    "Consistency beats talent. Show up.",
    "Learn in public. Grow in community.",
  ];
  return (
    <div
      className="border-y-4 border-ink bg-[var(--brand-yellow)] py-4 overflow-hidden"
      style={{ borderColor: "var(--ink)" }}
    >
      <div
        className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-lg font-extrabold tracking-tight text-ink sm:text-2xl"
        style={{ color: "var(--ink)" }}
      >
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="italic">"{it}"</span>
            <span className="inline-block h-3 w-3 rounded-full bg-[var(--brand-red)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Why this exists ------------------------- */
function WhyThisExists() {
  return (
    <section
      id="why"
      className="relative border-b-4 border-ink py-20 sm:py-28"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5" data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
            ◆ Our mission
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
            Why we're <span className="bg-[var(--brand-yellow)] px-2">building</span> this
          </h2>
        </div>
        <div className="space-y-5 text-lg text-foreground/75 lg:col-span-7" data-reveal>
          <p>
            Many students begin their tech journey without direction, guidance, or access to the
            right network. Talent is everywhere — opportunity, often, is not.
          </p>
          <p>
            At <span className="font-bold text-foreground">Girls Leading Tech</span>, we believe
            mentorship can change that. This cohort is designed to connect experienced women in tech
            with ambitious learners looking for clarity, consistency, and community.
          </p>
          <blockquote
            className="rounded-2xl border-2 border-ink bg-[var(--brand-red)] px-6 py-5 text-base font-medium text-white shadow-card"
            style={{ borderColor: "var(--ink)" }}
          >
            "You can't be what you can't see. We're building a room where every girl can see herself
            in the people she's learning from."
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Program overview -------------------------- */
function ProgramOverview() {
  const facts: {
    label: string;
    value: string;
    bg: string;
    shape: "circle" | "square" | "tri" | "cross" | "halfmoon";
  }[] = [
    { label: "Duration", value: "4 Weeks", bg: "var(--brand-red)", shape: "circle" },
    { label: "Format", value: "Virtual Group", bg: "var(--brand-blue)", shape: "square" },
    { label: "Mentor Ratio", value: "1 : 10", bg: "var(--brand-yellow)", shape: "tri" },
    { label: "Mode", value: "Live + Async", bg: "var(--brand-red)", shape: "cross" },
    { label: "Eligibility", value: "Girls in India", bg: "var(--brand-blue)", shape: "halfmoon" },
  ];

  const whiteText = (bg: string) => bg !== "var(--brand-yellow)";

  return (
    <section
      id="program"
      className="border-b-4 border-ink bg-white py-20 sm:py-28"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center" data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
            ▲ Program overview
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            A focused 4-week sprint into{" "}
            <span className="bg-[var(--brand-blue)] px-2 text-white">tech careers</span>
          </h2>
          <p className="mt-4 text-foreground/70">
            Structured enough to keep you moving. Flexible enough to fit your college life.
          </p>
        </div>

        <div
          data-stagger-up
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
        >
          {facts.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border-2 border-ink p-4 shadow-card transition-transform hover:-translate-y-1 hover:rotate-1 sm:p-5"
              style={{
                background: f.bg,
                borderColor: "var(--ink)",
                color: whiteText(f.bg) ? "white" : "var(--ink)",
              }}
            >
              <Shape kind={f.shape} className="h-7 w-7" />
              <div className="mt-4 text-[11px] font-bold uppercase tracking-wider opacity-80 sm:text-xs">
                {f.label}
              </div>
              <div className="mt-1 font-display text-base font-extrabold sm:text-lg">{f.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-6 sm:mt-24 lg:grid-cols-2">
          <Panel
            tone="red"
            badge="◆"
            title="What mentees will learn"
            items={[
              "DSA fundamentals: arrays, strings, recursion, trees, graphs, DP",
              "A weekly LeetCode plan + pattern-based problem solving",
              "Resume that gets shortlisted + 1:1 review with your mentor",
              "Mock interviews — DSA rounds, HR rounds, behavioral",
              "How to actually apply to internships and stand out",
            ]}
          />
          <Panel
            tone="blue"
            badge="✦"
            title="What mentors will do"
            items={[
              "Lead weekly group sessions with their cohort",
              "Share roadmaps, resources and personal playbooks",
              "Review work and give honest, kind feedback",
              "Show up — consistently — for 4 weeks",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Shape({
  kind,
  className,
}: {
  kind: "circle" | "square" | "tri" | "cross" | "halfmoon";
  className?: string;
}) {
  switch (kind) {
    case "circle":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <circle cx="12" cy="12" r="10" fill="currentColor" />
        </svg>
      );
    case "square":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <rect x="3" y="3" width="18" height="18" fill="currentColor" />
        </svg>
      );
    case "tri":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <polygon points="12,2 22,22 2,22" fill="currentColor" />
        </svg>
      );
    case "cross":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M4 4 L20 20 M20 4 L4 20" stroke="currentColor" strokeWidth="4" />
        </svg>
      );
    case "halfmoon":
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M2 12 A10 10 0 0 1 22 12 Z" fill="currentColor" />
        </svg>
      );
  }
}

function Panel({
  tone,
  badge,
  title,
  items,
}: {
  tone: "red" | "blue";
  badge: string;
  title: string;
  items: string[];
}) {
  const bg = tone === "red" ? "var(--brand-red)" : "var(--brand-blue)";
  return (
    <div
      className="rounded-3xl border-2 border-ink bg-white p-8 shadow-card"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="flex items-center gap-3">
        <span
          className="grid h-12 w-12 place-items-center rounded-2xl border-2 border-ink font-display text-xl font-extrabold text-white"
          style={{ background: bg, borderColor: "var(--ink)" }}
        >
          {badge}
        </span>
        <h3 className="font-display text-2xl font-extrabold">{title}</h3>
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((it, i) => (
          <li key={it} className="flex items-start gap-3 text-foreground/80">
            <span
              className="mt-1 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border-2 border-ink text-[10px] font-extrabold"
              style={{
                background: i % 2 === 0 ? "var(--brand-yellow)" : "white",
                borderColor: "var(--ink)",
                color: "var(--ink)",
              }}
            >
              {i + 1}
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------- Timeline ------------------------------ */
function Timeline() {
  const weeks = [
    {
      week: "Week 1",
      title: "Roadmaps, DSA Basics & Career Direction",
      desc: "Find your lane, understand the landscape, and lock in a 4-week plan.",
      bg: "var(--brand-red)",
    },
    {
      week: "Week 2",
      title: "Resume, Projects & Internship Preparation",
      desc: "Build a portfolio that stands out. Sharpen the artifacts recruiters actually read.",
      bg: "var(--brand-yellow)",
    },
    {
      week: "Week 3",
      title: "Mock Interviews, Networking & Growth",
      desc: "Practice under pressure. Learn how to talk to people who can hire you.",
      bg: "var(--brand-blue)",
    },
    {
      week: "Week 4",
      title: "Personalized Action Plan & Final Guidance",
      desc: "Walk out with a written plan for the next 90 days and a network to lean on.",
      bg: "var(--brand-red)",
    },
  ];
  return (
    <section
      id="timeline"
      className="border-b-4 border-ink bg-[var(--brand-yellow)] py-20 sm:py-28"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center" data-section-title>
          <p
            className="text-sm font-bold uppercase tracking-[0.2em] text-ink"
            style={{ color: "var(--ink)" }}
          >
            ● Cohort timeline
          </p>
          <h2
            className="mt-3 font-display text-4xl font-extrabold sm:text-5xl text-ink"
            style={{ color: "var(--ink)" }}
          >
            Four weeks. <span className="italic">One playbook.</span>
          </h2>
        </div>
        <ol className="relative mt-14 space-y-8">
          {weeks.map((w, i) => {
            const white = w.bg !== "var(--brand-yellow)";
            return (
              <li
                key={w.week}
                data-week-card
                className="rounded-3xl border-2 border-ink p-6 shadow-pop sm:p-8"
                style={{
                  background: w.bg,
                  borderColor: "var(--ink)",
                  color: white ? "white" : "var(--ink)",
                }}
              >
                <div className="flex items-start gap-5">
                  <span
                    className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full border-2 border-ink bg-white font-display text-xl font-extrabold text-ink"
                    style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-80">
                      {w.week}
                    </div>
                    <h3 className="mt-1 font-display text-2xl font-extrabold">{w.title}</h3>
                    <p className="mt-2 opacity-90">{w.desc}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------- Mentors -------------------------------- */
const MENTOR_TEASERS = [
  {
    tag: "Mentor 01",
    hint: "SDE @ Big Tech · DSA whisperer",
    bg: "var(--brand-red)",
    fg: "white",
    emoji: "👩‍💻",
  },
  {
    tag: "Mentor 02",
    hint: "Backend engineer · System design",
    bg: "var(--brand-yellow)",
    fg: "var(--ink)",
    emoji: "⚙️",
  },
  {
    tag: "Mentor 03",
    hint: "PM Intern → FAANG · Case prep",
    bg: "var(--brand-blue)",
    fg: "white",
    emoji: "🚀",
  },
  {
    tag: "Mentor 04",
    hint: "Data Scientist · ML + Open source",
    bg: "var(--brand-red)",
    fg: "white",
    emoji: "📊",
  },
];

function Mentors() {
  return (
    <section
      id="mentors"
      className="border-b-4 border-ink bg-white py-20 sm:py-28"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center" data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
            ✦ Meet the mentors
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            The lineup is <span className="bg-[var(--brand-red)] px-2 text-white">under wraps</span>
          </h2>
          <p className="mt-4 text-base text-foreground/75 sm:text-lg">
            We're curating a small, intentional set of women already shipping at top tech companies.
            Names drop soon — get on the list before they do.
          </p>
        </div>

        <div data-stagger-up className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MENTOR_TEASERS.map((m, i) => (
            <article
              key={m.tag}
              className={`group relative overflow-hidden rounded-3xl border-2 border-ink shadow-card transition-transform hover:-translate-y-2 hover:rotate-0 ${i % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
              style={{ background: m.bg, borderColor: "var(--ink)", color: m.fg }}
            >
              <div
                className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink"
                style={{ borderColor: "var(--ink)" }}
              >
                {/* dotted texture */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
                    backgroundSize: "14px 14px",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                  <div
                    className="grid h-20 w-20 place-items-center rounded-full border-4 border-current text-4xl backdrop-blur-sm"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                    {m.emoji}
                  </div>
                  <div className="rounded-full border-2 border-current px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.25em]">
                    Revealing Soon
                  </div>
                  <div className="font-display text-2xl font-extrabold">?</div>
                </div>
                {/* corner sticker */}
                <span
                  className="absolute -right-6 top-4 rotate-12 border-2 border-ink bg-white px-8 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-ink shadow-card"
                  style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
                >
                  Top Secret
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-extrabold">{m.tag}</h3>
                <p className="mt-1 text-sm font-semibold opacity-90">{m.hint}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border-2 border-current px-3 py-1 text-xs font-bold">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                  Identity locked
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-medium text-foreground/70">
            Want to be first to know who's mentoring? Apply now — accepted mentees get the reveal
            first.
          </p>
          <a
            href={APPLY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-ink bg-[var(--brand-red)] px-6 py-2.5 text-sm font-bold text-white shadow-pop transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            style={{ borderColor: "var(--ink)" }}
          >
            Apply & unlock the lineup →
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Organizing team ---------------------------- */

function OrganizingTeam() {
  const palette = [
    { bg: "var(--brand-red)", fg: "white" },
    { bg: "var(--brand-blue)", fg: "white" },
    { bg: "var(--brand-yellow)", fg: "var(--ink)" },
  ];
  const team = [
    { name: "Tavishi Jha", role: "Social Media Manager", location: "Chennai", linkedin: "https://www.linkedin.com/in/tavisshiksjjha/", img: tavishiImg.url },
    { name: "Ankitha M D", role: "Community Engagement", location: "Bangalore", linkedin: "https://www.linkedin.com/in/ankitha-m-d-a8b039219", img: ankithaImg.url },
    { name: "Aakriti Arya", role: "Social Media Manager", location: "Delhi", linkedin: "https://www.linkedin.com/in/aakriti-arya", img: aakritiImg.url },
    { name: "Pratiksha Khare", role: "Designer", location: "Satna, MP", linkedin: "https://www.linkedin.com/in/pratiksha-khare-05557b333", img: pratikshaImg.url },
    { name: "Shaifaly Rajput", role: "Designer", location: "Patiala, Punjab", linkedin: "https://www.linkedin.com/in/shaifaly-rajput-08a8a53b5", img: shaifaliImg.url },
    { name: "Bhavni Chhabra", role: "Designer", location: "New Delhi", linkedin: "https://www.linkedin.com/in/bhavni-chhabra-95640b334", img: bhavniImg.url },
    { name: "Rhythm Arora", role: "Host & Moderator", location: "New Delhi", linkedin: "https://www.linkedin.com/in/rhythmisloading/", img: rhythmImg.url },
    { name: "Sukrutha Jagannatham", role: "Host & Moderator", location: "Hyderabad", linkedin: "https://www.linkedin.com/in/sukrutha-jagannatham-72662837a", img: sukruthaImg.url },
    { name: "Suhani Garg", role: "Host & Moderator", location: "Jaipur", linkedin: "https://www.linkedin.com/in/suhani-garg-88a736318/", img: suhaniImg.url },
    { name: "Tejashwani Mishra", role: "Host & Moderator", location: "Jhansi, UP", linkedin: "https://www.linkedin.com/in/tejashwani-mishra-9a790427a/", img: tejashwaniImg.url },
    { name: "Nandini Yadav", role: "Designer", location: "Nainital", linkedin: "https://www.linkedin.com/in/nayndini/", img: nandiniImg.url },
    { name: "Isha Singhal", role: "Community Engagement", location: "Dehradun", linkedin: "https://www.linkedin.com/in/isha-singhal12/", img: ishaImg.url },
    { name: "Gnan Sruthi R", role: "Management", location: "Coimbatore", linkedin: "https://www.linkedin.com/in/gnan-sruthi-r-1a99492b3/", img: sruthiImg.url },
    { name: "Akshita Tyagi", role: "Program Management", location: "Bijnor", linkedin: "https://www.linkedin.com/in/akshita-tyagi8368", img: akshitaImg.url },
    { name: "Vijay Laxmi", role: "Management", location: "Delhi", linkedin: "https://www.linkedin.com/in/laxmi-vijay/", img: vijayLaxmiImg.url },
  ];
  return (
    <section className="border-b-4 border-ink bg-white py-20 sm:py-28" style={{ borderColor: "var(--ink)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center" data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
            ✺ The team
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Meet the humans behind the cohort
          </h2>
          <p className="mt-4 text-base text-foreground/75 sm:text-lg">
            A volunteer-led group of women putting in late nights so this cohort gets the care it deserves.
          </p>
        </div>

        <div data-stagger-up className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {team.map((p, i) => {
            const c = palette[i % palette.length];
            return (
              <a
                key={p.name}
                href={p.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block overflow-hidden rounded-3xl border-2 border-ink shadow-card transition-transform hover:-translate-y-2 hover:rotate-0 ${i % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
                style={{ background: c.bg, borderColor: "var(--ink)", color: c.fg }}
              >
                <div
                  className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink"
                  style={{ borderColor: "var(--ink)" }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute -right-6 top-4 rotate-12 border-2 border-ink bg-white px-8 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-ink shadow-card"
                    style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
                  >
                    Team GLT
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-extrabold leading-tight">{p.name}</h3>
                  <p className="mt-1 text-sm font-semibold opacity-90">{p.role}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border-2 border-current px-3 py-1 text-xs font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {p.location}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Who should apply -------------------------- */
function WhoShouldApply() {
  const items = [
    "Beginners exploring tech for the first time",
    "Students preparing for their first internship",
    "Girls looking for honest career guidance",
    "Students struggling with consistency or direction",
    "Aspiring developers who want a community to build with",
  ];
  return (
    <section
      className="border-b-4 border-ink bg-[var(--brand-blue)] py-20 text-white sm:py-28"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
            ✱ Who should apply
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            This cohort was built for you if…
          </h2>
          <p className="mt-4 text-white/80">
            You don't need a perfect CV or a fancy college. You need curiosity, commitment, and 4
            weeks of honest effort.
          </p>
        </div>
        <ul
          className="space-y-3 rounded-3xl border-2 border-ink bg-white p-6 text-foreground shadow-pop sm:p-8"
          style={{ borderColor: "var(--ink)" }}
        >
          {items.map((it, i) => (
            <li key={it} data-reveal className="flex items-start gap-3">
              <span
                className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border-2 border-ink bg-[var(--brand-yellow)] text-xs font-extrabold text-ink"
                style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
              >
                ✓
              </span>
              <span className="font-medium">{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------- Process — slide flipping ----------------------- */
function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const steps = [
    {
      title: "Apply",
      kicker: "5 minutes · Honest answers only",
      bullets: [
        "Tell us about your year, branch, and current DSA comfort level.",
        "Share what you want to crack: SDE, data, product, open source.",
        "No CV polish needed — we read every form ourselves.",
      ],
      bg: "var(--brand-red)",
      num: "01",
    },
    {
      title: "Shortlisting",
      kicker: "Reviewed by humans · Not bots",
      bullets: [
        "We look for commitment, curiosity, and clarity of intent.",
        "First-years and pre-final years are equally welcome.",
        "Selected applicants are notified via email within a week.",
      ],
      bg: "var(--brand-yellow)",
      num: "02",
    },
    {
      title: "Mentor Matching",
      kicker: "1 mentor · ~10 mentees",
      bullets: [
        "Matched on goals — DSA depth, internship target, working language.",
        "Intro call with your mentor to set expectations and a 4-week plan.",
        "Join your private cohort channel + the wider GLT community.",
      ],
      bg: "var(--brand-blue)",
      num: "03",
    },
    {
      title: "Cohort Begins",
      kicker: "4 weeks · Live + async",
      bullets: [
        "Weekly live session: DSA patterns, mock interviews, resume teardowns.",
        "Async support over the week + weekly LeetCode + project checkpoints.",
        "End with a 90-day action plan and a network that doesn't disappear.",
      ],
      bg: "var(--brand-red)",
      num: "04",
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    // Skip pinned 3D flip on mobile — we render a stacked version instead.
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card");
      cards.forEach((card, i) => {
        gsap.set(card, {
          rotateY: i === 0 ? 0 : -90,
          opacity: i === 0 ? 1 : 0,
          transformPerspective: 1400,
          transformOrigin: "left center",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${cards.length * 600}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        const prev = cards[i - 1];
        tl.to(prev, { rotateY: 90, opacity: 0, duration: 1, ease: "power2.inOut" }).to(
          card,
          { rotateY: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
          "<",
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8" data-section-title>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
            ✦ How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">
            The application process — <span className="italic">scroll to flip</span>
          </h2>
          <p className="mt-3 text-sm text-foreground/70 sm:text-base">
            Four steps from "I'm thinking about it" to "I'm in the cohort."
          </p>
        </div>
      </div>

      {/* Mobile: stacked tilt-in cards */}
      <div
        className="mx-auto mt-10 grid max-w-2xl gap-4 px-4 pb-10 sm:px-6 md:hidden"
        style={{ perspective: "1200px" }}
      >
        {steps.map((s, i) => {
          const white = s.bg !== "var(--brand-yellow)";
          return (
            <div
              key={s.title}
              data-tilt
              className="rounded-3xl border-4 border-ink p-6 shadow-pop"
              style={{
                background: s.bg,
                borderColor: "var(--ink)",
                color: white ? "white" : "var(--ink)",
              }}
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl font-extrabold opacity-90">{s.num}</span>
                <span className="rounded-full border-2 border-current px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                  Step {i + 1}/{steps.length}
                </span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-extrabold">{s.title}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider opacity-80">
                {s.kicker}
              </p>
              <ul className="mt-4 space-y-2 text-sm font-medium opacity-95">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden>→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Desktop: pinned 3D flipping cards */}
      <div
        ref={containerRef}
        className="relative mx-auto mt-12 hidden h-screen max-w-5xl items-center justify-center px-4 sm:px-6 md:flex lg:px-8"
      >
        <div className="relative aspect-[4/3] w-full max-w-3xl" style={{ perspective: "1400px" }}>
          {steps.map((s, i) => {
            const white = s.bg !== "var(--brand-yellow)";
            return (
              <div
                key={s.title}
                className="process-card absolute inset-0 flex flex-col justify-between rounded-3xl border-4 border-ink p-8 shadow-pop sm:p-10"
                style={{
                  background: s.bg,
                  borderColor: "var(--ink)",
                  color: white ? "white" : "var(--ink)",
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-7xl font-extrabold opacity-90">{s.num}</span>
                  <span className="rounded-full border-2 border-current px-3 py-1 text-xs font-bold uppercase tracking-widest">
                    Step {i + 1} of {steps.length}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-4xl font-extrabold sm:text-5xl">{s.title}</h3>
                  <p className="mt-2 text-sm font-bold uppercase tracking-wider opacity-80">
                    {s.kicker}
                  </p>
                  <ul className="mt-5 grid max-w-2xl gap-2 text-base font-medium opacity-95 sm:text-lg">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span aria-hidden className="font-extrabold">
                          →
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-20 text-center sm:px-6 md:-mt-8 lg:px-8">
        <div
          className="rounded-2xl border-2 border-ink bg-[var(--brand-yellow)] p-4 text-xs font-bold text-ink shadow-card sm:p-5 sm:text-base"
          style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
        >
          ⚡ Limited seats. Selection-based. Real commitment expected — both ways.
        </div>
      </div>
    </section>
  );
}


/* --------------------------- Community proof ---------------------------- */
function CommunityProof() {
  return (
    <section
      className="border-y-4 border-ink bg-[var(--brand-red)] py-20 text-white sm:py-28"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div data-section-title>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-yellow)]">
              ❤ Community proof
            </p>
            <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              A community that already shows up — every single week
            </h2>
            <p className="mt-4 text-white/85">
              Before this mentorship cohort, we've spent over a year building a real community of
              women in tech across India. Workshops, AMAs, late-night accountability calls — loud,
              warm, and honest.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <BigStat value="100+" label="Events" />
              <BigStat value="120+" label="Speakers" />
              <BigStat value="∞" label="DMs answered" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3" data-reveal>
            <img
              src={community1.url}
              alt="Girls Leading Tech community members at a tech event"
              loading="lazy"
              className="col-span-2 aspect-[16/10] w-full rotate-1 rounded-2xl border-2 border-ink object-cover shadow-pop"
              style={{ borderColor: "var(--ink)" }}
            />
            <Quote
              quote="Finally a space where my questions don't sound stupid."
              by="Sanya, B.Tech Year 2"
              bg="var(--brand-yellow)"
              textInk
            />
            <Quote
              quote="The most actionable advice I've gotten on my resume."
              by="Tanu, B.Sc CS"
              bg="var(--brand-blue)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="rounded-2xl border-2 border-ink bg-white p-3 text-ink shadow-card"
      style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
    >
      <div className="font-display text-3xl font-extrabold">{value}</div>
      <div className="text-xs font-semibold uppercase opacity-80">{label}</div>
    </div>
  );
}

function Quote({
  quote,
  by,
  bg,
  textInk,
}: {
  quote: string;
  by: string;
  bg: string;
  textInk?: boolean;
}) {
  return (
    <figure
      className="rounded-2xl border-2 border-ink p-5 shadow-card"
      style={{ background: bg, borderColor: "var(--ink)", color: textInk ? "var(--ink)" : "white" }}
    >
      <blockquote className="text-sm font-medium">"{quote}"</blockquote>
      <figcaption className="mt-3 text-xs font-bold opacity-80">— {by}</figcaption>
    </figure>
  );
}

/* --------------------------- Asset Generator ---------------------------- */
function AssetGenerator() {
  const [mode, setMode] = useState<"photobooth" | "ticket">("photobooth");
  return (
    <section
      id="generator"
      className="relative overflow-hidden border-b-4 border-ink bg-[var(--brand-yellow)] py-20 sm:py-28"
      style={{ borderColor: "var(--ink)" }}
    >
      <div
        data-parallax="0.25"
        className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-[var(--brand-red)]"
      />
      <div
        data-parallax="0.35"
        className="pointer-events-none absolute right-0 bottom-10 h-52 w-52 rotate-12 bg-[var(--brand-blue)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-red)]">
            ★ Flex your cohort vibes
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            The{" "}
            <span
              className="bg-white px-2 border-2 border-ink"
              style={{ borderColor: "var(--ink)" }}
            >
              GLT Asset Studio
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-ink/80 sm:text-lg">
            Generate your own photobooth shot or cohort ticket, then share it on LinkedIn, X and
            Instagram. Tag <strong>@girlsleadingtech</strong> and show the world you're in.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-2" data-reveal>
          {(["photobooth", "ticket"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full border-2 border-ink px-5 py-2 text-sm font-bold uppercase tracking-wider transition ${mode === m ? "bg-ink text-white" : "bg-white text-ink hover:bg-[var(--brand-red)] hover:text-white"}`}
              style={{ borderColor: "var(--ink)" }}
            >
              {m === "photobooth" ? "📸 Photobooth" : "🎟️ Ticket"}
            </button>
          ))}
        </div>

        <div className="mt-10" data-reveal>
          {mode === "photobooth" ? <Photobooth /> : <TicketGen />}
        </div>
      </div>
    </section>
  );
}

// Hex fallbacks — html-to-image cannot rasterize oklch() colors reliably.
const INK_HEX = "#141520";
const RED_HEX = "#ef2b2d";
const BLUE_HEX = "#2535c4";
const YELLOW_HEX = "#f5c842";

const FRAMES = [
  { id: "red", bg: RED_HEX, fg: "#ffffff", label: "Bold Red" },
  { id: "blue", bg: BLUE_HEX, fg: "#ffffff", label: "Electric Blue" },
  { id: "yellow", bg: YELLOW_HEX, fg: INK_HEX, label: "Sunshine" },
];

function downloadNode(node: HTMLElement, filename: string) {
  // html-to-image serializes computed colors into an SVG foreignObject. Browsers
  // refuse to paint oklch() inside that SVG, so override the brand CSS vars on
  // the captured root with hex fallbacks before capturing.
  const prev: Record<string, string> = {};
  const vars: Record<string, string> = {
    "--ink": INK_HEX,
    "--brand-red": RED_HEX,
    "--brand-blue": BLUE_HEX,
    "--brand-yellow": YELLOW_HEX,
    "--foreground": INK_HEX,
    "--background": "#ffffff",
    "--card": "#ffffff",
    "--border": INK_HEX,
  };
  Object.entries(vars).forEach(([k, v]) => {
    prev[k] = node.style.getPropertyValue(k);
    node.style.setProperty(k, v);
  });

  return toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#ffffff",
  })
    .then((dataUrl) => {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = filename;
      a.click();
    })
    .finally(() => {
      Object.entries(prev).forEach(([k, v]) => {
        if (v) node.style.setProperty(k, v);
        else node.style.removeProperty(k);
      });
    });
}

function shareLinks(text: string) {
  const url = "https://girlsleadingtech.com";
  const enc = encodeURIComponent(`${text}\n\n#GirlsLeadingTech #GLTCohort`);
  return {
    twitter: `https://twitter.com/intent/tweet?text=${enc}&url=${encodeURIComponent(url)}&via=GirlLeadingTech`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };
}

function loadCanvasImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    if (!src.startsWith("data:")) image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (image.naturalWidth - sw) / 2;
  const sy = (image.naturalHeight - sh) / 2;
  ctx.drawImage(image, sx, sy, sw, sh, x, y, w, h);
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = testLine;
    }
  });
  if (line) ctx.fillText(line, x, y);
}

async function downloadPhotoboothCanvas(
  photoSrc: string,
  frame: (typeof FRAMES)[number],
  caption: string,
) {
  const [photo, logo] = await Promise.all([loadCanvasImage(photoSrc), loadCanvasImage(gltLogo)]);
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = frame.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = frame.id === "yellow" ? RED_HEX : YELLOW_HEX;
  ctx.fillRect(0, 0, 1080, 44);
  ctx.fillRect(0, 1306, 1080, 44);
  ctx.fillStyle = frame.id === "blue" ? RED_HEX : BLUE_HEX;
  ctx.fillRect(0, 0, 44, 1350);
  ctx.fillRect(1036, 0, 44, 1350);

  ctx.fillStyle = "rgba(255,255,255,0.22)";
  for (let y = 120; y < 1230; y += 92) {
    for (let x = 84; x < 1000; x += 92) {
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(120, 116, 42, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(78, 74, 84, 84);
  ctx.drawImage(logo, 78, 74, 84, 84);
  ctx.restore();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(120, 116, 46, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = frame.fg;
  ctx.font = "900 30px system-ui, sans-serif";
  ctx.fillText("Girls Leading Tech", 190, 106);
  ctx.font = "800 22px system-ui, sans-serif";
  ctx.fillText("DSA & Internship Guidance · Cohort 01", 190, 142);

  const photoX = 100;
  const photoY = 210;
  const photoSize = 880;
  roundedRect(ctx, photoX - 12, photoY - 12, photoSize + 24, photoSize + 24, 74);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.save();
  roundedRect(ctx, photoX, photoY, photoSize, photoSize, 62);
  ctx.clip();
  drawCoverImage(ctx, photo, photoX, photoY, photoSize, photoSize);
  ctx.restore();

  ctx.fillStyle = frame.fg;
  ctx.font = "900 46px system-ui, sans-serif";
  drawWrappedText(ctx, `“${caption}”`, 100, 1170, 880, 54);
  ctx.font = "900 22px system-ui, sans-serif";
  ctx.fillText("#GLTCohort · #GirlsLeadingTech", 100, 1265);

  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = "glt-photobooth.png";
  a.click();
}

function Photobooth() {
  const [img, setImg] = useState<string | null>(null);
  const [frame, setFrame] = useState(FRAMES[0]);
  const [caption, setCaption] = useState("I'm in the GLT Cohort!");
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const onFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = () => setImg(reader.result as string);
    reader.readAsDataURL(f);
  };

  const download = useCallback(async () => {
    if (!img) return;
    setBusy(true);
    try {
      await downloadPhotoboothCanvas(img, frame, caption);
    } finally {
      setBusy(false);
    }
  }, [caption, frame, img]);

  const links = shareLinks(`${caption} 💛 Joining the Girls Leading Tech DSA & Internship Cohort.`);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div
        className="rounded-3xl border-2 border-ink bg-white p-6 shadow-pop"
        style={{ borderColor: "var(--ink)" }}
      >
        <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">
          1. Upload your photo
        </label>
        <label
          className="mt-2 flex h-32 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-ink bg-[var(--brand-yellow)]/30 text-center text-sm font-bold text-ink hover:bg-[var(--brand-yellow)]/60"
          style={{ borderColor: "var(--ink)" }}
        >
          {img ? "✓ Photo loaded — click to swap" : "📷 Click to choose a selfie"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
        </label>

        <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-ink/70">
          2. Pick a vibe
        </label>
        <div className="mt-2 flex gap-2">
          {FRAMES.map((f) => (
            <button
              key={f.id}
              onClick={() => setFrame(f)}
              className={`flex-1 rounded-xl border-2 border-ink px-3 py-2 text-xs font-bold transition ${frame.id === f.id ? "ring-4 ring-ink" : ""}`}
              style={{ borderColor: "var(--ink)", background: f.bg, color: f.fg }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-ink/70">
          3. Your caption
        </label>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          maxLength={60}
          className="mt-2 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm font-semibold focus:outline-none"
          style={{ borderColor: "var(--ink)" }}
        />

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            disabled={!img || busy}
            onClick={download}
            className="rounded-full border-2 border-ink bg-ink px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40"
            style={{ borderColor: "var(--ink)" }}
          >
            {busy ? "Rendering…" : "⬇ Download PNG"}
          </button>
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-ink bg-[var(--brand-blue)] px-5 py-2.5 text-sm font-bold text-white"
            style={{ borderColor: "var(--ink)" }}
          >
            𝕏 Share
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-ink bg-[var(--brand-red)] px-5 py-2.5 text-sm font-bold text-white"
            style={{ borderColor: "var(--ink)" }}
          >
            in Share
          </a>
        </div>
        <p className="mt-3 text-xs text-ink/60">
          Download first, then attach the image to your post.
        </p>
      </div>

      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border-4 border-ink shadow-pop"
          style={{ borderColor: "var(--ink)", background: frame.bg, color: frame.fg }}
        >
          <div className="absolute left-3 top-3 h-3 w-3 rounded-full bg-white/80" />
          <div className="absolute right-3 top-3 h-3 w-3 rounded-full bg-white/80" />
          <div className="absolute left-3 bottom-3 h-3 w-3 rounded-full bg-white/80" />
          <div className="absolute right-3 bottom-3 h-3 w-3 rounded-full bg-white/80" />

          <div className="flex items-center justify-between px-5 pt-5">
            <div className="flex items-center gap-2">
              <img
                src={gltLogo}
                alt="GLT"
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
                crossOrigin="anonymous"
              />
              <span className="text-[11px] font-extrabold uppercase tracking-widest">
                Girls Leading Tech
              </span>
            </div>
            <span className="rounded-full border-2 border-current px-2 py-0.5 text-[10px] font-bold uppercase">
              Cohort 01
            </span>
          </div>

          <div className="mx-5 mt-4 aspect-square overflow-hidden rounded-2xl border-4 border-white bg-white/20">
            {img ? (
              <img src={img} alt="you" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-center text-xs font-bold opacity-70">
                Your photo will
                <br />
                appear here
              </div>
            )}
          </div>

          <div className="px-5 pb-5 pt-4">
            <p className="font-display text-xl font-extrabold leading-tight">"{caption}"</p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-widest opacity-80">
              #GLTCohort · DSA & Internship Guidance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketGen() {
  const [name, setName] = useState("Ada Lovelace");
  const role = "Mentee";
  const [track, setTrack] = useState("DSA & Internship Guidance");
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const ticketId = `GLT-${name.replace(/\s/g, "").slice(0, 4).toUpperCase() || "XXXX"}-${String(Math.abs(name.length * 73 + role.length * 11) % 9999).padStart(4, "0")}`;

  const download = useCallback(async () => {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      await downloadNode(
        cardRef.current,
        `glt-ticket-${name.replace(/\s/g, "-").toLowerCase()}.png`,
      );
    } finally {
      setBusy(false);
    }
  }, [name]);

  const links = shareLinks(
    `I just got my ticket to the Girls Leading Tech DSA & Internship Cohort as a ${role}! 🎟️💛`,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div
        className="rounded-3xl border-2 border-ink bg-white p-6 shadow-pop"
        style={{ borderColor: "var(--ink)" }}
      >
        <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">
          Your name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={28}
          className="mt-2 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm font-semibold focus:outline-none"
          style={{ borderColor: "var(--ink)" }}
        />

        <div
          className="mt-5 rounded-xl border-2 border-ink bg-[var(--brand-yellow)] px-3 py-2 text-sm font-bold text-ink"
          style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
        >
          Joining as: Mentee
        </div>

        <label className="mt-5 block text-xs font-bold uppercase tracking-wider text-ink/70">
          Track
        </label>
        <input
          value={track}
          onChange={(e) => setTrack(e.target.value)}
          maxLength={40}
          className="mt-2 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm font-semibold focus:outline-none"
          style={{ borderColor: "var(--ink)" }}
        />

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            disabled={busy}
            onClick={download}
            className="rounded-full border-2 border-ink bg-ink px-5 py-2.5 text-sm font-bold text-white disabled:opacity-40"
            style={{ borderColor: "var(--ink)" }}
          >
            {busy ? "Rendering…" : "⬇ Download ticket"}
          </button>
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-ink bg-[var(--brand-blue)] px-5 py-2.5 text-sm font-bold text-white"
            style={{ borderColor: "var(--ink)" }}
          >
            𝕏 Share
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-ink bg-[var(--brand-red)] px-5 py-2.5 text-sm font-bold text-white"
            style={{ borderColor: "var(--ink)" }}
          >
            in Share
          </a>
        </div>
        <p className="mt-3 text-xs text-ink/60">
          Download first, then attach the image to your post.
        </p>
      </div>

      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="relative flex w-full max-w-xl overflow-hidden rounded-3xl border-4 border-ink bg-white shadow-pop"
          style={{ borderColor: "var(--ink)" }}
        >
          <div className="relative flex w-28 flex-col items-center justify-between bg-[var(--brand-red)] p-4 text-white">
            <img
              src={gltLogo}
              alt="GLT"
              className="h-12 w-12 rounded-full border-2 border-white object-cover"
              crossOrigin="anonymous"
            />
            <div className="rotate-180 [writing-mode:vertical-rl] text-[11px] font-extrabold uppercase tracking-[0.3em]">
              Girls Leading Tech
            </div>
            <div className="text-[10px] font-bold opacity-90">ADMIT ONE</div>
          </div>

          <div
            className="relative w-0 border-l-4 border-dashed border-ink"
            style={{ borderColor: "var(--ink)" }}
          >
            <div
              className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-[var(--brand-yellow)] border-2 border-ink"
              style={{ borderColor: "var(--ink)" }}
            />
            <div
              className="absolute -left-3 -bottom-3 h-6 w-6 rounded-full bg-[var(--brand-yellow)] border-2 border-ink"
              style={{ borderColor: "var(--ink)" }}
            />
          </div>

          <div className="flex-1 bg-white p-5">
            <div className="flex items-center justify-between">
              <span
                className="rounded-full border-2 border-ink bg-[var(--brand-yellow)] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-ink"
                style={{ borderColor: "var(--ink)" }}
              >
                Cohort 01
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink/60">
                {ticketId}
              </span>
            </div>

            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-ink/60">
              Attendee
            </p>
            <p className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
              {name || "—"}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div
                className="rounded-xl border-2 border-ink bg-[var(--brand-blue)] p-2.5 text-white"
                style={{ borderColor: "var(--ink)" }}
              >
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-90">Role</p>
                <p className="font-display text-base font-extrabold">{role}</p>
              </div>
              <div
                className="rounded-xl border-2 border-ink bg-[var(--brand-red)] p-2.5 text-white"
                style={{ borderColor: "var(--ink)" }}
              >
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-90">Track</p>
                <p className="font-display text-sm font-extrabold leading-tight">{track}</p>
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-ink/60">
                  Duration
                </p>
                <p className="font-display text-sm font-extrabold text-ink">4 weeks · Online</p>
              </div>
              <div className="flex h-10 items-end gap-[2px]">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className="block bg-ink"
                    style={{ width: 2, height: `${30 + ((i * 37) % 70)}%` }}
                  />
                ))}
              </div>
            </div>

            <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-widest text-ink/70">
              girlsleadingtech.com · #GLTCohort
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- FAQ ---------------------------------- */
function FAQ() {
  const items = [
    {
      q: "Is the program free?",
      a: "Yes. The first cohort is fully free for selected mentees. Our mentors and team volunteer their time.",
    },
    {
      q: "Is it beginner friendly?",
      a: "Absolutely. If you're just starting out and feel a little lost, this cohort is designed exactly for you.",
    },
    {
      q: "Will sessions be recorded?",
      a: "Yes — recordings will be shared with your cohort so you never miss a session, even on busy weeks.",
    },
    {
      q: "How are mentees selected?",
      a: "Through a short application. We look for commitment and curiosity — not credentials.",
    },
    {
      q: "Can first-year students apply?",
      a: "Yes. First-years and pre-final-years are equally welcome.",
    },
    {
      q: "What is expected from mentors?",
      a: "About 2–3 hours a week for 4 weeks: one group session plus async support over the community.",
    },
    {
      q: "Will certificates be provided?",
      a: "Yes. Mentees and mentors who complete the cohort receive a verified certificate from GLT.",
    },
  ];
  return (
    <section
      id="faq"
      className="border-b-4 border-ink bg-white py-20 sm:py-28"
      style={{ borderColor: "var(--ink)" }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center" data-section-title>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
            ? FAQ
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Questions, <span className="bg-[var(--brand-yellow)] px-2">answered honestly</span>
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-reveal
              className="mb-3 rounded-2xl border-2 border-ink bg-white px-5 shadow-card"
              style={{ borderColor: "var(--ink)" }}
            >
              <AccordionTrigger className="text-left font-display text-base font-bold hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/75">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ------------------------------ Final CTA ------------------------------- */
function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden border-b-4 border-ink bg-[var(--brand-yellow)] py-20 text-ink sm:py-28"
      style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
    >
      <div
        data-parallax="0.2"
        className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-[var(--brand-red)]"
      />
      <div
        data-parallax="0.3"
        className="pointer-events-none absolute right-10 bottom-10 h-40 w-40 rotate-12 bg-[var(--brand-blue)]"
      />
      <div
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        data-section-title
      >
        <h2 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
          Ready to grow with a community that supports you?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base font-medium sm:text-lg">
          Join the first mentorship cohort by Girls Leading Tech and learn from women already
          building their careers in tech.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="rounded-full border-2 border-ink bg-[var(--brand-red)] text-white shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            style={{ borderColor: "var(--ink)" }}
          >
            <a href={APPLY_FORM_URL} target="_blank" rel="noopener noreferrer">Apply as Mentee →</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer -------------------------------- */
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/girlsleadingtech",
    glyph: "in",
    bg: "var(--brand-blue)",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/girlsleadingtech",
    glyph: "ig",
    bg: "var(--brand-red)",
  },
  { label: "X / Twitter", href: "https://x.com/GirlLeadingTech", glyph: "𝕏", bg: "var(--ink)" },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VayYXL4K5cD7Zrzq052G",
    glyph: "wa",
    bg: "var(--brand-yellow)",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@girlsleadingtech",
    glyph: "▶",
    bg: "var(--brand-red)",
  },
  {
    label: "Substack",
    href: "https://girlsintech.substack.com/",
    glyph: "S",
    bg: "var(--brand-blue)",
  },
];

function Footer() {
  return (
    <footer className="relative bg-ink text-white" style={{ background: "var(--ink)" }}>
      {/* Massive wordmark */}
      <div className="overflow-hidden border-b border-white/15 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-[18vw] font-extrabold leading-[0.85] tracking-tighter sm:text-[14vw]">
            <span className="text-white">GIRLS</span>{" "}
            <span className="text-[var(--brand-yellow)]">LEADING</span>{" "}
            <span className="text-[var(--brand-red)]">TECH</span>
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl font-bold leading-snug">
              A community of ambitious girls in tech across India — building careers, friendships
              and futures, together.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-red)] animate-pulse" />
              India · Remote-first
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Explore</h4>
            <ul className="mt-4 space-y-2 font-display text-lg font-semibold">
              <li>
                <a href="#why" className="hover:text-[var(--brand-yellow)]">
                  About
                </a>
              </li>
              <li>
                <a href="#program" className="hover:text-[var(--brand-yellow)]">
                  Program
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-[var(--brand-yellow)]">
                  Timeline
                </a>
              </li>
              <li>
                <a href="#mentors" className="hover:text-[var(--brand-yellow)]">
                  Mentors
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[var(--brand-yellow)]">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Find us everywhere
            </h4>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {SOCIALS.map((s) => {
                const dark = s.bg === "var(--brand-yellow)" || s.bg === "var(--ink)";
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative flex aspect-square flex-col items-center justify-center rounded-2xl border-2 p-3 text-center font-display text-lg font-extrabold transition-transform hover:-translate-y-1 hover:rotate-2"
                    style={{
                      background: s.bg,
                      borderColor: "white",
                      color: dark ? (s.bg === "var(--ink)" ? "white" : "var(--ink)") : "white",
                    }}
                  >
                    <span className="text-2xl">{s.glyph}</span>
                    <span className="mt-1 text-[10px] uppercase tracking-wider opacity-90">
                      {s.label}
                    </span>
                  </a>
                );
              })}
            </div>
            <a
              href="mailto:hello@girlsleadingtech.in"
              className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-white px-4 py-2 text-sm font-bold transition hover:bg-white hover:text-ink"
            >
              ✉ hello@girlsleadingtech.in
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Girls Leading Tech. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Made with <span className="text-[var(--brand-red)]">♥</span> by the GLT team
          </p>
        </div>
      </div>
    </footer>
  );
}
