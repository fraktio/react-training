import styled from '@emotion/styled'

import { Avatar } from '../Avatar/Avatar'
import { Experience } from '../Experience'

type Props = {
  person: Person
}

export type Person = {
  firstName: string
  lastName: string
  experience: number
  email: string | null
  avatar: string | null
  isStarred: boolean
}

export function PersonCard({ person }: Props): JSX.Element {
  return (
    <Container>
      <Avatar
        uri={person.avatar}
        name={`${person.firstName} ${person.lastName}`}
      />

      <About>
        <Title>
          {person.isStarred && '⭑'} {person.firstName}{' '}
          {person.lastName}
        </Title>

        <Experience years={person.experience} />

        {person.email && <Email>{person.email}</Email>}
      </About>
    </Container>
  )
}

const Container = styled.div(({ theme }) => ({
  color: theme.colors.cardText,
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  backgroundColor: theme.colors.cardBackground,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  alignItems: 'center',
  border: theme.borders.cardBorder,
  transition: theme.transitions.easeOut,
  minHeight: '112px',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: theme.colors.cardBackgroundHovered
  }
}))

const About = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  overflow: 'hidden',
  gap: theme.spacing(0.5)
}))

const Title = styled.p({
  fontWeight: 600,
  margin: 0
})

const Email = styled.span(({ theme }) => ({
  color: theme.colors.cardTextDimmed,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}))
