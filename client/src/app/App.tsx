import { useReducer, useTransition } from 'react'
import { useQuery } from 'react-query'

import { Header } from './layout/Header'
import { filterPeople } from './pages/IndexPage/filterPeople'
import { orderPeople } from './pages/orderPeople'
import { getPeople } from './pages/personService'
import { OrderAndFilters } from './person/OrderAndFilters/OrderAndFilters'
import { PersonList } from './person/list/PersonList'
import { PersonListSkeleton } from './person/list/PersonListSkeleton'
import { unwrapResult } from './result'

export function App(): JSX.Element {
  const peopleQuery = useGetPeopleQuery()

  const { order, experience, name, onToggleOrder, onChangeFilters } =
    useFilters()

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
      <Header />

      <OrderAndFilters
        order={order}
        onToggleOrder={handleToggleOrder}
        onChangeFilters={handleChangeFilters}
      />

      {peopleQuery.isLoading && <PersonListSkeleton />}

      {peopleQuery.isError && <p>Oops! Things didn't work out!</p>}

      {peopleQuery.isSuccess && (
        <PersonList
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

type FilterState = {
  order: Order
  experience: number
  name: string
}

type Order = 'asc' | 'desc'

const initialFilterState: FilterState = {
  order: 'asc',
  experience: 0,
  name: ''
}

type FilterAction = ToggleOrderAction | ChangeFiltersAction

type ToggleOrderAction = {
  type: 'TOGGLE_ORDER'
}

type ChangeFiltersAction = {
  type: 'CHANGE_FILTERS'
  payload: {
    name: string
    experience: number
  }
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'TOGGLE_ORDER':
      return {
        ...state,
        order: state.order === 'asc' ? 'desc' : 'asc'
      }

    case 'CHANGE_FILTERS':
      return {
        ...state,
        name: action.payload.name,
        experience: action.payload.experience
      }
  }
}

function useFilters() {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState)

  const handleToggleOrder = () => dispatch({ type: 'TOGGLE_ORDER' })

  const handleChangeFilters = (experience: number, name: string) => {
    dispatch({ type: 'CHANGE_FILTERS', payload: { experience, name } })
  }

  return {
    order: state.order,
    experience: state.experience,
    name: state.name,
    onToggleOrder: handleToggleOrder,
    onChangeFilters: handleChangeFilters
  }
}
