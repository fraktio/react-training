import React, { useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ListPage } from '../pages/ListPage'
import { PersonPage } from '../pages/PersonPage'
import { getPersons } from '../personService'
import { NotFound } from '../pages/NotFound'

interface Props {
  onChangeTheme: () => void
}

interface Person {
  uuid: string
  firstName: string
  lastName: string
  age: number
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
  | FetchPersonsAction
  | FetchPersonsSuccessAction
  | FetchPersonsFailureAction
  | RemovePerson

interface FetchPersonsAction {
  type: 'FETCH_PERSONS'
}

interface FetchPersonsSuccessAction {
  type: 'FETCH_PERSONS_SUCCESS'
  payload: {
    persons: Person[]
  }
}

interface FetchPersonsFailureAction {
  type: 'FETCH_PERSONS_FAILURE'
}

interface RemovePerson {
  type: 'REMOVE_PERSON'
  payload: {
    uuid: string
  }
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'FETCH_PERSONS':
      return {
        ...state,
        isLoading: true
      }

    case 'FETCH_PERSONS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        persons: action.payload.persons
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
  }
}

export function App({ onChangeTheme }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { persons, isError, isLoading } = state

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: 'FETCH_PERSONS' })

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
  }, [])

  const handlePersonRemove = (uuid: string) => {
    dispatch({ type: 'REMOVE_PERSON', payload: { uuid } })
  }

  return (
    <Router>
      <button onClick={onChangeTheme}>Change theme</button>

      {isError && <div>Hupsista. Yritä myöhemmin uudelleen</div>}

      {isLoading && !isError && <div>Loading..</div>}

      <Switch>
        <Route path="/" exact>
          <ListPage persons={persons} onPersonRemove={handlePersonRemove} />
        </Route>

        <Route
          path="/persons/:uuid"
          render={(props) => {
            const uuid = props.match.params.uuid

            const person = persons.find((person) => person.uuid === uuid)

            if (person) {
              return <PersonPage person={person} />
            } else {
              return <NotFound />
            }
          }}
        ></Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}
