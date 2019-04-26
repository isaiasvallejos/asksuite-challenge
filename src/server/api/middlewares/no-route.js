import { applySpec, always, pipe } from 'ramda'
import {
  getStatusCode,
  responseWithJson,
  responseWithNotFound
} from 'util/server/api/responses'

export default (request, response, next) =>
  pipe(
    responseWithNotFound,
    applySpec({
      statusCode: getStatusCode,
      message: always('The requested resource could not be found')
    }),
    responseWithJson(response)
  )(response)
