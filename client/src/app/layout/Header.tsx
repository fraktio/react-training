import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export function Header(): JSX.Element {
  return (
    <Container>
      <Link to="/">
        <Title>Epic recruitment application</Title>
      </Link>
    </Container>
  )
}

const Container = styled.header({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const Title = styled.h1(({ theme }) => ({
  color: theme.colors.text
}))
