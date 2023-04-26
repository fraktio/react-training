import { useEffect } from 'react'
import {
  FormProvider,
  useForm,
  UseFormReturn
} from 'react-hook-form'

import { ExperienceField } from './ExperienceField'
import { NameField } from './NameField'

type Props = {
  onSubmit: OnSubmit
  initialValues: InitialValues
}

export type OnSubmit = (data: SubmitData) => void

type InitialValues = {
  experience: number
  name: string
}

type SubmitData = {
  minExperience: number
  nameFilter: string
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
      minExperience: parseInt(data.experience ?? '', 10),
      nameFilter: data.name ?? ''
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
