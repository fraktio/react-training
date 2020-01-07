import React from 'react'

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
    <>
      id: {person.uuid}, name: {person.firstName} {person.lastName}, age: {person.age}
    </>
  )
}
