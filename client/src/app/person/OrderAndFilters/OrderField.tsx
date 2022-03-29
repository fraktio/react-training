import { Button } from '../../layout/Button'

import { FieldGroup, Label } from './styles'

export function OrderField(): JSX.Element {
  return (
    <FieldGroup>
      <Label>Order</Label>

      <Button
        onClick={() => {
          console.log('click')
        }}
      >
        Click!
      </Button>
    </FieldGroup>
  )
}
