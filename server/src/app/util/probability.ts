export function probability(percentage: number): boolean {
  return Math.random() * 100 < percentage
}
