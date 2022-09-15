import { useReducer, useTransition } from 'react'
import { useQuery } from 'react-query'

import { Header } from './layout/Header'
import { filterPeople } from './pages/IndexPage/filterPeople'
import { orderPeople } from './pages/orderPeople'
import { getPeople } from './pages/personService'
import {
  OrderAndFilters,
  OnChangeFilters
} from './person/OrderAndFilters/OrderAndFilters'
import { PersonList } from './person/list/PersonList'
import { PersonListSkeleton } from './person/list/PersonListSkeleton'
import { unwrapResult } from './result'

type Order = 'asc' | 'desc'

export function App(): JSX.Element {
  const peopleQuery = usePeopleQuery()
  const {
    order,
    experience,
    name,
    onToggleOrder,
    onChangeFilters,
    isLoading
  } = useFilters()

  return (
    <>
      <Header />

      <OrderAndFilters
        order={order}
        onToggleOrder={onToggleOrder}
        onChangeFilters={onChangeFilters}
      />

      {peopleQuery.isLoading && <PersonListSkeleton />}

      {peopleQuery.isError && (
        <p>Oops! Things went wrong.</p>
      )}

      {peopleQuery.isSuccess && (
        <PersonList
          people={orderPeople(
            filterPeople(
              peopleQuery.data.data.people,
              experience,
              name
            ),
            order
          )}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

function usePeopleQuery() {
  return useQuery(['people'], async () =>
    unwrapResult(await getPeople())
  )
}

function useFilters() {
  const [isPending, startTransition] = useTransition()
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  )

  const handleToggleOrder = () => {
    startTransition(() =>
      dispatch({ type: 'TOGGLE_ORDER' })
    )
  }

  const handleChangeFilters: OnChangeFilters = (
    experience,
    name
  ) => {
    startTransition(() =>
      dispatch({
        type: 'CHANGE_FILTERS',
        payload: { experience, name }
      })
    )
  }

  return {
    order: state.order,
    experience: state.experience,
    name: state.name,
    onToggleOrder: handleToggleOrder,
    onChangeFilters: handleChangeFilters,
    isLoading: isPending
  }
}

type State = {
  order: Order
  experience: number
  name: string
}

const initialState: State = {
  order: 'asc',
  experience: 0,
  name: ''
}

type Action = ToggleOrderAction | ChangeFiltersAction

type ToggleOrderAction = {
  type: 'TOGGLE_ORDER'
}

type ChangeFiltersAction = {
  type: 'CHANGE_FILTERS'
  payload: {
    experience: number
    name: string
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_ORDER':
      return {
        ...state,
        order: state.order === 'asc' ? 'desc' : 'asc'
      }

    case 'CHANGE_FILTERS':
      return {
        ...state,
        experience: action.payload.experience,
        name: action.payload.name
      }
  }
}
