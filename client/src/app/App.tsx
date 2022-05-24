import { useReducer, useState } from 'react'

import { Header } from './layout/Header'
import { filterPeople } from './pages/IndexPage/filterPeople'
import { orderPeople } from './pages/orderPeople'
import { people } from './people'
import { OrderAndFilters } from './person/OrderAndFilters/OrderAndFilters'
import { PersonList } from './person/list/PersonList'

type Order = 'asc' | 'desc'

export function App(): JSX.Element {
  const { order, experience, name, onChangeFilters, onToggleOrder } =
    useFilters()

  return (
    <>
      <Header />

      <OrderAndFilters
        order={order}
        onToggleOrder={onToggleOrder}
        onChangeFilters={onChangeFilters}
      />

      <PersonList
        people={filterPeople(orderPeople(people, order), experience, name)}
      />
    </>
  )
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
