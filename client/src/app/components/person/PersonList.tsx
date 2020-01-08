/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Person, PersonType as PersonPersonType } from './Person'

interface Props {
  persons: Array<PersonType>
  showStats?: boolean
  onRemovePerson: (uuid: string) => void
}

export type PersonType = PersonPersonType & {
  uuid: string
  age: number
}

export function PersonList({ persons, showStats, onRemovePerson }: Props) {
  const averageAge =
    persons.reduce((acc, person) => {
      return acc + person.age
    }, 0) / persons.length

  return (
    <Fragment>
      {showStats && (
        <div>
          Number of people: {persons.length}. Average age: {averageAge}.
        </div>
      )}

      <ul>
        <AnimatePresence>
          {persons.map((person) => (
            <motion.li
              key={person.uuid}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Person person={person} onRemove={() => onRemovePerson(person.uuid)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Fragment>
  )
}
