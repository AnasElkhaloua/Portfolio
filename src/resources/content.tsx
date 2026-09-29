import { Blog, Gallery, Home, Newsletter, Person, Projects, Resume, Social } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Anas",
  lastName: "El Khaloua",
  name: `Anas El Khaloua`,
  role: "Full-Stack Developer",
  avatar: "/images/avatar.jpg",
  email: "anaselkhaloua06@gmail.com",
  phone: "+212 624 651 236",
  website: "https://anaselkhaloua.com",
  location: "Africa/Casablanca", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  locationLabel: "Casablanca, Morocco",
  languages: ["Arabic", "English", "French"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Occasional writing on web development, WordPress, and SEO.</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the resume page
  {
    name: "GitHub",
    icon: "github",
    link: "", // add your GitHub URL
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "", // add your LinkedIn URL
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "Website",
    icon: "globe",
    link: person.website ?? "",
    essential: true,
  },
  {
    name: "Phone",
    icon: "phone",
    link: person.phone ? `tel:${person.phone.replace(/\s/g, "")}` : "",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/og.jpg",
  label: "Home",
  title: `${person.name} – Full-Stack Developer`,
  description: `Portfolio of ${person.name}, a Full-Stack Developer based in Casablanca, Morocco.`,
  headline: <>Building fast, clean websites that actually rank.</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Latest work
        </Text>
      </Row>
    ),
    href: "/projects",
  },
  subline: (
    <>
      I'm Anas, a Full-Stack Developer based in{" "}
      <Text as="span" size="xl" weight="strong">
        Casablanca, Morocco
      </Text>
      , working across modern front-end platforms, custom WordPress, APIs, and performance.
    </>
  ),
};

const resume: Resume = {
  path: "/resume",
  label: "Resume",
  title: `Resume – ${person.name}`,
  description: `Experience, skills, and education of ${person.name}, a ${person.role} based in Casablanca, Morocco.`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: false,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <Text as="p">
          Front-End / Full-Stack developer with 4+ years of experience across custom WordPress and
          e-commerce development, React, Vue, and Next.js front-end work on a SaaS platform, API
          integration, and performance and accessibility optimization.
        </Text>
        <Text as="p">
          AI-assisted development is part of the daily workflow, using Claude Code, GitHub Copilot,
          Cursor, Windsurf, and ChatGPT for development, debugging, code review, and repetitive-task
          automation while maintaining clean and maintainable code.
        </Text>
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "SOPHAX",
        timeframe: "Jan 2025 – Apr 2026",
        role: "Full-Stack Developer",
        location: "Remote",
        achievements: [
          <>
            Built front-end features with React for the company's internal SaaS/CRM order-management
            platform, with occasional contributions to back-end API endpoints.
          </>,
          <>
            Built custom WordPress solutions for business and e-commerce websites, using AI
            development tools such as Claude Code to accelerate prototyping and debugging.
          </>,
          <>Created and customized WordPress themes and plugins.</>,
          <>
            Integrated REST APIs and third-party services including Klaviyo and Google Sheets via
            webhooks.
          </>,
          <>
            Optimized Core Web Vitals, PageSpeed performance, alt text, color contrast, and other
            accessibility and WCAG issues.
          </>,
          <>Set up and managed Cloudflare, CDN, DNS, and security configuration.</>,
          <>
            Maintained, debugged, and continuously improved multiple production websites and
            applications.
          </>,
        ],
        images: [],
      },
      {
        company: "Twily",
        timeframe: "Jun 2024 – 2025",
        role: "WordPress Developer",
        achievements: [
          <>Built responsive websites from Figma UI mockups.</>,
          <>Improved SEO and performance using PageSpeed Insights and GTmetrix.</>,
        ],
        images: [],
      },
      {
        company: "Cvcsupplies Ltd",
        timeframe: "Sep 2023 – May 2024",
        role: "WordPress Developer",
        achievements: [
          <>Developed and maintained WordPress sites for multiple clients.</>,
          <>Implemented SEO strategies and optimized page-load performance.</>,
          <>Integrated APIs and customized themes to match client requirements.</>,
        ],
        images: [],
      },
      {
        company: "Hello World Agency",
        timeframe: "Jun 2022 – Sep 2022",
        role: "Junior PHP Web Developer",
        achievements: [
          <>Built web interfaces using HTML, CSS, Bootstrap, and Tailwind.</>,
          <>Created dynamic PHP applications with MySQL database management.</>,
          <>Worked within a team to deliver complete front-end and back-end integration.</>,
        ],
        images: [],
      },
      {
        company: "Commune de Sidi L'Mokhtar",
        timeframe: "Jan 2021 – Apr 2021",
        role: "IT Technician Intern",
        achievements: [
          <>Provided technical support and equipment maintenance.</>,
          <>Resolved IT incidents.</>,
        ],
        images: [],
      },
      {
        company: "Provincial Directorate of National Education, Chichaoua",
        timeframe: "Jul 2019 – Aug 2019",
        role: "IT Technician Intern",
        achievements: [
          <>Developed a training-management application for teachers using Microsoft Access.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Cadi Ayyad University, Semlalia, Marrakech",
        description: (
          <>
            Bachelor's in Network, Web & Security Engineering (2022–2023). Relevant areas included
            networking, systems security, Java and PHP programming, databases, and mobile
            development.
          </>
        ),
      },
      {
        name: "Lycée Technique, Chichaoua",
        description: (
          <>
            BTS in Multimedia & Web Design (2018–2020). Relevant areas included HTML, CSS,
            JavaScript, PHP, MySQL, graphic design, UI/UX, and object-oriented programming.
          </>
        ),
      },
      {
        name: "Lycée Technique, Chichaoua",
        description: <>Baccalaureate in Electrical Sciences & Technology (2018).</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Skills & Languages",
    skills: [
      {
        title: "Front-End",
        description:
          "React, Vue, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, and jQuery.",
      },
      {
        title: "Back-End & API",
        description:
          "PHP, MySQL, Prisma, OAuth, REST API design and consumption, Postman, and Docker.",
      },
      {
        title: "WordPress & E-commerce",
        description:
          "Custom themes, custom plugins, Elementor, WooCommerce, Custom Post Types, and ACF.",
      },
      {
        title: "AI Development Tools",
        description:
          "Claude, Claude Code, GitHub Copilot, Cursor, Windsurf, and ChatGPT for code assistance, debugging, code review, and repetitive-task automation.",
      },
      {
        title: "Performance, Accessibility & SEO",
        description:
          "Core Web Vitals, PageSpeed Insights, GTmetrix, on-page and off-page SEO, WCAG accessibility, alt text, and color contrast.",
      },
      {
        title: "Tools & Platforms",
        description:
          "Git, GitHub, branching, pull requests, merging, Vercel, Cloudflare, DNS, CDN, security, cPanel, hPanel, Figma, and Photoshop.",
      },
      {
        title: "Languages",
        description: "Arabic — Native; English — Advanced; French — Intermediate.",
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about web development and SEO...",
  description: `Read what ${person.name} has been writing about recently`,
};

const projects: Projects = {
  path: "/projects",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `WordPress and web projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, resume, blog, projects, gallery };
