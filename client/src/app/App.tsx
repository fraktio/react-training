import { Header } from './layout/Header'
import { people } from './people'
import { PersonCard } from './person/card/PersonCard'

export function App(): JSX.Element {
  return (
    <>
      <Header />

      <p>Let's build something mighty!</p>

      <ul>
        {people.map((person) => (
          <li key={person.uuid}>
            <PersonCard person={person} />
          </li>
        ))}
      </ul>
    </>
  )
}
