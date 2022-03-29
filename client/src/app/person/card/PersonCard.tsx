import styled from '@emotion/styled'

export function PersonCard(): JSX.Element {
  return (
    <Container>
      {/* avatar */}

      <About>{/* title, experience, email */}</About>
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
