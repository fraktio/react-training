import { Theme } from '@emotion/react'

export function getTheme(customer: number, isDark: boolean): Theme {
  switch (customer) {
    case 1:
      return isDark ? theme1Dark : theme1Light

    default:
      return isDark ? defaultThemeDark : defaultThemeLight
  }
}

const baseTheme = {
  spacing: {
    small: 8,
    medium: 16
  }
}

const defaultThemeLight = {
  ...baseTheme,
  colors: {
    primary: 'magenta'
  }
}

const defaultThemeDark = {
  ...baseTheme,
  colors: {
    primary: '#ccc'
  }
}

const theme1Light = {
  ...baseTheme,
  colors: {
    primary: 'hotpink'
  }
}

const theme1Dark = {
  ...baseTheme,
  colors: {
    primary: '#aaa'
  }
}
