import { Heading, Text, Button, Column, Row, Schema, Meta } from "@once-ui-system/core";
import { home, about, person, work, baseURL } from "@/resources";
import { ProjectCard } from "@/components/ProjectCard";
import { ToolCard } from "@/components/ToolCard";
import { ContactForm } from "@/components/ContactForm";
import styles from "./page.module.scss";

const projects = [
  {
    id: 1,
    title: "Orgatus",
    description: "Custom WordPress website",
    image: "/images/projects/orgatus.jpg",
    visitUrl: "https://orgatus.com/",
  },
  {
    id: 2,
    title: "WoodenLife",
    description: "WordPress e-commerce store",
    image: "/images/projects/woodenlife.jpg",
    visitUrl: "https://woodenlife.store/en/",
  },
  {
    id: 3,
    title: "Global Management Institute",
    description: "WordPress website",
    image: "/images/projects/gmi.jpg",
    visitUrl: "https://gmi-institute.com/",
  },
];

const tools = [
  // FRONTEND
  {
    id: 1,
    name: "HTML",
    category: "Markup",
    icon: "/images/tools/html.svg",
  },
  {
    id: 2,
    name: "CSS",
    category: "Styling",
    icon: "/images/tools/css.svg",
  },
  {
    id: 3,
    name: "JavaScript",
    category: "Scripting",
    icon: "/images/tools/javascript.svg",
  },
  {
    id: 4,
    name: "jQuery",
    category: "JS Library",
    icon: "/images/tools/jquery.svg",
  },
  {
    id: 5,
    name: "Tailwind CSS",
    category: "Frontend Framework",
    icon: "/images/tools/tailwindcss.svg",
  },
  {
    id: 6,
    name: "Bootstrap",
    category: "Frontend Framework",
    icon: "/images/tools/bootstrap.svg",
  },
  // BACKEND
  {
    id: 7,
    name: "PHP",
    category: "Backend",
    icon: "/images/tools/php.svg",
  },
  {
    id: 8,
    name: "MySQL",
    category: "Database",
    icon: "/images/tools/mysql.svg",
  },
  // CMS
  {
    id: 9,
    name: "WordPress",
    category: "CMS",
    icon: "/images/tools/wordpress.svg",
  },
  {
    id: 10,
    name: "Shopify",
    category: "CMS",
    icon: "/images/tools/shopify.svg",
  },
  // DESIGN
  {
    id: 11,
    name: "Figma",
    category: "Design Tool",
    icon: "/images/tools/figma.svg",
  },
  {
    id: 12,
    name: "Adobe Photoshop",
    category: "Graphic Design",
    icon: "/images/tools/photoshop.svg",
  },
  {
    id: 13,
    name: "Adobe Illustrator",
    category: "Graphic Design",
    icon: "/images/tools/illustrator.svg",
  },
  // SEO
  {
    id: 14,
    name: "Google PageSpeed Insights",
    category: "Performance",
    icon: "/images/tools/google.svg",
  },
  // DEVOPS / TOOLS
  {
    id: 16,
    name: "GitHub",
    category: "Version Control",
    icon: "/images/tools/github.svg",
  },
  {
    id: 17,
    name: "VS Code",
    category: "Code Editor",
    icon: "/images/tools/vscode.svg",
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image="/images/og/og.jpg"
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Section 1: Hero */}
      <Column fillWidth gap="l" horizontal="center" align="center" maxWidth="m">
        <Heading variant="display-strong-xl" as="h1" wrap="balance" align="center">
          {person.name}
        </Heading>

        <Row gap="4" vertical="center" wrap horizontal="center" s={{ direction: "column", horizontal: "center" }}>
          <Heading variant="heading-default-xl" onBackground="neutral-weak" as="p" align="center">
            {person.role} in {person.location.split("/")[1]}
          </Heading>
        </Row>

        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance" align="center">
          I craft beautiful, high-performance WordPress websites that not only look stunning but drive real results. From custom theme development to seamless integrations, I combine technical expertise with a passion for building digital experiences that help your business grow.
        </Text>

        <Row gap="m" wrap horizontal="center" s={{ direction: "column", fillWidth: true, horizontal: "center" }}>
          <Button href={about.path} variant="primary" label="View Resume" />
          <Button href={work.path} variant="secondary" label="See My Work" />
        </Row>
      </Column>

      {/* Section 2: Selected Work */}
      <Column fillWidth gap="l" horizontal="center" align="center">
        <Heading variant="display-strong-s" as="h2" align="center">
          Recent Projects
        </Heading>

        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              title={project.title}
              description={project.description}
              visitUrl={project.visitUrl}
            />
          ))}
        </div>

        <Row fillWidth horizontal="center" marginTop="l">
          <Button href={work.path} variant="secondary" label="View All Projects" />
        </Row>
      </Column>

      {/* Section 3: Tools I Use */}
      <Column fillWidth gap="l" horizontal="center" align="center">
        <Heading variant="display-strong-s" as="h2" align="center">
          Tools and Technologies
        </Heading>

        <div className={styles.toolGrid}>
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              category={tool.category}
              icon={tool.icon}
            />
          ))}
        </div>
      </Column>

      {/* Section 4: Contact Form */}
      <Column fillWidth gap="xl" marginTop="l">
        <ContactForm />
      </Column>
    </Column>
  );
}
