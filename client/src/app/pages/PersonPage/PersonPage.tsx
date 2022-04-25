import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { Loading } from '../../layout/Loading'
import { PersonList } from '../../person/list/PersonList'
import { PersonView } from '../../person/view/PersonView'
import { unwrapResult } from '../../result'
import { NotFoundPage } from '../NotFoundPage'
import { orderPeople } from '../orderPeople'
import { getPerson, getRelatedPeople } from '../personService'

import { useToggleStarPersonMutation } from './useToggleStarPersonMutation'

export function PersonPage(): JSX.Element {
  const { personUuid } = useParams<{ personUuid: string }>()

  const personQuery = useGetPersonQuery(personUuid ?? '')
  const toggleStarPersonMutation = useToggleStarPersonMutation()
  const relatedPeopleQuery = useGetRelatedPeopleQuery(personUuid ?? '')

  const handleToggleStarredPerson = (personUuid: string) => () => {
    toggleStarPersonMutation.mutate({ personUuid })
  }

  return (
    <>
      {personQuery.isLoading && <Loading />}

      {personQuery.isError && <NotFoundPage />}

      {personQuery.isSuccess && (
        <Container>
          <PersonView
            person={personQuery.data.data.person}
            onToggleStarred={handleToggleStarredPerson(
              personQuery.data.data.person.uuid
            )}
          />

          <PersonList
            title="Related peoples"
            people={orderPeople(
              relatedPeopleQuery.data?.data.related ?? [],
              'asc'
            )}
          />
        </Container>
      )}
    </>
  )
}

function useGetPersonQuery(personUuid: string) {
  return useQuery(
    ['people', personUuid],
    async () => {
      return unwrapResult(await getPerson(personUuid))
    },
    { enabled: Boolean(personUuid) }
  )
}

function useGetRelatedPeopleQuery(personUuid: string) {
  return useQuery(
    ['people', personUuid, { related: true }],
    async () => {
      return unwrapResult(await getRelatedPeople(personUuid))
    },
    {
      enabled: Boolean(personUuid)
    }
  )
}

const Container = styled.section(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4)
}))
