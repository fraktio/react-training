import {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react'

type ContextType = {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

const Context = createContext<ContextType | undefined>(
  undefined
)

type Props = {
  children: ReactNode
}

export function DarkModeContext({
  children
}: Props): JSX.Element {
  const { isDarkMode, onToggleDarkMode } =
    useDarkModeState()

  return (
    <Context.Provider
      value={{ isDarkMode, onToggleDarkMode }}
    >
      {children}
    </Context.Provider>
  )
}

export function useDarkMode(): ContextType {
  const value = useContext(Context)

  if (value === undefined) {
    throw new Error(
      'useDarkMode must be used inside DarkModeContext'
    )
  }

  return value
}

function useDarkModeState() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return {
    isDarkMode,
    onToggleDarkMode: handleToggleDarkMode
  }
}
