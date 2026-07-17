import type { Metadata } from "next";

import Link from "next/link";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/layout/dashboard-shell";

import { StatCard } from "@/components/ui/stat-card";

import { ProgressBar } from "@/components/ui/progress-bar";

import { CourseCard } from "@/components/courses/course-card";

import {

  getUserEnrollments,

  getPublishedCourses,

  getFirstIncompleteLessonUrl,

} from "@/lib/courses";

import { PATHWAY_META, getPathwayMeta } from "@/lib/pathways/meta";

import { db } from "@/lib/db";

import { ArrowRight, Compass, Map, Sparkles } from "lucide-react";



export const metadata: Metadata = {

  title: "Explorer Portal — NOVA",

};



export default async function StudentDashboardPage() {

  const session = await auth();

  if (!session?.user) redirect("/login");



  const [enrollments, publishedCourses, experienceProgress] = await Promise.all([

    getUserEnrollments(session.user.id),

    getPublishedCourses(),

    db.experienceProgress.findMany({ where: { userId: session.user.id } }),

  ]);



  const enrolledSlugs = new Set(enrollments.map((e) => e.course.slug));

  const lessonsCompleted = enrollments.reduce((acc, e) => acc + e.completedLessons, 0);

  const exploreCompletions = experienceProgress.filter((p) => p.completedAt).length;



  const exploreProgress = (slug: string) =>

    experienceProgress.find((p) => p.experienceSlug === slug);



  const inProgressEnrollments = enrollments

    .filter((e) => e.progress > 0 && e.progress < 100)

    .sort((a, b) => b.progress - a.progress);



  const activeEnrollment =

    inProgressEnrollments[0] ?? enrollments.find((e) => e.progress < 100);



  const continueLessonUrl = activeEnrollment

    ? await getFirstIncompleteLessonUrl(

        session.user.id,

        activeEnrollment.course.slug,

        activeEnrollment.course.id

      )

    : null;



  const inProgressExperience = experienceProgress.find((p) => !p.completedAt);

  const inProgressMeta = inProgressExperience

    ? Object.values(PATHWAY_META).find(

        (m) => m.experienceSlug === inProgressExperience.experienceSlug

      )

    : undefined;



  const unenrolledCourse = publishedCourses.find((c) => !enrolledSlugs.has(c.slug));



  type NextAction = {

    title: string;

    description: string;

    href: string;

    cta: string;

    icon: "path" | "explore" | "discover";

  };



  const nextActions: NextAction[] = [];



  if (activeEnrollment && continueLessonUrl) {

    nextActions.push({

      title: `Continue ${activeEnrollment.course.title}`,

      description: `${activeEnrollment.progress}% complete · ${activeEnrollment.totalLessons - activeEnrollment.completedLessons} missions left`,

      href: continueLessonUrl,

      cta: "Launch next mission",

      icon: "path",

    });

  }



  if (inProgressExperience && inProgressMeta) {

    nextActions.push({

      title: `Resume ${inProgressMeta.experienceTitle}`,

      description: `Explore Now · stage ${inProgressExperience.currentStage + 1} of 8`,

      href: `/experiences/${inProgressExperience.experienceSlug}`,

      cta: "Resume quest",

      icon: "explore",

    });

  } else if (!inProgressExperience) {

    const startMeta = Object.values(PATHWAY_META).find(

      (m) => !exploreProgress(m.experienceSlug)

    );

    if (startMeta) {

      nextActions.push({

        title: `Start ${startMeta.experienceTitle}`,

        description: "Jump into an immersive Explore Now intro quest",

        href: `/experiences/${startMeta.experienceSlug}`,

        cta: "Begin quest",

        icon: "explore",

      });

    }

  }



  if (unenrolledCourse && nextActions.length < 3) {

    nextActions.push({

      title: `Enroll in ${unenrolledCourse.title}`,

      description: "Begin a new Mission Path adventure",

      href: `/courses/${unenrolledCourse.slug}`,

      cta: "View path",

      icon: "discover",

    });

  }



  if (nextActions.length === 0) {

    nextActions.push({

      title: "Explore Mission Paths",

      description: "Discover your next NOVA adventure",

      href: "/courses",

      cta: "Browse paths",

      icon: "discover",

    });

  }



  const actionIcons = {

    path: Map,

    explore: Sparkles,

    discover: Compass,

  };



  return (

    <DashboardShell user={session.user}>

      <div className="mb-8">

        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-nova-cyan">

          Explorer Portal

        </p>

        <h1 className="text-2xl font-bold text-white">

          Welcome back, {session.user.firstName}! ✦

        </h1>

        <p className="mt-1 text-nova-cyan-light/80">

          Your mission command center — track progress, pick up where you left off, and launch

          what&apos;s next.

        </p>

      </div>



      <div className="mb-8 grid gap-4 sm:grid-cols-3">

        <StatCard label="Active Mission Paths" value={enrollments.length} icon="book" />

        <StatCard

          label="Missions Completed"

          value={lessonsCompleted}

          icon="trophy"

          accent="orange"

        />

        <StatCard

          label="Explore Now Completions"

          value={exploreCompletions}

          icon="graduation"

          accent="green"

        />

      </div>



      <section className="mb-10">

        <h2 className="mb-4 text-lg font-semibold text-white">What&apos;s Next</h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {nextActions.slice(0, 3).map((action) => {

            const Icon = actionIcons[action.icon];

            return (

              <Link

                key={action.href + action.title}

                href={action.href}

                className="nova-card group flex flex-col border-nova-cyan/10 transition hover:border-nova-cyan/30 hover:shadow-nova"

              >

                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nova-cyan/20 to-nova-blue/10 text-nova-blue">

                  <Icon className="h-5 w-5" />

                </div>

                <h3 className="font-semibold text-white group-hover:text-nova-cyan">

                  {action.title}

                </h3>

                <p className="mt-1 flex-1 text-sm text-nova-cyan-light/80">{action.description}</p>

                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-nova-cyan">

                  {action.cta}

                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />

                </span>

              </Link>

            );

          })}

        </div>

      </section>



      {enrollments.length > 0 && (

        <section className="mb-10">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-lg font-semibold text-white">Mission Path Progress</h2>

            <Link href="/courses" className="text-sm font-medium text-nova-cyan hover:underline">

              Find more paths →

            </Link>

          </div>

          <div className="space-y-3">

            {enrollments.map((enrollment) => {

              const remaining = enrollment.totalLessons - enrollment.completedLessons;

              return (

                <div key={enrollment.id} className="nova-card">

                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">

                    <div>

                      <Link

                        href={`/courses/${enrollment.course.slug}`}

                        className="font-semibold text-white hover:text-nova-cyan"

                      >

                        {enrollment.course.title}

                      </Link>

                      <p className="mt-0.5 text-sm text-nova-cyan-light/80">

                        {enrollment.completedLessons} of {enrollment.totalLessons} missions done

                        {remaining > 0 && ` · ${remaining} remaining`}

                        {remaining === 0 && " · Path complete!"}

                      </p>

                    </div>

                    <span className="text-lg font-bold text-nova-blue">{enrollment.progress}%</span>

                  </div>

                  <ProgressBar value={enrollment.progress} />

                </div>

              );

            })}

          </div>

        </section>

      )}



      <section className="mb-10">

        <h2 className="mb-4 text-lg font-semibold text-white">Explore Now Status</h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {Object.values(PATHWAY_META).map((meta) => {

            const prog = exploreProgress(meta.experienceSlug);

            let status = "Not started";

            let statusClass = "text-nova-cyan-light/80 bg-white/10";

            if (prog?.completedAt) {

              status = "Complete";

              statusClass = "text-nova-green bg-nova-green/10";

            } else if (prog) {

              status = `In progress · stage ${prog.currentStage + 1}/8`;

              statusClass = "text-nova-cyan bg-nova-cyan/10";

            }



            return (

              <div key={meta.experienceSlug} className="nova-card flex items-center justify-between gap-3">

                <div className="min-w-0">

                  <p className="truncate font-medium text-white">{meta.experienceTitle}</p>

                  <p className="text-xs text-nova-cyan-light/80">{meta.badge}</p>

                </div>

                <span

                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClass}`}

                >

                  {status}

                </span>

              </div>

            );

          })}

        </div>

      </section>



      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-lg font-semibold text-white">All Mission Paths</h2>

        <Link href="/courses" className="text-sm font-medium text-nova-cyan hover:underline">

          Browse all paths →

        </Link>

      </div>



      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {publishedCourses.map((course) => {

          const meta = getPathwayMeta(course.slug);

          const enrollment = enrollments.find((e) => e.course.slug === course.slug);

          const expProg = meta ? exploreProgress(meta.experienceSlug) : undefined;



          return (

            <div key={course.id} className="relative">

              {expProg?.completedAt && (

                <span className="absolute -top-2 right-3 z-10 rounded-full bg-nova-green px-2 py-0.5 text-[10px] font-bold uppercase text-white">

                  Explore complete

                </span>

              )}

              <CourseCard

                slug={course.slug}

                title={course.title}

                description={course.description}

                pathway={course.pathway}

                level={course.level}

                progress={enrollment?.progress}

                enrolled={enrolledSlugs.has(course.slug)}

                mentorName={

                  course.mentor

                    ? `${course.mentor.firstName} ${course.mentor.lastName}`

                    : undefined

                }

                experienceSlug={meta?.experienceSlug}

                experienceTitle={meta?.experienceTitle}

              />

              {expProg && !expProg.completedAt && (

                <p className="mt-1 text-center text-xs text-nova-cyan">

                  Explore Now in progress — stage {expProg.currentStage + 1}/8

                </p>

              )}

            </div>

          );

        })}

      </div>

    </DashboardShell>

  );

}


