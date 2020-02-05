import styled from '@emotion/styled'
import { lighten } from 'polished'

export const Button = styled.button(props => ({
  padding: props.theme.spacing.small,
  borderRadius: 9,
  backgroundColor: props.disabled
    ? '#ccc'
    : lighten(0.2, 'magenta'),
  color: 'black',
  fontSize: 18
}))
