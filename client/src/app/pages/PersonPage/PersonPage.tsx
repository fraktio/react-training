import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { Loading } from '../../layout/Loading'
import { PersonView } from '../../person/view/PersonView'
import { unwrapResult } from '../../result'
import { NotFoundPage } from '../NotFoundPage'
import { getPerson } from '../personService'

import { useToggleStarPersonMutation } from './useToggleStarPersonMutation'

export function PersonPage(): JSX.Element {
  const { personUuid } = useParams<{ personUuid: string }>()

  const personQuery = useQuery(
    ['people', personUuid],
    async () => {
      if (personUuid) {
        return unwrapResult(await getPerson(personUuid))
      }

      throw new Error('should not happen')
    },
    { enabled: Boolean(personUuid) }
  )

  const toggleStarPersonMutation =
    useToggleStarPersonMutation()

  const handleToggleStarredPerson =
    (personUuid: string) => () => {
      toggleStarPersonMutation.mutate({ personUuid })
    }

  return (
    <>
      {personQuery.isLoading && <Loading />}

      {personQuery.isError && <NotFoundPage />}

      {personQuery.isSuccess && (
        <PersonView
          person={personQuery.data.data.person}
          onToggleStarred={handleToggleStarredPerson(
            personQuery.data.data.person.uuid
          )}
        />
      )}
    </>
  )
}
