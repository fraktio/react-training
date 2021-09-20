import { createApp } from './setup/express'
import { createApi } from './app/api'

const app = createApp()

const host = 'localhost'
const port = 8889

app.use('/', createApi())

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`>>> Server listening at http://${host}:${port}, env: ${app.get('env')}`)
})
