import { Button, Column, Heading, Row, Tag, Text } from "@once-ui-system/core";
import Image from "next/image";
import type { ProjectMetadata } from "@/types/project.types";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  project: ProjectMetadata;
  preload?: boolean;
  headingLevel?: "h2" | "h3";
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  preload = false,
  headingLevel = "h3",
}) => {
  const href = project.caseStudy ? `/projects/${project.slug}` : project.externalUrl;

  return (
    <Column
      className={styles.card}
      fillWidth
      gap="0"
      radius="m"
      border="neutral-medium"
      overflow="hidden"
    >
      {/* Image with 16:9 ratio */}
      <div className={styles.imageWrapper}>
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={225}
          className={styles.image}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          preload={preload}
        />
      </div>

      {/* Content */}
      <Column
        paddingX="m"
        paddingY="m"
        gap="m"
        flex={1}
        fillWidth
        horizontal="center"
        align="center"
      >
        <Heading variant="heading-strong-m" as={headingLevel} align="center">
          {project.title}
        </Heading>

        <Text variant="body-default-s" onBackground="neutral-weak" align="center">
          {project.summary}
        </Text>

        {project.stack.length > 0 && (
          <Row wrap gap="8" horizontal="center">
            {project.stack.map((technology) => (
              <Tag key={`${project.slug}-${technology}`} size="s">
                {technology}
              </Tag>
            ))}
          </Row>
        )}

        <div style={{ marginTop: "auto" }}>
          <Button
            href={href}
            target={project.caseStudy ? undefined : "_blank"}
            rel={project.caseStudy ? undefined : "noopener noreferrer"}
            label={project.caseStudy ? "View Project" : "Visit Site"}
            variant="primary"
            size="s"
          />
        </div>
      </Column>
    </Column>
  );
};
