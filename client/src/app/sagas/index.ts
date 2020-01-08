import { takeLatest } from 'redux-saga/effects'

import { fetchPersons } from './person'

export function* rootSaga() {
  yield takeLatest('FETCH_PERSONS', fetchPersons)
}
