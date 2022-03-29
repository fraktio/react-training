type Person = {
  firstName: string
  lastName: string
  experience: number
}

export function filterPeople<T extends Person>(
  people: T[],
  experience: number,
  name: string
): T[] {
  const lowerCasedName = name.toLowerCase()

  return people.filter(
    (person) =>
      person.experience >= experience &&
      (`${person.firstName} ${person.lastName}`
        .toLowerCase()
        .includes(lowerCasedName) ||
        `${person.lastName} ${person.firstName}`
          .toLowerCase()
          .includes(lowerCasedName))
  )
}
