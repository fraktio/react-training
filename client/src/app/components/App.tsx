import React from 'react'

import { persons } from '../persons'

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
            id: {person.uuid}, name: {person.firstName} {person.lastName}, age: {person.age}
          </li>
        ))}
      </ul>
    </div>
  )
}
