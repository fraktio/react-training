import React, { useEffect, useState } from 'react'
import { Global } from '@emotion/core'
import uuidv4 from 'uuid/v4'
import { ThemeProvider } from 'emotion-theming'

import { getPersons } from '../services/personService'
import image from '../assets/social_media_recruitment.png'
import { PersonList } from './PersonList'
import { AddPersonForm } from './AddPersonForm'

interface PersonType {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

const theme = {
  spacing: {
    medium: 8
  }
}

export function App() {
  const [persons, setPersons] = useState<Array<PersonType>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      const response = await getPersons()

      if (response.success) {
        setPersons(response.value.data.persons)

        setIsError(false)
      } else {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleRemove = (uuid: string) => {
    setPersons(persons.filter(person => person.uuid !== uuid))
  }

  const handleAddPerson = (firstName: string, lastName: string) => {
    setPersons(
      persons.concat({
        firstName,
        lastName,
        age: 35,
        uuid: uuidv4()
      })
    )
  }

  const hireablePersons = persons.filter(isHireable)
  const notHireablePersons = persons.filter(person => !isHireable(person))

  return (
    <>
      <Global
        styles={{
          body: {
            backgroundImage: `url(${image})`
          }
        }}
      />

      <ThemeProvider theme={theme}>
        <div>
          <header>
            <h1>Nyt koodataan!</h1>

            <h2>Tässä lista ihmisistä:</h2>
          </header>

          <h3>Lisää henkilö</h3>

          <AddPersonForm onAddPerson={handleAddPerson} />

          {isLoading && <div>Loading...</div>}

          {isError && <div>Hups! Jotain meni vikaan.</div>}

          {!isError && !isLoading && (
            <>
              <h3>Ehkä palkataan?</h3>

              <PersonList persons={hireablePersons} showStats onRemove={handleRemove} />

              <h3>No ei ainakaan palkata</h3>

              <PersonList persons={notHireablePersons} onRemove={handleRemove} />
            </>
          )}
        </div>
      </ThemeProvider>
    </>
  )
}

interface IsHireablePerson {
  age: number
}

function isHireable(person: IsHireablePerson) {
  return person.age > 16
}
