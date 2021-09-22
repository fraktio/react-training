import { ThemeProvider } from '@emotion/react'
import { useState, useEffect } from 'react'

import { getTheme } from '../theme/theme'

import { App } from './App'

const CUSTOMER = 2

export function Root() {
  const { isDark, onToggleDark } = useDarkMode()
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
    <ThemeProvider theme={theme}>
      <p>Count: {count}</p>
      <App isDark={isDark} onToggleDark={onToggleDark} />
    </ThemeProvider>
  )
}

function useDarkMode() {
  const [isDark, setIsDark] = useState(false)

  const handleToggleDark = () => {
    setIsDark(!isDark)
  }

  return {
    isDark,
    onToggleDark: handleToggleDark
  }
}

function useCustomTheme() {
  const { isDark } = useDarkMode()

  return getTheme(CUSTOMER, isDark)
}
