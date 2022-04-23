import { useDarkMode } from '../DarkModeContext'

import { Button } from './Button'

export function DarkMode(): JSX.Element {
  const { isDarkMode, setIsDarkMode } = useDarkMode()

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <Button onClick={handleToggleDarkMode}>
      {isDarkMode ? <>Light</> : <>Dark</>}
    </Button>
  )
}
