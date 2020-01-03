import { Router } from 'express'

import { generatePersons } from '../services/personService'

export function createApi(): Router {
  const router = Router()

  const personsCount = 100

  const persons = generatePersons(personsCount)

  router.get('/persons', (_, res) => {
    res.json({
      data: {
        persons
      },
      meta: {
        personsCount
      }
    })
  })

  return router
}
