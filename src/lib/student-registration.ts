/** Grade levels for NOVA School & College registration */
export const GRADE_LEVELS = [
  { value: "k-5", label: "Elementary (K–5)" },
  { value: "6-8", label: "Middle School (6–8)" },
  { value: "9-10", label: "High School (9–10)" },
  { value: "11-12", label: "High School (11–12)" },
  { value: "college-freshman", label: "College — 1st year" },
  { value: "college-sophomore", label: "College — 2nd year" },
  { value: "college-junior", label: "College — 3rd year" },
  { value: "college-senior", label: "College — 4th year" },
  { value: "adult-learner", label: "Adult learner (18+)" },
] as const;

export const GENDER_VALUES = ["female", "male", "prefer-not-to-say"] as const;

export type GenderValue = (typeof GENDER_VALUES)[number];

export const GENDER_OPTIONS: { value: GenderValue; label: string }[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export const HOW_HEARD_OPTIONS = [
  { value: "school", label: "My school / teacher" },
  { value: "social", label: "Social media" },
  { value: "friend", label: "Friend or family" },
  { value: "search", label: "Web search" },
  { value: "event", label: "Event or workshop" },
  { value: "other", label: "Other" },
] as const;

export const PREFERRED_LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "pt", label: "Português" },
] as const;
