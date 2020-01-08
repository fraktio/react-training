import produce from 'immer'

import { Action } from '.'

interface State
  extends Readonly<{
    isDark: boolean
  }> {}

const initialState: State = {
  isDark: false
}

export type SettingsAction = ToggleDarkAction

interface ToggleDarkAction {
  type: 'TOGGLE_DARK'
}

export function settingsReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_DARK':
      return produce(state, (draftState) => {
        draftState.isDark = !state.isDark
      })

    default:
      return state
  }
}
