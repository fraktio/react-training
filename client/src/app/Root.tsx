import { Global, ThemeProvider } from '@emotion/react'
import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { DarkModeContext, useDarkMode } from './DarkModeContext'
import { darkTheme, lightTheme } from './theme/theme'

const queryClient = new QueryClient()

export function Root(): JSX.Element {
  return (
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <DarkModeContext>
            <RootWithContext />

            <ReactQueryDevtools />
          </DarkModeContext>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  )
}

function RootWithContext() {
  const { isDarkMode } = useDarkMode()

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Global
        styles={(theme) => ({
          html: {
            boxSizing: 'border-box'
          },
          '*, *:before, *:after': {
            boxSizing: 'inherit'
          },
          body: {
            margin: 0,
            padding: theme.spacing(2),
            paddingBottom: theme.spacing(8),
            fontFamily: theme.fontFamilies.sans,
            backgroundColor: theme.colors.appBackground
          },
          a: {
            textDecoration: 'none'
          }
        })}
      />

      <App />
    </ThemeProvider>
  )
}
