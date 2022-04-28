import { useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Header } from './layout/Header'
import { IndexPage } from './pages/IndexPage/IndexPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PersonPage } from './pages/PersonPage/PersonPage'

export function App(): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  )

  const handleToggleOrder = () => {
    dispatch({ type: 'TOGGLE_ORDER' })
  }

  const handleChangeFilters = (
    experience: number,
    name: string
  ) => {
    dispatch({
      type: 'CHANGE_FILTERS',
      payload: {
        experience,
        name
      }
    })
  }

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <IndexPage
              order={state.order}
              experience={state.experience}
              name={state.name}
              onToggleOrder={handleToggleOrder}
              onChangeFilters={handleChangeFilters}
            />
          }
        />

        <Route
          path="/people/:personUuid"
          element={<PersonPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

type State = {
  order: Order
  experience: number
  name: string
}

type Order = 'asc' | 'desc'

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
