import React, { FormEvent } from 'react'
import { Form, Field } from 'react-final-form'
import { styled } from '../styled/styled'

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
    if (values.firstName && values.lastName) {
      onSubmit(values.firstName, values.lastName)
    }
  }

  const handleValidate = (values: Errors) => {
    let errors: Errors = {}

    if (!values.firstName) {
      errors.firstName = 'Etunimi ei saa olla tyhjä'
    }

    if (!values.lastName) {
      errors.lastName = 'Sukunimi ei saa olla tyhjä'
    }

    return errors
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validate={handleValidate}
      render={({ handleSubmit, valid, form }) => (
        <form
          onSubmit={async (event: FormEvent) => {
            event.preventDefault()

            await handleSubmit()

            form.reset()
          }}
        >
          <Field
            name="firstName"
            render={({ input, meta }) => (
              <FieldContainer error={meta.touched && meta.error}>
                <label>Etunimi</label>
                <input placeholder="Etunimi" {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </FieldContainer>
            )}
          />

          <Field
            name="lastName"
            render={({ input, meta }) => (
              <FieldContainer error={meta.touched && meta.error}>
                <label>Sukunimi</label>
                <input placeholder="Sukunimi" {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </FieldContainer>
            )}
          />

          <button type="submit" disabled={!valid}>
            Submit
          </button>
        </form>
      )}
    />
  )
}

const FieldContainer = styled.div<{ error: boolean }>(props => ({
  backgroundColor: props.error ? 'red' : 'transparent'
}))
