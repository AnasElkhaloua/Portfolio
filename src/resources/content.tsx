import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Anas",
  lastName: "El Khaloua",
  name: `Anas El Khaloua`,
  role: "Web Developer",
  avatar: "/images/avatar.jpg",
  email: "anaselkhaloua06@gmail.com",
  location: "Africa/Casablanca", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
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
  // Set essentials: true for links you want to show on the about page
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
];

const home: Home = {
  path: "/",
  image: "/images/og/og.jpg",
  label: "Home",
  title: `${person.name} – Web Developer`,
  description: `Portfolio of ${person.name}, a WordPress and PHP web developer based in Marrakesh, Morocco.`,
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
    href: "/work",
  },
  subline: (
    <>
      I'm Anas, a web developer based in{" "}
      <Text as="span" size="xl" weight="strong">Marrakesh, Morocco</Text>
      , specializing in WordPress, SEO, and custom theme and plugin development.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Resume",
  title: `Resume – ${person.name}`,
  description: `Work experience and education of ${person.name}, ${person.role} based in Marrakesh, Morocco.`,
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
    display: false,
    title: "Introduction",
    description: (
      <>
        Anas is a Marrakesh-based web developer with over 3 years of experience building
        WordPress websites, custom themes, plugins, and SEO-optimized solutions.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Freelance",
        timeframe: "Jan 2025 - Present",
        role: "Full Stack Developer",
        achievements: [
          <>Delivered custom web solutions for clients across e-commerce and corporate sectors.</>,
          <>Built responsive websites with high PageSpeed scores and comprehensive SEO optimization.</>,
          <>Developed custom themes and plugins with API integrations for enhanced functionality.</>,
        ],
        images: [],
      },
      {
        company: "Twily",
        timeframe: "Jun 2024 - Jan 2025",
        role: "WordPress Developer",
        achievements: [
          <>Developed responsive WordPress websites from UI designs with seamless cross-device compatibility.</>,
          <>Improved client website SEO rankings through strategic on-page and off-page optimization.</>,
          <>Optimized website performance using PageSpeed Insights and GTmetrix.</>,
        ],
        images: [],
      },
      {
        company: "Cvcsupplies Ltd",
        timeframe: "Sep 2023 - May 2024",
        role: "WordPress Developer",
        achievements: [
          <>Development and maintenance of WordPress websites ensuring high quality and optimal functionality.</>,
          <>Implementation of on-page and off-page SEO strategies to improve performance and increase rankings.</>,
          <>Backlink analysis and outreach to build a strong link profile.</>,
          <>Customization of themes and integration of APIs to extend functionalities and meet client needs.</>,
        ],
        images: [],
      },
      {
        company: "Hello World Agency",
        timeframe: "Jun 2022 - Sep 2022",
        role: "Junior PHP Web Developer",
        achievements: [
          <>Designed and developed user interfaces with HTML, CSS, Bootstrap, and Tailwind CSS.</>,
          <>Built dynamic server-side web applications using PHP and MySQL.</>,
          <>Ensured cross-browser compatibility and responsiveness across all devices.</>,
          <>Collaborated with the team to ensure smooth integration of front-end and back-end features.</>,
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
        name: "Cadi Ayyad University Semlalia – Marrakech",
        description: (
          <>
            Bachelor's Degree in Network Engineering, Web and Security (2022–2023).
            Covered Java/JEE, PHP, UML, databases, network security, and mobile application programming.
          </>
        ),
      },
      {
        name: "Technical High School – Chichaoua",
        description: (
          <>
            Associate Degree in Multimedia and Web Design — MCW (2018–2020).
            HTML, CSS, JavaScript, PHP/MySQL, UI/UX design, Adobe Creative Suite, and OOP with Java.
          </>
        ),
      },
    ],
  },
  technical: {
    display: false,
    title: "Technical skills",
    skills: [],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about web development and SEO...",
  description: `Read what ${person.name} has been writing about recently`,
};

const work: Work = {
  path: "/work",
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

export { person, social, newsletter, home, about, blog, work, gallery };
