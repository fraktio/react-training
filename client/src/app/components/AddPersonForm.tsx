import { useForm } from 'react-hook-form'

type Props = {
  onSubmit: (data: Data) => void
}

export type Data = {
  firstName: string
  lastName: string
}

export function AddPersonForm({ onSubmit }: Props) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<Data>()

  const submit = (data: Data) => {
    onSubmit(data)

    reset()
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <label htmlFor="firstName">First name</label>
        <input
          {...register('firstName', {
            validate: (value) => value.length > 2 || 'Must be 2 characters'
          })}
        />
        {errors.firstName && errors.firstName.message}
      </div>

      <div>
        <label htmlFor="lastName">Last name</label>
        <input {...register('lastName', { required: 'Required' })} />
        {errors.lastName && errors.lastName.message}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
