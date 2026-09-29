export type ProjectAccess = "public" | "protected";

export type ProjectTeamMember = {
  name: string;
  role: string;
  avatar: string;
  linkedIn?: string;
};

export type ProjectMetadata = {
  title: string;
  slug: string;
  summary: string;
  image: string;
  images: string[];
  stack: string[];
  featured: boolean;
  order: number;
  externalUrl: string;
  caseStudy: boolean;
  published: boolean;
  access: ProjectAccess;
  publishedAt?: string;
  team?: ProjectTeamMember[];
};

export type Project = {
  metadata: ProjectMetadata;
  content: string;
};
