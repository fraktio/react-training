import produce from 'immer'
import { v4 as uuidv4 } from 'uuid'

import { PersonsResponse } from '../services/personService'

import { Action } from '.'

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

export type PersonAction =
  | FetchPersonsAction
  | FetchPersonsSuccessAction
  | FetchPersonsFailureAction
  | RemovePersonAction
  | RemovePersonSuccessAction
  | RemovePersonFailureAction
  | AddPersonAction
  | AddPersonSuccessAction
  | AddPersonFailureAction

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

export interface RemovePersonAction {
  type: 'REMOVE_PERSON'
  payload: {
    uuid: string
  }
}

interface RemovePersonSuccessAction {
  type: 'REMOVE_PERSON_SUCCESS'
  payload: {
    uuid: string
  }
}

interface RemovePersonFailureAction {
  type: 'REMOVE_PERSON_FAILURE'
}

export interface AddPersonAction {
  type: 'ADD_PERSON'
  payload: {
    firstName: string
    lastName: string
  }
}

interface AddPersonSuccessAction {
  type: 'ADD_PERSON_SUCCESS'
  payload: {
    firstName: string
    lastName: string
  }
}

interface AddPersonFailureAction {
  type: 'ADD_PERSON_FAILURE'
}

export function personReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'FETCH_PERSONS':
      return produce(state, (draftState) => {
        draftState.isLoading = true
      })

    case 'FETCH_PERSONS_SUCCESS':
      return produce(state, (draftState) => {
        draftState.persons = action.payload.response.data.persons
        draftState.isLoading = false
        draftState.isError = false
      })

    case 'FETCH_PERSONS_FAILURE':
      return produce(state, (draftState) => {
        draftState.isLoading = false
        draftState.isError = true
      })

    case 'REMOVE_PERSON_SUCCESS':
      return produce(state, (draftState) => {
        draftState.persons = state.persons.filter((person) => person.uuid !== action.payload.uuid)
      })

    case 'ADD_PERSON_SUCCESS':
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
