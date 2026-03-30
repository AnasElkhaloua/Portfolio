# Portfolio Customization Instructions

This is a magic-portfolio Next.js template built with Once UI. The project files are inside the "Anas EL KHALOUA" folder — that is the root of the project. All work happens inside that folder.

The content.tsx file has already been updated with my personal info. Drop it into src/resources/content.tsx and do not change its structure or values — just use it as-is.

---

## Pages

Keep only three pages: Home, Resume, and Projects. Remove Blog and Gallery entirely.

Delete the folders src/app/blog/ and src/app/gallery/ so those routes return 404.

The About page already has its label set to "Resume" in content.tsx so the nav will show correctly. The Work page label is already set to "Projects". Do not change those.

Do not touch src/resources/once-ui.config.js.

Do not install any new packages unless something absolutely cannot work without one.

---

## Resume Page

The resume page lives at src/app/about/. Keep it at that path — do not rename the folder or the route.

Strip the page down to show only two sections: Work Experience and Education. Remove the intro section, the skills/technical section, the avatar display, the table of contents, and the calendar button. All of these are already set to display: false in content.tsx — make sure the page component respects those flags and does not render those sections at all.

Work Experience and Education data is already populated in content.tsx. The page just needs to read and render it cleanly using the existing Once UI components.

---

## Projects Page

The projects page lives at src/app/work/. Replace its current behavior entirely — I do not want MDX-based project pages.

Delete src/app/work/projects/ and its dynamic route [slug] completely.

Build a simple card grid directly in src/app/work/page.tsx. Each card shows a project image, the project title, a short one-line description, and a "Visit Site" button that opens the project URL in a new tab.

Hardcode these five projects in the page file:

Project 1: Orgatus — Custom WordPress website — URL placeholder, add comment to replace later
Project 2: WoodenLife — WordPress e-commerce store — URL placeholder, add comment to replace later
Project 3: Xorapilates — WordPress website — URL placeholder, add comment to replace later
Project 4: EPM — WordPress website — URL placeholder, add comment to replace later
Project 5: Global Management Institute — WordPress website — URL placeholder, add comment to replace later

Image paths to use:
public/images/projects/orgatus.jpg
public/images/projects/woodenlife.jpg
public/images/projects/xorapilates.jpg
public/images/projects/epm.jpg
public/images/projects/gmi.jpg

Create the folder public/images/projects/ — I will drop the screenshots there manually.

Card layout: CSS grid, three columns on desktop, two on tablet, one on mobile. Image on top with a 16:9 ratio and object-fit cover. Title, description, and button below with consistent padding. Hover on the card lifts it slightly with a short transition. Use Once UI surface tokens for the card background. Do not hardcode any color values.

Extract the card into a reusable component at src/components/ProjectCard.tsx so it can be used on the home page too.

---

## Home Page

Rebuild src/app/page.tsx with four sections in this exact order.

Section 1 — Hero

Show my name as a large bold H1. Below it a subheading with my role and location. Below that a short bio line: "I build fast, clean WordPress websites that rank — from custom themes and plugins to full SEO optimization." Then two buttons side by side: a primary button labeled "View Resume" linking to /about, and a secondary outlined button labeled "See My Work" linking to /work. Left-aligned on desktop, centered on mobile. Use the default Once UI button variants, do not override any colors.

Section 2 — Selected Work

Section heading: "Selected Work". Reuse the ProjectCard component here and show all five project cards in the same grid layout as the projects page. Below the grid, a single centered link or button labeled "View All Projects" that goes to /work.

Section 3 — Tools I Use

Section heading: "Tools and Technologies". A grid of tool cards, two per row on desktop, one column on mobile. Each card has a tool icon on the left and the tool name bold with a muted category label below it on the right. Extract this into a component at src/components/ToolCard.tsx.

Create the folder public/images/tools/ — I will drop all the icon PNG files there manually. Use these exact filenames:

public/images/tools/wordpress.png — category: CMS
public/images/tools/shopify.png — category: CMS
public/images/tools/figma.png — category: Design Tool
public/images/tools/vscode.png — category: Code Editor
public/images/tools/php.png — category: Backend
public/images/tools/tailwind.png — category: Frontend
public/images/tools/github.png — category: Version Control
public/images/tools/chatgpt.png — category: AI Assistant

Section 4 — Contact Form

Place this at the bottom of the home page above the footer. Heading across two lines, large and bold: first line "LET'S WORK", second line "TOGETHER" in a more muted style to create a layered text effect. Fields: Name and Email side by side on desktop and stacked on mobile, then Phone Number full width, then Message textarea full width. Submit button full width using the default Once UI primary button style.

For the form action, use a mailto placeholder for now and add a comment above it saying to replace with a real form handler like Formspree, EmailJS, or Resend.

Extract the form into a component at src/components/ContactForm.tsx.

Use Once UI components for inputs and buttons. Do not override any colors or theme values anywhere in this section.

---

## Design Rules

Do not override any colors, fonts, spacing tokens, or border radius values from the Once UI theme. Use the existing token system for everything. The only custom CSS allowed is for the grid layouts in the project cards and tool cards where CSS modules are needed.

All pages must be responsive. Single column at 375px, two columns at 768px, three columns at 1280px and above for the project grid.

Hover transitions should be subtle — translateY of a few pixels over 0.2 seconds is enough.

---

## Components to Create

src/components/ProjectCard.tsx — used on home page and projects page
src/components/ToolCard.tsx — used on home page
src/components/ContactForm.tsx — used on home page

---

## Folders to Create

public/images/projects/ — for project screenshots, I will add them manually
public/images/tools/ — for tool icons, I will add them manually

---

## Verification Checklist

Run npm run dev and confirm:

Nav shows exactly three items: Home, Resume, Projects
/blog and /gallery return 404
Home page has four sections: Hero, Selected Work, Tools, Contact Form
Resume page shows Work Experience and Education only
Projects page shows five cards with no detail pages and no MDX routes
Contact form has all four fields and a submit button
No hardcoded color values anywhere outside of Once UI tokens
Site looks correct at 375px, 768px, and 1280px
