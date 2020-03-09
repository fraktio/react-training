import { Global, ThemeProvider } from '@emotion/react'
import { useState } from 'react'

import image from '../assets/social_media_recruitment.png'
import { theme } from '../theme/theme'

import { App } from './App'

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
