import {
  ReactNode,
  createContext,
  useCallback,
  useState,
  useContext
} from 'react'

type DarkModeContextMethodsType = undefined | (() => void)
export const DarkModeContextMethods =
  createContext<DarkModeContextMethodsType>(undefined)

type DarkModeContextValueType = undefined | boolean
export const DarkModeContextValue =
  createContext<DarkModeContextValueType>(undefined)

type Props = {
  children: ReactNode
}

export function DarkModeContextProvider({
  children
}: Props) {
  const [isDark, setIsDark] = useState(false)
  const toggleDarkMode = useCallback(
    () => setIsDark((dark) => !dark),
    []
  )

  return (
    <DarkModeContextMethods.Provider value={toggleDarkMode}>
      <DarkModeContextValue.Provider value={isDark}>
        {children}
      </DarkModeContextValue.Provider>
    </DarkModeContextMethods.Provider>
  )
}

export function useDark() {
  const isDark = useContext(DarkModeContextValue)

  if (isDark === undefined) {
    throw new Error(
      'useDark: cannot call outside of dark mode context'
    )
  }

  return isDark
}

export function useToggleDark() {
  const toggleDarkMode = useContext(DarkModeContextMethods)

  if (toggleDarkMode === undefined) {
    throw new Error(
      'useToggleDark: cannot call outside of dark mode context'
    )
  }

  return toggleDarkMode
}
