import axios from 'axios'

import { config } from '../../config'

export interface PersonsResponse {
  data: {
    persons: Person[]
  }
}

interface Person {
  uuid: string
  firstName: string
  lastName: string
  age: number
  email: string
}

type Try<T> = Success<T> | Failure

interface Success<T> {
  value: T
  success: true
}

interface Failure {
  error: Error
  success: false
}

function success<T>(value: T): Success<T> {
  return {
    value,
    success: true
  }
}

function failure(error: Error): Failure {
  return {
    error,
    success: false
  }
}

export async function getPersons(): Promise<
  Try<PersonsResponse>
> {
  try {
    const response = await axios.get(
      `${config.API_URL}/persons`
    )

    return success(response.data)
  } catch (e) {
    return failure(e)
  }
}
