import {
  useMutation,
  UseMutationResult,
  useQueryClient
} from 'react-query'

import { unwrapResult } from '../../result'
import {
  GetPeopleResponse,
  toggleStarPerson,
  ToggleStarPersonResponse
} from '../personService'

type ToggleStarPersonMutationVariables = {
  personUuid: string
}

export function useToggleStarPersonMutation(): UseMutationResult<
  ToggleStarPersonResponse,
  unknown,
  ToggleStarPersonMutationVariables,
  unknown
> {
  const queryClient = useQueryClient()

  return useMutation<
    ToggleStarPersonResponse,
    unknown,
    ToggleStarPersonMutationVariables
  >(
    async ({ personUuid }) =>
      unwrapResult(await toggleStarPerson(personUuid)),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries([
          'people',
          variables.personUuid
        ])

        const peopleData =
          queryClient.getQueryData<GetPeopleResponse>([
            'people'
          ])

        if (peopleData) {
          queryClient.setQueryData(['people'], {
            ...peopleData,
            data: {
              people: peopleData.data.people.map(
                (person) => {
                  if (
                    person.uuid === variables.personUuid
                  ) {
                    return data.data.person
                  }

                  return person
                }
              )
            }
          })
        }
      }
    }
  )
}
