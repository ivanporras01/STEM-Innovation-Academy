import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasCourseAccess } from "@/lib/enrollment-access";
import { courseSlugForProgram } from "@/lib/program-enrollment";
import { getProgramBySlug } from "@/data/courses";

/**
 * Gate college/language catalog lesson routes behind ACTIVE enrollment.
 * Returns LMS course slug when access is granted.
 */
export async function requirePaidProgramAccess(opts: {
  programSlug: string;
  loginCallback: string;
  enrollPath: string;
}): Promise<{ lmsSlug: string }> {
  const program = getProgramBySlug(opts.programSlug);
  if (!program) redirect(opts.enrollPath);

  const lmsSlug = courseSlugForProgram(program);
  const session = await auth();
  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(opts.loginCallback)}`);
  }

  const enrollment = await db.enrollment.findFirst({
    where: {
      userId: session.user.id,
      course: { slug: lmsSlug },
    },
  });

  if (!enrollment || !hasCourseAccess(enrollment)) {
    redirect(opts.enrollPath);
  }

  return { lmsSlug };
}
