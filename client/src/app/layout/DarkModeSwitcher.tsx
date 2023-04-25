import { useDarkMode } from '../DarkModeContext'

export function DarkModeSwitcher(): JSX.Element {
  const { isDarkMode, onToggle } = useDarkMode()

  return (
    <button onClick={onToggle}>
      {isDarkMode ? 'Switch to light' : 'Switch to dark'}
    </button>
  )
}
