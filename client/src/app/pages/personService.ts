import axios from 'axios'

import { config } from '../../config'
import { Result, withResult } from '../result'

export type GetPeopleResponse = {
  data: {
    people: Person[]
  }
  meta: {
    count: number
  }
}

type Person = {
  uuid: string
  firstName: string
  lastName: string
  experience: number
  email: string | null
  avatar: string | null
  description: string | null
  isStarred: boolean
}

export async function getPeople(): Promise<Result<GetPeopleResponse>> {
  return withResult(async () => {
    const { data } = await axios.get<GetPeopleResponse>(
      `${config.API_URL}/people`
    )

    return data
  })
}

type GetPersonResponse = {
  data: {
    person: Person
  }
}

export async function getPerson(
  uuid: string
): Promise<Result<GetPersonResponse>> {
  return withResult(async () => {
    const { data } = await axios.get<GetPersonResponse>(
      `${config.API_URL}/people/${uuid}`
    )

    return data
  })
}

export type GetRelatedPeopleResponse = {
  data: {
    related: Person[]
  }
  meta: {
    count: number
  }
}

export async function getRelatedPeople(
  uuid: string
): Promise<Result<GetRelatedPeopleResponse>> {
  return withResult(async () => {
    const { data } = await axios.get<GetRelatedPeopleResponse>(
      `${config.API_URL}/people/${uuid}/related`
    )

    return data
  })
}

export type ToggleStarPersonResponse = {
  data: {
    person: Person
  }
}

export async function toggleStarPerson(
  uuid: string
): Promise<Result<ToggleStarPersonResponse>> {
  return withResult(async () => {
    const { data } = await axios.post<ToggleStarPersonResponse>(
      `${config.API_URL}/people/${uuid}/toggle-star`
    )

    return data
  })
}
