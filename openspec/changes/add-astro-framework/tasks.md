## 1. Project Setup

- [x] 1.1 Install Astro dependencies using npm/bun.
- [x] 1.2 Update `package.json` with Astro scripts (`dev`, `build`, `preview`).
- [x] 1.3 Create the Astro directory structure: `src/pages/`, `src/layouts/`, `src/components/`, `src/styles/`.
- [x] 1.4 Add `astro.config.mjs` to the project root.

## 2. Shared Architecture

- [x] 2.1 Create `src/layouts/BaseLayout.astro` containing the common HTML shell, head tags, navbar, and footer.
- [x] 2.2 Migrate `style.css` to `src/styles/style.css` and import it in `BaseLayout.astro`.
- [x] 2.3 Migrate `script.js` to a client-side script tag in `BaseLayout.astro` or a dedicated component.
- [x] 2.4 Move todos the images from `/images` to `/public/images`.

## 3. Page Migration

- [x] 3.1 Migrate `index.html` to `src/pages/index.astro` using `BaseLayout`.
- [x] 3.2 Migrate `peliculas.html` to `src/pages/peliculas.astro` using `BaseLayout`.
- [x] 3.3 Migrate `ninjago.html` to `src/pages/ninjago.astro` using `BaseLayout`.
- [x] 3.4 Migrate construction and season pages (`temporada0.html`, `temporada1.html`, etc.) to Astro pages.

## 4. Final Polish and Verification

- [x] 4.1 Update all internal links to remove the `.html` extension for clean Astro routing.
- [x] 4.2 Verify that search functionality and AdSense placeholders still work correctly.
- [x] 4.3 Run a test build with `npm run build` to ensure the static site generates correctly.
- [x] 4.4 Remove the legacy root HTML files once migration is confirmed.
