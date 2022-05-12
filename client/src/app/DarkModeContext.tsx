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

type DarkModeValueContextType = boolean

const DarkModeValueContext = createContext<
  DarkModeValueContextType | undefined
>(undefined)

type DarkModeActionContextType = {
  onToggleDarkModeContext: () => void
}

const DarkModeActionContext = createContext<
  DarkModeActionContextType | undefined
>(undefined)

export function DarkModeContext({ children }: Props): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleToggleDarkMode = useCallback(
    () => setIsDarkMode((state) => !state),
    []
  )

  return (
    <DarkModeActionContext.Provider
      value={{ onToggleDarkModeContext: handleToggleDarkMode }}
    >
      <DarkModeValueContext.Provider value={isDarkMode}>
        {children}
      </DarkModeValueContext.Provider>
    </DarkModeActionContext.Provider>
  )
}

export function useDarkModeDispatch(): () => void {
  const dispatch = useContext(DarkModeActionContext)

  if (dispatch === undefined) {
    throw new Error(
      'Cannot use useDarkModeDispatch hook outside of DarkModeContext'
    )
  }

  return dispatch.onToggleDarkModeContext
}

export function useDarkModeValue(): boolean {
  const isDarkMode = useContext(DarkModeValueContext)

  if (isDarkMode === undefined) {
    throw new Error(
      'Cannot use useDarkModeValue hook outside of DarkModeContext'
    )
  }

  return isDarkMode
}
