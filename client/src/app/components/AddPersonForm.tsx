import { useForm, FormProvider } from 'react-hook-form'

import { InputFirstName } from './InputFirstName'

type Data = {
  firstName: string
  lastName: string
}

type Props = {
  onSubmit: (data: Data) => void
}

export function AddPersonForm({ onSubmit }: Props) {
  const formMethods = useForm<Data>()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = formMethods

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data)
          reset()
        })}
      >
        <div>
          {errors.firstName && <>First name is required</>}
          <InputFirstName />
        </div>
        <div>
          {errors.lastName && <>Last name is required</>}
          <label htmlFor="lastName">Last Name</label>
          <input
            {...register('lastName', {
              required: true
            })}
            placeholder="last name"
          />
        </div>
        <div>
          <button type="submit">Add person</button>
        </div>
      </form>
    </FormProvider>
  )
}
