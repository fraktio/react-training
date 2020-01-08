import React from 'react'

import { PersonContainer } from '../components/person/styles'

interface Props {
  person: Person
}

interface Person {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

export function PersonPage({ person }: Props) {
  return (
    <PersonContainer>
      <ul>
        <li>id: {person.uuid}</li>
        <li>
          name: {person.firstName} {person.lastName}
        </li>
        <li>age: {person.age.toFixed(1)}</li>
      </ul>
    </PersonContainer>
  )
}
