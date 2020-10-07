import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { App } from '../app/components/App'

describe('Application', () => {
  it('renders the main screen', async () => {
    render(<App />)

    expect(screen.getByRole('heading')).toHaveTextContent('React training')
  })
})
