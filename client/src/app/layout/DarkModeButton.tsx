import { useIsDarkMode, useToggleDarkMode } from '../DarkModeContext'

import { Button } from './Button'

export function DarkModeButton(): JSX.Element {
  const isDarkMode = useIsDarkMode()
  const onToggleDarkMode = useToggleDarkMode()

  return (
    <Button onClick={onToggleDarkMode}>
      {isDarkMode ? <>Light</> : <>Dark</>}
    </Button>
  )
}
