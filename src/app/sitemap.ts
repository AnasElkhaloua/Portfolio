import { getBlogPosts } from "@/utils/utils";
import { getCaseStudyProjects } from "@/utils/projects";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const projects = getCaseStudyProjects()
    .filter((project) => project.metadata.access === "public")
    .map((project) => ({
      url: `${baseURL}/projects/${project.metadata.slug}`,
      lastModified: project.metadata.publishedAt,
    }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...projects];
}
