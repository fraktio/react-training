import { useEffect } from 'react'
import {
  FormProvider,
  useForm,
  UseFormReturn
} from 'react-hook-form'

import { ExperienceField } from './ExperienceField'
import { NameField } from './NameField'

type Props = {
  onSubmit: (data: SubmitData) => void
  initialValues: {
    experience: number
    name: string
  }
}

export type SubmitData = {
  experience: number
  name: string
}

export type Data = {
  experience?: string
  name?: string
}

export function FiltersForm({
  onSubmit,
  initialValues
}: Props): JSX.Element {
  const form = useForm<Data>({
    defaultValues: {
      experience: initialValues.experience.toString(),
      name: initialValues.name
    }
  })

  const handleSubmit = (data: Data) => {
    onSubmit({
      experience: data.experience
        ? parseInt(data.experience, 10)
        : 0,
      name: data.name ?? ''
    })
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
    const subscription = form.watch((data) =>
      onSubmit(data)
    )

    return () => subscription.unsubscribe()
  }, [form, onSubmit])
}
