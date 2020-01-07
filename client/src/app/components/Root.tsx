import { Global } from '@emotion/react'

import image from '../assets/social_media_recruitment.png'

import { App } from './App'

export function Root() {
  return (
    <>
      <Global
        styles={{
          body: {
            background: `url(${image})`
          }
        }}
      />

      <App />
    </>
  )
}
