import { useReducer, useTransition } from 'react'
import { useQuery } from 'react-query'

import { Header } from './layout/Header'
import { filterPeople } from './pages/IndexPage/filterPeople'
import { Order, orderPeople } from './pages/orderPeople'
import { getPeople } from './pages/personService'
import { OrderAndFilters } from './person/OrderAndFilters/OrderAndFilters'
import { PersonList } from './person/list/PersonList'
import { PersonListSkeleton } from './person/list/PersonListSkeleton'
import { unwrapResult } from './result'

export function App(): JSX.Element {
  const { data, isError, isLoading } = useGetPeopleQuery()
  const people = data?.data.people

  const { filters, onChangeFilters, onToggleOrder } = useFilters()

  const handleToggleOrder = () => {
    // startTransition(() => dispatch({ type: 'TOGGLE_ORDER' }))
    startTransition(() => onToggleOrder())
  }

  const handleChangeFilters = (experience: number, name: string) => {
    // startTransition(() => dispatch({
    //   type: 'CHANGE_FILTERS',
    //   payload: {
    //     experience,
    //     name
    //   }
    // }))
    startTransition(() => onChangeFilters(experience, name))
  }

  const [isPending, startTransition] = useTransition()

  return (
    <>
      <Header />

      <OrderAndFilters
        order={filters.order}
        onToggleOrder={handleToggleOrder}
        onChangeFilters={handleChangeFilters}
      />

      {isLoading && <PersonListSkeleton />}

      {isError && <>Oops! sorry.</>}

      {people && (
        <PersonList
          isUpdating={isPending}
          people={filterPeople(
            orderPeople(people, filters.order),
            filters.experience,
            filters.name
          )}
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

const initialFilterState: FilterState = {
  order: 'asc',
  experience: 0,
  name: ''
}

type FilterAction = ToggleOrderAction | ChangeFilterAction

type ToggleOrderAction = {
  type: 'TOGGLE_ORDER'
}

type ChangeFilterAction = {
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

  const handleToggleOrder = () => {
    dispatch({ type: 'TOGGLE_ORDER' })
  }

  const handleChangeFilters = (experience: number, name: string) => {
    dispatch({
      type: 'CHANGE_FILTERS',
      payload: {
        experience,
        name
      }
    })
  }

  return {
    filters: state,
    onToggleOrder: handleToggleOrder,
    onChangeFilters: handleChangeFilters
  }
}
