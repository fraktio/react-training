import styled from '@emotion/styled'

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

      <PersonListContainer>
        {people.map((person) => (
          <ListItem key={person.uuid}>
            <PersonCard person={person} />
          </ListItem>
        ))}
      </PersonListContainer>
    </div>
  )
}

const PersonListContainer = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  margin: 0,
  padding: 0,
  gap: theme.spacing(2)
}))

const ListItem = styled.li({
  listStyle: 'none'
})
