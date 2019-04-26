import {
  curry,
  compose,
  defaultTo,
  join,
  indexOf,
  subtract,
  useWith,
  applySpec
} from 'ramda'
import { defaultWhen, isEmptyString } from 'ramda-adjunct'
import { concatAll } from 'ramda-adjunct'
import { stringify } from 'query-string'
import {
  getHotelId,
  getHotelName,
  getCheckIn,
  getCheckOut,
  getCode,
  getGroupCode,
  getLoyaltyCard,
  getRooms,
  getAdults,
  getChildrens,
  getChildrensAge
} from '../schema/props'

export const hashOrder = [
  'hotel',
  'hotelname',
  'CheckIn',
  'CheckOut',
  'Code',
  'group_code',
  'loyality_card',
  'NRooms',
  'ad',
  'ch',
  'ag'
]

// getHashKeyIndex :: String -> Integer
export const getHashKeyIndex = hashKey => indexOf(hashKey, hashOrder)

// sortByHashKeyOrder :: String -> String -> Integer
export const sortByHashKeyOrder = useWith(subtract, [
  getHashKeyIndex,
  getHashKeyIndex
])

// hashToString :: Omnibees.Hash :: String
export const hashToString = hash =>
  stringify(hash, { sort: sortByHashKeyOrder })

// defaultToEmptyHash :: a -> a | String
export const defaultToEmptyHash = defaultTo('')

// searchToHash :: Omnibees.Search -> Omnibees.Hash
export const searchToHash = applySpec({
  hotel: compose(
    defaultToEmptyHash,
    getHotelId
  ),
  hotelname: compose(
    defaultToEmptyHash,
    getHotelName
  ),
  CheckIn: getCheckIn,
  CheckOut: getCheckOut,
  Code: compose(
    defaultToEmptyHash,
    getCode
  ),
  group_code: compose(
    defaultToEmptyHash,
    getGroupCode
  ),
  loyality_card: compose(
    defaultToEmptyHash,
    getLoyaltyCard
  ),
  NRooms: compose(
    defaultTo(1),
    getRooms
  ),
  ad: compose(
    defaultTo(1),
    getAdults
  ),
  ch: compose(
    defaultTo(0),
    getChildrens
  ),
  ag: compose(
    defaultWhen(isEmptyString, '-'),
    join(';'),
    getChildrensAge
  )
})

// searchToHashString :: Omnibees.Search -> String
export const searchToHashString = compose(
  hashToString,
  searchToHash
)

// mountUrl :: String -> Integer -> Omnibees.Search -> String
export const mountUrl = curry((url, clientId, search) =>
  concatAll([
    url,
    '?c=',
    String(clientId),
    '&',
    '#/',
    searchToHashString(search)
  ])
)
