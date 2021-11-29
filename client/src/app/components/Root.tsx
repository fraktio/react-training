import { ThemeProvider } from '@emotion/react'
import { useState, useEffect } from 'react'

import { lightTheme, darkTheme } from '../theme/theme'

import { App } from './App'
import {
  DarkModeContextProvider,
  useDark
} from './DarkModeContext'

export function Providers() {
  return (
    <DarkModeContextProvider>
      <Root />
    </DarkModeContextProvider>
  )
}

function Root() {
  const [count, setCount] = useState(0)
  const isDark = useDark()

  useEffect(() => {
    const intervalId = setInterval(
      () => setCount((count) => count + 1),
      1000
    )

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    document.title = isDark ? "It's dark!" : "It's light!"
  }, [isDark])

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <p>{count}</p>

      <App />
    </ThemeProvider>
  )
}
