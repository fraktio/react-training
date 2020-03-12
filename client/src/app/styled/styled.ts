import emotionStyled, { CreateStyled } from '@emotion/styled'

export type Theme = {
  isDark: boolean
  spacing: {
    small: number
    medium: number
    large: number
  }
  borderRadiuses: {
    small: number
    medium: number
  }
  colors: {
    primary: string
  }
}

const styled = emotionStyled as CreateStyled<Theme>

export { styled }
