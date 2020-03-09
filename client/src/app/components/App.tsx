import React from 'react'

import { persons } from '../persons'
import { Person } from './Person'

interface Props {
  isDark: boolean
  onToggleDark: () => void
}

export function App({ isDark, onToggleDark }: Props) {
  return (
    <div>
      <header>
        <h1>Welcome to Fraktio's React training!</h1>

        <h2>Here's your persons:</h2>

        {!isDark && <button onClick={onToggleDark}>Dark mode</button>}

        {isDark && <button onClick={onToggleDark}>White mode</button>}
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
