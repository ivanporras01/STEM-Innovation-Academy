import type { MetadataRoute } from "next";
import { novaLanguageCourses } from "@/data/nova-language";
import { novaShopProducts } from "@/data/nova-shop";
import { novaSchoolElectives } from "@/data/nova-school";
import { novaCollegeCourses } from "@/data/nova-college";
import { NOVA_PROGRAM_CATALOG } from "@/data/courses";
import { absoluteUrl } from "@/lib/seo";

type SitemapEntry = MetadataRoute.Sitemap[number];

function entry(
  path: string,
  priority: number,
  changeFrequency: SitemapEntry["changeFrequency"] = "weekly",
): SitemapEntry {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: SitemapEntry[] = [
    entry("/", 1, "daily"),
    entry("/es", 0.95, "daily"),
    entry("/pt", 0.9, "weekly"),
    entry("/pt/school", 0.85, "weekly"),
    entry("/pt/college", 0.85, "weekly"),
    entry("/school", 0.95, "weekly"),
    entry("/es/school", 0.9, "weekly"),
    entry("/college", 0.95, "weekly"),
    entry("/es/college", 0.9, "weekly"),
    entry("/language", 0.95, "weekly"),
    entry("/es/language", 0.9, "weekly"),
    entry("/pt/language", 0.85, "weekly"),
    entry("/shop", 0.9, "daily"),
    entry("/es/shop", 0.85, "daily"),
    entry("/partnership", 0.85, "monthly"),
    entry("/es/partnership", 0.8, "monthly"),
    entry("/scholarships", 0.8, "monthly"),
    entry("/es/scholarships", 0.75, "monthly"),
    entry("/es/internships", 0.75, "monthly"),
    entry("/mission", 0.75, "monthly"),
    entry("/es/mission", 0.7, "monthly"),
    entry("/verify", 0.7, "monthly"),
    entry("/es/verify", 0.65, "monthly"),
    entry("/roadmap", 0.65, "monthly"),
    entry("/es/roadmap", 0.6, "monthly"),
    entry("/enroll", 0.9, "weekly"),
    entry("/catalog", 0.9, "weekly"),
    entry("/partnership/apply", 0.85, "monthly"),
    entry("/register", 0.7, "monthly"),
    entry("/login", 0.6, "monthly"),
  ];

  for (const program of NOVA_PROGRAM_CATALOG) {
    routes.push(entry(`/enroll/${program.slug}`, 0.85, "weekly"));
  }

  for (const elective of novaSchoolElectives) {
    routes.push(entry(`/school/${elective.slug}`, 0.8, "monthly"));
    routes.push(entry(`/es/school/${elective.slug}`, 0.75, "monthly"));
  }

  for (const track of novaCollegeCourses) {
    routes.push(entry(`/college/${track.slug}`, 0.85, "monthly"));
    routes.push(entry(`/es/college/${track.slug}`, 0.8, "monthly"));
  }

  for (const course of novaLanguageCourses) {
    routes.push(entry(`/language/${course.slug}`, 0.85, "monthly"));
    routes.push(entry(`/es/language/${course.slug}`, 0.8, "monthly"));
    routes.push(entry(`/pt/language/${course.slug}`, 0.75, "monthly"));
  }

  for (const product of novaShopProducts) {
    routes.push(entry(`/shop/${product.slug}`, 0.8, "weekly"));
    routes.push(entry(`/es/shop/${product.slug}`, 0.75, "weekly"));
  }

  return routes;
}
