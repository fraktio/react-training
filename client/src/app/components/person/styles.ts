import styled from '@emotion/styled'
import { lighten } from 'polished'

export const PersonContainer = styled.div((props) => ({
  border: '2px solid black',
  borderRadius: props.theme.border.radius.medium,
  backgroundColor: props.theme.isDark ? '#000' : lighten(0.4, 'magenta'),
  color: props.theme.isDark ? '#ccc' : 'black',
  padding: props.theme.spacing.small,
  marginTop: props.theme.spacing.medium
}))
