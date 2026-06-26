# linkedin-portfolio-website

A static React/Vite portfolio website for Andrew Abruzzese, focused on cloud infrastructure, DevOps, Kubernetes/EKS, platform engineering, CI/CD, observability, and backend service ownership.

The site is designed to feel like a polished infrastructure portfolio rather than a marketing landing page. It includes a technical hero section, personal About Me section, photo carousel, animated EKS deployment pipeline, experience timeline, skills matrix, featured project, and contact footer.

## Features

- Responsive React single-page portfolio
- GitHub Pages-ready Vite configuration
- Automated GitHub Actions deployment workflow
- Interactive EKS microservice deployment pipeline
- Fixed-size landscape photo carousel with keyboard controls
- Optimized image assets for faster page load
- Blueprint-style cursor and scroll background effect
- Reduced-motion support for users who prefer less animation
- Resume-derived experience, skills, and project content
- Contact links for email, LinkedIn, and location

## Tech Stack

- React
- Vite
- JavaScript / JSX
- CSS
- lucide-react icons
- pnpm
- GitHub Actions
- GitHub Pages

## Project Structure

```text
.
|-- .github/workflows/deploy.yml   # GitHub Pages deployment workflow
|-- public/
|   `-- assets/photos/optimized/   # Public optimized image assets
|-- src/
|   |-- main.jsx                   # React components and page layout
|   |-- portfolioData.js           # Editable portfolio content/data
|   `-- styles.css                 # Global styling and responsive layout
|-- work/
|   |-- original-photos/           # Local-only full-size photo sources
|   |-- optimize-photos.mjs        # Local image optimization utility
|   `-- verify-portfolio.mjs       # Local visual/behavior verification helper
|-- index.html
|-- package.json
|-- pnpm-lock.yaml
|-- pnpm-workspace.yaml
`-- vite.config.js
```

## Getting Started

### Prerequisites

Install:

- Node.js
- pnpm

This project was built with Node 24 and pnpm 11.

### Install Dependencies

```bash
pnpm install
```

### Start Local Development

```bash
pnpm dev
```

Vite will print a local URL such as:

```text
http://127.0.0.1:5173/
```

Open that URL in your browser.

### Build For Production

```bash
pnpm build
```

The production build is written to:

```text
dist/
```

### Preview The Production Build

```bash
pnpm preview
```

## GitHub Pages Deployment

This repository includes a GitHub Actions workflow at:

```text
.github/workflows/deploy.yml
```

The workflow:

1. Checks out the repository
2. Installs pnpm
3. Installs dependencies
4. Runs `pnpm build`
5. Uploads `dist/`
6. Deploys to GitHub Pages

### First-Time GitHub Pages Setup

1. Create a GitHub repository named `linkedin-portfolio-website`.
2. Push this project to the repository's `main` branch.
3. Open the repository on GitHub.
4. Go to `Settings` -> `Pages`.
5. Under `Build and deployment`, set `Source` to `GitHub Actions`.
6. Push to `main`, or manually run the `Deploy to GitHub Pages` workflow from the `Actions` tab.

After deployment, GitHub will provide a Pages URL similar to:

```text
https://<your-github-username>.github.io/linkedin-portfolio-website/
```

## Why `base: "./"` Is Used

`vite.config.js` uses:

```js
base: "./"
```

This makes generated asset paths relative. That is important for GitHub project pages, where the site is usually served from a subpath such as:

```text
/linkedin-portfolio-website/
```

Without this setting, JavaScript, CSS, and image paths can break after deployment.

## Customizing Content

Most editable portfolio content lives in:

```text
src/portfolioData.js
```

Use that file to update:

- Contact details
- Photo carousel entries
- EKS pipeline steps
- Experience timeline
- Skills
- Featured project

The main layout and components live in:

```text
src/main.jsx
```

## Customizing Images

Optimized public images live in:

```text
public/assets/photos/optimized/
```

Full-size source photos are kept locally in:

```text
work/original-photos/
```

The `work/` folder is ignored by git, so full-size originals are not committed or deployed.

To regenerate optimized images from the original sources:

```bash
node work/optimize-photos.mjs
```

Then run:

```bash
pnpm build
```

## Performance Notes

Several optimizations are already included:

- Full-size photos are excluded from deployment
- Public images are resized and compressed
- Below-the-fold images use lazy loading and async decoding
- Blueprint cursor/scroll effects are batched with `requestAnimationFrame`
- Reduced-motion users do not receive animated blueprint effects

Current production output is roughly:

```text
dist/        ~7 MB
JS bundle    ~220 KB before gzip
CSS bundle    ~14 KB before gzip
```

## Accessibility Notes

The site includes:

- Semantic sections and headings
- Accessible link/button labels
- Keyboard support for the photo carousel
- Visible focus styles
- Reduced-motion support
- Descriptive image alt text

## Maintenance Checklist

Before publishing major changes:

```bash
pnpm build
```

Recommended manual checks:

- Hero layout on desktop and mobile
- About Me two-column layout
- Photo carousel image quality and sizing
- EKS pipeline hover/focus/tap behavior
- Contact and LinkedIn links
- GitHub Pages deployment workflow status

## License

Personal portfolio project. Add a license if you plan to make this reusable as a public template.
