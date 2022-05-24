import { useEffect } from 'react'
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'

import { ExperienceField } from './ExperienceField'
import { NameField } from './NameField'

type Props = {
  onSubmit: (experience: number, name: string) => void
}

export type Data = {
  experience?: string
  name?: string
}

export function FiltersForm({ onSubmit }: Props): JSX.Element {
  const form = useForm<Data>({
    defaultValues: {
      experience: '0'
    }
  })

  const handleSubmit = (data: Data) => {
    onSubmit(
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
