import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useSelector as originalUseSelector } from 'react-redux'

import { personReducer, PersonAction } from './person'

type PersonState = ReturnType<typeof personReducer>

export type State = {
  person: PersonState
}

export type Action = PersonAction

export const rootReducer = combineReducers({
  person: personReducer
})

export const useSelector: TypedUseSelectorHook<State> = originalUseSelector
