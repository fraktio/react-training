import emotionStyled, {
  CreateStyled
} from '@emotion/styled'

export interface Theme {
  spacing: {
    small: number
    medium: number
  }
  palette: {
    backgroundColor: string
    color: string
  }
}

const styled = emotionStyled as CreateStyled<Theme>

export { styled }
