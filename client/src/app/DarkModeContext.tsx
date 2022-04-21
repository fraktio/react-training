import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function DarkModeContext({ children }: Props): JSX.Element {
  return <>{children}</>
}
