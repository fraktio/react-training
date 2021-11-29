import { useFormContext } from 'react-hook-form'

export function InputFirstName() {
  const { register } = useFormContext()

  return (
    <>
      <label htmlFor="firstName">First Name</label>
      <input
        {...register('firstName', {
          required: true
        })}
        placeholder="first name"
      />
    </>
  )
}
