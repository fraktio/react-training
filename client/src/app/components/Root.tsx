import { ThemeProvider } from '@emotion/react'
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'

import { store } from '../../setup/redux'
import { getTheme } from '../theme/theme'

import { App } from './App'
import { ModeContext, useDarkMode } from './ModeContext'

const CUSTOMER = 2

export function Root() {
  return (
    <ModeContext>
      <AppRoot />
    </ModeContext>
  )
}

function AppRoot() {
  const theme = useCustomTheme()

  const [count, setCount] = useState(1)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [count])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <p>Count: {count}</p>

        <App />
      </ThemeProvider>
    </Provider>
  )
}

function useCustomTheme() {
  const isDark = useDarkMode()

  return getTheme(CUSTOMER, isDark)
}
