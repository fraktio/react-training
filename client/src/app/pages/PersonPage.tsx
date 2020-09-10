import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  person: Person
}

interface Person {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

export function PersonPage({ person }: Props) {
  return (
    <>
      <Link to="/">Back</Link>

      <ul>
        <li>UUID: {person.uuid}</li>
        <li>First name: {person.firstName}</li>
        <li>Last name: {person.lastName}</li>
        <li>Age: {person.age}</li>
      </ul>
    </>
  )
}
