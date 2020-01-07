import React from 'react'
import { Form, Field } from 'react-final-form'

interface Props {
  onSubmit: (firstName: string, lastName: string) => void
}

interface Values {
  firstName?: string
  lastName?: string
}

interface Errors {
  firstName?: string
  lastName?: string
}

export function AddPersonForm({ onSubmit }: Props) {
  const handleSubmit = (values: Values) => {
    const { firstName, lastName } = values

    if (firstName && lastName) {
      onSubmit(firstName, lastName)
    }
  }

  const validate = (values: Values) => {
    const errors: Errors = {}

    if (!values.firstName) {
      errors.firstName = 'First name is required'
    }

    if (!values.lastName) {
      errors.lastName = 'Last name is required'
    }

    return errors
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      render={({ handleSubmit, submitting, valid, form }) => (
        <form
          onSubmit={async (event) => {
            await handleSubmit(event)

            form.reset()
          }}
        >
          <Field name="firstName">
            {({ input, meta }) => (
              <div>
                <label htmlFor="firstName">First name</label>

                <input {...input} id="firstName" type="text" placeholder="John" />

                {meta.error && meta.touched && <div>{meta.error}</div>}
              </div>
            )}
          </Field>

          <Field name="lastName">
            {({ input, meta }) => (
              <div>
                <label htmlFor="lastName">Last name</label>

                <input {...input} id="lastName" type="text" placeholder="Smith" />

                {meta.error && meta.touched && <div>{meta.error}</div>}
              </div>
            )}
          </Field>

          <button type="submit" disabled={submitting || !valid}>
            Submit
          </button>
        </form>
      )}
    />
  )
}
