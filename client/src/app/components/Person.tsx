import styled from '@emotion/styled'

type Props = {
  person: PersonType
  onRemovePerson: () => void
}

export type PersonType = {
  firstName: string
  lastName: string
  age: number
}

export function Person({ person, onRemovePerson }: Props) {
  return (
    <Container>
      <Name>
        {person.firstName} {person.lastName}
      </Name>

      <Age>{person.age}</Age>
      <button onClick={onRemovePerson}>Remove</button>
    </Container>
  )
}

const Container = styled.div(({ theme }) => ({
  padding: theme.spacing.small,
  color: theme.color.primary,
  background: theme.color.background,
  margin: theme.spacing.small,
  borderRadius: theme.borderRadius.medium,
  textAlign: 'right'
}))

const Name = styled.div(({ theme }) => ({
  fontSize: theme.spacing.medium
}))

const Age = styled.div(({ theme }) => ({
  fontSize: theme.spacing.medium
}))
