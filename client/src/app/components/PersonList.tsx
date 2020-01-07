/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'

import { Person, PersonType } from './Person'

interface Props {
  persons: Array<PersonType>
  showStats?: boolean
}

export function PersonList({ persons, showStats }: Props) {
  const averageAge =
    persons.reduce((acc, person) => {
      return acc + person.age
    }, 0) / persons.length

  return (
    <Fragment>
      {showStats && (
        <div>
          Number of people: {persons.length}. Average age: {averageAge}.
        </div>
      )}

      <ul>
        {persons.map((person) => (
          <li key={person.uuid}>
            <Person person={person} />
          </li>
        ))}
      </ul>
    </Fragment>
  )
}
