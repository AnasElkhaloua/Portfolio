import { Column, Heading, Meta, Schema, Row } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { ProjectCard } from "@/components";
import styles from "./work.module.scss";

const projects = [
  {
    id: 1,
    title: "Stonework International",
    description: "A catalog-style site showcasing marble and tile collections with a focus on materials and finishes.",
    image: "/images/projects/stonework.jpg",
    visitUrl: "https://stone-work-maroc.com/",
  },
  {
    id: 2,
    title: "Orgatus",
    description: "A brand website rooted in Moroccan tradition, presenting natural cosmetics inspired by local craftsmanship.",
    image: "/images/projects/orgatus.jpg",
    visitUrl: "https://orgatus.com/",
  },
  {
    id: 3,
    title: "WoodenLife",
    description: "An online store for handcrafted wooden pieces made for everyday use, blending utility with design.",
    image: "/images/projects/woodenlife.jpg",
    visitUrl: "https://woodenlife.store/en/",
  },
  {
    id: 4,
    title: "Xorapilates",
    description: "A Pilates studio in Marrakech focused on movement, balance, and a refined training experience.",
    image: "/images/projects/xorapilates.jpg",
    visitUrl: "https://xorapilates.com/",
  },
  {
    id: 5,
    title: "EPM",
    description: "A publishing platform dedicated to research work, sharing books written as part of advanced academic programs.",
    image: "/images/projects/epm.jpg",
    visitUrl: "https://epm.ma/",
  },
  {
    id: 6,
    title: "Global Management Institute",
    description: "An academic platform offering business programs from BBA to DBA for professionals and future leaders.",
    image: "/images/projects/gmi.jpg",
    visitUrl: "https://gmi-institute.com/",
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
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
        What I've Built
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
