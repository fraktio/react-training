import React from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  onSubmit: (firstName: string, lastName: string) => void
}

interface FormData {
  firstName: string
  lastName: string
}

export function AddPersonForm({ onSubmit }: Props) {
  const { register, handleSubmit, errors, reset } = useForm<FormData>()

  return (
    <form
      onSubmit={handleSubmit((data: FormData) => {
        onSubmit(data.firstName, data.lastName)

        reset()
      })}
    >
      <div>
        <label htmlFor="firstName">First name</label>

        <input name="firstName" ref={register({ required: true })} placeholder="John" />

        {errors.firstName && <div>First name is required</div>}
      </div>

      <div>
        <label htmlFor="lastName">Last name</label>

        <input name="lastName" ref={register({ required: true })} placeholder="Smith" />

        {errors.lastName && <div>Last name is required</div>}
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
