import styled from '@emotion/styled'
import { ReactNode } from 'react'

type Props = {
  title: ReactNode
  description?: ReactNode
}

export function PersonListHeader({ title, description }: Props): JSX.Element {
  return (
    <ListHeader>
      <ListTitle>{title}</ListTitle>

      {description && (
        <Description role="status" aria-live="polite">
          {description}
        </Description>
      )}
    </ListHeader>
  )
}

const ListHeader = styled.header(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(2),
  alignItems: 'flex-end'
}))

const ListTitle = styled.h2(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 500,
  color: theme.colors.text,
  lineHeight: '1em'
}))

const Description = styled.p(({ theme }) => ({
  fontWeight: 400,
  color: theme.colors.textDimmed
}))
