import { useDispatch } from 'react-redux'

import { Button } from '../components/layout/form/input'
import { AddPersonForm } from '../components/person'
import { PersonList, PersonType } from '../components/person/PersonList'
import { useSelector } from '../ducks'

interface Props {
  persons: readonly Person[]
  onAddPerson: (firstName: string, lastName: string) => void
  onRemovePerson: (uuid: string) => void
}

type Person = IsHireablePerson & PersonType

export function IndexPage({ persons, onAddPerson, onRemovePerson }: Props) {
  const dispatch = useDispatch()
  const { isDark } = useSelector((state) => state.settings)

  const handleToggleDark = () => {
    dispatch({ type: 'TOGGLE_DARK' })
  }

  const hireablePersons = persons.filter(isHireable)
  const notHireablePersons = persons.filter((person) => !isHireable(person))

  return (
    <div>
      <header>
        <h2>Here's your persons:</h2>

        {!isDark && <Button onClick={handleToggleDark}>Dark mode</Button>}

        {isDark && <Button onClick={handleToggleDark}>White mode</Button>}
      </header>

      <section>
        <h3>Add a person to list</h3>

        <AddPersonForm onSubmit={onAddPerson} />
      </section>

      <>
        <section>
          <h3>Hire perhaps?</h3>

          <PersonList persons={hireablePersons} showStats onRemovePerson={onRemovePerson} />
        </section>

        <section>
          <h3>Not going to hire</h3>

          <PersonList persons={notHireablePersons} onRemovePerson={onRemovePerson} />
        </section>
      </>
    </div>
  )
}

interface IsHireablePerson {
  age: number
}

function isHireable(person: IsHireablePerson): boolean {
  return person.age > 16
}
