export type Try<S, E extends Error = Error> = Success<S> | Failure<E>

export interface Success<T>
  extends Readonly<{
    success: true
    value: T
  }> {}

export interface Failure<T>
  extends Readonly<{
    success: false
    error: T
  }> {}

export function success<T>(value: T): Success<T> {
  return {
    success: true,
    value
  }
}

export function failure<T>(error: T): Failure<T> {
  return {
    success: false,
    error
  }
}
