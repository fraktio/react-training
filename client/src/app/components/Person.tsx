/** @jsx jsx */
import { jsx } from '@emotion/core'
import { lighten } from 'polished'
import { Button } from './Button'
import { Link } from 'react-router-dom'

interface Props {
  person: PersonType
  onDelete: () => void
}

export interface PersonType {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

export function Person({ person, onDelete }: Props) {
  return (
    <div
      css={{
        padding: 10,
        marginTop: 10,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 9,
        backgroundColor: lighten(0.3, 'red')
      }}
    >
      <Link to={`/persons/${person.uuid}`}>
        <ul>
          <li>id: {person.uuid}</li>
          <li>
            name: {person.firstName} {person.lastName}
          </li>
          <li>age: {person.age}</li>
        </ul>
      </Link>

      <Button onClick={onDelete}>Poista</Button>
    </div>
  )
}
