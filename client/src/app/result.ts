export type Result<T> = Ok<T> | Fail

type Ok<T> = {
  ok: true
  value: T
}

type Fail = {
  ok: false
  error: Error
}

export function ok<T>(value: T): Ok<T> {
  return {
    ok: true,
    value
  }
}

export function fail(error: Error): Fail {
  return {
    ok: false,
    error
  }
}

export async function withResult<T>(
  callback: () => Promise<T>
): Promise<Result<T>> {
  try {
    return ok(await callback())
  } catch (e) {
    if (e instanceof Error) {
      return fail(e)
    }

    if (typeof e === 'string') {
      return fail(new Error(e))
    }

    return fail(new Error('unknown error occurred'))
  }
}

export function unwrapResult<T>(result: Result<T>): T {
  if (!result.ok) {
    throw result.error
  }

  return result.value
}
