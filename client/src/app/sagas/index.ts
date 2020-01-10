import { takeLatest } from 'redux-saga/effects'

import { fetchPersons } from './personSaga'

export function* rootSaga() {
  yield takeLatest('FETCH_PERSONS', fetchPersons)
}
