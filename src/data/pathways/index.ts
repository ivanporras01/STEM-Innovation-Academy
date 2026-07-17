export type { SeedCourse, SeedModule, SeedLesson } from "./types";

export { codingAiCourse } from "./coding-ai";
export { roboticsCourse } from "./robotics";
export { iotCourse } from "./iot";

import { codingAiCourse } from "./coding-ai";
import { roboticsCourse } from "./robotics";
import { iotCourse } from "./iot";
import type { SeedCourse } from "./types";

export const pathwayCourses: SeedCourse[] = [
  codingAiCourse,
  roboticsCourse,
  iotCourse,
];
