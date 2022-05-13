type Person = {
  firstName: string
  lastName: string
}

export type Order = 'asc' | 'desc'

export function orderPeople<T extends Person>(people: T[], order: Order): T[] {
  return [...people].sort((a, b) => {
    const coefficient = order === 'asc' ? 1 : -1

    return a.lastName + a.firstName > b.lastName + b.firstName
      ? 1 * coefficient
      : -1 * coefficient
  })
}
