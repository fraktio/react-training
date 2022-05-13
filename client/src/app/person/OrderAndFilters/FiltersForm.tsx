import { useEffect } from 'react'
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'

import { ExperienceField } from './ExperienceField'
import { NameField } from './NameField'

type Props = {
  onChangeFilters: (experience: number, name: string) => void
}

export type Data = {
  experience?: string
  name?: string
}

export function FiltersForm({ onChangeFilters }: Props): JSX.Element {
  const form = useForm<Data>()

  const handleSubmit = (data: Data) => {
    onChangeFilters(
      data.experience ? parseInt(data.experience, 10) : 0,
      data.name ?? ''
    )
  }

  useSubmitOnChange(form, handleSubmit)

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <ExperienceField />
        <NameField />
      </form>
    </FormProvider>
  )
}

function useSubmitOnChange(
  form: UseFormReturn<Data>,
  onSubmit: (data: Data) => void
) {
  useEffect(() => {
    const subscription = form.watch((data) => onSubmit(data))

    return () => subscription.unsubscribe()
  }, [form, onSubmit])
}
