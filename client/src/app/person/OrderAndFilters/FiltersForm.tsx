import styled from '@emotion/styled'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { FieldGroup, Label } from './styles'

type Props = {
  initialValues: InitialValues
  onSubmit: (data: SubmitData) => void
}

type InitialValues = {
  experience: number
  name: string
}

export type SubmitData = {
  experience: number
  name: string
}

type Data = {
  experience?: string
  name?: string
}

export function FiltersForm({ initialValues, onSubmit }: Props): JSX.Element {
  const { handleSubmit, register, watch } = useForm<Data>({
    defaultValues: {
      experience: initialValues.experience.toString(),
      name: initialValues.name
    }
  })

  const handleActualSubmit = useCallback(
    (data: Data) => {
      onSubmit({
        experience: data.experience ? parseInt(data.experience, 10) : 0,
        name: data.name ?? ''
      })
    },
    [onSubmit]
  )

  useEffect(() => {
    const subscription = watch((data) => handleActualSubmit(data))

    return () => subscription.unsubscribe()
  }, [watch, onSubmit, handleActualSubmit])

  const experience = watch('experience')

  return (
    <form onSubmit={handleSubmit(handleActualSubmit)}>
      <FieldGroup>
        <Label htmlFor="experience">Experience</Label>

        <RangeField
          type="range"
          min={0}
          max={25}
          id="experience"
          {...register('experience')}
        />

        {experience}
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="name">Name</Label>

        <TextField type="text" id="name" {...register('name')} />
      </FieldGroup>
    </form>
  )
}

const RangeField = styled.input({
  width: 200
})

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
