import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import { useDarkModeDispatch, useDarkModeValue } from '../DarkModeContext'

import { Button } from './Button'

export function Header(): JSX.Element {
  const isDarkMode = useDarkModeValue()
  const onToggleDarkMode = useDarkModeDispatch()

  return (
    <Container>
      <Link to="/">
        <Title>Epic recruitment application</Title>
      </Link>
      <Button onClick={onToggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
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
