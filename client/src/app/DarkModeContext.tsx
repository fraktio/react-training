import { createContext, useContext, useState, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type ContextValue = {
  isDarkMode: boolean
  setIsDarkMode: (isDarkMode: boolean) => void
}

const Context = createContext<ContextValue | undefined>(undefined)

export function DarkModeContext({ children }: Props): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <Context.Provider
      value={{
        isDarkMode,
        setIsDarkMode
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useDarkMode() {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error(
      'DarkModeContext: useDarkMode should be called inside DarkModeContext'
    )
  }

  return context
}
