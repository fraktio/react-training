import { TypedUseSelectorHook, useSelector as originalUseSelector } from 'react-redux'
import { combineReducers } from 'redux'

import { personReducer, PersonAction } from './person'
import { settingsReducer, SettingsAction } from './settings'

type PersonState = ReturnType<typeof personReducer>
type SettingsState = ReturnType<typeof settingsReducer>

export type State = {
  person: PersonState
  settings: SettingsState
}

export type Action = PersonAction | SettingsAction

export const rootReducer = combineReducers({
  person: personReducer,
  settings: settingsReducer
})

export const useSelector: TypedUseSelectorHook<State> = originalUseSelector
