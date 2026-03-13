# next-contentful-blocks

Contentful page blocks for Next.js.

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Contentful GraphQL API

Without Contentful credentials the app runs with placeholder content so you can see the layout immediately.

---

## Sections

- **Hero** — Full-width image or video with overlaid text at any position. Supports a separate mobile image.
- **Duplex** — Two-column layout. Text on one side, image on the other. Supports images, video, and a card slider. Configurable split (40 / 50 / 60%), desktop and mobile alignment, and CTA.
- **Columns** — Responsive grid of Card entries. 2–8 columns, optional mobile slider. Cards support images, video, text overlays, CTAs, and custom colors.

---

## Setup

**1. Clone and install**

```bash
npm install
```

**2. Create a Contentful account, then add credentials to `.env.local`**

```
CONTENTFUL_SPACE=your_space_id
CONTENTFUL_API=your_content_delivery_api_key
```

**3. Install the Contentful CLI and import content types**

```bash
npm install -g contentful-cli
contentful space import --content-file contentful/content-types.json
```

After import, go to **Content model** in the Contentful web app and publish each type.

**4. Run**

```bash
npm run dev
```

---

## Notes

- Contentful appends `Collection` to GraphQL names for linked-entry array fields — `columns` → `columnsCollection`, `slides` → `slidesCollection`.
- `CONTENTFUL_SPACE` and `CONTENTFUL_API` use the Content Delivery API (read-only). Find them under **Settings → API keys** in your space.
