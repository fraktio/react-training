import styled from '@emotion/styled'

type Props = {
  isStarred: boolean
  onToggleStarred: () => void
}

export function StarButton({
  isStarred,
  onToggleStarred
}: Props): JSX.Element {
  return (
    <Container
      onClick={onToggleStarred}
      isStarred={isStarred}
    >
      ⭑
    </Container>
  )
}

const Container = styled.button<{ isStarred: boolean }>(
  ({ theme, isStarred }) => ({
    background: 'none',
    border: 0,
    alignSelf: 'flex-start',
    fontSize: theme.spacing(6),
    lineHeight: `${theme.spacing(6)}px`,
    cursor: 'pointer',
    color: isStarred
      ? theme.colors.personStarred
      : theme.colors.personUnstarred
  })
)
