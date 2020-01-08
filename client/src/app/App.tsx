import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { IndexPage, PersonPage, NotFoundPage } from './pages'
import { getPersons, Person as PersonResponse } from './services/personService'

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

  const handleAddPerson = (firstName: string, lastName: string) => {
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

  return (
    <>
      <header>
        <h1>Welcome to Fraktio's React training!</h1>
      </header>

      {isLoading && <div>Loading..</div>}

      {isError && <div>Oops! Something went wrong.</div>}

      {!isLoading && !isError && (
        <Router>
          <Switch>
            <Route exact path="/">
              <IndexPage
                isDark={isDark}
                onToggleDark={onToggleDark}
                persons={persons}
                onAddPerson={handleAddPerson}
                onRemovePerson={handleRemovePerson}
              />
            </Route>

            <Route path="/person/:uuid">
              {(props) => {
                const { match } = props

                if (match?.params.uuid) {
                  const person = persons.find((person) => person.uuid === match.params.uuid)

                  if (person) {
                    return <PersonPage person={person} />
                  }

                  return <NotFoundPage />
                }

                return null
              }}
            </Route>

            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  )
}
