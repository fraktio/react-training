import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    spacing: {
      small: number
      medium: number
    }
    border: {
      radius: {
        medium: number
      }
    }
  }
}
