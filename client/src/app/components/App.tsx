import React, {
  useEffect,
  useState,
  useCallback,
  useReducer
} from 'react'
import uuid from 'uuid/v4'
import { ThemeProvider } from 'emotion-theming'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { Global } from '@emotion/core'
import backgroundImage from '../assets/social_media_recruitment.png'
import {
  getPersons,
  PersonsResponse
} from '../services/personService'
import { IndexPage } from './IndexPage'
import { PersonPage } from './PersonPage'
import { NotFoundPage } from './NotFoundPage'

interface PersonType {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

const theme = {
  spacing: {
    large: 32,
    medium: 16,
    small: 8
  }
}

interface State {
  persons: PersonType[]
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
  | DeletePersonAction
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

interface DeletePersonAction {
  type: 'DELETE_PERSON'
  payload: {
    uuid: string
  }
}

interface AddPersonAction {
  type: 'ADD_PERSON'
  payload: {
    person: PersonType
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_PERSONS':
      return {
        ...state,
        isLoading: true,
        isError: false
      }

    case 'FETCH_PERSONS_SUCCESS':
      return {
        ...state,
        persons: action.payload.response.data.persons,
        isLoading: false
      }

    case 'FETCH_PERSONS_FAILURE':
      return {
        ...state,
        isError: true,
        isLoading: false
      }

    case 'DELETE_PERSON':
      return {
        ...state,
        persons: state.persons.filter(
          person => person.uuid !== action.payload.uuid
        )
      }

    case 'ADD_PERSON':
      return {
        ...state,
        persons: state.persons.concat(action.payload.person)
      }
  }
}

export function App() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  )
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

  const handleDeletePerson = useCallback((uuid: string) => {
    dispatch({ type: 'DELETE_PERSON', payload: { uuid } })
  }, [])

  const handleAddPerson = (
    firstName: string,
    lastName: string
  ) => {
    dispatch({
      type: 'ADD_PERSON',
      payload: {
        person: {
          uuid: uuid(),
          firstName,
          lastName,
          age: 25
        }
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          body: {
            backgroundImage: `url(${backgroundImage})`
          }
        }}
      />

      {isLoading && <div>Loading..</div>}

      {isError && (
        <div>Hupsista! Yritä kohta uudelleen.</div>
      )}

      {!isLoading && !isError && (
        <Router>
          <Switch>
            <Route exact path="/">
              <IndexPage
                persons={persons}
                onAddPerson={handleAddPerson}
                onDeletePerson={handleDeletePerson}
              />
            </Route>

            <Route path="/persons/:uuid">
              {props => {
                const { match } = props

                if (match?.params) {
                  const uuid = match.params.uuid

                  const person = persons.find(
                    person => person.uuid === uuid
                  )

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
    </ThemeProvider>
  )
}
