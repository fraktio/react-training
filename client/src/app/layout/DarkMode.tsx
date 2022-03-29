import { useDarkModeDispatch, useDarkModeValue } from '../DarkModeContext'

import { Button } from './Button'

export function DarkMode(): JSX.Element {
  const isDark = useDarkModeValue()
  const onToggleDark = useDarkModeDispatch()

  return (
    <Button onClick={onToggleDark}>{isDark ? <>Dark</> : <>Light</>}</Button>
  )
}
