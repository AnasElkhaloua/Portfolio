import { Column, Heading, Meta, Schema, Row } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { ProjectCard } from "@/components";
import styles from "./work.module.scss";

const projects = [
  {
    id: 1,
    title: "Stonework International",
    description: "Custom WordPress website",
    image: "/images/projects/stonework.jpg",
    visitUrl: "https://stone-work-maroc.com/",
  },
  {
    id: 2,
    title: "Orgatus",
    description: "Custom WordPress website",
    image: "/images/projects/orgatus.jpg",
    visitUrl: "https://orgatus.com/",
  },
  {
    id: 3,
    title: "WoodenLife",
    description: "WordPress e-commerce store",
    image: "/images/projects/woodenlife.jpg",
    visitUrl: "https://woodenlife.store/en/",
  },
  {
    id: 4,
    title: "Xorapilates",
    description: "WordPress website",
    image: "/images/projects/xorapilates.jpg",
    visitUrl: "https://xorapilates.com/",
  },
  {
    id: 5,
    title: "EPM",
    description: "WordPress website",
    image: "/images/projects/epm.jpg",
    visitUrl: "https://epm.ma/",
  },
  {
    id: 6,
    title: "Global Management Institute",
    description: "WordPress website",
    image: "/images/projects/gmi.jpg",
    visitUrl: "https://gmi-institute.com/",
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: "/images/og/og.jpg",
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>

      {/* Projects Grid */}
      <div className={styles.grid}>
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
    </Column>
  );
}
