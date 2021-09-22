import axios from 'axios'

import { config } from '../config'

type PersonsResponse = {
  data: {
    persons: Person[]
  }
}

type Person = {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

export async function getPersons(): Promise<PersonsResponse> {
  const { data } = await axios.get(`${config.API_URL}/persons`)

  return data
}
