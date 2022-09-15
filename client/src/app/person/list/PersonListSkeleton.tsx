import styled from '@emotion/styled'

import { PersonListHeader } from './PersonListHeader'

function PersonCardSkeleton() {
  return (
    <ListItem>
      <PersonCardSkeletonContainer>
        <PersonCardSkeletonImage />
        <div>
          <PersonCardSkeletonBlock width={80} />
          <PersonCardSkeletonBlock width={55} />
        </div>
      </PersonCardSkeletonContainer>
    </ListItem>
  )
}

const ListItem = styled.li({
  listStyle: 'none'
})

const PersonCardSkeletonContainer = styled.div(
  ({ theme }) => ({
    color: theme.colors.cardText,
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    alignItems: 'center',
    border: theme.borders.cardBorder,
    transition: theme.transitions.easeOut,

    minHeight: '112px',
    div: {
      flex: 1
    }
  })
)

const PersonCardSkeletonImage = styled.div(({ theme }) => ({
  width: 64,
  maxWidth: 64,
  height: 64,
  borderRadius: '100%',
  backgroundColor: theme.colors.personCardSkeletonBackground
}))

const PersonCardSkeletonBlock = styled.div<{
  width: number
}>(({ theme, width }) => ({
  width: `${width}%`,
  height: 14,
  marginBottom: 8,
  paddingBlock: theme.spacing(0.5),
  backgroundColor: theme.colors.personCardSkeletonBackground
}))

export function PersonListSkeleton(): JSX.Element {
  return (
    <div>
      <PersonListHeader title="Potential candidates" />
      <PersonListSkeletonContainer>
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
        <PersonCardSkeleton />
      </PersonListSkeletonContainer>
    </div>
  )
}

const PersonListSkeletonContainer = styled.ul(
  ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(320px, 1fr))',
    margin: 0,
    padding: 0,
    gap: theme.spacing(2)
  })
)
