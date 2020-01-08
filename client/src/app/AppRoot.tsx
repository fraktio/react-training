import { Global, ThemeProvider } from '@emotion/react'
import { useEffect } from 'react'

import { App } from './App'
import image from './assets/social_media_recruitment.png'
import { useSelector } from './ducks'
import { theme } from './theme/theme'

export function AppRoot() {
  const { isDark } = useSelector((state) => state.settings)

  useEffect(() => {
    document.title = isDark ? `It's dark!` : `It's white!`
  }, [isDark])

  return (
    <ThemeProvider theme={{ ...theme, isDark }}>
      <Global
        styles={(props) => ({
          body: {
            background: props.isDark ? '#666' : `url(${image})`
          }
        })}
      />

      <App />
    </ThemeProvider>
  )
}
