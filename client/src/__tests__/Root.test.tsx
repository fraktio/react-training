import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Root } from '../app/Root'

test('renders the main screen', async () => {
  const { getByText } = render(<Root />)

  expect(getByText(/Epic recruitment application/)).toBeInTheDocument()
})
