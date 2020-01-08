import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { IndexPage, PersonPage, NotFoundPage } from './pages'
import { getPersons } from './services/personService'
import { useSelector } from './ducks'

interface Props {
  isDark: boolean
  onToggleDark: () => void
}

export function App({ isDark, onToggleDark }: Props) {
  const dispatch = useDispatch()
  const { persons, isLoading, isError } = useSelector((state) => state.person)

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'FETCH_PERSONS' })

      const response = await getPersons()

      if (response.success) {
        dispatch({
          type: 'FETCH_PERSONS_SUCCESS',
          payload: { response: response.value }
        })
      } else {
        dispatch({ type: 'FETCH_PERSONS_FAILURE' })
      }
    }

    fetchData()
  }, [dispatch])

  const handleRemovePerson = (uuid: string) => {
    dispatch({ type: 'REMOVE_PERSON', payload: { uuid } })
  }

  const handleAddPerson = (firstName: string, lastName: string) => {
    dispatch({ type: 'ADD_PERSON', payload: { firstName, lastName } })
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
