import { Button } from '../../layout/Button'

import { FieldGroup, Label } from './styles'

type Props = {
  order: Order
  onToggleOrder: () => void
}

export type Order = 'asc' | 'desc'

export function OrderField({
  order,
  onToggleOrder
}: Props): JSX.Element {
  return (
    <FieldGroup>
      <Label>Order</Label>

      <Button onClick={onToggleOrder}>
        {order === 'asc' && 'Z -> A'}
        {order === 'desc' && 'A -> Z'}
      </Button>
    </FieldGroup>
  )
}
