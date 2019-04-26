import { cond, applySpec, equals, pipe, compose, always } from 'ramda'

import { getStatusCode, responseWithJson } from 'util/server/api/responses'
import { getErrorSanitized } from 'util/error'

import {
  NOT_FOUND,
  INTERNAL_ERROR,
  CONFLICT,
  BAD_REQUEST
} from 'util/server/api/status'

export default (error, request, response, next) =>
  pipe(
    applySpec({
      statusCode: getStatusCode,
      message: compose(
        cond([
          [
            equals(BAD_REQUEST),
            always('Server cannot or will not process the request')
          ],
          [
            equals(NOT_FOUND),
            always('The requested data was not found or is empty')
          ],
          [
            equals(CONFLICT),
            always(
              'The request could not be completed due a conflict with target resource'
            )
          ],
          [
            equals(INTERNAL_ERROR),
            always('Server encountered an internal error, try again later')
          ]
        ]),
        getStatusCode
      ),
      error: always(getErrorSanitized(error))
    }),
    responseWithJson(response)
  )(response)
