import { Global } from '@emotion/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import backgroundImage from '../assets/social_media_recruitment.png'
import { useSelector } from '../ducks'
import { getPersons } from '../personService'

import { AddPersonForm, Data } from './AddPersonForm'
import { useDarkMode, useToggleDarkMode } from './ModeContext'
import { PersonList } from './PersonList'

export function App() {
  const isDark = useDarkMode()
  const onToggleDark = useToggleDarkMode()
  const { persons, isLoading, isError, onRemovePerson, onAddPerson } =
    usePersonsQuery()

  const hireable = (person: { age: number }) => person.age > 18

  const hireablePersons = persons.filter(hireable)
  const nonHireablePersons = persons.filter((person) => !hireable(person))

  useEffect(() => {
    document.title = isDark ? 'Dark mode' : 'Light mode'
  }, [isDark])

  const handleSubmit = (data: Data) => {
    onAddPerson(data.firstName, data.lastName)
  }

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

        <AddPersonForm onSubmit={handleSubmit} />

        {isLoading && <div>Loading...</div>}

        {isError && <div>Oops. Something went wrong!</div>}

        {!isLoading && (
          <>
            <PersonList
              title="Maybe hireable persons"
              persons={hireablePersons}
              showStats
              onRemovePerson={onRemovePerson}
            />

            <PersonList
              title="Not gonna hire persons"
              persons={nonHireablePersons}
              onRemovePerson={onRemovePerson}
            />
          </>
        )}
      </div>
    </>
  )
}

function usePersonsQuery() {
  const state = useSelector((state) => state.person)

  const { persons, isLoading, isError } = state
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'FETCH_PERSONS' })

      try {
        const response = await getPersons()

        dispatch({
          type: 'FETCH_PERSONS_SUCCESS',
          payload: { persons: response.data.persons }
        })
      } catch (e) {
        dispatch({ type: 'FETCH_PERSONS_FAILURE' })
      }
    }

    fetchData()
  }, [dispatch])

  const handleRemovePerson = (personUuid: string) => {
    dispatch({ type: 'REMOVE_PERSON', payload: { personUuid } })
  }

  const handleAddPerson = (firstName: string, lastName: string) => {
    dispatch({ type: 'ADD_PERSON', payload: { firstName, lastName } })
  }

  return {
    persons,
    isLoading,
    isError,
    onRemovePerson: handleRemovePerson,
    onAddPerson: handleAddPerson
  }
}
