import {
  PersonListItem,
  Person as PersonListItemPerson
} from './PersonListItem'

type Props = {
  title: string
  persons: Person[]
  showStats?: boolean
  onRemovePerson: (personUuid: string) => void
}

export type Person = {
  uuid: string
} & PersonListItemPerson

export function PersonList({
  title,
  persons,
  showStats = false,
  onRemovePerson
}: Props) {
  const ageSum = persons.reduce((sum, person) => {
    return sum + person.age
  }, 0)

  const averageAge = ageSum / persons.length

  const handleRemovePerson = (personUuid: string) => () => {
    onRemovePerson(personUuid)
  }

  return (
    <>
      <h2>{title}</h2>

      {showStats && (
        <>
          <p>Number or persons: {persons.length}</p>
          <p>Average age: {isNaN(averageAge) ? <>-</> : averageAge}</p>
        </>
      )}

      <ul>
        {persons.map((person) => (
          <li key={person.uuid}>
            <PersonListItem
              person={person}
              onRemovePerson={handleRemovePerson(person.uuid)}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
