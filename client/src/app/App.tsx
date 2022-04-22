import { Header } from './layout/Header'
import { people } from './people'
import { PersonList } from './person/list/PersonList'

type Props = {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export function App({ isDarkMode, onToggleDarkMode }: Props): JSX.Element {
  return (
    <>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />

      <PersonList people={people} />
    </>
  )
}
