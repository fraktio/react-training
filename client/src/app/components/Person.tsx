/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { lighten } from 'polished'

interface Props {
  person: {
    uuid: string
    firstName: string
    lastName: string
    age: number
  }
}

export function Person({ person }: Props) {
  return (
    <Container>
      <ul>
        <li>id: {person.uuid}</li>
        <li>
          name: {person.firstName} {person.lastName}
        </li>
        <li>age: {person.age}</li>
      </ul>
    </Container>
  )
}

const Container = styled.div((props) => ({
  border: '2px solid black',
  borderRadius: props.theme.border.radius.medium,
  backgroundColor: props.theme.isDark ? '#000' : lighten(0.4, 'magenta'),
  color: props.theme.isDark ? '#ccc' : 'black',
  padding: props.theme.spacing.small,
  marginTop: props.theme.spacing.medium
}))
