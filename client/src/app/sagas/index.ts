import { all, takeLatest, takeEvery } from 'redux-saga/effects'

import { fetchPersons, removePersonRequest, addPersonRequest } from './person'

export function* rootSaga() {
  yield all([
    takeLatest('FETCH_PERSONS', fetchPersons),
    takeEvery('REMOVE_PERSON', removePersonRequest),
    takeEvery('ADD_PERSON', addPersonRequest)
  ])
}
