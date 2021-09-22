import { Global } from '@emotion/react'
import { useEffect, useState } from 'react'

import backgroundImage from '../assets/social_media_recruitment.png'
import { getPersons } from '../personService'

import {
  PersonListItem,
  Person as PersonListItemPerson
} from './PersonListItem'

type Props = {
  isDark: boolean
  onToggleDark: () => void
}

type Person = {
  uuid: string
} & PersonListItemPerson

export function App({ isDark, onToggleDark }: Props) {
  const [persons, setPersons] = useState<Person[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    document.title = isDark ? 'Dark mode' : 'Light mode'
  }, [isDark])

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      try {
        const response = await getPersons()

        setPersons(response.data.persons)
        setIsError(false)
      } catch (e) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      <Global
        styles={{
          html: { background: isDark ? '#666' : `url(${backgroundImage})` }
        }}
      />

      <div>
        <header>
          <h1>Epic recruitment app!</h1>
        </header>

        <button onClick={onToggleDark}>
          {isDark ? <>Set light</> : <>Set dark</>}
        </button>

        {isLoading && <div>Loading...</div>}

        {isError && <div>Oops. Something went wrong!</div>}

        {persons.length > 0 && (
          <ul>
            {persons.map((person) => (
              <li key={person.uuid}>
                <PersonListItem person={person} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
