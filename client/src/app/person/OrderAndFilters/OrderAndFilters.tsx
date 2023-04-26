import styled from '@emotion/styled'

import { FiltersForm, OnSubmit } from './FiltersForm'
import {
  OrderField,
  type Order as OrderFieldOrder,
  type OnToggle as OrderFieldOnToggle
} from './OrderField'

type Props = {
  order: Order
  onToggleOrder: OnToggleOrder
  onChangeFilters: OnChangeFilters
  minExperience: number
  nameFilter: string
}

export type Order = OrderFieldOrder

export type OnToggleOrder = OrderFieldOnToggle

export type OnChangeFilters = OnSubmit

export function OrderAndFilters({
  order,
  onToggleOrder,
  onChangeFilters,
  minExperience,
  nameFilter
}: Props): JSX.Element {
  return (
    <Container>
      <OrderField order={order} onToggle={onToggleOrder} />

      <FiltersForm
        onSubmit={onChangeFilters}
        initialValues={{
          experience: minExperience,
          name: nameFilter
        }}
      />
    </Container>
  )
}

const Container = styled.div({})
