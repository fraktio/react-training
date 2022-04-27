import { useDarkMode } from '../DarkModeContext'

import { Button } from './Button'

export function DarkMode(): JSX.Element {
  const { isDarkMode, onToggleDarkMode } = useDarkMode()

  return (
    <Button onClick={onToggleDarkMode}>
      {isDarkMode ? <>Dark</> : <>Light</>}
    </Button>
  )
}
