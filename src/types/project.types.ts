export type ProjectAccess = "public" | "protected";

export type ProjectTeamMember = {
  name: string;
  role: string;
  avatar: string;
  linkedIn?: string;
};

type ProjectMetadataBase = {
  title: string;
  slug: string;
  summary: string;
  image: string;
  images: string[];
  stack: string[];
  featured: boolean;
  order: number;
  published: boolean;
  access: ProjectAccess;
  publishedAt?: string;
  team?: ProjectTeamMember[];
};

export type ProjectMetadata = ProjectMetadataBase &
  (
    | {
        caseStudy: true;
        externalUrl?: string;
      }
    | {
        caseStudy: false;
        externalUrl: string;
      }
  );

export type Project = {
  metadata: ProjectMetadata;
  content: string;
};
