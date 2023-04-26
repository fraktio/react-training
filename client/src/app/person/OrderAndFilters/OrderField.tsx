import { Button } from '../../layout/Button'

import { FieldGroup, Label } from './styles'

type Props = {
  order: Order
  onToggle: OnToggle
}

export type Order = 'asc' | 'desc'

export type OnToggle = () => void

export function OrderField({
  order,
  onToggle
}: Props): JSX.Element {
  return (
    <FieldGroup>
      <Label>Order</Label>

      <Button onClick={onToggle}>
        {order === 'asc' ? 'Z -> A' : 'A -> Z'}
      </Button>
    </FieldGroup>
  )
}
