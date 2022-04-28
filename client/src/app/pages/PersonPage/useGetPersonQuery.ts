import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

import { unwrapResult } from '../../result'
import {
  getPerson,
  GetPersonResponse
} from '../personService'

export function useGetPersonQuery(
  personUuid: string
): UseQueryResult<GetPersonResponse, unknown> {
  return useQuery(
    ['people', personUuid],
    async () => {
      return unwrapResult(await getPerson(personUuid))
    },
    {
      enabled: Boolean(personUuid),
      retry: (failureCount, error) => {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 404
        ) {
          return false
        }

        return failureCount < 2
      }
    }
  )
}
