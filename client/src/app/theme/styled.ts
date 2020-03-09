import emotionStyled, { CreateStyled } from '@emotion/styled'

export type Theme = {
  isDark: boolean
  spacing: {
    small: number
    medium: number
  }
  border: {
    radius: {
      medium: number
    }
  }
}

const styled = emotionStyled as CreateStyled<Theme>

export { styled }
