import { styled } from '../../../../theme/styled'

export const Input = styled.input(props => ({
  backgroundColor: 'lightblue',
  color: 'black',
  fontSize: 16,
  padding: props.theme.spacing.medium,
  border: '2px solid black',
  borderRadius: 15
}))
