import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    spacing: {
      small: number
      medium: number
    }
    borderRadius: {
      medium: number
    }
    color: {
      primary: string
      background: string
    }
  }
}
