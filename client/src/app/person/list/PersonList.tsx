import styled from '@emotion/styled'

import { PersonCard, type Person as PersonCardPerson } from '../card/PersonCard'

import { PersonListHeader } from './PersonListHeader'

type Props = {
  people: Person[]
}

type Person = {
  uuid: string
} & PersonCardPerson

export function PersonList({ people }: Props): JSX.Element {
  return (
    <>
      <PersonListHeader
        title="Potential candidates"
        description={<>{people.length} persons</>}
      />

      <ListContainer>
        {people.map((person) => (
          <ListItem key={person.uuid}>
            <PersonCard person={person} />
          </ListItem>
        ))}
      </ListContainer>
    </>
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
