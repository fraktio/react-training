import styled from '@emotion/styled'

import placeholderSvg from './avatarPlaceholder.svg'

type Props = {
  name: string
  size?: number
}

export function Placeholder({
  name,
  size
}: Props): JSX.Element {
  return (
    <Img
      src={placeholderSvg}
      alt={`Placeholder avatar of ${name}`}
      width={size ?? 64}
      height={size ?? 64}
    />
  )
}

const Img = styled.img({})
