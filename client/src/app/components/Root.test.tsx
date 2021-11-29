import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { FormProvider } from 'react-hook-form'

import { config } from '../../config'
import { PersonsResponse } from '../services/personService'

import { InputFirstName } from './InputFirstName'
import { Providers } from './Root'

const server = setupServer(
  rest.get(
    `${config.API_URL}/persons`,
    (_req, res, ctx) => {
      const response: PersonsResponse = {
        data: {
          persons: [
            {
              uuid: 'uuid',
              firstName: 'First',
              lastName: 'Last',
              age: 20,
              email: null,
              address: null
            }
          ]
        },
        meta: {
          personsCount: 1
        }
      }

      return res(ctx.json(response))
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('form', () => {
  const component = (
    <FormProvider>
      <InputFirstName />
    </FormProvider>
  )
})

test('renders the main screen', async () => {
  const { getByText } = render(<Providers />)

  expect(
    getByText(/Awesome recruitment app!/)
  ).toBeInTheDocument()
})

test('displays loading', async () => {
  const { getByText } = render(<Providers />)

  expect(getByText(/Loading/)).toBeInTheDocument()
})

test('handles server error', async () => {
  server.use(
    rest.get(
      `${config.API_URL}/persons`,
      (_req, res, ctx) => {
        return res(ctx.status(500))
      }
    )
  )

  const { getByText } = render(<Providers />)

  const element = await waitFor(() =>
    getByText(/Something went wrong/)
  )

  expect(element).toBeInTheDocument()
})

test('displays person', async () => {
  const { getByText } = render(<Providers />)

  const element = await waitFor(() =>
    getByText(/First Last/)
  )

  expect(element).toBeInTheDocument()
})
