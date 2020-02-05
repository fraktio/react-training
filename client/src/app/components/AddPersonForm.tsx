import React from 'react'
import { Form, Field } from 'react-final-form'
import { Button } from './Button'
import { Input } from './Input'

interface Props {
  onAdd: (firstName: string, lastName: string) => void
}

interface Values {
  firstName?: string
  lastName?: string
}

interface Errors {
  firstName?: string
  lastName?: string
}

export function AddPersonForm({ onAdd }: Props) {
  const handleFormSubmit = (values: Values) => {
    const { firstName, lastName } = values

    if (firstName && lastName) {
      onAdd(firstName, lastName)
    }
  }

  const validate = (values: Values) => {
    let errors: Errors = {}

    if (!values.firstName) {
      errors['firstName'] = 'Etunimi vaadittu'
    }

    if (!values.lastName) {
      errors['lastName'] = 'Sukunimi vaadittu'
    }

    return errors
  }

  return (
    <Form
      onSubmit={handleFormSubmit}
      validate={validate}
      render={({ handleSubmit, valid, form }) => (
        <form
          onSubmit={async event => {
            event.preventDefault()

            await handleSubmit()

            form.reset()
          }}
        >
          <div>
            <Field
              name="firstName"
              render={({ input, meta }) => (
                <div>
                  <label>Etunimi</label>

                  <Input {...input} />

                  {meta.touched && meta.error && (
                    <span>{meta.error}</span>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Field
              name="lastName"
              render={({ input, meta }) => (
                <div>
                  <label>Sukunimi</label>

                  <Input {...input} />

                  {meta.touched && meta.error && (
                    <span>{meta.error}</span>
                  )}
                </div>
              )}
            />
          </div>

          <Button type="submit" disabled={!valid}>
            Submit
          </Button>
        </form>
      )}
    />
  )
}
