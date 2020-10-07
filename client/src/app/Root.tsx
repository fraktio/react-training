import React, { useState, useEffect } from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { Provider } from 'react-redux'

import { App } from './App'
import image from './assets/social_media_recruitment.png'
import { theme } from './theme/theme'

import { store } from '../setup/redux'

export function Root() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    document.title = isDark ? `It's dark!` : `It's white!`
  }, [isDark])

  const handleToggleDark = () => {
    setIsDark(!isDark)
  }

  return (
    <Provider store={store}>
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
    </Provider>
  )
}
