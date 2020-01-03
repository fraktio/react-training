import faker from 'faker'

interface Person
  extends Readonly<{
    uuid: string
    firstName: string
    lastName: string
    email: string | null
    age: number
    address: Address | null
  }> {}

interface Address
  extends Readonly<{
    streetAddress: string
    city: string
  }> {}

function probability(percentage: number): boolean {
  return Math.random() * 100 < percentage
}

export function generatePersons(amount: number): Person[] {
  return [...Array(amount)].map(() => {
    const age = Math.random() * 100

    const address = probability(40)
      ? null
      : {
          streetAddress: faker.address.streetAddress(),
          city: faker.address.city()
        }

    return {
      uuid: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: probability(25) ? null : faker.internet.email(),
      age: probability(50) ? age : parseInt(age.toString(), 10),
      address
    }
  })
}
