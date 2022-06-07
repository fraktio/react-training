import { useEffect, useReducer, useState, useTransition } from 'react'
import { useQuery } from 'react-query'

import { Header } from './layout/Header'
import { filterPeople } from './pages/IndexPage/filterPeople'
import { orderPeople } from './pages/orderPeople'
import { getPeople, GetPeopleResponse } from './pages/personService'
import { OrderAndFilters } from './person/OrderAndFilters/OrderAndFilters'
import { PersonList } from './person/list/PersonList'
import { PersonListSkeleton } from './person/list/PersonListSkeleton'
import { unwrapResult } from './result'

type Order = 'asc' | 'desc'

export function App(): JSX.Element {
  const peopleQuery = useGetPeopleQuery()
  const { order, experience, name, onChangeFilters, onToggleOrder } =
    useFilters()

  const [isPending, startTransition] = useTransition()

  function handleToggleOrder() {
    startTransition(() => {
      onToggleOrder()
    })
  }

  function handleChangeFilters(experience: number, name: string) {
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
      {peopleQuery.isError && <p>Oops! Couldn't get people list.</p>}
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

const initialFilterState: FilterState = {
  experience: 0,
  name: '',
  order: 'asc'
}

function useFilters() {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState)

  const handleToggleOrder = () => dispatch({ type: 'TOGGLE_ORDER' })

  const handleChangeFilters = (experience: number, name: string) =>
    dispatch({ type: 'CHANGE_FILTERS', payload: { experience, name } })

  return {
    order: state.order,
    experience: state.experience,
    name: state.name,
    onToggleOrder: handleToggleOrder,
    onChangeFilters: handleChangeFilters
  }
}
