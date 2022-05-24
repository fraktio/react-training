import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { DarkModeButton } from './DarkModeButton'
import { Timer } from './Timer'

function useTimer() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setTime((currentTime) => currentTime + 1),
      1000
    )

    return () => clearInterval(interval)
  }, [])

  return time
}

export function Header(): JSX.Element {
  const time = useTimer()

  return (
    <Container>
      <Link to="/">
        <Title>Epic recruitment application</Title>
      </Link>

      <Timer time={time} />

      <DarkModeButton />
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
