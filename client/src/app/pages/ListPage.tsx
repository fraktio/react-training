import React from 'react'

import { Person, PersonType as PersonPersonType } from '../components/Person'

interface Props {
  persons: PersonType[]
  onPersonRemove: (uuid: string) => void
}

type PersonType = PersonPersonType & {
  uuid: string
}

export function ListPage({ persons, onPersonRemove }: Props) {
  return (
    <div>
      <p>Count of persons: {persons.length}</p>

      {persons.map((person) => (
        <Person
          key={person.uuid}
          person={person}
          onRemove={() => onPersonRemove(person.uuid)}
        />
      ))}
    </div>
  )
}
