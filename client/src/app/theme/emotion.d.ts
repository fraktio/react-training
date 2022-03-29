import '@emotion/react'

import { Theme as ActualTheme } from './theme'

declare module '@emotion/react' {
  export interface Theme extends ActualTheme {}
}
