import produce from 'immer'
import { v4 as uuid } from 'uuid'

type State = Readonly<{
  persons: ReadonlyArray<Person>
  isLoading: boolean
  isError: boolean
}>

type Person = {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

const initialState: State = {
  persons: [],
  isLoading: true,
  isError: false
}

type Action =
  | FetchPersons
  | FetchPersonsSuccess
  | FetchPersonsFailure
  | RemovePerson
  | AddPerson

type FetchPersons = {
  type: 'FETCH_PERSONS'
}

type FetchPersonsSuccess = {
  type: 'FETCH_PERSONS_SUCCESS'
  payload: {
    persons: Person[]
  }
}

type FetchPersonsFailure = {
  type: 'FETCH_PERSONS_FAILURE'
}

type RemovePerson = {
  type: 'REMOVE_PERSON'
  payload: {
    personUuid: string
  }
}

type AddPerson = {
  type: 'ADD_PERSON'
  payload: {
    firstName: string
    lastName: string
  }
}

export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'FETCH_PERSONS':
      return produce(state, (draft) => {
        draft.isLoading = true
      })

    case 'FETCH_PERSONS_SUCCESS':
      return produce(state, (draft) => {
        draft.isLoading = false
        draft.isError = false
        draft.persons = action.payload.persons
      })

    case 'FETCH_PERSONS_FAILURE':
      return produce(state, (draft) => {
        draft.isLoading = false
      })

    case 'REMOVE_PERSON':
      return produce(state, (draft) => {
        draft.persons = state.persons.filter(
          (person) => person.uuid !== action.payload.personUuid
        )
      })

    case 'ADD_PERSON':
      return produce(state, (draft) => {
        draft.persons.unshift({
          uuid: uuid(),
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          age: 50
        })
      })

    default:
      return state
  }
}
