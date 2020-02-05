import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  person: Person
}

interface Person {
  firstName: string
  lastName: string
}

export function PersonPage({ person }: Props) {
  return (
    <>
      <Link to="/">Etusivulle</Link>

      <h1>
        {person.firstName} {person.lastName}
      </h1>
    </>
  )
}
