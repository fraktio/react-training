import axios from 'axios'
import { config } from '../config'

interface GetPersonsResponse {
  data: {
    persons: Person[]
  }
  meta: {
    personsCount: number
  }
}

interface Person {
  address: {
    city: string
    streetAddress: string
  } | null
  age: number
  email: string | null
  firstName: string
  lastName: string
  uuid: string
}

export async function getPersons(): Promise<
  GetPersonsResponse
> {
  const response = await axios.get<GetPersonsResponse>(
    config.API_URL + '/persons'
  )

  return response.data
}
