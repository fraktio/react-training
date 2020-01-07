import { styled } from '../theme/styled'
import { lighten } from 'polished'

export const Input = styled.input(
  (props) => ({
    padding: props.theme.spacing.small,
    border: '2px solid black',
    background: lighten(0.4, 'blue'),
    color: 'black',
    fontSize: 16,
    borderRadius: props.theme.border.radius.medium
  }),
  (props) =>
    props.disabled && {
      background: '#ccc'
    }
)
