import styled from '@emotion/styled'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDarkModeDispatch, useDarkModeValue } from '../DarkModeContext'

import { Button } from './Button'
import { Timer } from './Timer'

export function Header(): JSX.Element {
  const isDarkMode = useDarkModeValue()
  const onToggleDarkMode = useDarkModeDispatch()

  const [time, setTime] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((previousTime) => previousTime + 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <Container>
      <Link to="/">
        <Title>Epic recruitment application</Title>
      </Link>
      <Timer time={time} />
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
