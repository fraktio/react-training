import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Person as PersonCardPerson, PersonCard } from '../card/PersonCard'
import { PersonListHeader } from './PersonListHeader'

type Props = {
  people: Person[]
  isUpdating: boolean
}

type Person = {
  uuid: string
} & PersonCardPerson

export function PersonList({ people, isUpdating }: Props): JSX.Element {
  return (
    <div>
      <PersonListHeader
        title="Potential candidates"
        description={`Showing ${people.length} people ${
          isUpdating ? '- Updating...' : ''
        }`}
      />
      <ListContainer>
        {people.map((person) => (
          <ListItem key={person.uuid}>
            <Link to={`/people/${person.uuid}`}>
              <PersonCard person={person} />
            </Link>
          </ListItem>
        ))}
      </ListContainer>
    </div>
  )
}

const ListContainer = styled.ul(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  margin: 0,
  padding: 0,
  gap: theme.spacing(2)
}))

const ListItem = styled.li({
  listStyle: 'none'
})
