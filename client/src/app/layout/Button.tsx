import styled from '@emotion/styled'

export const Button = styled.button(({ theme }) => ({
  fontFamily: theme.fontFamilies.sans,
  backgroundColor: theme.colors.buttonBackground,
  color: theme.colors.buttonText,
  borderRadius: 4,
  border: theme.borders.buttonBorder,
  padding: theme.spacing(1),
  fontSize: theme.spacing(1.5),
  fontWeight: 600,
  margin: 0,
  cursor: 'pointer',
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
}))
