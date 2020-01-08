import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { Root } from '../app/Root'
import { PersonsResponse } from '../app/services/personService'
import { config } from '../config'

const server = setupServer(
  rest.get(`${config.API_URL}/persons`, (_req, res, ctx) => {
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
        personsCount: 0
      }
    }

    return res(ctx.json(response))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders the main screen', async () => {
  const { getByText } = render(<Root />)

  expect(getByText(/React training/)).toBeInTheDocument()
})

test('displays loading', async () => {
  const { getByText } = render(<Root />)

  expect(getByText(/Loading/)).toBeInTheDocument()
})

test('handles server error', async () => {
  server.use(
    rest.get(`${config.API_URL}/persons`, (_req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  const { getByText } = render(<Root />)

  const element = await waitFor(() => getByText(/Something went wrong/))

  expect(element).toBeInTheDocument()
})

test('displays person', async () => {
  const { getByText } = render(<Root />)

  const element = await waitFor(() => getByText(/First Last/))

  expect(element).toBeInTheDocument()
})
