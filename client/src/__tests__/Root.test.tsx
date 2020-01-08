import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Root } from '../app/Root'

describe('Root', () => {
  it('renders the main screen', async () => {
    const { getByText } = render(<Root />)

    expect(getByText(/React training/)).toBeInTheDocument()
  })
})
