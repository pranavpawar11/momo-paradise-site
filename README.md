# Momo Paradise website

Mobile-first restaurant site with a 3D delivery-boy guide. Stack: React 19, Vite, Tailwind CSS v4, Three.js with React Three Fiber and drei, Motion, Lucide.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build locally
npm test           # 26 tests: menu prices, validation, WhatsApp message, page smoke test, 3D model contract
```

Node 20.19 or newer is required.

## Where to change things (content is separate from presentation)

| What | File |
|---|---|
| Menu items and prices (the only place prices live) | `src/config/menu.js` |
| Phone, address, coordinates, Instagram, Google review link | `src/config/contact.js` |
| Opening hours (no weekly closing day has been confirmed) | `src/config/openingHours.js` |
| Brand copy, SEO title and description | `src/config/brand.js` |
| Mascot speech and gestures | `src/config/characterDialogue.js` |
| Specialty cards, gallery, hero dishes | `src/config/specialties.js` |
| FAQ (prices are read from the menu) | `src/config/faq.js` |
| Reviews switch and sample reviews | `src/config/reviews.js` |
| Photos (replace the files, keep the names) | `src/assets/food/` |
| Logo | `src/assets/logo/logo.webp` |
| 3D guide model | `public/models/guide.glb` |

## Structure

```
src/
  config/       all content and business data
  sections/     one file per page section (Hero, Specialties, Menu, Local, Gallery, Feedback, BulkOrder, Faq, Location)
  components/   reusable UI (Header, MenuCard, EnquiryForm, HeroStage, MapEmbed, Footer, FloatingBulkButton ...)
  guide/        the 3D guide: GuideRig (model, walking, gestures), GuideCanvas, bubbles, shared store
  lib/          validation, WhatsApp message builder, tiny store, scroll helpers
  pages/Home.jsx
scripts/seoPlugin.js   injects SEO tags, structured data, robots.txt and sitemap.xml at build time
```

Every section carries `data-guide="..."`. The mascot reads it to know which section is on screen.

## The 3D guide

- Hero: he stands in the hero and waves. Scrolling past the hero, he walks to the left side (bottom-left on phones) and walks in place while you scroll.
- Speech bubbles appear instantly when a section becomes active. Lines are in `characterDialogue.js`.
- He hides while a form field is focused, and visitors can switch him off with the header button.
- three.js and the model load lazily after first paint. If WebGL or the model fails, the page stays fully usable and the hero shows a static mascot image.
- To swap the model: keep clips named `Idle` and `Walk` and the Mixamo bone names (`LeftArm`, `LeftForeArm`, `RightArm`, `RightForeArm`). `src/guide/__tests__/model.test.js` checks this.
- The face (eyes, brows, cheeks, smile) is painted into the texture atlas, so it stays crisp at any size. The atlas also holds the logo. The original model has no usable texture (its UV map is shattered into hundreds of tiny islands), so the face uses its own front-projected UVs.
- The model is about 3.6 MB (about 1.6 MB gzipped). Make sure your host serves it with gzip or brotli.

## Deploying

1. Build with the public URL, so canonical tags, the sitemap and structured data are correct: `VITE_SITE_URL=https://your-temporary-host npm run build`.
2. Upload `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages). For a sub-path host also set `VITE_BASE=/repo-name/`.
3. When the custom domain exists, rebuild with the new `VITE_SITE_URL`. No domain is hard-coded anywhere.

## Content status (do not publish placeholders as facts)

Confirmed: business name, logo, address, coordinates, phone, Instagram accounts, hours, menu and prices, cheese pricing rule.

Temporary: the photographs (representative shots supplied by the owner), the temporary hosting URL.

Not yet provided: weekly closing day, Google Business Profile review link (set `googleReviewUrl`), delivery radius and charges, custom domain, a real Peri-Peri photo (that card shows a clearly marked sample visual).

Reviews: there are no verified testimonials, so the site shows a feedback prompt. Sample reviews exist only behind `showDemoReviews` in `reviews.js`. Never turn that on in production.

## Before launch checklist

- [ ] Replace the Peri-Peri sample visual with a real photo, and add real shop photos.
- [ ] Add the Google review link when it exists.
- [ ] Confirm the 3D model and animation licences (see below).
- [ ] Test on a real mid-range Android phone on a mobile network.
- [ ] Build with `VITE_SITE_URL` set.

## Licences to confirm

The 3D character was generated with an AI tool and animated with Mixamo clips. Check the generator's plan terms allow commercial use, and Adobe's Mixamo terms for the animations. Photos in `src/assets/food` are the owner's own.
