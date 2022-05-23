import { ReactNode, createContext, useState, useContext } from 'react'

type DarkModeActions = () => void

const DarkModeActionsContext = createContext<DarkModeActions | undefined>(
  undefined
)

type DarkModeValue = boolean

const DarkModeValueContext = createContext<DarkModeValue | undefined>(undefined)

type Props = {
  children: ReactNode
}

export function DarkModeContext({ children }: Props): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false)

  function handleToggleDarkMode() {
    setIsDarkMode((prevModeIsDark) => !prevModeIsDark)
  }

  return (
    <DarkModeActionsContext.Provider value={handleToggleDarkMode}>
      <DarkModeValueContext.Provider value={isDarkMode}>
        {children}
      </DarkModeValueContext.Provider>
    </DarkModeActionsContext.Provider>
  )
}

export function useToggleDarkMode(): () => void {
  const context = useContext(DarkModeActionsContext)

  if (context === undefined) {
    throw new Error(
      'Cannot use useToggleDarkMode outside of DarkModeActionsContext'
    )
  }

  return context
}

export function useIsDarkMode(): boolean {
  const context = useContext(DarkModeValueContext)

  if (context === undefined) {
    throw new Error('Cannot use useIsDarkMode outside of DarkModeValueContext')
  }

  return context
}
