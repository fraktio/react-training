import React from 'react'
import { AddPersonForm } from './AddPersonForm'
import { PersonList, ListPerson } from './PersonList'

interface Props {
  persons: PersonType[]
  onAddPerson: (firstName: string, lastName: string) => void
  onDeletePerson: (uuid: string) => void
}

interface PersonType extends ListPerson {
  age: number
}

export function IndexPage({
  persons,
  onAddPerson,
  onDeletePerson
}: Props) {
  const filterHireable = (person: { age: number }) =>
    person.age > 16

  const hireablePersons = persons.filter(filterHireable)
  const notHireablePersons = persons.filter(
    person => !filterHireable(person)
  )

  return (
    <div>
      <header>
        <h1>Mahti rekrysovellus!</h1>
      </header>

      <AddPersonForm onAdd={onAddPerson} />

      <h2>Ehkä palkataan</h2>
      <PersonList
        persons={hireablePersons}
        showStats
        onDelete={onDeletePerson}
      />

      <h2>No ei ainakaan palkata</h2>
      <PersonList
        persons={notHireablePersons}
        onDelete={onDeletePerson}
      />
    </div>
  )
}
