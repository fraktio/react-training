import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { Root } from './app/Root'

const container = document.getElementById('root')!
const root = ReactDOM.createRoot(container)

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
)
