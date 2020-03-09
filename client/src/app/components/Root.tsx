import { Global, ThemeProvider } from '@emotion/react'

import image from '../assets/social_media_recruitment.png'
import { theme } from '../theme/theme'

import { App } from './App'

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
