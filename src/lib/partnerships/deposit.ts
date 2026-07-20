type DepositInput = {
  contractTerm?: string | null;
  estimatedStudents: number;
  budgetRange?: string | null;
};

/** Pilot / licensing deposit in USD cents — admin may adjust on approval. */
export function estimatePartnershipDepositCents(app: DepositInput): number {
  if (app.contractTerm === "pilot") return 50_000;
  if (app.contractTerm === "annual") return 250_000;
  if (app.contractTerm === "multi-year") return 500_000;

  if (app.budgetRange === "under-10k") return 50_000;
  if (app.budgetRange === "10k-25k") return 150_000;
  if (app.budgetRange === "25k-50k") return 250_000;
  if (app.budgetRange === "50k-plus") return 500_000;

  if (app.estimatedStudents <= 50) return 50_000;
  if (app.estimatedStudents <= 200) return 150_000;
  return 250_000;
}

export function buildPartnershipReference(applicationId: string): string {
  return `NOVA-PART-${applicationId.slice(-8).toUpperCase()}`;
}
