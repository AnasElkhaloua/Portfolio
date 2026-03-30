import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  // This component is deprecated and should not be used.
  // Use the hardcoded projects in src/app/work/page.tsx instead.
  return <Column fillWidth />;
}
