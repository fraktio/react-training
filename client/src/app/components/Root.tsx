import React from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import { App } from './App'
import image from '../assets/social_media_recruitment.png'
import { theme } from '../theme/theme'

export function Root() {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          body: {
            background: `url(${image})`
          }
        }}
      />

      <App />
    </ThemeProvider>
  )
}
