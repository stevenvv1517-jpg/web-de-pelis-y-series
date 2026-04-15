## ADDED Requirements

### Requirement: Astro Project Initialization
The system SHALL use the Astro framework for project structure and builds.

#### Scenario: Successful build with Astro
- **WHEN** the command `npm run build` (or `astro build`) is executed
- **THEN** a static production site is generated in the `dist/` directory

### Requirement: Shared Layout Component
The system SHALL have a shared `Layout.astro` component located in `src/layouts/` that includes common elements such as the `<head>`, `<header>` (navigation), and `<footer>`.

#### Scenario: Header visibility across pages
- **WHEN** any page (e.g., index, peliculas) is rendered
- **THEN** the navigation bar and logo are correctly displayed from the shared layout

### Requirement: Page Migration
The system SHALL migrate all existing HTML files to the `src/pages/` directory with the `.astro` extension, utilizing the shared layout for consistency.

#### Scenario: Index page migration
- **WHEN** the user navigates to the root URL
- **THEN** the content previously in `index.html` is rendered using the new Astro structure

### Requirement: Asset Management
The system SHALL serve images and stylesheets through Astro's asset pipeline, typically placing images in `public/images/` or `src/assets/`.

#### Scenario: Logo image loading
- **WHEN** the site is loaded
- **THEN** images located in the images directory are correctly rendered in the browser
