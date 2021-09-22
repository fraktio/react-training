import styled from '@emotion/styled'
import { lighten } from 'polished'

type Props = {
  person: Person
}

export type Person = {
  firstName: string
  lastName: string
  age: number
}

export function PersonListItem({ person }: Props) {
  return (
    <Container>
      <Title>
        {person.firstName} {person.lastName}
      </Title>

      <Age>{person.age}</Age>
    </Container>
  )
}

const Container = styled.div((props) => ({
  backgroundColor: props.theme.colors.primary,
  padding: props.theme.spacing.small,
  margin: props.theme.spacing.small,
  borderRadius: 15,
  '&:hover': {
    backgroundColor: lighten(0.2, props.theme.colors.primary)
  }
}))

const Title = styled.h3({
  margin: 0
})

const Age = styled.p({
  margin: 0
})
