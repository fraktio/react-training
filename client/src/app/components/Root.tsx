import React from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { Provider } from 'react-redux'

import { App } from './App'
import image from '../assets/social_media_recruitment.png'
import { theme } from '../theme/theme'
import { store } from '../../setup/redux'

export function Root() {
  return (
    <Provider store={store}>
      <Global
        styles={{
          body: {
            backgroundImage: `url(${image})`
          }
        }}
      />

      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  )
}
