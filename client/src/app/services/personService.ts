import axios from 'axios'

import { config } from '../../config'
import { Try } from '../try'

export type PersonsResponse = {
  data: {
    persons: Array<{
      address: {
        city: string
        streetAddress: string
      } | null
      age: number
      email: string | null
      firstName: string
      lastName: string
      uuid: string
    }>
  }
  meta: {
    personsCount: number
  }
}

export async function getPersons(): Promise<
  Try<PersonsResponse>
> {
  try {
    const response = await axios.get<PersonsResponse>(
      `${config.API_URL}/persons`
    )

    return {
      success: true,
      value: response.data
    }
  } catch (e) {
    return {
      success: false
    }
  }
}
