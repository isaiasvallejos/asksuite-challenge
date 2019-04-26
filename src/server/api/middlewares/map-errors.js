import { cond, applySpec, equals, pipe, compose, always, T } from 'ramda'
import { isNotNil } from 'ramda-adjunct'

import {
  responseWithBadRequest,
  responseWithInternalError,
  responseWithStatusCode
} from 'util/server/api/responses'
import { getErrorCode, getErrorStatusCode } from 'util/error'

export default (error, request, response, next) =>
  pipe(
    cond([
      [
        compose(
          equals('EVALIDATION'),
          getErrorCode
        ),
        () => responseWithBadRequest(response)
      ],
      [
        compose(
          isNotNil,
          getErrorStatusCode
        ),
        compose(
          status => responseWithStatusCode(status, response),
          getErrorStatusCode
        )
      ],
      [T, () => responseWithInternalError(response)]
    ]),
    () => next(error)
  )(error)
