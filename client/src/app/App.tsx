import { Header } from './layout/Header'
import { people } from './people'

export function App(): JSX.Element {
  return (
    <>
      <Header />

      <p>Let's build something mighty!</p>

      <ul>
        {people.map((person) => (
          <li key={person.uuid}>
            <p>
              {person.firstName} {person.lastName}
            </p>

            <p>Experience: {person.experience}</p>

            {person.email && <p>Email: {person.email}</p>}
          </li>
        ))}
      </ul>
    </>
  )
}
