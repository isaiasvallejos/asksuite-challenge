import { curry } from 'ramda'

// mapCatchError :: Function -> Error -> Promise<Any>
export const mapCatchError = curry((map, error) => {
  throw map(error)
})
