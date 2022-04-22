import { Button } from './Button'

type Props = {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export function DarkMode({ isDarkMode, onToggleDarkMode }: Props): JSX.Element {
  return (
    <Button onClick={onToggleDarkMode}>
      {isDarkMode ? <>Light</> : <>Dark</>}
    </Button>
  )
}
