import React from 'react'
import { Field, Form } from 'react-final-form'

import { Button } from '../layout/form/input/Button'
import { Input } from '../layout/form/input/Input'

interface Props {
  onAddPerson: (firstName: string, lastName: string) => void
}

interface Values {
  firstName?: string
  lastName?: string
}

interface Errors {
  firstName?: string
  lastName?: string
}

export function AddPersonForm({ onAddPerson }: Props) {
  const onSubmit = (values: Values) => {
    const { firstName, lastName } = values

    if (firstName && lastName) {
      onAddPerson(firstName, lastName)
    }
  }

  const validate = (values: Values) => {
    let errors: Errors = {}

    if (!values.firstName || (values.firstName && values.firstName.length < 3)) {
      errors.firstName = 'Kolme merkkiä min'
    }

    if (!values.lastName || (values.lastName && values.lastName.length < 3)) {
      errors.lastName = 'Kolme merkkiä min!!'
    }

    return errors
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, form, valid }) => (
        <form
          onSubmit={async event => {
            await handleSubmit(event)

            form.reset()
          }}
        >
          <Field name="firstName">
            {({ input, meta }) => (
              <div>
                <label>Etunimi</label>
                <Input type="text" {...input} placeholder="Matti" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <Field name="lastName">
            {({ input, meta }) => (
              <div>
                <label>Sukunimi</label>
                <Input type="text" {...input} placeholder="Meikäläinen" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <Button type="submit" disabled={!valid}>
            Lisää
          </Button>
        </form>
      )}
    />
  )
}
