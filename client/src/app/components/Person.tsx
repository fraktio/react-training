/** @jsx jsx */
import { jsx } from '@emotion/core'
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
    <div
      css={{
        border: '2px solid black',
        backgroundColor: lighten(0.4, 'magenta'),
        padding: 16,
        marginTop: 16
      }}
    >
      <ul>
        <li>id: {person.uuid}</li>
        <li>
          name: {person.firstName} {person.lastName}
        </li>
        <li>age: {person.age}</li>
      </ul>
    </div>
  )
}
