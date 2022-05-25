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
      <Label role="status" aria-live="polite">
        Order, {order === 'asc' ? 'ascending' : 'descending'}
      </Label>

      <Button onClick={onToggleOrder}>
        {order === 'asc' ? 'Switch to descending' : 'Switch to descending'}
      </Button>
    </FieldGroup>
  )
}
