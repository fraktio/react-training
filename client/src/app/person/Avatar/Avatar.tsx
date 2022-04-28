import styled from '@emotion/styled'

import { Placeholder } from './Placeholder'

type Props = {
  uri: string | null
  name: string
  size?: number
}

export function Avatar({
  uri,
  name,
  size
}: Props): JSX.Element {
  if (!uri) {
    return <Placeholder name={name} size={size} />
  }

  return (
    <Img
      src={uri}
      alt={name}
      width={size ?? 64}
      height={size ?? 64}
    />
  )
}

const Img = styled.img({})
