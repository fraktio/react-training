import { PersonCard, Person as PersonCardPerson } from '../card/PersonCard'

import { PersonListHeader } from './PersonListHeader'

type Props = {
  people: Person[]
}

type Person = {
  uuid: string
} & PersonCardPerson

export function PersonList({ people }: Props): JSX.Element {
  return (
    <div>
      <PersonListHeader
        title="Potential candidates"
        description={<>Showing {people.length} people</>}
      />

      <ul>
        {people.map((person) => (
          <li key={person.uuid}>
            <PersonCard person={person} />
          </li>
        ))}
      </ul>
    </div>
  )
}
