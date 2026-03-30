"use client";

import { Row, Heading, Text } from "@once-ui-system/core";
import Image from "next/image";
import styles from "./ToolCard.module.scss";

interface ToolCardProps {
  icon: string;
  name: string;
  category: string;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  icon,
  name,
  category,
}) => {
  let iconClass = styles.icon;
  if (icon.includes('github')) {
    iconClass += ` ${styles.githubIcon}`;
  } else if (icon.includes('google')) {
    iconClass += ` ${styles.googleIcon}`;
  }
  
  return (
    <Row 
      className={styles.card}
      fillWidth
      gap="m"
      paddingX="m"
      paddingY="m"
      radius="m"
      border="neutral-medium"
      vertical="center"
    >
      <div className={styles.iconWrapper}>
        <Image
          src={icon}
          alt={name}
          width={48}
          height={48}
          className={iconClass}
        />
      </div>
      
      <div className={styles.content}>
        <Heading variant="heading-strong-s" as="h3">
          {name}
        </Heading>
        <Text 
          variant="body-default-xs" 
          onBackground="neutral-weak"
        >
          {category}
        </Text>
      </div>
    </Row>
  );
};
