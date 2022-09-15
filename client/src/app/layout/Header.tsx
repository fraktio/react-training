import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { DarkModeSwitcher } from './DarkModeSwitcher'
import { Timer } from './Timer'

export function Header(): JSX.Element {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((previousTime) => previousTime + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Container>
      <Link to="/">
        <Title>Epic recruitment application</Title>
      </Link>

      <DarkModeSwitcher />

      <Timer time={time} />
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
