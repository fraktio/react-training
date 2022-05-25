import { useIsDarkMode, useToggleDarkMode } from '../DarkModeContext'

import { Button } from './Button'

export function DarkModeButton(): JSX.Element {
  const isDarkMode = useIsDarkMode()
  const onToggleDarkMode = useToggleDarkMode()

  return (
    <Button onClick={onToggleDarkMode}>
      {isDarkMode ? <>Switch to light mode</> : <>Switch to dark mode</>}
    </Button>
  )
}
