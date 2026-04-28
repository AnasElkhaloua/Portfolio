import { Heading, Text, Button, Column, Row, Schema, Meta } from "@once-ui-system/core";
import { home, about, person, work, baseURL } from "@/resources";
import { ProjectCard } from "@/components/ProjectCard";
import { ToolCard } from "@/components/ToolCard";
import { ContactForm } from "@/components/ContactForm";
import type { IconType } from "react-icons";
import { LuCode, LuServer, LuCloudCog, LuWrench, LuMonitor, LuUsers } from "react-icons/lu";
import styles from "./page.module.scss";

const projects = [
  {
    id: 1,
    title: "Orgatus",
    description: "A brand website rooted in Moroccan tradition, presenting natural cosmetics inspired by local craftsmanship.",
    image: "/images/projects/orgatus.jpg",
    visitUrl: "https://orgatus.com/",
  },
  {
    id: 2,
    title: "WoodenLife",
    description: "An online store for handcrafted wooden pieces made for everyday use, blending utility with design.",
    image: "/images/projects/woodenlife.jpg",
    visitUrl: "https://woodenlife.store/en/",
  },
  {
    id: 3,
    title: "Global Management Institute",
    description: "An academic platform offering business programs from BBA to DBA for professionals and future leaders.",
    image: "/images/projects/gmi.jpg",
    visitUrl: "https://gmi-institute.com/",
  },
];

interface ToolItem {
  name: string;
  icon: string;
}

interface ToolGroup {
  id: number;
  title: string;
  titleIcon: IconType;
  tools: ToolItem[];
}

const tools: ToolGroup[] = [
  {
    id: 1,
    title: "Frontend",
    titleIcon: LuCode,
    tools: [
      { name: "JavaScript", icon: "/images/tools/javascript.svg" },
      { name: "TypeScript", icon: "/images/tools/typescript.svg" },
      { name: "React", icon: "/images/tools/react.svg" },
      { name: "Vue", icon: "/images/tools/vue.svg" },
      { name: "Tailwind CSS", icon: "/images/tools/tailwindcss.svg" },
      { name: "Bootstrap", icon: "/images/tools/bootstrap.svg" },
    ],
  },
  {
    id: 2,
    title: "Backend",
    titleIcon: LuServer,
    tools: [
      { name: "Node.js", icon: "/images/tools/nodejs.svg" },
      { name: "PHP", icon: "/images/tools/php.svg" },
      { name: "phpMyAdmin", icon: "/images/tools/phpmyadmin.svg" },
      { name: "MySQL", icon: "/images/tools/mysql.svg" },
    ],
  },
  {
    id: 3,
    title: "DevOps & Cloud",
    titleIcon: LuCloudCog,
    tools: [
      { name: "Git", icon: "/images/tools/git.svg" },
      { name: "GitHub", icon: "/images/tools/github.svg" },
      { name: "Vercel", icon: "/images/tools/vercel.svg" },
      { name: "Cloudflare", icon: "/images/tools/cloudflare.svg" },
    ],
  },
  {
    id: 4,
    title: "Design & Tools",
    titleIcon: LuWrench,
    tools: [
      { name: "Figma", icon: "/images/tools/figma.svg" },
      { name: "Photoshop", icon: "/images/tools/photoshop.svg" },
      { name: "WordPress", icon: "/images/tools/wordpress.svg" },
      { name: "VS Code", icon: "/images/tools/vscode.svg" },
      { name: "Postman", icon: "/images/tools/postman.svg" },
    ],
  },
  {
    id: 5,
    title: "Operating Systems",
    titleIcon: LuMonitor,
    tools: [
      { name: "Windows", icon: "/images/tools/windows.svg" },
      { name: "Ubuntu", icon: "/images/tools/ubuntu.svg" },
    ],
  },
  {
    id: 6,
    title: "Soft Skills",
    titleIcon: LuUsers,
    tools: [
      { name: "Teamwork", icon: "/images/tools/teamwork.svg" },
      { name: "Communication", icon: "/images/tools/communication.svg" },
      { name: "Debugging", icon: "/images/tools/debugging.svg" },
    ],
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: "/images/og/og.jpg",
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
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
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
          I build web experiences from front to back, focusing on clean design, solid functionality, and real-world impact.
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
              title={tool.title}
              titleIcon={tool.titleIcon}
              tools={tool.tools}
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
