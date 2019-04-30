import * as Promise from 'bluebird'
import { curry } from 'ramda'

// mapCatchError :: Function -> Error -> Promise<Any>
export const mapCatchError = curry((map, error) => {
  throw map(error)
})

// disposer :: (None -> Promise<a>) -> (a -> Promise<None>) -> Promise.Disposer
export const disposer = curry((acquireFn, disposeFn) =>
  Promise.resolve()
    .then(acquireFn)
    .disposer(disposeFn)
)
