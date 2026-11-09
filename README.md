# Krithi International School — Website

A professional, fast, mobile-responsive website for **Krithi International School**, Kavuru, Chilakaluripet, Guntur District, Andhra Pradesh.

Built as a plain static site (HTML + CSS + vanilla JavaScript) — no build step, no dependencies, works anywhere.

---

## 🚀 How to view it

**Just double-click `index.html`** — it opens in any browser.

Or run a local server (nicer, avoids any path issues):

```bash
# from this folder
python -m http.server 8000
# then open http://localhost:8000
```

---

## 🌐 How to put it online (free options)

Pick **one**:

| Option | Steps |
|--------|-------|
| **Netlify (easiest)** | Go to [app.netlify.com/drop](https://app.netlify.com/drop) → drag this whole folder onto the page → you instantly get a live link. |
| **Vercel** | Install Vercel, run `vercel` in this folder, follow prompts. |
| **GitHub Pages** | Push this folder to a GitHub repo → Settings → Pages → deploy from `main` branch root. |

Later, you can connect your own domain (e.g. `krithischool.in`) from any of these dashboards.

---

## 📄 Pages

- `index.html` — Home (dynamic landing page)
- `pages/about.html` — About, vision, mission, values
- `pages/academics.html` — CBSE academics, Pre-KG to Class 10
- `pages/facilities.html` — Facilities & infrastructure
- `pages/admissions.html` — Admissions + **enquiry form**
- `pages/fees-transport.html` — Fees & transport + FAQ
- `pages/gallery.html` — Photo gallery with lightbox
- `pages/contact.html` — Contact details, form & map

The **enquiry form** and **WhatsApp buttons** already point to your real number
(**+91 81427 01791**) and email (**krithiinternational@gmail.com**). When a parent
submits the form, it opens WhatsApp with all their details pre-filled — no server needed.

---

## ✏️ Things you should personalise (quick edits)

Open the file in any text editor (or tell your developer). Search for these:

1. **Fees** → `pages/fees-transport.html`
   The table currently says **"On Enquiry"**. Replace with your real amounts when ready.

2. **Testimonials** (Home page) → `index.html`, section marked
   `<!-- Testimonials (SAMPLE — replace with real parent reviews) -->`.
   These are **sample** quotes — swap in real parent feedback (with permission).

3. **"20+ Activities & Clubs"** stat on the Home page → edit the number in
   `index.html` (`data-count="20"`) to match reality.

4. **Facebook link** → currently `https://www.facebook.com/` everywhere.
   Replace with your actual Krithi International School Facebook page URL
   (search for `facebook.com` in the files).

5. **Google Map** → `pages/contact.html` currently centres on Kavuru/Chilakaluripet.
   For an exact pin: open Google Maps → find your school → Share → Embed a map →
   copy the `src` URL → paste it into the `<iframe>` in `contact.html`.

6. **Photos** → see below.

---

## 🖼️ About the photos (important)

- `assets/img/real/` — **your own photos** (logo + real event photos). The logo is used
  across the whole site. Real event photos appear in the Gallery.
- `assets/img/stock/` — **professional, license-free stock photographs** (from Unsplash)
  used for the hero, facilities and section imagery so the site looks polished and premium.
  These are real photos (not AI-generated).

**As your school grows, replace the stock images with your own real photos** of the same
subject — keep the **same file name** and the website updates automatically. Example:
drop your real classroom photo in as `assets/img/stock/classroom.jpg` (around 1400px wide, JPEG).

Your 6 original uploads are also preserved untouched in the `school_photos/` folder.

---

## 🎨 Brand

- **Name:** Krithi International School
- **Colours:** green, gold and red (from your logo) — defined once at the top of
  `assets/css/style.css` under `:root`. Change them there to re-theme the entire site.
- **Motto:** *Tamaso Mā Jyotirgamaya* — "Lead us from darkness to light"
- **Fonts:** Fraunces (headings) + Plus Jakarta Sans (body), loaded from Google Fonts.

---

## ⚙️ Tech notes

- Mobile-first, responsive down to small phones.
- Images are optimised and lazy-loaded; the hero loads first for speed.
- Smooth scroll animations, animated counters, hero slideshow, gallery lightbox,
  FAQ accordions — all in one small `assets/js/main.js` (no libraries).
- Respects "reduced motion" accessibility settings.
