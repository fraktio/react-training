import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { DarkMode } from './DarkMode'
import { Timer } from './Timer'

export function Header(): JSX.Element {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((t) => t + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Container>
      <Link to="/">
        <Title>Epic recruitment application</Title>
      </Link>

      <Timer time={time} />
      <DarkMode />
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
