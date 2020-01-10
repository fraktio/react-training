import emotionStyled, { CreateStyled } from '@emotion/styled'

type Theme = {
  spacing: {
    medium: number
  }
}

const styled = emotionStyled as CreateStyled<Theme>

export { styled }
