// src/utils/minBudget.ts
export const minimumBudgets: Record<string, number> = {
  Tokyo: 80000,
  Paris: 120000,
  London: 100000,
  Goa: 5000,
  Dubai: 60000,
  Bangkok: 30000,
};

export function validateBudget(destination: string, budget: number): string | null {
  const minBudget = minimumBudgets[destination];
  if (minBudget && budget < minBudget) {
    return `⚠️ The minimum realistic budget for ${destination} is ₹${minBudget}. Please increase your budget.`;
  }
  return null;
}
