import styled from '@emotion/styled'
import { useFormContext } from 'react-hook-form'

import { Data } from './FiltersForm'
import { FieldGroup, Label } from './styles'

export function ExperienceField(): JSX.Element {
  const { register, watch } = useFormContext<Data>()

  const experience = watch('experience')

  return (
    <FieldGroup>
      <Label htmlFor="experience">Experience</Label>

      <RangeField
        type="range"
        min={0}
        max={25}
        id="experience"
        defaultValue={0}
        {...register('experience')}
      />

      {experience}
    </FieldGroup>
  )
}

const RangeField = styled.input({
  width: 200
})
