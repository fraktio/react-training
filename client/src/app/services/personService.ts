import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

interface PersonsResponse {
  data: {
    persons: [
      {
        address: {
          city: string
          streetAddress: string
        }
        age: number
        email: string
        firstName: string
        lastName: string
        uuid: string
      }
    ]
  }
}

type Try<T> = Success<T> | Failure

interface Success<T> {
  success: true
  value: T
}

interface Failure {
  success: false
  error: Error
}

export async function getPersons(): Promise<Try<PersonsResponse>> {
  try {
    const response = await axios.get<PersonsResponse>(`${baseUrl}/persons`)

    return {
      success: true,
      value: response.data
    }
  } catch (e) {
    return {
      success: false,
      error: e
    }
  }
}
