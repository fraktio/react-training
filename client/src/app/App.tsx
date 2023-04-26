import { useState, useTransition } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Header } from './layout/Header'
import { IndexPage } from './pages/IndexPage/IndexPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PersonPage } from './pages/PersonPage/PersonPage'
import { OnChangeFilters } from './person/OrderAndFilters/OrderAndFilters'

export function App(): JSX.Element {
  const {
    order,
    onToggleOrder,
    minExperience,
    nameFilter,
    onChangeFilters,
    isPending
  } = useOrderAndFilters()

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <IndexPage
              order={order}
              onToggleOrder={onToggleOrder}
              onChangeFilters={onChangeFilters}
              minExperience={minExperience}
              nameFilter={nameFilter}
              isPending={isPending}
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

type Order = 'asc' | 'desc'

function useOrderAndFilters() {
  const [order, setOrder] = useState<Order>('asc')
  const [minExperience, setMinExperience] = useState(0)
  const [nameFilter, setNameFilter] = useState('')

  const [isPending, startTransition] = useTransition()

  const handleToggleOrder = () => {
    startTransition(() =>
      setOrder(order === 'asc' ? 'desc' : 'asc')
    )
  }

  const handleChangeFilters: OnChangeFilters = (
    filters
  ) => {
    startTransition(() => {
      setMinExperience(filters.minExperience)
      setNameFilter(filters.nameFilter)
    })
  }

  return {
    order,
    onToggleOrder: handleToggleOrder,
    minExperience,
    nameFilter,
    onChangeFilters: handleChangeFilters,
    isPending
  }
}
