import { call, put } from 'redux-saga/effects'

import { getPersons } from '../services/personService'

export function* fetchPersons() {
  const response = yield call(getPersons)

  if (response.success) {
    yield put({
      type: 'FETCH_PERSONS_SUCCESS',
      payload: { response: response.value }
    })
  } else {
    yield put({ type: 'FETCH_PERSONS_FAILURE' })
  }
}
