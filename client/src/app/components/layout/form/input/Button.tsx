import { styled } from '../../../../theme/styled'
import { lighten } from 'polished'

export const Button = styled.button(
  (props) => ({
    padding: props.theme.spacing.small,
    border: '2px solid black',
    background: lighten(0.2, 'blue'),
    color: 'white',
    fontSize: 16,
    borderRadius: props.theme.border.radius.medium
  }),
  (props) =>
    props.disabled && {
      background: '#ccc'
    }
)
