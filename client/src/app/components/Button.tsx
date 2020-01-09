import styled from '@emotion/styled'

export const Button = styled.button(
  props => ({
    backgroundColor: 'hotpink',
    color: 'black',
    fontSize: 16,
    padding: props.theme.spacing.medium,
    border: '2px solid black',
    borderRadius: 15
  }),
  props => {
    if (props.disabled) {
      return {
        backgroundColor: '#ccc'
      }
    }

    return {}
  }
)
