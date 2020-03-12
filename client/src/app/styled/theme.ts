import { Theme } from './styled'

export type ThemeWithoutDark = Omit<Theme, 'isDark'>

const commonTheme = {
  spacing: {
    small: 8,
    medium: 16,
    large: 32
  },
  borderRadiuses: {
    small: 9,
    medium: 15
  }
}

export const ligthTheme: ThemeWithoutDark = {
  ...commonTheme,
  colors: {
    primary: '#ddd'
  }
}

export const darkTheme: ThemeWithoutDark = {
  ...commonTheme,
  colors: {
    primary: '#666'
  }
}
