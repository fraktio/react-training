import { useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Header } from './layout/Header'
import { IndexPage } from './pages/IndexPage/IndexPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PersonPage } from './pages/PersonPage/PersonPage'

type Order = 'asc' | 'desc'

export function App(): JSX.Element {
  const { order, experience, name, onToggleOrder, onSetFilters } = useFilters()

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <IndexPage
              order={order}
              experience={experience}
              name={name}
              onToggleOrder={onToggleOrder}
              onSetFilters={onSetFilters}
            />
          }
        />

        <Route path="/people/:personUuid" element={<PersonPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
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

type FilterAction = ToggleOrderAction | SetFiltersAction

type ToggleOrderAction = {
  type: 'TOGGLE_ORDER'
}

type SetFiltersAction = {
  type: 'SET_FILTERS'
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

    case 'SET_FILTERS':
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

  const handleSetFilters = (experience: number, name: string) => {
    dispatch({ type: 'SET_FILTERS', payload: { experience, name } })
  }

  return {
    order: state.order,
    experience: state.experience,
    name: state.name,
    onToggleOrder: handleToggleOrder,
    onSetFilters: handleSetFilters
  }
}
