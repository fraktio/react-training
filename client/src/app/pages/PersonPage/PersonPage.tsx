import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { Loading } from '../../layout/Loading'
import { PersonView } from '../../person/view/PersonView'
import { unwrapResult } from '../../result'
import { NotFoundPage } from '../NotFoundPage'
import { getPerson } from '../personService'

export function PersonPage(): JSX.Element {
  const { personUuid } = useParams<{ personUuid: string }>()

  const personQuery = useGetPersonQuery(personUuid ?? '')

  return (
    <>
      {personQuery.isLoading && <Loading />}

      {personQuery.isError && <NotFoundPage />}

      {personQuery.isSuccess && (
        <Container>
          <PersonView person={personQuery.data.data.person} />
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

const Container = styled.section(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4)
}))
