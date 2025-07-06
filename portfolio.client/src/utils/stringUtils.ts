export const isNullOrWhiteSpace = (str?: string | null) =>
  typeof str !== "string" || str.trim().length === 0;