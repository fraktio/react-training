import { Header } from './layout/Header'
import { people } from './people'
import { PersonList } from './person/list/PersonList'

export function App(): JSX.Element {
  return (
    <>
      <Header />

      <PersonList people={people} />
    </>
  )
}
