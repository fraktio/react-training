import React, { useReducer, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { IndexPage, PersonPage, NotFoundPage } from './pages'
import { getPersons, PersonsResponse, Person as PersonResponse } from './services/personService'

interface State {
  persons: Array<PersonResponse>
  isLoading: boolean
  isError: boolean
}

const initialState: State = {
  persons: [],
  isLoading: true,
  isError: false
}

type Action =
  | FetchPersonsAction
  | FetchPersonsSuccessAction
  | FetchPersonsFailureAction
  | RemovePersonAction
  | AddPersonAction

interface FetchPersonsAction {
  type: 'FETCH_PERSONS'
}

interface FetchPersonsSuccessAction {
  type: 'FETCH_PERSONS_SUCCESS'
  payload: {
    response: PersonsResponse
  }
}

interface FetchPersonsFailureAction {
  type: 'FETCH_PERSONS_FAILURE'
}

interface RemovePersonAction {
  type: 'REMOVE_PERSON'
  payload: {
    uuid: string
  }
}

interface AddPersonAction {
  type: 'ADD_PERSON'
  payload: {
    firstName: string
    lastName: string
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_PERSONS':
      return {
        ...state,
        isLoading: true
      }

    case 'FETCH_PERSONS_SUCCESS':
      return {
        persons: action.payload.response.data.persons,
        isLoading: false,
        isError: false
      }

    case 'FETCH_PERSONS_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      }

    case 'REMOVE_PERSON':
      return {
        ...state,
        persons: state.persons.filter((person) => person.uuid !== action.payload.uuid)
      }

    case 'ADD_PERSON':
      return {
        ...state,
        persons: state.persons.concat({
          uuid: uuidv4(),
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          age: 40,
          email: 'email@example.com',
          address: {
            streetAddress: 'Street',
            city: 'City'
          }
        })
      }
  }
}

interface Props {
  isDark: boolean
  onToggleDark: () => void
}

export function App({ isDark, onToggleDark }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { persons, isLoading, isError } = state

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
  }, [])

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
