import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import { PersonCard, Person as PersonCardPerson } from '../card/PersonCard'

import { PersonListHeader } from './PersonListHeader'

type Props = {
  title: string
  people: Person[]
  isUpdating?: boolean
}

type Person = {
  uuid: string
} & PersonCardPerson

export function PersonList({
  title,
  people,
  isUpdating = false
}: Props): JSX.Element {
  return (
    <Container>
      <PersonListHeader
        title={title}
        description={
          <>
            Showing {people.length} people
            {isUpdating && <> - updating...</>}
          </>
        }
      />

      <ListContainer isUpdating={isUpdating}>
        {people.map((person) => (
          <Link key={person.uuid} to={`/people/${person.uuid}`}>
            <ListItem>
              <PersonCard person={person} />
            </ListItem>
          </Link>
        ))}
      </ListContainer>
    </Container>
  )
}

const Container = styled.div({})

const ListContainer = styled.ul<{ isUpdating: boolean }>(
  ({ theme, isUpdating }) => ({
    opacity: isUpdating ? 0.5 : 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    margin: 0,
    padding: 0,
    gap: theme.spacing(2)
  })
)

const ListItem = styled.li({
  listStyle: 'none'
})
