import { useTransition } from 'react'
import { useQuery } from 'react-query'

import {
  OrderAndFilters,
  Order as OrderAndFiltersOrder
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
  onChangeFilters: (experience: number, name: string) => void
}

type Order = OrderAndFiltersOrder

export function IndexPage({
  order,
  experience,
  name,
  onToggleOrder,
  onChangeFilters
}: Props): JSX.Element {
  const peopleQuery = useGetPeopleQuery()

  const [isPending, startTransition] = useTransition()

  const handleToggleOrder = () => {
    startTransition(() => {
      onToggleOrder()
    })
  }

  const handleChangeFilters = (experience: number, name: string) => {
    startTransition(() => {
      onChangeFilters(experience, name)
    })
  }

  return (
    <>
      <OrderAndFilters
        order={order}
        onToggleOrder={handleToggleOrder}
        filters={{ experience, name }}
        onChangeFilters={handleChangeFilters}
      />

      {peopleQuery.isLoading && <PersonListSkeleton />}

      {peopleQuery.isError && <p>Oops! Things didn't work out!</p>}

      {peopleQuery.isSuccess && (
        <PersonList
          title="Potential candidates"
          people={filterPeople(
            orderPeople(peopleQuery.data.data.people, order),
            experience,
            name
          )}
          isUpdating={isPending}
        />
      )}
    </>
  )
}

function useGetPeopleQuery() {
  return useQuery(['people'], async () => unwrapResult(await getPeople()))
}
