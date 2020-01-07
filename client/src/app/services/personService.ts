import axios from 'axios'

import { config } from '../../config'
import { Try, success, failure } from '../util/types'

export interface PersonsResponse {
  data: {
    persons: Array<Person>
  }
  meta: {
    personsCount: number
  }
}

export interface Person {
  uuid: string
  firstName: string
  lastName: string
  age: number
  email: string | null
  address: null | {
    streetAddress: string
    city: string
  }
}

export async function getPersons(): Promise<Try<PersonsResponse>> {
  try {
    const response = await axios.get<PersonsResponse>(`${config.API_URL}/persons`)

    return success(response.data)
  } catch (e) {
    return failure(e)
  }
}
