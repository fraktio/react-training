import styled from '@emotion/styled'
import { useFormContext } from 'react-hook-form'

import { Data } from './FiltersForm'
import { FieldGroup, Label } from './styles'

export function NameField(): JSX.Element {
  const { register } = useFormContext<Data>()

  return (
    <FieldGroup>
      <Label htmlFor="name">Name</Label>

      <TextField type="text" id="name" {...register('name')} />
    </FieldGroup>
  )
}

const TextField = styled.input(({ theme }) => ({
  width: 200,
  fontFamily: theme.fontFamilies.sans,
  backgroundColor: theme.colors.textfieldBackground,
  color: theme.colors.formText,
  borderRadius: 4,
  border: theme.borders.buttonBorder,
  padding: theme.spacing(1),
  fontSize: '1rem',
  fontWeight: 400
}))
