import { useEffect, useReducer, useState, useTransition } from 'react'

import { Header } from './layout/Header'
import { filterPeople } from './pages/IndexPage/filterPeople'
import { orderPeople } from './pages/orderPeople'
import { getPeople, GetPeopleResponse } from './pages/personService'
import { OrderAndFilters } from './person/OrderAndFilters/OrderAndFilters'
import { PersonList } from './person/list/PersonList'
import { PersonListSkeleton } from './person/list/PersonListSkeleton'

type People = GetPeopleResponse['data']['people']

export function App(): JSX.Element {
  const [people, setPeople] = useState<People>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const { order, experience, name, onToggleOrder, onChangeFilters } =
    useFilters()

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      const result = await getPeople()

      if (result.ok) {
        setPeople(result.value.data.people)
        setIsError(false)
      } else {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

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

      {isLoading && <PersonListSkeleton />}

      {isError && <p>Oops! Things didn't work out!</p>}

      {!isLoading && !isError && (
        <PersonList
          people={filterPeople(orderPeople(people, order), experience, name)}
          isUpdating={isPending}
        />
      )}
    </>
  )
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
