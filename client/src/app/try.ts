export type Try<T> = Success<T> | Failure

type Success<T> = {
  success: true
  value: T
}

type Failure = {
  success: false
}
