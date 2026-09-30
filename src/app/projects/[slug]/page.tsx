import type { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import {
  AvatarGroup,
  Column,
  Heading,
  Line,
  Meta,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { CustomMDX, PasswordProtection, ProjectCard, ScrollToHash } from "@/components";
import { baseURL, person, projects as projectsPage, resume } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getCaseStudyProjects, getProjectBySlug, getRelatedProjects } from "@/utils/projects";
import { ROUTE_ACCESS_COOKIE, verifyRouteAccessToken } from "@/utils/routeAccess";
import styles from "../projects.module.scss";

type ProjectRouteProps = {
  params: Promise<{ slug: string | string[] }>;
};

function slugFromParams(slug: string | string[]) {
  return Array.isArray(slug) ? slug.join("/") : slug;
}

export function generateStaticParams(): { slug: string }[] {
  return getCaseStudyProjects()
    .filter((project) => project.metadata.access === "public")
    .map((project) => ({ slug: project.metadata.slug }));
}

export async function generateMetadata({ params }: ProjectRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slugFromParams(slug));

  if (!project?.metadata.caseStudy) return {};
  if (project.metadata.access === "protected") {
    return {
      title: "Protected project",
      description: "This project is password protected.",
      robots: { index: false, follow: false },
    };
  }

  const path = `${projectsPage.path}/${project.metadata.slug}`;
  return {
    ...Meta.generate({
      title: project.metadata.title,
      description: project.metadata.summary,
      baseURL,
      image: project.metadata.image,
      path,
    }),
    alternates: { canonical: `${baseURL}${path}` },
  };
}

export default async function ProjectPage({ params }: ProjectRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slugFromParams(slug));

  if (!project?.metadata.caseStudy) notFound();

  const routePath = `${projectsPage.path}/${project.metadata.slug}`;
  if (project.metadata.access === "protected") {
    const cookieStore = await cookies();
    const token = cookieStore.get(ROUTE_ACCESS_COOKIE)?.value;
    if (!verifyRouteAccessToken(token, routePath)) {
      return <PasswordProtection path={routePath} />;
    }
  }

  const relatedProjects = getRelatedProjects(project.metadata.slug);
  const avatars = project.metadata.team?.map((member) => ({ src: member.avatar })) ?? [];
  const heroImage = project.metadata.images[0] || project.metadata.image;

  return (
    <Column as="section" maxWidth="m" paddingTop="24" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={routePath}
        title={project.metadata.title}
        description={project.metadata.summary}
        datePublished={project.metadata.publishedAt}
        dateModified={project.metadata.publishedAt}
        image={project.metadata.image}
        author={{
          name: person.name,
          url: `${baseURL}${resume.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href={projectsPage.path}>
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        {project.metadata.publishedAt && (
          <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
            {formatDate(project.metadata.publishedAt)}
          </Text>
        )}
        <Heading variant="display-strong-m">{project.metadata.title}</Heading>
      </Column>
      {project.metadata.team && project.metadata.team.length > 0 && (
        <Row marginBottom="32" horizontal="center">
          <Row gap="16" vertical="center">
            <AvatarGroup reverse avatars={avatars} size="s" />
            <Text variant="label-default-m" onBackground="brand-weak">
              {project.metadata.team.map((member, index) => (
                <span key={`${project.metadata.slug}-${member.name}`}>
                  {index > 0 && (
                    <Text as="span" onBackground="neutral-weak">
                      ,{" "}
                    </Text>
                  )}
                  {member.linkedIn ? (
                    <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
                  ) : (
                    member.name
                  )}
                </span>
              ))}
            </Text>
          </Row>
        </Row>
      )}
      <Image
        className={styles.heroImage}
        src={heroImage}
        alt={`${project.metadata.title} project interface`}
        width={1600}
        height={900}
        sizes="(max-width: 768px) calc(100vw - 32px), 960px"
        preload
        fetchPriority="high"
      />
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={project.content} />
      </Column>
      {relatedProjects.length > 0 && (
        <Column fillWidth gap="40" horizontal="center" marginTop="40">
          <Line maxWidth="40" />
          <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
            Related projects
          </Heading>
          <div className={styles.grid}>
            {relatedProjects.map((relatedProject) => (
              <ProjectCard key={relatedProject.metadata.slug} project={relatedProject.metadata} />
            ))}
          </div>
        </Column>
      )}
      <ScrollToHash />
    </Column>
  );
}
