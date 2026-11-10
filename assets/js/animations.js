/* ============================================================
   Krithi — motion layer (GSAP + Lenis). Fully optional:
   if a library fails to load, the page still works and all
   content stays visible.
   ============================================================ */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  /* ---- Smooth scrolling (desktop pointer only) ---- */
  let lenis = null;
  try {
    if (window.Lenis && !reduce && !coarse) {
      lenis = new window.Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: 1 });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  } catch (e) { lenis = null; }

  if (!window.gsap) return;
  const gsap = window.gsap;
  const ST = window.ScrollTrigger || null;
  if (ST) {
    gsap.registerPlugin(ST);
    if (lenis) {
      lenis.on("scroll", ST.update);
      gsap.ticker.add((t) => { /* keep ST in sync */ });
    }
  }

  if (reduce) return;

  /* ---- Hero entrance timeline (runs on load) ---- */
  if (document.querySelector(".hero2")) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
    tl.from(".hero2 .pill", { y: 18, opacity: 0, duration: 0.6 })
      .from(".hero2 h1", { y: 28, opacity: 0 }, "-=0.35")
      .from(".hero2 .lead2", { y: 20, opacity: 0 }, "-=0.6")
      .from(".hero2 .btn-row", { y: 18, opacity: 0 }, "-=0.6")
      .from(".hero2__chips span", { y: 14, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.5")
      .from(".hero2__gallery .hg", { y: 44, opacity: 0, scale: 0.94, stagger: 0.12, duration: 0.8 }, "-=0.95")
      .from(".hero2__badge", { y: 18, opacity: 0, scale: 0.9, duration: 0.5 }, "-=0.35");
  }

  if (!ST) return;

  /* ---- Parallax: hero gallery drifts up gently ---- */
  gsap.to(".hero2__gallery", {
    yPercent: -9, ease: "none",
    scrollTrigger: { trigger: ".hero2", start: "top top", end: "bottom top", scrub: true }
  });

  /* ---- Parallax: section split images drift subtly ---- */
  gsap.utils.toArray(".split__media").forEach((el) => {
    const img = el.querySelector("img");
    if (!img) return;
    gsap.fromTo(img, { yPercent: -4 }, {
      yPercent: 4, ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  /* keep ScrollTrigger measurements fresh after load/images */
  window.addEventListener("load", () => ST.refresh());
})();
