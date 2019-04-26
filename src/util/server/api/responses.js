import { prop, curry, complement, compose, pipe } from 'ramda'
import { toBoolean } from 'util/cast'
import {
  BAD_REQUEST,
  UNAUTHORIZED,
  OK,
  CREATED,
  NO_CONTENT,
  INTERNAL_ERROR,
  NOT_FOUND
} from './status'

// getStatusCode :: Response -> Integer
export const getStatusCode = prop('statusCode')

// getError :: Response -> Object
export const getError = prop('error')

// getData :: Response -> object
export const getData = prop('data')

// responseWithStatus :: Response -> Response
export const responseWithStatusCode = curry((statusCode, response) =>
  response.status(statusCode)
)

// responseWithBadRequest :: Response -> Response
export const responseWithBadRequest = responseWithStatusCode(BAD_REQUEST)

// responseWithUnauthorized :: Response -> Response
export const responseWithUnauthorized = responseWithStatusCode(UNAUTHORIZED)

// responseWithNotFound :: Response -> Response
export const responseWithNotFound = responseWithStatusCode(NOT_FOUND)

// responseWithOk :: Response -> Response
export const responseWithOk = responseWithStatusCode(OK)

// responseWithCreated : Response -> Response
export const responseWithCreated = responseWithStatusCode(CREATED)

// responseWithNoContent:: Response -> Response
export const responseWithNoContent = responseWithStatusCode(NO_CONTENT)

// responseWithInternalError :: Response -> Response
export const responseWithInternalError = responseWithStatusCode(INTERNAL_ERROR)

// responseWithJson :: Object -> Response -> Response
export const responseWithJson = curry((response, json) => response.json(json))

// responseWithSuccess :: Next -> None
export const responseWithSuccess = next => next()

// responseWithError :: Next -> Error -> None
export const responseWithError = curry((next, error) => next(error))

// responseHasData :: Response -> Boolean
export const responseHasData = compose(
  toBoolean,
  getData
)

// responseNotHasData :: Response -> Boolean
export const responseNotHasData = complement(responseHasData)

// responseWithData :: Response -> Object -> Response
export const responseWithData = curry((response, data) => {
  response.data = data
  return response
})

// responseWithDataAndSuccess :: Response -> Next -> Object -> None
export const responseWithDataAndSuccess = curry((response, next, data) =>
  pipe(
    responseWithData(response),
    () => responseWithSuccess(next)
  )(data)
)

// responseWithDataAndCreated :: Response -> Next -> Object -> None
export const responseWithDataAndCreated = curry((response, next, data) =>
  pipe(
    responseWithData(response),
    responseWithCreated,
    () => responseWithSuccess(next)
  )(data)
)
