import React from 'react'
import { lighten } from 'polished'

import { styled } from '../theme/styled'

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
      <ul>
        <li>id: {person.uuid}</li>
        <li>
          name: {person.firstName} {person.lastName}
        </li>
        <li>age: {person.age.toFixed(1)}</li>
      </ul>

      <button onClick={onRemove}>Remove from list</button>
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
