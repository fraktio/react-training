import { useDarkMode } from '../DarkModeContext'

import { Button } from './Button'

export function DarkModeSwitcher(): JSX.Element {
  const { isDarkMode, onToggleDarkMode } = useDarkMode()

  return (
    <Button onClick={onToggleDarkMode}>
      {isDarkMode && <>Change to light mode</>}

      {!isDarkMode && <>Change to dark mode</>}
    </Button>
  )
}
