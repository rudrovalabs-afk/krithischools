/* ============================================================
   Krithi International School — interactions
   Vanilla JS, no dependencies. Fast & progressive.
   ============================================================ */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from((c || document).querySelectorAll(s));

  /* ---- Shared contact constants ---- */
  const WA_NUMBER = "918142701791";                 // +91 81427 01791
  const EMAIL     = "krithiinternational@gmail.com";

  /* ---------- Mobile nav ---------- */
  const toggle = $(".nav__toggle");
  if (toggle) {
    const close = () => document.body.classList.remove("nav-open");
    toggle.addEventListener("click", () =>
      document.body.classList.toggle("nav-open")
    );
    $$(".nav__links a").forEach(a => a.addEventListener("click", close));
    const bd = $(".nav-backdrop");
    if (bd) bd.addEventListener("click", close);
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = $(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Hero slideshow ---------- */
  const slides = $$(".hero__slide");
  if (slides.length > 1) {
    const dotsWrap = $(".hero__dots");
    let i = 0, timer;
    if (dotsWrap) {
      slides.forEach((_, idx) => {
        const b = document.createElement("button");
        b.setAttribute("aria-label", "Show slide " + (idx + 1));
        if (idx === 0) b.classList.add("is-active");
        b.addEventListener("click", () => { go(idx); restart(); });
        dotsWrap.appendChild(b);
      });
    }
    const dots = dotsWrap ? $$("button", dotsWrap) : [];
    function go(n) {
      slides[i].classList.remove("is-active");
      if (dots[i]) dots[i].classList.remove("is-active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("is-active");
      if (dots[i]) dots[i].classList.add("is-active");
    }
    function restart() { clearInterval(timer); timer = setInterval(() => go(i + 1), 5500); }
    restart();
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("in"));
  }

  /* ---------- Animated counters ---------- */
  const counters = $$("[data-count]");
  if (counters.length) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const dur = 1500, t0 = performance.now();
      const fmt = (n) => Number.isInteger(target) ? Math.floor(n).toLocaleString("en-IN") : n.toFixed(1);
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const io2 = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { run(e.target); io2.unobserve(e.target); } });
      }, { threshold: 0.6 });
      counters.forEach(c => io2.observe(c));
    } else counters.forEach(run);
  }

  /* ---------- FAQ accordion ---------- */
  $$(".faq__item").forEach(item => {
    const q = $(".faq__q", item), a = $(".faq__a", item);
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      a.style.maxHeight = open ? a.scrollHeight + "px" : null;
    });
  });

  /* ---------- Gallery lightbox ---------- */
  const figures = $$("[data-lightbox] img, .gallery-grid figure img");
  const lb = $("#lightbox");
  if (lb && figures.length) {
    const lbImg = $(".lightbox img", lb);
    let cur = 0;
    const srcs = figures.map(f => f.dataset.full || f.src);
    const open = (n) => { cur = n; lbImg.src = srcs[cur]; lb.classList.add("open"); document.body.style.overflow = "hidden"; };
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
    const move = (d) => { cur = (cur + d + srcs.length) % srcs.length; lbImg.src = srcs[cur]; };
    figures.forEach((f, n) => f.addEventListener("click", () => open(n)));
    $(".lightbox__close", lb).addEventListener("click", close);
    $(".lightbox__nav.prev", lb).addEventListener("click", () => move(-1));
    $(".lightbox__nav.next", lb).addEventListener("click", () => move(1));
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    });
  }

  /* ---------- Enquiry form -> WhatsApp / Email ---------- */
  const form = $("#enquiryForm");
  if (form) {
    const buildMessage = () => {
      const g = (n) => (form.elements[n] ? form.elements[n].value.trim() : "");
      const lines = [
        "*New Admission Enquiry — Krithi International School*",
        "",
        "Student Name: " + g("student"),
        "Parent/Guardian: " + g("parent"),
        "Phone: " + g("phone"),
        "Email: " + g("email"),
        "Grade seeking: " + g("grade"),
        "Message: " + (g("message") || "—")
      ];
      return lines.join("\n");
    };
    const validate = () => {
      const req = ["student", "parent", "phone"];
      for (const n of req) {
        const el = form.elements[n];
        if (el && !el.value.trim()) { el.focus(); el.style.borderColor = "var(--red-500)"; return false; }
      }
      return true;
    };
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;
      const msg = encodeURIComponent(buildMessage());
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank", "noopener");
      const ok = $("#formSuccess");
      if (ok) { ok.style.display = "flex"; ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
    const emailBtn = $("#emailInstead");
    if (emailBtn) emailBtn.addEventListener("click", () => {
      const subject = encodeURIComponent("Admission Enquiry — Krithi International School");
      const body = encodeURIComponent(buildMessage().replace(/\*/g, ""));
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    });
  }

  /* ---------- Footer year ---------- */
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
