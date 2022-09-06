import faker from 'faker'
import { v4 as uuidv4 } from 'uuid'

import { probability } from '../util/probability'

export type Person = {
  uuid: string
  firstName: string
  lastName: string
  experience: number
  email: string | null
  avatar: string | null
  description: string | null
  isStarred: boolean
}

export function generatePeople(amount: number): Person[] {
  return [...Array(amount)].map(() => {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const experience = faker.datatype.number(25)

    return {
      uuid: faker.datatype.uuid(),
      firstName,
      lastName,
      experience,
      email: probability(25)
        ? null
        : faker.internet.email(firstName, lastName).toLowerCase(),
      avatar: probability(25) ? null : getAvatar(firstName, lastName),
      description: probability(20) ? null : faker.lorem.paragraphs(3, '\n\n'),
      isStarred: false
    }
  })
}

export function removePerson(
  people: Array<Person>,
  uuid: string
): Array<Person> {
  return people.filter((person) => person.uuid !== uuid)
}

export function addPerson(
  people: Array<Person>,
  firstName: string,
  lastName: string
): Array<Person> {
  return people.concat({
    uuid: uuidv4(),
    firstName,
    lastName,
    email: 'email@example.com',
    experience: 10,
    avatar: getAvatar(firstName, lastName),
    description: null,
    isStarred: false
  })
}

function getAvatar(firstName: string, lastName: string): string {
  return `https://source.boringavatars.com/beam/64/${encodeURIComponent(
    `${firstName} ${lastName}`
  )}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`
}
