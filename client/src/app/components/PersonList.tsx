import React from 'react'

import { Person, PersonType } from './Person'

interface Props {
  persons: Person[]
  showStats?: boolean
  onRemovePerson: (uuid: string) => void
}

type Person = {
  uuid: string
} & PersonType

export function PersonList({
  persons,
  showStats = false,
  onRemovePerson
}: Props) {
  const averageAge =
    persons.reduce((acc, person) => {
      return acc + person.age
    }, 0) / persons.length

  return (
    <>
      {showStats && (
        <header>
          <p>Persons count: {persons.length}</p>
          <p>
            Average age:{' '}
            {!isNaN(averageAge) ? averageAge : '-'}
          </p>
        </header>
      )}

      {persons.map((person) => (
        <div key={person.uuid}>
          <Person
            person={person}
            onRemove={() => onRemovePerson(person.uuid)}
          />
        </div>
      ))}
    </>
  )
}
