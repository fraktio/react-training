/** @jsx jsx */
import { jsx } from '@emotion/core'
import { styled } from '../theme/styled'
import { lighten } from 'polished'
import { Link } from 'react-router-dom'

interface Props {
  person: PersonType
  onRemove: () => void
}

export interface PersonType {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

export function Person({ person, onRemove }: Props) {
  return (
    <Container>
      <Link to={`/persons/${person.uuid}`}>{person.uuid}</Link>,
      <Name>
        {person.firstName}, {person.lastName}
      </Name>
      , {person.age}
      <button onClick={onRemove}>Poista</button>
    </Container>
  )
}

const Container = styled.p((props) => ({
  backgroundColor: props.theme.isDark ? 'black' : lighten(0.25, 'red'),
  color: props.theme.isDark ? 'white' : 'black',
  borderRadius: props.theme.spacing.small,
  padding: props.theme.spacing.medium
}))

const Name = styled.span({
  color: 'blue'
})
