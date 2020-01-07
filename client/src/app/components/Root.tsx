import React from 'react'
import { Global } from '@emotion/core'

import { App } from './App'
import image from '../assets/social_media_recruitment.png'

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
