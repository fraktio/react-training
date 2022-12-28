import { LoaderFunction, useLoaderData } from 'react-router-dom'
import invariant from 'tiny-invariant'
import { PersonView } from '../../person/view/PersonView'
import { unwrapResult } from '../../result'
import { getPerson, GetPersonResponse } from '../personService'

type Person = GetPersonResponse['data']['person']

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params
  invariant(id, 'person id param is missing')

  const result = unwrapResult(await getPerson(id))

  return result.data.person
}

export function PersonPage(): JSX.Element {
  const person = useLoaderData() as Person

  return <PersonView person={person} />
}

export function PersonPageError() {
  return (
    <div>
      <h1>Error happened</h1>
      <p>Person not found other error happened</p>
    </div>
  )
}
