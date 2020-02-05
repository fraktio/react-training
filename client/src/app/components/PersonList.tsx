import React from 'react'

import { Person, PersonType } from './Person'

interface Props {
  persons: ListPerson[]
  showStats?: boolean
  onDelete: (uuid: string) => void
}

export interface ListPerson extends PersonType {
  uuid: string
}

export function PersonList({
  persons,
  showStats,
  onDelete
}: Props) {
  const numberOfPersons = persons.length

  const averageAge =
    persons.reduce((resultOfPreviousIterations, person) => {
      return resultOfPreviousIterations + person.age
    }, 0) / numberOfPersons

  const handleDeletePerson = (uuid: string) => () => {
    onDelete(uuid)
  }

  return (
    <>
      {showStats && (
        <div>
          Henkilöiden määrä: {numberOfPersons}, Keski-ikä:{' '}
          {averageAge}
        </div>
      )}

      <ul>
        {persons.map(person => (
          <li key={person.uuid}>
            <Person
              person={person}
              onDelete={handleDeletePerson(person.uuid)}
            />
          </li>
        ))}
      </ul>
    </>
  )
}
