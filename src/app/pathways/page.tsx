import { redirect } from "next/navigation";

/** Legacy route — mission paths live at /courses */
export default function PathwaysPage() {
  redirect("/courses");
}
