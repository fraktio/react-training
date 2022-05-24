import styled from '@emotion/styled'

import { OrderField, Order as OrderFieldOrder } from './OrderField'

type Props = {
  order: OrderFieldOrder
  onToggleOrder: () => void
}

export function OrderAndFilters({ order, onToggleOrder }: Props): JSX.Element {
  return (
    <Container>
      <OrderField order={order} onToggleOrder={onToggleOrder} />
    </Container>
  )
}

const Container = styled.div({})
