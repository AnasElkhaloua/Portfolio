import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Project,
  ProjectAccess,
  ProjectMetadata,
  ProjectTeamMember,
} from "@/types/project.types";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "src", "app", "projects", "content");
const FRONTMATTER_KEYS = new Set([
  "title",
  "slug",
  "summary",
  "image",
  "images",
  "stack",
  "featured",
  "featuredOrder",
  "order",
  "externalUrl",
  "caseStudy",
  "published",
  "access",
  "publishedAt",
  "team",
]);

function fail(fileName: string, field: string, expectation: string): never {
  throw new Error(`Invalid project frontmatter in ${fileName}: ${field} must be ${expectation}`);
}

function stringField(data: Record<string, unknown>, field: string, fileName: string) {
  const value = data[field];
  if (typeof value !== "string" || !value.trim()) fail(fileName, field, "a non-empty string");
  return value.trim();
}

function stringArrayField(data: Record<string, unknown>, field: string, fileName: string) {
  const value = data[field];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || !item.trim())) {
    fail(fileName, field, "an array of non-empty strings");
  }
  return value.map((item) => item.trim());
}

function booleanField(data: Record<string, unknown>, field: string, fileName: string) {
  const value = data[field];
  if (typeof value !== "boolean") fail(fileName, field, "a boolean");
  return value;
}

function teamField(
  data: Record<string, unknown>,
  fileName: string,
): ProjectTeamMember[] | undefined {
  const value = data.team;
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) fail(fileName, "team", "an array");

  return value.map((member, index) => {
    if (!member || typeof member !== "object" || Array.isArray(member)) {
      fail(fileName, `team[${index}]`, "an object");
    }
    const record = member as Record<string, unknown>;
    const linkedIn = record.linkedIn;
    if (linkedIn !== undefined && (typeof linkedIn !== "string" || !linkedIn.trim())) {
      fail(fileName, `team[${index}].linkedIn`, "a non-empty string when provided");
    }
    return {
      name: stringField(record, "name", fileName),
      role: stringField(record, "role", fileName),
      avatar: stringField(record, "avatar", fileName),
      ...(typeof linkedIn === "string" ? { linkedIn: linkedIn.trim() } : {}),
    };
  });
}

function validateProject(
  data: Record<string, unknown>,
  content: string,
  fileName: string,
): Project {
  for (const key of Object.keys(data)) {
    if (!FRONTMATTER_KEYS.has(key)) fail(fileName, key, "a supported project field");
  }

  const slug = stringField(data, "slug", fileName);
  const fileSlug = path.basename(fileName, path.extname(fileName));
  if (slug !== fileSlug) fail(fileName, "slug", `identical to the filename (${fileSlug})`);

  const caseStudy = booleanField(data, "caseStudy", fileName);
  const externalUrlValue = data.externalUrl;
  let externalUrl: string | undefined;
  if (externalUrlValue === undefined) {
    if (!caseStudy) fail(fileName, "externalUrl", "a non-empty string");
  } else {
    externalUrl = stringField(data, "externalUrl", fileName);
    try {
      const url = new URL(externalUrl);
      if (url.protocol !== "https:" && url.protocol !== "http:") {
        throw new Error("unsupported protocol");
      }
    } catch {
      fail(fileName, "externalUrl", "an absolute HTTP(S) URL");
    }
  }

  const order = data.order;
  if (typeof order !== "number" || !Number.isInteger(order) || order < 0) {
    fail(fileName, "order", "a non-negative integer");
  }

  const featured = booleanField(data, "featured", fileName);
  const featuredOrder = data.featuredOrder;
  if (featured) {
    if (
      typeof featuredOrder !== "number" ||
      !Number.isInteger(featuredOrder) ||
      featuredOrder < 0
    ) {
      fail(fileName, "featuredOrder", "a non-negative integer when featured is true");
    }
  } else if (featuredOrder !== undefined) {
    fail(fileName, "featuredOrder", "omitted when featured is false");
  }

  const access = data.access;
  if (access !== "public" && access !== "protected") {
    fail(fileName, "access", 'either "public" or "protected"');
  }

  const publishedAt = data.publishedAt;
  if (
    publishedAt !== undefined &&
    (typeof publishedAt !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt))
  ) {
    fail(fileName, "publishedAt", "a YYYY-MM-DD date when provided");
  }

  const metadataBase = {
    title: stringField(data, "title", fileName),
    slug,
    summary: stringField(data, "summary", fileName),
    image: stringField(data, "image", fileName),
    images: stringArrayField(data, "images", fileName),
    stack: [...new Set(stringArrayField(data, "stack", fileName))],
    featured,
    ...(typeof featuredOrder === "number" ? { featuredOrder } : {}),
    order,
    published: booleanField(data, "published", fileName),
    access: access as ProjectAccess,
    ...(typeof publishedAt === "string" ? { publishedAt } : {}),
    ...(data.team === undefined ? {} : { team: teamField(data, fileName) }),
  };

  const metadata: ProjectMetadata = caseStudy
    ? {
        ...metadataBase,
        caseStudy: true,
        ...(externalUrl ? { externalUrl } : {}),
      }
    : {
        ...metadataBase,
        caseStudy: false,
        externalUrl: externalUrl ?? fail(fileName, "externalUrl", "an absolute HTTP(S) URL"),
      };

  if (metadata.caseStudy && !content.trim()) {
    fail(fileName, "content", "non-empty when caseStudy is true");
  }

  return { metadata, content: content.trim() };
}

function readProjects() {
  if (!fs.existsSync(PROJECTS_DIRECTORY)) return [];

  return fs
    .readdirSync(PROJECTS_DIRECTORY)
    .filter((fileName) => path.extname(fileName) === ".mdx")
    .map((fileName) => {
      const rawContent = fs.readFileSync(path.join(PROJECTS_DIRECTORY, fileName), "utf8");
      const { data, content } = matter(rawContent);
      return validateProject(data, content, fileName);
    })
    .sort((a, b) => a.metadata.order - b.metadata.order);
}

export function getProjects() {
  return readProjects().filter((project) => project.metadata.published);
}

export function getFeaturedProjects() {
  return getProjects()
    .filter((project) => project.metadata.featured)
    .sort((a, b) => (a.metadata.featuredOrder ?? 0) - (b.metadata.featuredOrder ?? 0));
}

export function getProjectBySlug(slug: string) {
  return getProjects().find((project) => project.metadata.slug === slug);
}

export function getCaseStudyProjects() {
  return getProjects().filter((project) => project.metadata.caseStudy);
}

export function getRelatedProjects(slug: string, limit = 2) {
  return getProjects()
    .filter((project) => project.metadata.slug !== slug)
    .slice(0, limit);
}

export function getProtectedProjectByPath(routePath: string) {
  const prefix = "/projects/";
  if (!routePath.startsWith(prefix)) return undefined;
  const slug = routePath.slice(prefix.length);
  if (!slug || slug.includes("/")) return undefined;

  const project = getProjectBySlug(slug);
  return project?.metadata.caseStudy && project.metadata.access === "protected"
    ? project
    : undefined;
}
