import { compose, pickAll, prop } from 'ramda'
import { safeJsonParse } from './json'

// errorToJson :: Error -> String
export const errorToJson = error =>
  JSON.stringify(error, Object.getOwnPropertyNames(error))

// errorToObject :: Error -> Object
export const errorToObject = compose(
  safeJsonParse,
  errorToJson
)

// getErrorSanitized :: Error -> Object
export const getErrorSanitized = compose(
  pickAll(['name', 'message', 'code', 'errors', 'error']),
  errorToObject
)

// getErrorCode :: String | Integer
export const getErrorCode = prop('code')

// getErrorStatusCode :: String | Integer
export const getErrorStatusCode = prop('statusCode')
