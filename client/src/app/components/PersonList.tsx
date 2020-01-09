import React from 'react'

import { Person, PersonType } from './Person'

interface Props {
  persons: ListPerson[]
  onRemove: (uuid: string) => void
  showStats?: boolean
}

type ListPerson = PersonType & {
  age: number
}

export function PersonList({ persons, onRemove, showStats = false }: Props) {
  const averageAge =
    persons.reduce((acc, person) => {
      return acc + person.age
    }, 0) / persons.length

  return (
    <>
      {showStats && (
        <div>
          <p>henkilöiden määrä: {persons.length}</p>
          <p>keski-ikä: {averageAge.toFixed(1)}</p>
        </div>
      )}

      <ul>
        {persons.map(person => (
          <li key={person.uuid}>
            <Person person={person} onRemove={() => onRemove(person.uuid)} />
          </li>
        ))}
      </ul>
    </>
  )
}
