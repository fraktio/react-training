import { useQuery } from 'react-query'

import {
  type OnChangeFilters,
  type Order,
  type OnToggleOrder,
  OrderAndFilters
} from '../../person/OrderAndFilters/OrderAndFilters'
import { PersonList } from '../../person/list/PersonList'
import { PersonListSkeleton } from '../../person/list/PersonListSkeleton'
import { unwrapResult } from '../../result'
import { orderPeople } from '../orderPeople'
import { getPeople } from '../personService'

import { filterPeople } from './filterPeople'

type Props = {
  order: Order
  onToggleOrder: OnToggleOrder
  onChangeFilters: OnChangeFilters
  minExperience: number
  nameFilter: string
  isPending: boolean
}

export function IndexPage({
  order,
  onToggleOrder,
  onChangeFilters,
  minExperience,
  nameFilter,
  isPending
}: Props): JSX.Element {
  const peopleQuery = usePeopleQuery()

  return (
    <>
      <OrderAndFilters
        order={order}
        onToggleOrder={onToggleOrder}
        onChangeFilters={onChangeFilters}
        minExperience={minExperience}
        nameFilter={nameFilter}
      />

      {peopleQuery.isLoading && <PersonListSkeleton />}

      {peopleQuery.isError && <p>Something went wrong!</p>}

      {peopleQuery.isSuccess && (
        <PersonList
          people={orderPeople(
            filterPeople(
              peopleQuery.people,
              minExperience,
              nameFilter
            ),
            order
          )}
          isPending={isPending}
        />
      )}
    </>
  )
}

function usePeopleQuery() {
  const query = useQuery(['people'], async () =>
    unwrapResult(await getPeople())
  )

  return {
    people: query.data?.data.people ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess
  }
}
