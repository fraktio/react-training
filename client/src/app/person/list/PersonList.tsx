import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import {
  PersonCard,
  type Person as PersonCardPerson
} from '../card/PersonCard'

import { PersonListHeader } from './PersonListHeader'

type Props = {
  people: Person[]
  isPending: boolean
}

type Person = {
  uuid: string
} & PersonCardPerson

export function PersonList({
  people,
  isPending
}: Props): JSX.Element {
  return (
    <>
      <PersonListHeader
        title="Potential candidates"
        description={
          <>
            {people.length} persons
            {isPending && <> - updating...</>}
          </>
        }
      />

      <ListContainer isPending={isPending}>
        {people.map((person) => (
          <ListItem key={person.uuid}>
            <Link to={`/people/${person.uuid}`}>
              <PersonCard person={person} />
            </Link>
          </ListItem>
        ))}
      </ListContainer>
    </>
  )
}

const ListContainer = styled.ul<{ isPending: boolean }>(
  ({ theme, isPending }) => ({
    opacity: isPending ? 0.5 : 1,
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(320px, 1fr))',
    margin: 0,
    padding: 0,
    gap: theme.spacing(2)
  })
)

const ListItem = styled.li({
  listStyle: 'none'
})
