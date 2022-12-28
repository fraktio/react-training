import styled from '@emotion/styled'
import { FiltersForm } from './FiltersForm'
import { OrderField, Order as OrderFieldOrder } from './OrderField'

type Props = {
  order: OrderFieldOrder
  onToggleOrder: () => void
  onChangeFilters: (experience: number, name: string) => void
}

export function OrderAndFilters({
  onToggleOrder,
  order,
  onChangeFilters
}: Props): JSX.Element {
  return (
    <Container>
      <OrderField order={order} onToggleOrder={onToggleOrder} />
      <FiltersForm onSubmit={onChangeFilters} />
    </Container>
  )
}

const Container = styled.div({})
