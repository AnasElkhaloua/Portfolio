import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, person, projects as projectsPage, resume } from "@/resources";
import { ProjectCard } from "@/components";
import { getProjects } from "@/utils/projects";
import styles from "./projects.module.scss";

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: projectsPage.title,
      description: projectsPage.description,
      baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(projectsPage.title)}`,
      path: projectsPage.path,
    }),
    alternates: { canonical: `${baseURL}${projectsPage.path}` },
  };
}

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={projectsPage.path}
        title={projectsPage.title}
        description={projectsPage.description}
        image={`/api/og/generate?title=${encodeURIComponent(projectsPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${resume.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        A Few Things I've Made
      </Heading>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.metadata.slug}
            project={project.metadata}
            preload={index === 0}
            headingLevel="h2"
          />
        ))}
      </div>
    </Column>
  );
}
