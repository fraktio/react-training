import React from 'react'

import { persons } from '../persons'
import { Person } from './Person'

export function App() {
  return (
    <div>
      <header>
        <h1>Welcome to Fraktio's React training!</h1>

        <h2>Here's your persons:</h2>
      </header>

      <ul>
        {persons.map((person) => (
          <li key={person.uuid}>
            <Person person={person} />
          </li>
        ))}
      </ul>
    </div>
  )
}
