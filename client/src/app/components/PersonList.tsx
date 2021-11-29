import { Person, PersonType } from './Person'

type Props = {
  title: string
  persons: PersonListItem[]
  showStats?: boolean
  onRemovePerson: (uuid: string) => void
}

export type PersonListItem = {
  uuid: string
} & PersonType

export function PersonList({
  persons,
  title,
  onRemovePerson,
  showStats = false
}: Props) {
  const shouldShowStats = showStats && persons.length > 0
  const avgAge = shouldShowStats
    ? persons.reduce((prev, person) => {
        return prev + person.age
      }, 0) / persons.length
    : 0

  const handleRemovePerson = (uuid: string) => () =>
    onRemovePerson(uuid)

  return (
    <>
      <h2>{title}</h2>
      {shouldShowStats && (
        <>
          <p>Count: {persons.length}</p>
          <p>Average age: {avgAge.toFixed(2)}</p>
        </>
      )}
      <ul>
        {persons.map((person) => (
          <li key={person.uuid}>
            <Person
              person={person}
              onRemovePerson={handleRemovePerson(
                person.uuid
              )}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
