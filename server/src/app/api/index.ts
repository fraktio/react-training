import { Router } from 'express'

import { generatePeople, removePerson, addPerson, Person } from '../services/personService'
import { delay } from '../util/delay'

export function createApi(): Router {
  const router = Router()

  let people: Person[] = generatePeople(1_000)

  router.get('/people', async (_, res) => {
    // Artificial delay
    await delay(1000)

    res.json({
      data: {
        people
      },
      meta: {
        count: people.length
      }
    })
  })

  router.get('/people/:uuid', async (req, res) => {
    const person = people.find((person) => person.uuid === req.params.uuid)

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

  router.delete('/people/:uuid', async (req, res) => {
    // Artificial delay
    await delay(1000)

    people = removePerson(people, req.params.uuid)

    res.json({})
  })

  router.post('/people', async (req, res) => {
    // Artificial delay
    await delay(1000)

    const { firstName, lastName } = req.body

    people = addPerson(people, firstName, lastName)

    res.json({})
  })

  router.get('/people/:uuid/related', async (req, res) => {
    const person = people.find((person) => person.uuid === req.params.uuid)

    if (person) {
      const related = people.filter(
        (p) => p.experience === person.experience && p.uuid !== person.uuid
      )

      res.json({
        data: {
          related
        },
        meta: {
          count: related.length
        }
      })
    } else {
      res.status(404).json({})
    }
  })

  router.post('/people/:uuid/toggle-star', async (req, res) => {
    const person = people.find((person) => person.uuid === req.params.uuid)

    if (person) {
      person.isStarred = !person.isStarred

      res.json({
        data: {
          person
        }
      })
    } else {
      res.status(404).json({})
    }
  })

  return router
}
