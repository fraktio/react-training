import React from 'react'

import { Person, PersonType } from './Person'

interface Props {
  title: string
  persons: Person[]
  onDelete: (uuid: string) => void
  showStats?: boolean
}

interface Person extends PersonType {
  uuid: string
  age: number
}

export function PersonList({
  title,
  persons,
  onDelete,
  showStats = false
}: Props) {
  const numberOfPersons = persons.length

  const averageAge =
    persons.reduce((sumOfPreviousIterations, person) => {
      return sumOfPreviousIterations + person.age
    }, 0) / numberOfPersons

  return (
    <>
      <h2>{title}</h2>

      {showStats && (
        <div>
          <p>Henkilöiden määrä: {numberOfPersons}</p>
          <p>Keski-ikä: {averageAge}</p>
        </div>
      )}

      <ul>
        {persons.map(person => (
          <li key={person.uuid}>
            <Person person={person} onDelete={() => onDelete(person.uuid)} />
          </li>
        ))}
      </ul>
    </>
  )
}
