import { routing } from "@/i18n/routing";
import { baseURL, routes as routesConfig } from "@/resources";
import { getPosts } from "@/utils/utils";

export default async function sitemap() {
  const { locales } = routing;

  const routes = locales.flatMap((locale) =>
    Object.keys(routesConfig)
      .filter((route) => routesConfig[route as keyof typeof routesConfig])
      .map((route) => ({
        url: `${baseURL}/${locale}${route !== "/" ? route : ""}`,
        lastModified: new Date().toISOString().split("T")[0],
      })),
  );

  const posts = locales.flatMap((locale) =>
    getPosts(["src", "app", "[locale]", "blog", "posts", locale]).map((post) => ({
      url: `${baseURL}/${locale}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  const projects = locales.flatMap((locale) =>
    getPosts(["src", "app", "[locale]", "work", "projects", locale]).map((post) => ({
      url: `${baseURL}/${locale}/work/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    })),
  );

  return [...routes, ...posts, ...projects];
}
