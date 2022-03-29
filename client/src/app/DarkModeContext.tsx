import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'

type Props = {
  children: ReactNode
}

export function DarkModeContext({ children }: Props): JSX.Element {
  const [isDark, setIsDark] = useState(false)

  const handleToggle = useCallback(() => {
    setIsDark((currentValue) => !currentValue)
  }, [])

  return (
    <DarkModeDispatchContext.Provider value={handleToggle}>
      <DarkModeValueContext.Provider value={isDark}>
        {children}
      </DarkModeValueContext.Provider>
    </DarkModeDispatchContext.Provider>
  )
}

type ValueContext = boolean | undefined

const DarkModeValueContext = createContext<ValueContext>(undefined)

export function useDarkModeValue(): boolean {
  const isDark = useContext(DarkModeValueContext)

  if (isDark === undefined) {
    throw new Error('useDarkModeValue can only be used inside DarkModeContext')
  }

  return isDark
}

type DispatchContext = (() => void) | undefined

const DarkModeDispatchContext = createContext<DispatchContext>(undefined)

export function useDarkModeDispatch(): () => void {
  const setDarkMode = useContext(DarkModeDispatchContext)

  if (setDarkMode === undefined) {
    throw new Error(
      'useDarkModeDispatch can only be used inside DarkModeContext'
    )
  }

  return setDarkMode
}
