import { redirect } from "next/navigation";

/** Immersive quests are reached via Explore Now inside each Mission Path. */
export default function ExperiencesPage() {
  redirect("/courses");
}
