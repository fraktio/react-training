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
    <Container>
      <PersonListHeader
        title="Potential candidates"
        description={`Showing ${people.length} people`}
      />

      <ListContainer>
        {people.map((person) => (
          <ListItem key={person.uuid}>
            <PersonCard person={person} />
          </ListItem>
        ))}
      </ListContainer>
    </Container>
  )
}

const Container = styled.div(({ theme }) => ({
  marginTop: theme.spacing(2)
}))

const ListContainer = styled.ul(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  margin: 0,
  padding: 0,
  gap: theme.spacing(1)
}))

const ListItem = styled.li({
  listStyle: 'none'
})
