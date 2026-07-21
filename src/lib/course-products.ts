import { db } from "@/lib/db";

/** Default tuition (USD cents) keyed by course slug — mirrors catalog.ts */
const DEFAULT_PRICES_CENTS: Record<string, number> = {
  "intro-python-ai": 24900,
  "robotics-engineering": 24900,
  "iot-smart-systems": 24900,
};

export async function getCourseProduct(courseId: string) {
  return db.courseProduct.findUnique({ where: { courseId } });
}

export async function getCourseProductBySlug(slug: string) {
  const course = await db.course.findUnique({
    where: { slug },
    include: { product: true },
  });
  return course ? { course, product: course.product } : null;
}

export async function ensureCourseProduct(
  courseId: string,
  slug: string,
  priceCentsOverride?: number,
) {
  const existing = await db.courseProduct.findUnique({ where: { courseId } });
  if (existing) return existing;

  const priceCents = priceCentsOverride ?? DEFAULT_PRICES_CENTS[slug];
  if (priceCents === undefined) {
    throw new Error(`No canonical price configured for course: ${slug}`);
  }

  return db.courseProduct.upsert({
    where: { courseId },
    update: {},
    create: { courseId, priceCents, currency: "usd" },
  });
}

export async function getAllCourseProducts() {
  return db.courseProduct.findMany({
    where: { active: true },
    include: { course: { select: { id: true, slug: true, title: true } } },
  });
}
