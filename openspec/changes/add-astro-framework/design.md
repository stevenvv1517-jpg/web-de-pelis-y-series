## Context

The project is currently a static collection of HTML files using Vite as a dev server. While simple, it leads to code duplication for common elements like the navbar and footer. The goal is to migrate to Astro to enable component-based development and improve maintainability while keeping the site's excellent performance.

## Goals / Non-Goals

**Goals:**
- Transition the project structure to Astro.
- Eliminate HTML duplication by using Astro's layout and component system.
- Maintain existing SEO (meta tags) and styling from `style.css`.
- Ensure AdSense and search functionality continue to work.

**Non-Goals:**
- Complete redesign of the UI (the current design should remain visually the same).
- Implementation of a complex backend (staying focused on a static site generator).
- Switching from Vanilla CSS to a framework like Tailwind (unless requested later).

## Decisions

- **Layout Component**: Create a `Layout.astro` component in `src/layouts/`. This component will wrap every page and include the `<head>`, `<header>`, and `<footer>` sections.
- **Routing**: Use Astro's file-based routing. `index.html` → `src/pages/index.astro`, `peliculas.html` → `src/pages/peliculas.astro`, etc.
- **Global Styles**: Import the existing `style.css` in the `Layout.astro` component to ensure consistent styling across all pages.
- **Static Assets**: Move the `images/` directory to the `public/` folder so they are accessible via the same relative paths as before.
- **Vanilla JS**: Keep the existing `script.js` by importing it at the end of the `Layout.astro` body.

## Risks / Trade-offs

- **[Risk] Broken Links** → Mitigation: Ensure all relative links within the `.astro` files are updated to point to the correct routes (e.g., removing `.html` from hrefs if Astro is configured for clean URLs).
- **[Risk] Path Mismatches for Images** → Mitigation: Move internal components' images carefully to `public/` and verify paths.
- **[Trade-off] Build Complexity** → Transitioning to Astro adds a build step compared to pure HTML, but the benefits in maintainability outweigh the slight increase in setup time.
