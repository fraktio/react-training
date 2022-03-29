import styled from '@emotion/styled'

import { Button } from '../../layout/Button'

import { FiltersForm } from './FiltersForm'
import { FieldGroup, Label } from './styles'

type Props = {
  order: Order
  onToggleOrder: () => void
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  isUpdating: boolean
}

export type Filters = {
  experience: number
  name: string
}

type Order = 'asc' | 'desc'

export function OrderAndFilters({
  order,
  onToggleOrder,
  filters,
  onFiltersChange,
  isUpdating
}: Props): JSX.Element {
  return (
    <Container>
      <FieldGroup>
        <Label>Sort</Label>

        <Button onClick={onToggleOrder} disabled={isUpdating}>
          {order === 'asc' ? 'A -> Z' : 'Z -> A'}
        </Button>
      </FieldGroup>

      <FiltersForm initialValues={filters} onSubmit={onFiltersChange} />
    </Container>
  )
}

const Container = styled.div({})
