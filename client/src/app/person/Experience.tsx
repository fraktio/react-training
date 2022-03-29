import styled from '@emotion/styled'

type Props = {
  years: number
}

export function Experience({ years }: Props): JSX.Element {
  const star = '⭑'

  return (
    <Text>
      {star.repeat(years / 5)} {years} years
    </Text>
  )
}

const Text = styled.span(({ theme }) => ({
  color: theme.colors.textDimmed
}))
