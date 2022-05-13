import styled from '@emotion/styled'

import { PersonCard, Person as PersonCardPerson } from '../card/PersonCard'

import { PersonListHeader } from './PersonListHeader'

type Person = {
  uuid: string
} & PersonCardPerson

type Props = {
  isUpdating: boolean
  people: Person[]
}

export function PersonList({ isUpdating, people }: Props): JSX.Element {
  return (
    <div>
      <PersonListHeader
        title="Potential Candidates"
        description={
          isUpdating ? <>Updating...</> : <>Showing {people.length} people</>
        }
      />
      <ListContainer>
        {people.map((person) => (
          <ListItem key={person.uuid}>
            <PersonCard person={person} />
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
  listStyleType: 'none'
})
