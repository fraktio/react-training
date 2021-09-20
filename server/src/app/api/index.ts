import { Router } from 'express'

import { generatePersons, removePerson, addPerson } from '../services/personService'
import { delay } from '../util/delay'

export function createApi(): Router {
  const router = Router()

  let persons = generatePersons(100)

  router.get('/persons', async (_, res) => {
    // Artificial delay
    await delay(1000)

    res.json({
      data: {
        persons
      },
      meta: {
        personsCount: persons.length
      }
    })
  })

  router.get('/persons/:uuid', async (req, res) => {
    // Artificial delay
    await delay(1000)

    const person = persons.find((person) => person.uuid === req.params.uuid)

    if (person) {
      res.json({
        data: {
          person
        }
      })
    } else {
      res.status(404).json({})
    }
  })

  router.delete('/persons/:uuid', async (req, res) => {
    // Artificial delay
    await delay(1000)

    persons = removePerson(persons, req.params.uuid)

    res.json({})
  })

  router.post('/persons', async (req, res) => {
    // Artificial delay
    await delay(1000)

    const { firstName, lastName } = req.body

    persons = addPerson(persons, firstName, lastName)

    res.json({})
  })

  return router
}
