import { Button } from '../../layout/Button'
import { Order } from '../../pages/orderPeople'

import { FieldGroup, Label } from './styles'

type Props = {
  order: Order
  onToggleOrder: () => void
}

export function OrderField({ order, onToggleOrder }: Props): JSX.Element {
  return (
    <FieldGroup>
      <Label>Order</Label>

      <Button onClick={onToggleOrder}>Change Order! ({order})</Button>
    </FieldGroup>
  )
}
