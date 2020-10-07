import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { PersonList } from './PersonList'
import { getPersons, Person as PersonResponse } from '../services/personService'
import { AddPersonForm } from './AddPersonForm'

interface Props {
  isDark: boolean
  onToggleDark: () => void
}

export function App({ isDark, onToggleDark }: Props) {
  const [persons, setPersons] = useState<Array<PersonResponse>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      const response = await getPersons()

      if (response.success) {
        setPersons(response.value.data.persons)
      } else {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleRemovePerson = (uuid: string) => {
    setPersons(persons.filter((person) => person.uuid !== uuid))
  }

  const handleSubmit = (firstName: string, lastName: string) => {
    setPersons(
      persons.concat({
        uuid: uuidv4(),
        firstName,
        lastName,
        age: 40,
        email: 'email@example.com',
        address: {
          streetAddress: 'Street',
          city: 'City'
        }
      })
    )
  }

  const hireablePersons = persons.filter(isHireable)
  const notHireablePersons = persons.filter((person) => !isHireable(person))

  return (
    <div>
      <header>
        <h1>Welcome to Fraktio's React training!</h1>

        <h2>Here's your persons:</h2>

        {!isDark && <button onClick={onToggleDark}>Dark mode</button>}

        {isDark && <button onClick={onToggleDark}>White mode</button>}
      </header>

      <section>
        <h3>Add a person to list</h3>

        <AddPersonForm onSubmit={handleSubmit} />
      </section>

      {isLoading && <div>Loading..</div>}

      {isError && <div>Oops! Something went wrong.</div>}

      {!isLoading && !isError && (
        <>
          <section>
            <h3>Hire perhaps?</h3>

            <PersonList persons={hireablePersons} showStats onRemovePerson={handleRemovePerson} />
          </section>

          <section>
            <h3>Not going to hire</h3>

            <PersonList persons={notHireablePersons} onRemovePerson={handleRemovePerson} />
          </section>
        </>
      )}
    </div>
  )
}

interface IsHireablePerson {
  age: number
}

function isHireable(person: IsHireablePerson): boolean {
  return person.age > 16
}
