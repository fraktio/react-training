import { settingsReducer } from '../../app/ducks/settings'

test('toggle from light to dark and back', () => {
  const initialState = {
    isDark: false
  }

  const action = {
    type: 'TOGGLE_DARK' as const
  }

  const state1 = settingsReducer(initialState, action)

  expect(state1.isDark).toBe(true)

  const state2 = settingsReducer(state1, action)

  expect(state2.isDark).toBe(false)
})
