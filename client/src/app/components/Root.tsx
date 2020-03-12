import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'emotion-theming'

import { App } from './App'
import { ligthTheme, darkTheme, ThemeWithoutDark } from '../styled/theme'

export function Root() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.title = isDark ? 'tummaa' : 'valkoista'
  }, [isDark])

  const themeWithDark = (newTheme: ThemeWithoutDark) => ({
    ...newTheme,
    isDark
  })

  return (
    <ThemeProvider
      theme={isDark ? themeWithDark(darkTheme) : themeWithDark(ligthTheme)}
    >
      <App isDark={isDark} onToggleDarkMode={() => setIsDark(!isDark)} />
    </ThemeProvider>
  )
}
