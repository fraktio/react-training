import { useForm } from 'react-hook-form'

interface Props {
  onSubmit: (firstName: string, lastName: string) => void
}

interface Data {
  firstName: string
  lastName: string
}

export function AddPersonForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Data>()

  return (
    <form
      onSubmit={handleSubmit((data: Data) => {
        onSubmit(data.firstName, data.lastName)

        reset()
      })}
    >
      <div>
        <label htmlFor="firstName">First name</label>

        <input {...register('firstName', { required: true })} placeholder="John" />

        {errors.firstName && <div>First name is required</div>}
      </div>

      <div>
        <label htmlFor="lastName">Last name</label>

        <input {...register('lastName', { required: true })} placeholder="Smith" />

        {errors.lastName && <div>Last name is required</div>}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
