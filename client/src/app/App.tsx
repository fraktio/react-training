import { useEffect, useReducer, useState } from 'react'

import { Header } from './layout/Header'
import { filterPeople } from './pages/IndexPage/filterPeople'
import { Order, orderPeople } from './pages/orderPeople'
import { getPeople, GetPeopleResponse } from './pages/personService'
import { OrderAndFilters } from './person/OrderAndFilters/OrderAndFilters'
import { PersonList } from './person/list/PersonList'
import { PersonListSkeleton } from './person/list/PersonListSkeleton'

type People = GetPeopleResponse['data']['people']

export function App(): JSX.Element {
  const [people, setPeople] = useState<People>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const { filters, onChangeFilters, onToggleOrder } = useFilters()

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const result = await getPeople()

      if (result.ok) {
        setPeople(result.value.data.people)
        setIsError(false)
      } else {
        setIsError(true)
      }

      setIsLoading(false)
    })()
  }, [])

  return (
    <>
      <Header />

      <OrderAndFilters
        order={filters.order}
        onToggleOrder={onToggleOrder}
        onChangeFilters={onChangeFilters}
      />

      {isLoading && <PersonListSkeleton />}

      {isError && <>Oops! sorry.</>}

      <PersonList
        people={filterPeople(
          orderPeople(people, filters.order),
          filters.experience,
          filters.name
        )}
      />
    </>
  )
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
