import React from 'react'
import { Global } from '@emotion/core'

import { persons } from '../persons'
import { Person } from './Person'
import image from '../assets/social_media_recruitment.png'

interface Props {
  isDark: boolean
  onToggleDarkMode: () => void
}

export function App({ isDark, onToggleDarkMode }: Props) {
  return (
    <>
      <Global
        styles={{
          body: {
            background: isDark ? '#666' : `url(${image})`
          }
        }}
      />

      <div>
        <header>
          <h1>Welcome to Fraktio's React training!</h1>
        </header>

        <button onClick={onToggleDarkMode}>
          {isDark ? (
            <>Light mode päälle</>
          ) : (
            <>Dark mode päälle</>
          )}
        </button>

        {persons.map((person) => (
          <div key={person.uuid}>
            <Person person={person} />
          </div>
        ))}
      </div>
    </>
  )
}
