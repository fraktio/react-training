import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import { DarkMode } from './DarkMode'
import { Timer } from './Timer'

export function Header(): JSX.Element {
  return (
    <Container>
      <Link to="/">
        <Title>Epic recruitment software</Title>
      </Link>

      <Actions>
        <Timer />

        <DarkMode />
      </Actions>
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

const Actions = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2)
}))
