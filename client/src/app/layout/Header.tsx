import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import { DarkMode } from './DarkMode'

type Props = {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export function Header({ isDarkMode, onToggleDarkMode }: Props): JSX.Element {
  return (
    <Container>
      <Link to="/">
        <Title>Epic recruitment application</Title>
      </Link>

      <DarkMode isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
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
