import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { useSelector } from './ducks'
import { IndexPage, PersonPage, NotFoundPage } from './pages'

export function App() {
  const dispatch = useDispatch()
  const { persons, isLoading, isError } = useSelector((state) => state.person)

  useEffect(() => {
    dispatch({ type: 'FETCH_PERSONS' })
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
