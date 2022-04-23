import { useState } from 'react'

import { Header } from './layout/Header'
import { orderPeople } from './pages/orderPeople'
import { people } from './people'
import { OrderAndFilters } from './person/OrderAndFilters/OrderAndFilters'
import { PersonList } from './person/list/PersonList'

type Order = 'asc' | 'desc'

export function App(): JSX.Element {
  const [order, setOrder] = useState<Order>('asc')

  const handleToggleOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  return (
    <>
      <Header />

      <OrderAndFilters order={order} onToggleOrder={handleToggleOrder} />

      <PersonList people={orderPeople(people, order)} />
    </>
  )
}
