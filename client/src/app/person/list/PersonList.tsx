import styled from '@emotion/styled'

export function PersonList(): JSX.Element {
  return <Container></Container>
}

const Container = styled.div({})

const ListContainer = styled.ul(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  margin: 0,
  padding: 0,
  gap: theme.spacing(2)
}))

const ListItem = styled.li({
  listStyle: 'none'
})
