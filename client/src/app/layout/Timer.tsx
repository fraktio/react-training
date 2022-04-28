import styled from '@emotion/styled'

type Props = {
  time: number
}

export function Timer({ time }: Props): JSX.Element {
  return (
    <Container>
      {Math.floor(time / 60)}:
      {(time % 60).toString().padStart(2, '0')}
    </Container>
  )
}

const Container = styled.div(({ theme }) => ({
  fontSize: theme.spacing(2),
  color: theme.colors.textDimmed
}))
