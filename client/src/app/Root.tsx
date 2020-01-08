import { Provider } from 'react-redux'

import { store } from '../setup/redux'

import { AppRoot } from './AppRoot'

export function Root() {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  )
}
