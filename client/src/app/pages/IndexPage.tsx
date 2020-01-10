import React from 'react'

import { PersonList } from '../components/person/PersonList'
import { AddPersonForm } from '../components/person/AddPersonForm'

interface Props {
  persons: readonly PersonType[]
  onAddPerson: (firstName: string, lastName: string) => void
  onRemovePerson: (uuid: string) => void
}

interface PersonType {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

export function IndexPage({ persons, onAddPerson, onRemovePerson }: Props) {
  const hireablePersons = persons.filter(isHireable)
  const notHireablePersons = persons.filter(person => !isHireable(person))

  return (
    <div>
      <header>
        <h1>Nyt koodataan!</h1>

        <h2>Tässä lista ihmisistä:</h2>
      </header>

      <h3>Lisää henkilö</h3>

      <AddPersonForm onAddPerson={onAddPerson} />

      <h3>Ehkä palkataan?</h3>

      <PersonList persons={hireablePersons} showStats onRemove={onRemovePerson} />

      <h3>No ei ainakaan palkata</h3>

      <PersonList persons={notHireablePersons} onRemove={onRemovePerson} />
    </div>
  )
}

interface IsHireablePerson {
  age: number
}

function isHireable(person: IsHireablePerson) {
  return person.age > 16
}
