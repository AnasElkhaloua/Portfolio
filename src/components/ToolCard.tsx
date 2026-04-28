import Image from "next/image";
import type { IconType } from "react-icons";
import { Column } from "@once-ui-system/core";
import styles from "./ToolCard.module.scss";
import projectCardStyles from "./ProjectCard.module.scss";

interface ToolItem {
  icon: string;
  name: string;
}

interface ToolCardProps {
  title: string;
  titleIcon: IconType;
  tools: ToolItem[];
}

export const ToolCard: React.FC<ToolCardProps> = ({
  title,
  titleIcon: TitleIcon,
  tools,
}) => {
  return (
    <Column
      as="article"
      className={projectCardStyles.card}
      fillWidth
      gap="m"
      radius="m"
      border="neutral-medium"
      padding="m"
    >
      <header className={styles.header}>
        <div className={styles.titleIconBox}>
          <TitleIcon className={styles.titleIcon} aria-hidden="true" />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <div className={styles.toolsGrid}>
        {tools.map((tool) => (
          <div key={tool.name} className={styles.toolPill}>
            <Image
              src={tool.icon}
              alt={tool.name}
              width={20}
              height={20}
              className={styles.toolIcon}
            />
            <span className={styles.toolName}>{tool.name}</span>
          </div>
        ))}
      </div>
    </Column>
  );
};
