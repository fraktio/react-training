import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'emotion-theming'

import { App } from './App'
import { theme } from '../theme/theme'

export function Root() {
  const [isDark, setIsDark] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('use effect called')

    document.title = isDark ? "It's dark" : "It's light"
  }, [isDark])

  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000)
  }, [count])

  return (
    <ThemeProvider theme={{ ...theme, isDark }}>
      <p>Count {count}</p>
      <App onChangeTheme={() => setIsDark(!isDark)} />
    </ThemeProvider>
  )
}
