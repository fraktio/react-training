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

const Container = styled.div({
  border: '2px solid black',
  backgroundColor: lighten(0.4, 'magenta'),
  color: 'black',
  padding: 16,
  marginTop: 16
})
