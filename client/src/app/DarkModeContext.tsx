import {
  ReactNode,
  createContext,
  useContext,
  useState
} from 'react'

type ContextValue = {
  isDarkMode: boolean
  onToggle: () => void
}

const Context = createContext<ContextValue | undefined>(
  undefined
)

type Props = {
  children: ReactNode
}

export function DarkModeContext({
  children
}: Props): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleToggle = () =>
    setIsDarkMode((previousDarkMode) => !previousDarkMode)

  return (
    <Context.Provider
      value={{
        isDarkMode,
        onToggle: handleToggle
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useDarkMode(): ContextValue {
  const value = useContext(Context)

  if (value === undefined) {
    throw new Error(
      'useDarkMode must be used inside DarkModeContext'
    )
  }

  return value
}
