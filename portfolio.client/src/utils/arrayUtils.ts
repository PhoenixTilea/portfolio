export const intersection = <T>(a: T[], b: T[]): T[] =>
  a.filter(value => b.includes(value));

export const uniqueInFirst = <T>(a: T[], b: T[]): T[] =>
  a.filter(value => !b.includes(value));