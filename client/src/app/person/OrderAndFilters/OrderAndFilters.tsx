import styled from '@emotion/styled'

import { Order } from '../../pages/orderPeople'

import { FiltersForm } from './FiltersForm'
import { OrderField } from './OrderField'

type Props = {
  order: Order
  onToggleOrder: () => void
  onChangeFilters: (experience: number, name: string) => void
}

export function OrderAndFilters({
  order,
  onToggleOrder,
  onChangeFilters
}: Props): JSX.Element {
  return (
    <Container>
      <OrderField order={order} onToggleOrder={onToggleOrder} />
      <FiltersForm onChangeFilters={onChangeFilters} />
    </Container>
  )
}

const Container = styled.div({})
