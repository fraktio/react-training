import { Theme } from './styled'

type ThemeWithoutDark = Omit<Theme, 'isDark'>

export const theme: ThemeWithoutDark = {
  spacing: {
    small: 8,
    medium: 16
  }
}
