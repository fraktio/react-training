import styled from '@emotion/styled'

export const FieldGroup = styled.div(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  color: theme.colors.formTextDimmed
}))

export const Label = styled.label(({ theme }) => ({
  color: theme.colors.formTextDimmed,
  display: 'inline-block',
  width: theme.spacing(12)
}))
