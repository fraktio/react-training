import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

export function Timer(): JSX.Element {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <Container>
      {Math.floor(count / 60)}:{(count % 60).toString().padStart(2, '0')}
    </Container>
  )
}

const Container = styled.div(({ theme }) => ({
  fontSize: theme.spacing(2),
  color: theme.colors.textDimmed
}))
