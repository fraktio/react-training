import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { IndexPage, PersonPage, NotFoundPage } from '../pages'
import { useDispatch } from 'react-redux'
import { useSelector } from '../ducks'

export function App() {
  const dispatch = useDispatch()
  const state = useSelector(state => state.person)
  const { persons, isLoading, isError } = state

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
      {isLoading && <div>Loading...</div>}

      {isError && <div>Hups! Jotain meni vikaan.</div>}

      {!isError && !isLoading && (
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
              {props => {
                const { match } = props

                if (match?.params.uuid) {
                  const person = persons.find(person => person.uuid === match.params.uuid)

                  if (person) {
                    return <PersonPage person={person} />
                  }
                }

                return <NotFoundPage />
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
