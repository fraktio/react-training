import { Router } from 'express'

import { generatePersons, removePerson, addPerson } from '../services/personService'

export function createApi(): Router {
  const router = Router()

  let persons = generatePersons(100)

  router.get('/persons', (_, res) => {
    res.json({
      data: {
        persons
      },
      meta: {
        personsCount: persons.length
      }
    })
  })

  router.delete('/persons/:uuid', (req, res) => {
    persons = removePerson(persons, req.params.uuid)

    res.json({})
  })

  router.post('/persons', async (req, res) => {
    const { firstName, lastName } = req.body

    persons = addPerson(persons, firstName, lastName)

    res.json({})
  })

  return router
}
