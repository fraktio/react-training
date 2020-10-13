import React, { useState } from 'react'
import { ThemeProvider } from 'emotion-theming'

import { App } from './App'
import { lightTheme, darkTheme } from '../theme/theme'

export function Root() {
  const [isDark, setIsDark] = useState(false)

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
