/** @jsx jsx */
import { jsx } from '@emotion/core'
import { lighten } from 'polished'

import { Button } from './Button'

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
    <div
      css={{
        backgroundColor: lighten(0.3, 'red'),
        color: 'black',
        border: '2px solid black',
        padding: 16,
        marginTop: 16
      }}
    >
      <p>
        id: {person.uuid}, name: {person.firstName} {person.lastName}, ikä: {person.age.toFixed(1)}
      </p>

      <Button onClick={onRemove}>Poista listasta</Button>
    </div>
  )
}
