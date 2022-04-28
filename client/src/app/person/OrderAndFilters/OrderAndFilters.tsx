import styled from '@emotion/styled'

import {
  FiltersForm,
  SubmitData as FiltersFormSubmitData
} from './FiltersForm'
import {
  OrderField,
  Order as OrderFieldOrder
} from './OrderField'

type Props = {
  order: Order
  onToggleOrder: () => void
  experience: number
  name: string
  onChangeFilters: (
    experience: number,
    name: string
  ) => void
}

export type Order = OrderFieldOrder

export function OrderAndFilters({
  order,
  onToggleOrder,
  experience,
  name,
  onChangeFilters
}: Props): JSX.Element {
  const handleChangeFilters = (
    data: FiltersFormSubmitData
  ) => {
    onChangeFilters(data.experience, data.name)
  }

  return (
    <Container>
      <OrderField
        order={order}
        onToggleOrder={onToggleOrder}
      />

      <FiltersForm
        onSubmit={handleChangeFilters}
        initialValues={{
          experience,
          name
        }}
      />
    </Container>
  )
}

const Container = styled.div({})
