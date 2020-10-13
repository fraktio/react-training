/** @jsx jsx */
import { jsx } from '@emotion/core'
import { styled } from '../theme/styled'

interface Props {
  person: Person
}

interface Person {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

export function Person({ person }: Props) {
  return (
    <Container>
      ID: {person.uuid}
      <Name>
        Name: {person.firstName} {person.lastName}
      </Name>
      Age: {person.age}
    </Container>
  )
}

const Container = styled.div(({ theme }) => ({
  border: '2px solid black',
  backgroundColor: theme.palette.backgroundColor,
  color: theme.palette.color,
  padding: theme.spacing.small,
  borderRadius: 7,
  margin: 5
}))

const Name = styled.p(({ theme }) => ({
  color: theme.palette.color,
  marginTop: theme.spacing.small,
  marginBottom: theme.spacing.small
}))
