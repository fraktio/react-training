import { call, put } from 'redux-saga/effects'

import { getPersons, PersonsResponse } from '../services/personService'
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
