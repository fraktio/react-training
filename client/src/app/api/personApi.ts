import axios from 'axios'

import { config } from '../../config'

interface GetPersonsResponse {
  data: {
    persons: GetPersonsPerson[]
  }
}

export interface GetPersonsPerson {
  address: null | {
    city: string
    streetAddress: string
  }
  age: number
  email: string
  firstName: string
  lastName: string
  uuid: string
}

export async function getPersons(): Promise<GetPersonsResponse> {
  const { data } = await axios.get(`${config.API_URL}/persons`)

  return data
}
