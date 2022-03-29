import { useTransition } from 'react'
import { useQuery } from 'react-query'

import {
  OrderAndFilters,
  Filters as OrderAndFiltersFilters
} from '../../person/OrderAndFilters/OrderAndFilters'
import { PersonList } from '../../person/list/PersonList'
import { PersonListSkeleton } from '../../person/list/PersonListSkeleton'
import { unwrapResult } from '../../result'
import { orderPeople } from '../orderPeople'
import { getPeople } from '../personService'

import { filterPeople } from './filterPeople'

type Props = {
  order: Order
  experience: number
  name: string
  onToggleOrder: () => void
  onSetFilters: (experience: number, name: string) => void
}

type Order = 'asc' | 'desc'

type Filters = OrderAndFiltersFilters

export function IndexPage({
  order,
  experience,
  name,
  onToggleOrder,
  onSetFilters
}: Props): JSX.Element {
  const peopleQuery = useGetPeopleQuery()

  const [isPending, startTransition] = useTransition()

  const handleToggleOrder = () => {
    startTransition(() => {
      onToggleOrder()
    })
  }

  const handleFiltersChange = (filters: Filters) => {
    startTransition(() => {
      onSetFilters(filters.experience, filters.name)
    })
  }

  return (
    <>
      <OrderAndFilters
        order={order}
        onToggleOrder={handleToggleOrder}
        filters={{
          experience,
          name
        }}
        onFiltersChange={handleFiltersChange}
        isUpdating={isPending}
      />

      {peopleQuery.isLoading && <PersonListSkeleton />}

      {peopleQuery.isError && <div>erroore</div>}

      {peopleQuery.isSuccess && (
        <>
          <PersonList
            title="Potentiful candidates"
            people={orderPeople(
              filterPeople(peopleQuery.data.data.people, experience, name),
              order
            )}
            isUpdating={isPending}
          />
        </>
      )}
    </>
  )
}

function useGetPeopleQuery() {
  return useQuery(['people'], async () => unwrapResult(await getPeople()))
}
