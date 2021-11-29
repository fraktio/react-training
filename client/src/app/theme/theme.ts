import { Theme } from '@emotion/react'

const baseTheme = {
  spacing: {
    small: 8,
    medium: 16
  },
  borderRadius: {
    medium: 8
  }
}

export const lightTheme: Theme = {
  ...baseTheme,
  color: {
    primary: 'darkred',
    background: '#ddd'
  }
}

export const darkTheme: Theme = {
  ...baseTheme,
  color: {
    primary: '#ccc',
    background: '#333'
  }
}
