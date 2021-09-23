import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useContext
} from 'react'

type ModeContextProps = {
  children: ReactNode
}

const ModeContextDispatch = createContext<(() => void) | undefined>(undefined)
const ModeContextValues = createContext<boolean | undefined>(undefined)

export function ModeContext({ children }: ModeContextProps) {
  const [isDark, setIsDark] = useState(false)

  const handleToggleDark = useCallback(() => {
    setIsDark((currentState) => !currentState)
  }, [])

  return (
    <ModeContextDispatch.Provider value={handleToggleDark}>
      <ModeContextValues.Provider value={isDark}>
        {children}
      </ModeContextValues.Provider>
    </ModeContextDispatch.Provider>
  )
}

export function useDarkMode() {
  const values = useContext(ModeContextValues)

  if (values === undefined) {
    throw new Error('Using useDarkMode() outside of ModeContextValues')
  }

  return values
}

export function useToggleDarkMode() {
  const toggler = useContext(ModeContextDispatch)

  if (!toggler) {
    throw new Error('Using useToggleDarkMode() outside of ModeContextDispatch')
  }

  return toggler
}
