import React, { useReducer, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { produce } from 'immer'

import { IndexPage, PersonPage, NotFoundPage } from './pages'
import { getPersons, PersonsResponse } from './services/personService'

interface State
  extends Readonly<{
    persons: readonly Person[]
    isLoading: boolean
    isError: boolean
  }> {}

interface Person
  extends Readonly<{
    uuid: string
    firstName: string
    lastName: string
    age: number
  }> {}

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
      return produce(state, (draftState) => {
        draftState.isLoading = true
      })

    case 'FETCH_PERSONS_SUCCESS':
      return produce(state, (draftState) => {
        draftState.persons = action.payload.response.data.persons.map((person) => ({
          uuid: person.uuid,
          firstName: person.firstName,
          lastName: person.lastName,
          age: person.age
        }))
        draftState.isLoading = false
        draftState.isError = false
      })

    case 'FETCH_PERSONS_FAILURE':
      return produce(state, (draftState) => {
        draftState.isLoading = false
        draftState.isError = true
      })

    case 'REMOVE_PERSON':
      return produce(state, (draftState) => {
        draftState.persons = state.persons.filter((person) => person.uuid !== action.payload.uuid)
      })

    case 'ADD_PERSON':
      return produce(state, (draftState) => {
        draftState.persons.push({
          uuid: uuidv4(),
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          age: 40
        })
      })

    default:
      return state
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
