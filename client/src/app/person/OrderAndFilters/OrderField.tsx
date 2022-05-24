import { Button } from '../../layout/Button'

import { FieldGroup, Label } from './styles'

export type Order = 'asc' | 'desc'

type Props = {
  order: Order
  onToggleOrder: () => void
}

export function OrderField({ onToggleOrder, order }: Props): JSX.Element {
  return (
    <FieldGroup>
      <Label>Order</Label>

      <Button onClick={onToggleOrder}>
        {order === 'asc' ? 'A -> Z' : 'Z -> A'}
      </Button>
    </FieldGroup>
  )
}
