/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link } from 'react-router-dom'

import { Button } from '../layout/form/input'
import { PersonContainer } from './styles'

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
    <PersonContainer>
      <Link to={`/person/${person.uuid}`}>
        <ul>
          <li>id: {person.uuid}</li>
          <li>
            name: {person.firstName} {person.lastName}
          </li>
          <li>age: {person.age.toFixed(1)}</li>
        </ul>
      </Link>

      <Button onClick={onRemove}>Remove from list</Button>
    </PersonContainer>
  )
}
