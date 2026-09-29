import { Column } from "@once-ui-system/core";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects(_props: ProjectsProps) {
  // This component is deprecated and should not be used.
  // Use the hardcoded projects in src/app/work/page.tsx instead.
  void _props;
  return <Column fillWidth />;
}
