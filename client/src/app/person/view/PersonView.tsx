import styled from '@emotion/styled'

export function PersonView(): JSX.Element {
  return (
    <Container>
      {/* avatar */}

      <About>
        <Header>
          <BasicInfo>{/* title, experience, email */}</BasicInfo>
        </Header>

        {/* description */}
      </About>
    </Container>
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

const Description = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  color: theme.colors.textDimmed
}))

const Paragraph = styled.p({
  margin: 0
})
