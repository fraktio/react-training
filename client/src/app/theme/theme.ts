import { lighten } from 'polished'
import { Theme } from './styled'

export const lightTheme: Theme = {
  spacing: {
    small: 8,
    medium: 16
  },
  palette: {
    backgroundColor: lighten(0.3, 'red'),
    color: 'black'
  }
}

export const darkTheme: Theme = {
  spacing: {
    small: 8,
    medium: 16
  },
  palette: {
    backgroundColor: '#999',
    color: 'white'
  }
}
