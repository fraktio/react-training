/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link } from 'react-router-dom'
import { lighten } from 'polished'

interface Props {
  person: {
    uuid: string
    firstName: string
    lastName: string
    age: number
  }
}

export function PersonPage({ person }: Props) {
  return (
    <div>
      <Link to="/">Takaisin</Link>

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
          id: {person.uuid}, name: {person.firstName} {person.lastName}, ikä:{' '}
          {person.age.toFixed(1)}
        </p>
      </div>
    </div>
  )
}
