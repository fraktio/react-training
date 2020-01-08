import { call, put } from 'redux-saga/effects'

import { RemovePersonAction, AddPersonAction } from '../ducks/person'
import {
  getPersons,
  removePerson,
  addPerson,
  PersonsResponse,
  RemovePersonResponse,
  AddPersonResponse
} from '../services/personService'
import { Try } from '../util/types'

export function* fetchPersons() {
  const response: Try<PersonsResponse> = yield call(getPersons)

  if (response.success) {
    yield put({
      type: 'FETCH_PERSONS_SUCCESS',
      payload: { response: response.value }
    })
  } else {
    yield put({ type: 'FETCH_PERSONS_FAILURE' })
  }
}

export function* removePersonRequest(action: RemovePersonAction) {
  const { uuid } = action.payload

  const response: Try<RemovePersonResponse> = yield call(removePerson, uuid)

  if (response.success) {
    yield put({
      type: 'REMOVE_PERSON_SUCCESS',
      payload: {
        uuid
      }
    })
  } else {
    yield put({ type: 'REMOVE_PERSON_FAILURE' })
  }
}

export function* addPersonRequest(action: AddPersonAction) {
  const { firstName, lastName } = action.payload

  const response: Try<AddPersonResponse> = yield call(addPerson, { firstName, lastName })

  if (response.success) {
    yield put({
      type: 'ADD_PERSON_SUCCESS',
      payload: {
        firstName,
        lastName
      }
    })
  } else {
    yield put({ type: 'ADD_PERSON_FAILURE' })
  }
}
