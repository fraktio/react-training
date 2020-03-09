import React, { useState } from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import { App } from './App'
import image from '../assets/social_media_recruitment.png'
import { theme } from '../theme/theme'

export function Root() {
  const [isDark, setIsDark] = useState(false)

  const handleToggleDark = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeProvider theme={{ ...theme, isDark }}>
      <Global
        styles={(props) => ({
          body: {
            background: props.isDark ? '#666' : `url(${image})`
          }
        })}
      />

      <App isDark={isDark} onToggleDark={handleToggleDark} />
    </ThemeProvider>
  )
}
