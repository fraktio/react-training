import styled from '@emotion/styled'

import { Avatar } from './Avatar/Avatar'
import { Experience } from './Experience'

type Props = {
  person: Person
  onToggleStarred: () => void
}

type Person = {
  firstName: string
  lastName: string
  experience: number
  email: string | null
  avatar: string | null
  description: string | null
  isStarred: boolean
}

export function PersonView({ person, onToggleStarred }: Props): JSX.Element {
  return (
    <>
      <Container>
        <Avatar
          uri={person.avatar}
          name={`${person.firstName} ${person.lastName}`}
          size={200}
        />

        <About>
          <Header>
            <BasicInfo>
              <Title>
                {person.firstName} {person.lastName}
              </Title>

              <Experience years={person.experience} />

              {person.email && <Email>{person.email}</Email>}
            </BasicInfo>

            <StarButton onClick={onToggleStarred} isStarred={person.isStarred}>
              ⭑
            </StarButton>
          </Header>

          <Description>
            {person.description?.split('\n\n').map((line, index) => (
              <Paragraph key={index}>{line}</Paragraph>
            ))}
          </Description>
        </About>
      </Container>
    </>
  )
}

const Container = styled.section(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(4)
}))

const About = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}))

const Header = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(4)
}))

const BasicInfo = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1)
}))

const Title = styled.h1(({ theme }) => ({
  fontWeight: 600,
  margin: 0,
  color: theme.colors.text
}))

const Email = styled.span(({ theme }) => ({
  color: theme.colors.textDimmed
}))

const StarButton = styled.button<{ isStarred: boolean }>(
  ({ theme, isStarred }) => ({
    background: 'none',
    border: 0,
    alignSelf: 'flex-start',
    fontSize: theme.spacing(6),
    lineHeight: `${theme.spacing(6)}px`,
    cursor: 'pointer',
    color: isStarred ? theme.colors.personStarred : theme.colors.personUnstarred
  })
)

const Description = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  color: theme.colors.textDimmed
}))

const Paragraph = styled.p({
  margin: 0
})
