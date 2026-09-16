# ELKAM Studios Website

## Complete design, animation, architecture, and code handoff

**Document type:** Website design and engineering handoff  
**Product:** ELKAM Studios  
**Primary experience:** One-page creative agency website  
**Frontend:** React + Vite + TypeScript + Tailwind CSS  
**Backend:** Express 5 + PostgreSQL + Drizzle ORM  
**Current frontend route:** `/`  
**Current API base path:** `/api`  

---

## 1. Product overview

ELKAM Studios is presented as a premium creative agency for brands that want strategy, identity, digital experiences, content, and growth work with a distinct point of view.

The website is intentionally designed as a cinematic, editorial landing page rather than a conventional agency brochure. Its job is to:

1. Establish a memorable visual identity within the first few seconds.
2. Communicate the studio’s positioning and capabilities.
3. Build confidence through selected work and client statements.
4. Convert interested visitors through a short enquiry form.
5. Persist each enquiry in the application database and asynchronously mirror it to Google Sheets.

The overall experience uses a dark violet-black foundation, warm orange as the action color, large high-contrast typography, softly glowing gradients, floating creative-work cards, and motion that rewards scrolling and hovering without making the page difficult to read.

---

## 2. Design direction

### 2.1 Brand feeling

The visual language is:

- Bold, expressive, and slightly unconventional.
- Premium without feeling corporate.
- Editorial and art-directed rather than template-like.
- Dark and atmospheric, with warm orange highlights.
- Confident in hierarchy: short statements are large, supporting copy is restrained.
- Tactile through rounded cards, soft shadows, glowing edges, and translucent surfaces.

### 2.2 Design principles

#### Contrast creates focus

The page is built around a near-black violet background. White text provides structure, while orange is reserved for:

- Primary calls to action.
- Important words in headings.
- Statistics.
- Accent borders and hover feedback.
- Availability status and visual emphasis.

#### Motion supports meaning

Motion is used to introduce content, reveal the studio mark, establish depth, and communicate interaction states. It is not used as decoration everywhere.

#### The page feels like a world

The hero uses floating creative-work cards and an atmospheric spotlight. The Selected Work section uses large visual tiles. The testimonial area becomes an animated wall of client statements. These choices make the page feel like a studio environment rather than a list of services.

#### Mobile keeps the identity

On smaller screens, the experience does not simply collapse into a plain single column. The hero retains its floating card language, but uses smaller, low-opacity cards pinned to the side edges so the text stays readable.

---

## 3. Visual system

### 3.1 Core colors

| Role | Value | Usage |
| --- | --- | --- |
| Deep background | `#06040E` | Main hero, CTA, footer background |
| Section background | `#0E0A1A` | Stats, Services, darker content bands |
| Service card | `#1A1229` | Service tiles |
| Testimonial card | `#100C1E` | Wall of Love cards |
| Primary orange | `#FF9A00` | Buttons, emphasis, highlighted words, statistics |
| Orange hover | `#E88A00` | Button hover state |
| Soft orange | `#FFD580` | Statistic gradient endpoint |
| Violet | `#6B2CA3` | Atmospheric glow and card gradients |
| Bright violet | `#7B35BE` | Selected Work hover surface |
| White | `#FFFFFF` | Primary text and logos |
| Muted white | White with opacity | Secondary text, labels, borders |
| Success green | `#4ADE80` | “Available For Work” indicator |

The CSS theme also defines semantic HSL variables for background, foreground, border, cards, primary, accent, and destructive states. The website’s page-specific art direction uses the explicit colors above where a stronger brand treatment is needed.

### 3.2 Typography

The page loads **Poppins** from Google Fonts and uses it for both sans and serif theme aliases:

- `font-sans`: Poppins
- `font-serif`: Poppins
- `font-mono`: Space Mono fallback

The “serif” utility is retained as a semantic heading role, but the current visual font is Poppins. This gives the site a heavy, contemporary, agency-style wordmark treatment while keeping body copy clean.

### 3.3 Type hierarchy

- Eyebrow labels: uppercase, tracked, low-contrast, small.
- Main hero heading: heavy, compressed line-height, white with orange emphasis.
- Section headings: large, heavy, short, editorial statements.
- Body copy: light weight, generous line-height, muted white.
- Buttons: bold, compact, rounded, high contrast.
- Metadata and tags: uppercase or compact pill treatments.

The mobile hero uses a tighter hierarchy than desktop:

- Eyebrow: `10px`.
- Headline: `28px`.
- Body: `13px` with `1.65` line-height.
- CTA: compact horizontal pill.

This reduces visual competition and prevents the supporting paragraph from drifting too far away from the headline.

### 3.4 Shape language

- Navigation: full pill with large radius.
- Buttons: rounded pills.
- Service cards: `rounded-3xl`.
- Work tiles: `rounded-2xl`.
- Testimonial cards: `rounded-2xl`.
- Form controls: `rounded-xl`.
- Avatars: circular.

The combination of oversized type and rounded containers creates a contrast between sharp editorial statements and friendly, approachable interaction surfaces.

### 3.5 Depth and atmosphere

Depth comes from:

- Transparent white borders.
- `backdrop-blur-xl` on the navigation.
- Soft card shadows.
- Orange and violet radial gradients.
- Low-opacity hero cards behind the main content.
- Hover-only highlights that make the page feel responsive.

The backgrounds intentionally avoid a flat white canvas. Even the light content areas inherit the dark product identity through the theme background.

---

## 4. Page anatomy

The website is a single page with anchored navigation. The sections appear in this order:

1. Fixed pill navigation.
2. Dark cinematic hero.
3. Results statistics.
4. About Us.
5. Services.
6. Selected Work.
7. Wall of Love.
8. Conversion CTA.
9. Footer.
10. Enquiry modal or mobile drawer, shown on demand.

### 4.1 Fixed pill navigation

**Purpose:** Keep the primary conversion action available while visitors explore the page.

Implementation:

- Fixed near the top of the viewport.
- Centered within a maximum-width wrapper.
- Semi-transparent white surface.
- Backdrop blur.
- Subtle border.
- Rounded pill silhouette.
- White logo on the left.
- Desktop-only anchor links: Work, Services, About, Contact.
- “Let’s Talk” CTA on the right.

Navigation buttons call the shared `scrollTo(id)` helper. That helper finds the section by ID and calls:

```ts
el.scrollIntoView({ behavior: "smooth" });
```

The navigation is deliberately hidden from the desktop link row on mobile so the brand mark and CTA remain uncluttered.

### 4.2 Hero

**Purpose:** Deliver the central brand promise and make the first screen memorable.

Copy:

> Premium Creative Agency

> Unhinged ideas.  
> Authentic storytelling.  
> Real impact.

> ELKAM Studios crafts brands, campaigns, and digital experiences that stop the scroll and start conversations.

Primary CTA:

> Start a Project

Hero composition:

- Deep violet-black full-width background.
- Bottom-center orange spotlight.
- Very subtle violet glow from the top.
- Desktop floating project cards.
- Mobile edge cards.
- Center-aligned content layer above the decorative cards.
- Large curved section transition into the statistics band.

The hero is `min-h-screen` on desktop and `min-h-[82dvh]` on mobile. The reduced mobile height keeps the CTA and the first statistics block visually connected rather than leaving a large dead area below the button.

### 4.3 Results statistics

The section communicates proof quickly:

- `150+` Videos Produced
- `1.1M+` Views Generated
- `96%` Client Retention

Desktop uses three columns separated by vertical rules. Mobile uses a stacked layout separated by horizontal rules.

Numbers use a warm orange-to-light-orange text gradient. Labels are compact, uppercase, tracked, and muted.

### 4.4 About Us

**Purpose:** Explain the studio’s approach while giving the brand mark a visual moment.

Copy:

> About Us

> We don’t do ordinary.

> We create strategy, design systems and unfiltered content that make brands impossible to ignore.

Capability pills:

- Brand Strategy
- Visual Identity
- Content Creation
- Growth Marketing

The left side contains a faint ghosted logo mark. A second logo layer is clipped from the top down as the section enters the viewport, making the mark appear to fill in with the scroll.

### 4.5 Services

**Purpose:** Present the six areas of studio capability without making the page feel like a corporate service catalogue.

Headline:

> Six disciplines. One studio.  
> All under one roof.

Services:

1. Brand Identity — Strategy, naming, visual and verbal systems.
2. Digital Product — Editorial interfaces and design systems.
3. AI Solutions — Applied AI products, agents, and workflow tooling.
4. Web Experiences — Considered sites built as worlds.
5. Creative Direction — Art direction, campaigns, photography, and film.
6. Content & Editorial — Attention and loyalty engines built to scale.

Each service card contains:

- Number.
- Service name.
- Description.
- Two compact tags.
- A hidden arrow that appears on hover.
- A bottom orange gradient line that expands on hover.

### 4.6 Selected Work

**Purpose:** Show visual range and turn project examples into interactive brand moments.

Work tiles:

- Belong — Fitness
- Thunify.in — Clothing
- Wellfed — Food
- Rathi Silks & Sarees — Clothing
- Clinzor — Healthcare
- The Windsouls — Real Estate

Default state:

- Brand image or logo.
- Project-specific background color.
- Mild orange outline and glow.

Hover state:

- Logo fades out.
- Purple gradient surface fades in.
- Niche label rises into place.
- Tile scales slightly.

The work section uses a two-column grid on smaller screens and three columns on larger screens.

### 4.7 Wall of Love

**Purpose:** Create social proof with a living, editorial testimonial wall.

The section uses three independent columns of client statements. Each column has its own vertical animation duration:

- Column A: 32 seconds.
- Column B: 26 seconds.
- Column C: 36 seconds.

The cards contain:

- Initials avatar.
- Display initials.
- Social handle.
- Testimonial copy.

On mobile, only the first column is shown to protect readability and vertical performance. On desktop, all three columns are visible.

The top and bottom of the scroller are faded with a CSS mask so cards appear to enter and leave the section rather than stopping abruptly.

### 4.8 Conversion CTA

**Purpose:** Give visitors a final, unambiguous next action.

Elements:

- Green availability indicator.
- “Available For Work” pill.
- Large headline with orange emphasis.
- “Book a Free Call” button.
- Ambient violet and orange radial glows.

The button opens the same enquiry experience used by the navigation CTA.

### 4.9 Footer

The footer reinforces the studio identity and provides secondary navigation.

Contents:

- ELKAM Studios logo.
- Tagline: `Strategy · Design · Technology · Story`.
- Instagram icon link.
- LinkedIn icon link.
- Email icon link.
- Studio links: Work, About, Capabilities.
- Elsewhere links: Instagram, LinkedIn, email.
- Copyright bar.

External social links open in a new tab where appropriate and use `rel="noopener noreferrer"`.

---

## 5. Animation and interaction specification

### 5.1 Initial page entrance

Framer Motion is used for content entrances:

```ts
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
```

The page uses a shared stagger container:

```ts
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
```

The hero elements use their own tuned entrance timings:

- Eyebrow: fades and rises over `0.6s`.
- Hero heading: fades and rises over `0.85s`, delayed by `0.1s`.
- Body copy: fades and rises over `0.7s`, delayed by `0.22s`.
- CTA: fades and rises over `0.7s`, delayed by `0.36s`.

### 5.2 Scroll-triggered section entrances

Most sections use:

```tsx
whileInView="visible"
viewport={{ once: true, margin: "-80px" }}
```

or a slightly larger negative margin for larger sections.

This means:

- Animations happen when the section becomes relevant.
- They run once rather than replaying on every scroll.
- Content arrives in a staggered rhythm.

### 5.3 Hero floating project cards

Desktop hero cards are defined in `HERO_CARDS`. Each card stores:

- Horizontal percentage.
- Vertical percentage.
- Rotation.
- Delay.
- Gradient.
- Label.
- Sublabel.
- Width and height.
- One of three float animation variants.

The card’s interaction is mouse-proximity driven:

1. The hero measures the pointer position relative to its own bounds.
2. Each card calculates the distance from its center to the pointer.
3. The distance is converted to a proximity value between `0` and `1`.
4. Near cards become larger and more opaque.
5. Near cards receive a stronger shadow and orange glow.
6. Near cards move above other decorative cards through z-index.

The core formulas are:

```ts
const proximity = Math.max(0, 1 - dist / 340);
const scale = 0.82 + proximity * 0.28;
const opacity = 0.15 + proximity * 0.85;
```

Cards remain `pointer-events: none`, so they never interfere with the hero CTA or text.

### 5.4 Mobile hero cards

Mobile does not use mouse proximity because touch devices do not have a persistent pointer. Instead, eight smaller cards are positioned around the left and right edges:

- Upper-left.
- Upper-right.
- Upper-middle-left.
- Upper-middle-right.
- Lower-middle-left.
- Lower-middle-right.
- Lower-left.
- Lower-right.

They are rendered at `76 × 100px`, use `0.2` opacity, and have smaller internal labels. This preserves the desktop visual idea while keeping the central copy legible.

The cards sit behind the content layer:

- Decorative layer: `z-index: 1`.
- Center content: `z-index: 10`.

### 5.5 Hero card float keyframes

Three CSS keyframes provide slightly different rhythms:

```css
@keyframes cardFloat1 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
}

@keyframes cardFloat2 {
  0%, 100% { transform: translateY(-8px); }
  50% { transform: translateY(8px); }
}

@keyframes cardFloat3 {
  0%, 100% { transform: translateY(0px); }
  33% { transform: translateY(-10px); }
  66% { transform: translateY(6px); }
}
```

Each card receives a different duration and delay based on its data, preventing synchronized movement.

### 5.6 About logo reveal

The About section uses `useScroll` and `useTransform`:

```ts
const { scrollYProgress: aboutScrollProgress } = useScroll({
  target: aboutRef,
  offset: ["start end", "center center"],
});

const logoClipPath = useTransform(
  aboutScrollProgress,
  [0, 1],
  ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
);
```

A faint logo is always visible. The animated layer uses the calculated `clipPath` to reveal the mark from top to bottom as the user scrolls.

### 5.7 Service card hover

On hover:

- The card scales to `1.02`.
- The border becomes slightly orange.
- The bottom orange gradient line expands from left to right.
- The arrow fades in and slides into place.

This makes cards feel interactive without requiring a separate detail route.

### 5.8 Selected Work hover

On hover:

- The tile scales to `1.04`.
- The logo fades out over `300ms`.
- The purple gradient fades in over `300ms`.
- The category rises from a lower position into place.
- The orange outline and glow remain as a frame.

### 5.9 Wall of Love infinite scroll

Each testimonial column duplicates its data array:

```tsx
{[...col, ...col].map((c, i) => (
  // testimonial card
))}
```

The duplicated list allows the column to translate by `-50%` and visually loop:

```css
@keyframes scrollUpA {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
```

The three keyframes have the same movement but separate names so each column can receive an independent duration.

### 5.10 Button feedback

Primary and secondary CTAs use:

- Hover scale: `1.05`.
- Active scale: `0.95`.
- Background and border color transitions.
- Arrow icon for directional affordance.

### 5.11 Enquiry surface transition

The enquiry experience uses Radix-based primitives:

- Desktop: Dialog.
- Mobile: Drawer.

The mobile drawer is intentionally used instead of forcing a desktop modal into a small viewport. The background scaling behavior is disabled with `shouldScaleBackground={false}` so opening the form does not create a distracting page shift.

---

## 6. Responsive behavior

### Desktop

- Full-screen hero.
- Ten floating hero cards.
- Desktop navigation links.
- Three-column statistics.
- Two-column About layout.
- Three-column service grid.
- Three-column work grid.
- Three testimonial columns.
- Dialog enquiry form.

### Mobile

- Hero height reduced to `82dvh`.
- Eight smaller edge cards.
- Center content remains above cards.
- Desktop navigation links hidden.
- Two-column work grid.
- Services stack as one column.
- Statistics stack vertically.
- Only one testimonial column shown.
- Drawer enquiry form.
- More compact form spacing and field heights.

### Accessibility and interaction considerations

- Logo images include accessible alt text where they are meaningful.
- Decorative logo layer is `aria-hidden`.
- Social icon links include `aria-label`.
- Buttons are native `<button>` elements.
- Form fields are disabled while submission is pending.
- The modal cannot be closed while a submission is in progress.
- Enquiry fields show inline validation messages.
- Error and success feedback is presented through toast notifications.

---

## 7. User flow

### Primary conversion flow

1. Visitor lands on `/`.
2. Visitor reads the hero statement.
3. Visitor can select:
   - Start a Project.
   - Let’s Talk.
   - Book a Free Call.
4. The enquiry surface opens:
   - Desktop Dialog.
   - Mobile Drawer.
5. Visitor provides:
   - Full Name — required.
   - Phone Number — required.
   - Email Address — required and format-validated.
   - Company Name — optional.
   - Designation — optional.
6. The browser validates required fields.
7. The frontend submits the form through the generated React Query hook.
8. The API validates the request with the generated Zod schema.
9. The API stores the lead in PostgreSQL.
10. The API attempts to append the lead to the configured Google Sheet.
11. The frontend closes the form and displays a success toast.

### Error flow

- Missing required value: field-level error under the input.
- Invalid email: “Enter a valid email”.
- API or network failure: destructive toast.
- Google Sheets failure: database submission still succeeds; the server logs the Sheets failure.

### Navigation flow

The navigation and footer use in-page IDs:

- `#work`
- `#services`
- `#about`
- `#contact`

There is currently one application route. Unknown routes render the Not Found page.

---

## 8. Technical architecture

```text
Browser
  |
  | React + Vite frontend
  | Wouter routing
  | TanStack React Query
  | Framer Motion
  v
POST /api/enquiries
  |
  | Express 5
  | Zod validation generated from OpenAPI
  v
PostgreSQL via Drizzle ORM
  |
  +--> asynchronous Google Sheets append
  |
  +--> protected XLSX export endpoint
```

### 8.1 Frontend runtime

`src/main.tsx` creates the React root and loads the global stylesheet.

`src/App.tsx` provides:

- TanStack Query provider.
- Tooltip provider.
- Wouter router.
- Toast system.
- Root route.
- Not Found fallback.

`src/pages/Home.tsx` owns the landing page composition and most page-specific animation logic.

`src/components/EnquiryModal.tsx` owns the form state, validation, mutation, responsive Dialog/Drawer selection, and feedback toasts.

### 8.2 API runtime

`src/index.ts`:

- Requires a valid `PORT`.
- Starts the Express application.

`src/app.ts`:

- Adds Pino HTTP logging.
- Adds CORS.
- Parses JSON and URL-encoded bodies.
- Mounts all routes under `/api`.

`src/routes/index.ts` mounts:

- Health routes.
- Enquiry routes.

`src/routes/health.ts` exposes the health check.

`src/routes/enquiries.ts` exposes lead submission and export.

### 8.3 Database runtime

The database uses:

- PostgreSQL.
- Drizzle ORM.
- Drizzle’s PostgreSQL schema definitions.
- Zod schema generation from the database shape for inserts.

The database client requires `DATABASE_URL` and exports the configured Drizzle client and schema.

### 8.4 API contract generation

The OpenAPI document is the source of truth for request and response shapes. The generated packages provide:

- React Query hooks for the frontend.
- Zod schemas for server-side validation.
- Generated TypeScript types.

The enquiry form imports:

```ts
import { useSubmitEnquiry } from "@workspace/api-client-react";
```

The server imports:

```ts
import { SubmitEnquiryBody } from "@workspace/api-zod";
```

This prevents the client and server from silently drifting apart.

---

## 9. API reference

### `GET /api/healthz`

Returns:

```json
{
  "status": "ok"
}
```

### `POST /api/enquiries`

Request:

```json
{
  "fullName": "Aarav Kumar",
  "phone": "+91 98765 43210",
  "email": "aarav@example.com",
  "company": "Example Studio",
  "designation": "Founder"
}
```

Required fields:

- `fullName`
- `phone`
- `email`

Optional nullable fields:

- `company`
- `designation`

Successful response: HTTP `201`

```json
{
  "id": 1,
  "fullName": "Aarav Kumar",
  "phone": "+91 98765 43210",
  "email": "aarav@example.com",
  "company": "Example Studio",
  "designation": "Founder",
  "createdAt": "2026-08-30T12:00:00.000Z"
}
```

Validation failure: HTTP `400`

```json
{
  "error": "Validation error details"
}
```

### `GET /api/admin/enquiries/export`

Returns an Excel workbook named `enquiries.xlsx`.

The endpoint requires:

```text
x-admin-token: <configured admin token>
```

The export contains:

- ID
- Full Name
- Phone
- Email
- Company
- Designation
- Submitted At

The current admin export is token-protected, but there is not yet a browser-based admin dashboard.

---

## 10. Database model

Table: `enquiries`

| Column | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | serial integer | Yes | Primary key |
| `full_name` | text | Yes | Lead’s full name |
| `phone` | text | Yes | Lead’s phone number |
| `email` | text | Yes | Lead’s email address |
| `company` | text | No | Optional company |
| `designation` | text | No | Optional role |
| `created_at` | timestamp with timezone | Yes | Defaults to current time |

The API converts the database timestamp to an ISO string before returning it to the frontend.

---

## 11. Google Sheets integration

The integration uses the installed Google Sheets connector through the Replit connector SDK.

Behavior:

1. Read `GOOGLE_SHEET_ID`.
2. Confirm the connector host is available.
3. Look for a sheet named `ELKAM Enquiries`.
4. Create it if it does not exist.
5. Create the header row if the sheet is new.
6. Append the enquiry as a new row.

Sheet columns:

```text
Name | Phone | Email | Company | Designation | Submitted At
```

The Google Sheets append runs after the database insert. It is intentionally not allowed to block the lead capture response:

- Database success returns the enquiry to the client.
- Google Sheets errors are logged.
- The server continues even if the Sheets push fails.

This is a deliberate reliability tradeoff: the application’s primary record is PostgreSQL, while Google Sheets is a convenient operational copy.

Required runtime configuration for the Sheets push:

- `GOOGLE_SHEET_ID`
- Replit connector availability

No credentials or secret values belong in this document or in the frontend.

---

## 12. Source code inventory

### Frontend source of truth

| File | Responsibility |
| --- | --- |
| `artifacts/elkam-studios/src/main.tsx` | React entry point |
| `artifacts/elkam-studios/src/App.tsx` | Providers and route switch |
| `artifacts/elkam-studios/src/pages/Home.tsx` | Full landing page, content, responsive layouts, hero cards, scroll and hover motion |
| `artifacts/elkam-studios/src/components/EnquiryModal.tsx` | Enquiry form, validation, responsive Dialog/Drawer, mutation and toast feedback |
| `artifacts/elkam-studios/src/index.css` | Theme variables, global rules, keyframes and base styles |
| `artifacts/elkam-studios/src/pages/not-found.tsx` | Unknown-route fallback |
| `artifacts/elkam-studios/src/components/ui/*` | Reusable Radix/shadcn-style primitives |
| `artifacts/elkam-studios/src/hooks/use-mobile.tsx` | Mobile viewport helper |
| `artifacts/elkam-studios/src/hooks/use-toast.ts` | Toast state helper |
| `artifacts/elkam-studios/src/lib/utils.ts` | Shared class-name utility |
| `artifacts/elkam-studios/vite.config.ts` | Vite, Tailwind, aliases, build and preview configuration |
| `artifacts/elkam-studios/package.json` | Frontend scripts and dependencies |

### API source of truth

| File | Responsibility |
| --- | --- |
| `artifacts/api-server/src/index.ts` | Validated server startup |
| `artifacts/api-server/src/app.ts` | Express middleware and `/api` mounting |
| `artifacts/api-server/src/routes/index.ts` | Route composition |
| `artifacts/api-server/src/routes/health.ts` | Health check |
| `artifacts/api-server/src/routes/enquiries.ts` | Lead creation and XLSX export |
| `artifacts/api-server/src/lib/google-sheets.ts` | Google Sheets creation and append logic |
| `artifacts/api-server/src/lib/logger.ts` | Shared Pino logger |
| `artifacts/api-server/package.json` | API scripts and runtime dependencies |

### Shared libraries

| File or package | Responsibility |
| --- | --- |
| `lib/api-spec/openapi.yaml` | API contract source |
| `lib/api-client-react/src/generated/*` | Generated frontend hooks and schemas |
| `lib/api-zod/src/generated/*` | Generated server validation schemas |
| `lib/db/src/schema/enquiries.ts` | Drizzle table and insert schema |
| `lib/db/src/index.ts` | PostgreSQL pool and Drizzle client |

### Brand assets

The landing page reads brand and project assets from `attached_assets/`, including:

- ELKAM landscape logo.
- White ELKAM logo.
- ELKAM logo mark.
- Belong identity image.
- Thunify project image.
- Wellfed logo.
- Rathi Silks & Sarees image.
- Clinzor image.
- The Windsouls image.
- Site favicon and Open Graph image.

The Vite `@assets` alias points to the shared `attached_assets` directory.

---

## 13. Important implementation patterns

### Smooth anchor scrolling

Use the page helper rather than hardcoded coordinates:

```ts
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
```

### Responsive modal selection

The form chooses a Drawer on mobile and Dialog on desktop:

```tsx
if (isMobile) {
  return <Drawer>{/* compact mobile form */}</Drawer>;
}

return <Dialog>{/* desktop form */}</Dialog>;
```

This keeps the same form logic and API mutation while adapting the presentation to the device.

### Client-side validation

The form validates before mutation:

```ts
if (!form.fullName.trim()) next.fullName = "Full name is required";
if (!form.phone.trim()) next.phone = "Phone number is required";
if (!form.email.trim()) next.email = "Email address is required";
else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
  next.email = "Enter a valid email";
}
```

The API performs its own schema validation as the authoritative server-side check.

### Safe submission lifecycle

- Fields disable during submission.
- Close actions are ignored while the mutation is pending.
- Successful submission clears the form.
- The modal closes only after a successful response.
- The user receives a success or error toast.

---

## 14. Build and operation notes

### Frontend development

```bash
pnpm --filter @workspace/elkam-studios run dev
```

### API development

```bash
pnpm --filter @workspace/api-server run dev
```

### Full typecheck

```bash
pnpm run typecheck
```

### Build

```bash
pnpm run build
```

### Regenerate API client and Zod schemas

Run this after changing the OpenAPI contract:

```bash
pnpm --filter @workspace/api-spec run codegen
```

### Database schema push

Development schema changes use:

```bash
pnpm --filter @workspace/db run push
```

### Required environment values

The runtime expects:

- `PORT` — supplied by the managed service workflow.
- `BASE_PATH` — supplied to the frontend by the managed workflow.
- `DATABASE_URL` — PostgreSQL connection string.
- `GOOGLE_SHEET_ID` — spreadsheet ID for lead mirroring.
- `ADMIN_TOKEN` — token required by the XLSX export endpoint.
- Replit connector environment — required for Google Sheets access.

Secret values must remain in the environment secret system and must never be placed in frontend source, this document, or committed files.

---

## 15. Current scope and intentional exclusions

Implemented:

- Responsive one-page marketing website.
- Anchored navigation.
- Hero animation system.
- Desktop and mobile floating hero cards.
- Scroll-triggered section entrances.
- Scroll-driven About logo reveal.
- Interactive service cards.
- Interactive Selected Work tiles.
- Infinite testimonial columns.
- Responsive enquiry Dialog/Drawer.
- Client and server validation.
- PostgreSQL lead persistence.
- Google Sheets lead append.
- Protected XLSX export endpoint.
- Footer social and email links.

Not currently implemented:

- Login or Clerk/Replit authentication.
- Browser-based admin dashboard.
- Email notification alerts.
- Appointment time-slot selection.
- Individual project case-study routes.
- A standalone enquiry page.
- Automatic retry or resync tooling for failed Google Sheets writes.
- A visitor-facing scroll progress bar.

The existing protected export endpoint provides a lightweight operational fallback while the separate admin-dashboard and email-alert product tasks remain outside the current page implementation.

---

## 16. Maintenance guide

### Changing the hero

Edit:

```text
artifacts/elkam-studios/src/pages/Home.tsx
```

Key areas:

- `HERO_CARDS` for desktop card content and placement.
- Mobile card array inside the mobile-only hero layer.
- Hero heading, paragraph, and CTA.
- Hero radial gradient blocks.
- Arc transition at the bottom.

### Changing motion

Edit:

```text
artifacts/elkam-studios/src/index.css
```

for CSS keyframes, and:

```text
artifacts/elkam-studios/src/pages/Home.tsx
```

for Framer Motion variants, scroll progress, and pointer proximity.

### Changing the enquiry form

Edit:

```text
artifacts/elkam-studios/src/components/EnquiryModal.tsx
```

If the request or response shape changes, update the OpenAPI contract first, regenerate the client and Zod packages, then update the form and server route.

### Changing lead storage

Edit:

```text
lib/db/src/schema/enquiries.ts
```

Then update the OpenAPI contract and server route as needed. Push the development schema after the code change.

### Changing Google Sheets behavior

Edit:

```text
artifacts/api-server/src/lib/google-sheets.ts
```

Keep Google Sheets as an asynchronous secondary write unless the product requirements explicitly change. PostgreSQL remains the primary lead record.

### Adding a new navigation section

1. Add an `id` to the section.
2. Add the label to the desktop navigation if it belongs there.
3. Add the label to the footer if it belongs there.
4. Use the existing `scrollTo` helper.
5. Check the section transition on both desktop and mobile.

---

## 17. Design QA checklist

### Visual

- The orange accent is reserved for intentional emphasis.
- The hero copy remains the strongest visual object.
- Decorative cards never compete with the hero heading.
- Body copy remains readable over all backgrounds.
- Work tiles keep their logo visible before hover.
- Testimonial cards fade cleanly at the scroller edges.

### Responsive

- No horizontal overflow on mobile.
- Mobile hero cards remain behind content.
- The CTA and statistics transition do not leave excessive dead space.
- The enquiry drawer fits within the viewport.
- Form fields remain tappable and readable.
- Footer links wrap without breaking the layout.

### Functional

- Every navigation anchor lands on the correct section.
- Every CTA opens the enquiry surface.
- Required form validation appears inline.
- Email format validation works.
- Submission disables fields until completion.
- Success closes the surface and shows a toast.
- Failure keeps the form available and shows an error toast.
- Leads persist in PostgreSQL.
- Google Sheets append is attempted when configured.
- XLSX export rejects missing or incorrect admin tokens.

### Motion

- Hero cards float at different rhythms.
- Desktop card proximity reacts smoothly to pointer movement.
- Section content reveals only once.
- About mark reveals from top to bottom.
- Service hover underline expands from the left.
- Work tile niche label rises on hover.
- Wall of Love columns loop continuously.

---

## 18. One-paragraph handoff summary

ELKAM Studios is a single-page, dark editorial agency site built with React, Vite, Tailwind CSS, Framer Motion, and Radix-based UI primitives. The experience combines a fixed translucent pill navigation, cinematic hero with responsive floating project cards, scroll-triggered entrances, a scroll-revealed logo mark, capability cards, interactive project tiles, an infinite testimonial wall, and a final conversion CTA. The enquiry form adapts from a desktop Dialog to a mobile Drawer, validates lead details, submits through a generated React Query hook to an Express API, stores the lead in PostgreSQL through Drizzle, and asynchronously mirrors it to a Google Sheet. The main design source is `Home.tsx`, the interaction surface is `EnquiryModal.tsx`, global visual motion lives in `index.css`, and the API/database/integration sources are kept in the shared `lib` and `api-server` packages.
