## Why

The current project is a collection of static HTML files managed with Vite. While functional, this approach lacks a component-based architecture, making it difficult to maintain shared elements (like navigation bars and footers) across multiple pages (index, peliculas, ninjago, etc.). Migrating to Astro will allow for better code reuse, improved performance (zero JavaScript by default), and a more scalable structure.

## What Changes

- **Framework Migration**: Replace the standalone Vite setup with the Astro framework.
- **Project Restructuring**: Move existing HTML files into the `src/pages/` directory and rename them to `.astro`.
- **Componentization**: Identify recurring UI patterns (header, footer, movie cards) and extract them into Astro components in `src/components/`.
- **Dependency Update**: Update `package.json` with Astro dependencies and scripts (`dev`, `build`, `preview`).
- **Configuration**: Add an `astro.config.mjs` file for project-wide settings.

## Capabilities

### New Capabilities
- `astro-migration`: The foundational transition of the static site to the Astro framework architecture.

### Modified Capabilities
- None (Initial migration).

## Impact

- **File Structure**: Major reorganiation of the root directory.
- **Build Process**: Transition from `vite` to `astro` CLI for development and builds.
- **Dependencies**: Addition of `astro` and removal of unnecessary Vite-only setup.
- **File Extensions**: Conversion of `.html` to `.astro`.
