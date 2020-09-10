import axios from 'axios'
import { config } from '../config'

interface Response {
  data: {
    persons: Person[]
  }
  meta: {
    personsCount: number
  }
}

interface Person {
  uuid: string
  firstName: string
  lastName: string
  age: number
  email: string
  address: {
    streetAddress: string
    city: string
  } | null
}

export async function getPersons(): Promise<Response> {
  const response = await axios.get<Response>(`${config.API_URL}/persons`)

  return response.data
}
