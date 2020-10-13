import React, { useEffect, useState } from 'react'
import { Global } from '@emotion/core'

import image from '../assets/social_media_recruitment.png'
import { getPersons } from '../personService'
import { PersonList } from './PersonList'

interface Props {
  isDark: boolean
  onToggleDarkMode: () => void
}

interface StatePerson {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

export function App({ isDark, onToggleDarkMode }: Props) {
  const [persons, setPersons] = useState<StatePerson[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getPersons()

        setPersons(response.data.persons)
        setIsLoading(false)
      } catch (e) {
        setIsError(true)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleRemovePerson = (uuid: string) => {
    setPersons(
      persons.filter((person) => person.uuid !== uuid)
    )
  }

  const hireablePersons = persons.filter(
    (person) => person.age > 16
  )

  const nonHireablePersons = persons.filter(
    (person) => person.age <= 16
  )

  return (
    <>
      <Global
        styles={{
          body: {
            background: isDark ? '#666' : `url(${image})`
          }
        }}
      />

      <div>
        <header>
          <h1>Welcome to Fraktio's React training!</h1>
        </header>

        <button onClick={onToggleDarkMode}>
          {isDark ? (
            <>Light mode päälle</>
          ) : (
            <>Dark mode päälle</>
          )}
        </button>

        {isLoading && <div>Loading...</div>}

        {isError && <div>Hups! Virhe.</div>}

        {!isLoading && !isError && (
          <>
            <h2>Hireable persons:</h2>
            <PersonList
              persons={hireablePersons}
              showStats
              onRemovePerson={handleRemovePerson}
            />

            <h2>Non-hireable persons:</h2>
            <PersonList
              persons={nonHireablePersons}
              onRemovePerson={handleRemovePerson}
            />
          </>
        )}
      </div>
    </>
  )
}
