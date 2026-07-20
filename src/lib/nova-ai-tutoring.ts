/**
 * Public release switch for the unfinished tutoring classroom.
 *
 * This is deliberately opt-in: an unset or invalid value keeps the classroom
 * private while preserving the implementation for explicit local testing.
 */
export const isNovaAiTutoringEnabled =
  process.env.NEXT_PUBLIC_NOVA_AI_TUTORING_ENABLED === "true";
