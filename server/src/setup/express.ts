import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Application } from 'express'

export function createApp(): Application {
  const app = express()

  app.use(
    cors({
      allowedHeaders: ['Authorization', 'Content-Type', 'Credentials'],
      credentials: true,
      exposedHeaders: ['Content-Disposition'],
      origin: 'http://localhost:3000'
    })
  )

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  return app
}
