"use client";

import { Column, Row, Heading, Text, Button } from "@once-ui-system/core";
import Image from "next/image";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  visitUrl: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  visitUrl,
}) => {
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
          src={image}
          alt={title}
          width={400}
          height={225}
          className={styles.image}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
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
        <Heading variant="heading-strong-m" as="h3" align="center">
          {title}
        </Heading>
        
        <Text 
          variant="body-default-s" 
          onBackground="neutral-weak"
          align="center"
        >
          {description}
        </Text>

        <div style={{ marginTop: "auto" }}>
          <Button
            href={visitUrl}
            target="_blank"
            rel="noopener noreferrer"
            label="Visit Site"
            variant="primary"
            size="s"
          />
        </div>
      </Column>
    </Column>
  );
};
