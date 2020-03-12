/** @jsx jsx */
import { jsx } from '@emotion/core'

import { Context } from './App'
import { styled } from '../styled/styled'

interface Props {
  person: PersonType
  onDelete: () => void
}

export interface PersonType {
  uuid: string
  firstName: string
  lastName: string
  age: number
}

export function Person({ person, onDelete }: Props) {
  return (
    <Context.Consumer>
      {context => {
        console.log(context)
        return (
          <Container>
            <p>id: {person.uuid}</p>
            <p>
              nimi: {person.firstName} {person.lastName}
            </p>
            <p>ikä: {person.age}</p>

            <button onClick={onDelete}>Poista</button>
          </Container>
        )
      }}
    </Context.Consumer>
  )
}

const Container = styled.div(props => ({
  border: props.theme.isDark ? '2px solid black' : '4px solid #ccc',
  background: props.theme.colors.primary,
  padding: props.theme.spacing.small,
  margin: props.theme.spacing.large,
  borderRadius: props.theme.borderRadiuses.medium,

  ':hover': {
    backgroundColor: 'red'
  }
}))
