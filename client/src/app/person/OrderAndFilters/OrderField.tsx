import { Button } from '../../layout/Button'

import { FieldGroup, Label } from './styles'

export type Order = 'asc' | 'desc'

type Props = {
  order: Order
  onToggleOrder: () => void
}

export function OrderField({ order, onToggleOrder }: Props): JSX.Element {
  return (
    <FieldGroup>
      <Label>Order</Label>

      <Button onClick={onToggleOrder}>
        {order === 'asc' ? 'ascending' : 'descending'}
      </Button>
    </FieldGroup>
  )
}
