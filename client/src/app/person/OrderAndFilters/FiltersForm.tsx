import { useEffect } from 'react'
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'

export type Data = {
  experience?: string
  name?: string
}

export function FiltersForm(): JSX.Element {
  const form = useForm<Data>()

  const handleSubmit = (data: Data) => {
    console.log(data)
  }

  useSubmitOnChange(form, handleSubmit)

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>{/* fields */}</form>
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
