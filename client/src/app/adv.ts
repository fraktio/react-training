type HumanePerson = Person & {
  isLeftHanded: boolean
}

type Description = Person['description']
type People = Person[]
type Person1 = People[number]

type Readonly<Type> = {
  readonly [Property in keyof Type]: Type[Property]
}

type ReadonlyPerson = Readonly<Person>

// cond ? true : false
type Required<T> = T extends undefined
  ? never
  : {
      [P in keyof T]-?: Required<T[P]>
    }

type RequiredPerson = Required<Person>

export type Person = {
  uuid: string
  firstName: string
  lastName: string
  experience: number
  email: string | null
  avatar: string | null
  description: string | null | undefined
  isStarred?: boolean
}

type PersonName = Pick<Person, 'firstName' | 'lastName'>

declare function getPerson(uuid: string): Promise<Person>

type AnyFunction = (...args: any) => any

type ReturnType<T extends AnyFunction> = T extends (...args: any) => infer R
  ? R
  : never

type Parameters<T extends AnyFunction> = T extends (...args: infer P) => any
  ? P
  : never

type GetPersonParams = Parameters<typeof getPerson>

type GetPersonReturnType = ReturnType<typeof getPerson>

type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer V>
  ? V
  : never

type Person2 = UnwrapPromise<GetPersonReturnType>
