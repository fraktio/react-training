import { createContext, ReactNode, useContext, useState } from 'react'

type ContextValue = {
  isDarkMode: boolean
  setIsDarkMode: (isDarkMode: boolean) => void
}

const Context = createContext<ContextValue | undefined>(undefined)

type Props = {
  children: ReactNode
}

export function DarkModeContext({ children }: Props): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <Context.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </Context.Provider>
  )
}

export function useDarkMode(): ContextValue {
  const value = useContext(Context)

  if (value === undefined) {
    throw new Error('useDarkMode must be used inside DarkModeContext')
  }

  return value
}
