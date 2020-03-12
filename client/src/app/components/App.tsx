import React, { useEffect, useReducer, createContext } from 'react'
import { Global } from '@emotion/core'
import uuid from 'uuid'

import { getPersons } from '../api/personApi'
import image from '../assets/social_media_recruitment.png'
import { PersonList } from './PersonList'
import { AddPersonForm } from './AddPersonForm'

export const Context = createContext()

interface Props {
  isDark: boolean
  onToggleDarkMode: () => void
}

interface Person {
  firstName: string
  lastName: string
  age: number
  uuid: string
}

interface State {
  persons: Person[]
  isLoading: boolean
  isError: boolean
}

const initialState: State = {
  persons: [],
  isLoading: true,
  isError: false
}

type Action =
  | {
      type: 'GET_PERSONS'
    }
  | {
      type: 'GET_PERSONS_SUCCESS'
      payload: { persons: Person[] }
    }
  | {
      type: 'GET_PERSONS_FAILURE'
    }
  | {
      type: 'ADD_PERSON'
      payload: {
        person: Person
      }
    }
  | {
      type: 'REMOVE_PERSON'
      payload: {
        uuid: string
      }
    }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'GET_PERSONS':
      return {
        ...state,
        isLoading: true,
        isError: false
      }

    case 'GET_PERSONS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        persons: action.payload.persons
      }

    case 'GET_PERSONS_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      }

    case 'ADD_PERSON':
      return {
        ...state,
        persons: state.persons.concat(action.payload.person)
      }

    case 'REMOVE_PERSON':
      return {
        ...state,
        persons: state.persons.filter(
          person => person.uuid !== action.payload.uuid
        )
      }
  }
}

export function App({ isDark, onToggleDarkMode }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { persons, isLoading, isError } = state

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: 'GET_PERSONS' })

        const response = await getPersons()

        dispatch({
          type: 'GET_PERSONS_SUCCESS',
          payload: {
            persons: response.data.persons
          }
        })
      } catch (e) {
        dispatch({ type: 'GET_PERSONS_FAILURE' })
      }
    }

    fetchData()
  }, [])

  const handleDeletePerson = (uuid: string) => {
    dispatch({ type: 'REMOVE_PERSON', payload: { uuid } })
  }

  const handleAddPerson = (firstName: string, lastName: string) => {
    const person = {
      firstName,
      lastName,
      uuid: uuid(),
      age: 30
    }

    dispatch({ type: 'ADD_PERSON', payload: { person } })
  }

  const filterHireable = (person: { age: number }) =>
    person.age > 16 && person.age < 70

  const hireablePersons = persons.filter(filterHireable)
  const nonHireablePersons = persons.filter(person => !filterHireable(person))

  return (
    <Context.Provider value={{ state }}>
      <div>
        <Global
          styles={{
            body: {
              backgroundImage: `url(${image})`
            }
          }}
        />

        <header>
          <h1>Pupen mahtirekrysovellus!</h1>

          {isDark && <button onClick={onToggleDarkMode}>White mode</button>}

          {!isDark && <button onClick={onToggleDarkMode}>Dark mode</button>}
        </header>

        <AddPersonForm onSubmit={handleAddPerson} />

        {isLoading && <p>Loading...</p>}

        {isError && <p>Hups. Jotain meni vikaan!</p>}

        <PersonList
          title="Ehkä palkattavat henkilöt"
          persons={hireablePersons}
          onDelete={handleDeletePerson}
          showStats
        />

        <PersonList
          title="Ei palkattavat henkilöt"
          persons={nonHireablePersons}
          onDelete={handleDeletePerson}
        />
      </div>
    </Context.Provider>
  )
}
