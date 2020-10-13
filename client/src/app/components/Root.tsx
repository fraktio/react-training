import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'emotion-theming'

import { App } from './App'
import { lightTheme, darkTheme } from '../theme/theme'

export function Root() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.title = isDark ? 'Dark' : 'Light'
  }, [isDark])

  const handleToggleDarkMode = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <App
        isDark={isDark}
        onToggleDarkMode={handleToggleDarkMode}
      />
    </ThemeProvider>
  )
}
