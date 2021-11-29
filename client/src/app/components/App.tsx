import { Global } from '@emotion/react'
import { useEffect, useReducer } from 'react'
import { v4 as uuid } from 'uuid'

import background from '../assets/social_media_recruitment.png'
import {
  getPersons,
  PersonsResponse
} from '../services/personService'

import { AddPersonForm } from './AddPersonForm'
import { useDark, useToggleDark } from './DarkModeContext'
import { PersonList, PersonListItem } from './PersonList'

type State = {
  persons: PersonListItem[]
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

type FetchPersonsAction = { type: 'FETCH_PERSONS' }
type FetchPersonsSuccessAction = {
  type: 'FETCH_PERSONS_SUCCESS'
  payload: { response: PersonsResponse }
}
type FetchPersonsFailureAction = {
  type: 'FETCH_PERSONS_FAILURE'
}
type RemovePersonAction = {
  type: 'REMOVE_PERSON'
  payload: { uuid: string }
}
type AddPersonAction = {
  type: 'ADD_PERSON'
  payload: { firstName: string; lastName: string }
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
        isLoading: false,
        isError: false,
        persons: action.payload.response.data.persons
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
        persons: state.persons.filter(
          (person) => person.uuid !== action.payload.uuid
        )
      }

    case 'ADD_PERSON':
      const newPerson = {
        uuid: uuid(),
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        age: Math.random() * 100
      }

      return {
        ...state,
        persons: [newPerson, ...state.persons]
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
        dispatch({
          type: 'FETCH_PERSONS_FAILURE'
        })
      }
    }

    fetchData()
  }, [])

  const hireablePersons = persons.filter(
    (person) => person.age >= 16
  )

  const nonHireablePersons = persons.filter(
    (person) => person.age < 16
  )

  const handleRemovePerson = (uuid: string) => {
    dispatch({ type: 'REMOVE_PERSON', payload: { uuid } })
  }

  const handleAddPerson = (data: {
    firstName: string
    lastName: string
  }) => {
    const { firstName, lastName } = data

    dispatch({
      type: 'ADD_PERSON',
      payload: {
        firstName,
        lastName
      }
    })
  }

  const isDark = useDark()
  const onToggleDark = useToggleDark()

  return (
    <div>
      <Global
        styles={{
          html: {
            background: isDark
              ? '#666'
              : `url(${background})`
          }
        }}
      />

      <button onClick={onToggleDark}>
        {isDark && <>Change to light</>}
        {!isDark && <>Change to dark</>}
      </button>

      <header>
        <h1>Awesome recruitment app!</h1>
      </header>

      <AddPersonForm onSubmit={handleAddPerson} />

      {isLoading && <>Loading...</>}

      {isError && (
        <>
          <h1>Oops!</h1>
          <p>Something went wrong!</p>
        </>
      )}

      <PersonList
        title="Hireable persons"
        persons={hireablePersons}
        onRemovePerson={handleRemovePerson}
        showStats
      />

      <PersonList
        title="Non-hireable persons"
        persons={nonHireablePersons}
        onRemovePerson={handleRemovePerson}
      />
    </div>
  )
}
