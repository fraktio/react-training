import styled from '@emotion/styled'

import { FiltersForm, InitialValues } from './FiltersForm'
import { OrderField, Order as OrderFieldOrder } from './OrderField'

type Props = {
  order: Order
  onToggleOrder: () => void
  filters: Filters
  onChangeFilters: (experience: number, name: string) => void
}

export type Order = OrderFieldOrder

export type Filters = InitialValues

export function OrderAndFilters({
  order,
  onToggleOrder,
  filters,
  onChangeFilters
}: Props): JSX.Element {
  return (
    <Container>
      <OrderField order={order} onToggleOrder={onToggleOrder} />

      <FiltersForm onSubmit={onChangeFilters} initialValues={filters} />
    </Container>
  )
}

const Container = styled.div({})
