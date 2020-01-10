import uuidv4 from 'uuid/v4'
import produce from 'immer'

const initialState: State = {
  persons: [],
  isLoading: true,
  isError: false
}

interface State
  extends Readonly<{
    persons: readonly Person[]
    isLoading: boolean
    isError: boolean
  }> {}

interface Person {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

interface FetchPersonsAction {
  type: 'FETCH_PERSONS'
}

interface FetchPersonsSuccessAction {
  type: 'FETCH_PERSONS_SUCCESS'
  payload: {
    persons: Array<Person>
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

export type PersonAction =
  | FetchPersonsAction
  | FetchPersonsSuccessAction
  | FetchPersonsFailureAction
  | RemovePersonAction
  | AddPersonAction

export function personReducer(state: State = initialState, action: PersonAction): State {
  switch (action.type) {
    case 'FETCH_PERSONS':
      return produce(state, draft => {
        draft.isLoading = true
      })

    case 'FETCH_PERSONS_SUCCESS':
      return produce(state, draft => {
        draft.persons = action.payload.persons
        draft.isLoading = false
        draft.isError = false
      })

    case 'FETCH_PERSONS_FAILURE':
      return produce(state, draft => {
        draft.isLoading = false
        draft.isError = true
      })

    case 'REMOVE_PERSON':
      return produce(state, draft => {
        draft.persons = state.persons.filter(person => person.uuid !== action.payload.uuid)
      })

    case 'ADD_PERSON':
      return produce(state, draft => {
        draft.persons.push({
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          age: 35,
          uuid: uuidv4()
        })
      })

    default:
      return state
  }
}
