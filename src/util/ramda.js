import {
  partialRight,
  flip,
  mergeDeepWith,
  concat,
  append,
  otherwise,
  indexOf
} from 'ramda'

import { mapCatchError } from './promise'
import { curry as _curryAsync } from 'rambda'

/**
 * @see https://ramdajs.com/docs
 */

export const flippedPartialRight = flip(partialRight)

export const mergeDeepAlsoConcat = mergeDeepWith(concat)

export const flippedAppend = flip(append)

export const mapOtherwise = fn => otherwise(mapCatchError(fn))

export const curryAsync = _curryAsync
