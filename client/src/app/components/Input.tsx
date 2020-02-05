import styled from '@emotion/styled'
import { lighten } from 'polished'

export const Input = styled.input(props => ({
  padding: props.theme.spacing.small,
  borderRadius: 9,
  backgroundColor: lighten(0.4, 'magenta'),
  color: 'black',
  fontSize: 18
}))
