import { useState } from 'react'

import { Header } from './layout/Header'
import { filterPeople } from './pages/IndexPage/filterPeople'
import { orderPeople } from './pages/orderPeople'
import { people } from './people'
import { OrderAndFilters } from './person/OrderAndFilters/OrderAndFilters'
import { PersonList } from './person/list/PersonList'

type Order = 'asc' | 'desc'

export function App(): JSX.Element {
  const [order, setOrder] = useState<Order>('asc')
  const [experience, setExperience] = useState(0)
  const [name, setName] = useState('')

  const handleToggleOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  const handleChangeFilters = (experience: number, name: string) => {
    setExperience(experience)
    setName(name)
  }

  return (
    <>
      <Header />

      <OrderAndFilters
        order={order}
        onToggleOrder={handleToggleOrder}
        onChangeFilters={handleChangeFilters}
      />

      <PersonList
        people={filterPeople(orderPeople(people, order), experience, name)}
      />
    </>
  )
}
