import { applySpec, pipe } from 'ramda'

import {
  getStatusCode,
  responseWithJson,
  getData,
  responseNotHasData
} from 'util/server/api/responses'

export default (request, response, next) => {
  if (responseNotHasData(response)) return next()

  return pipe(
    applySpec({
      statusCode: getStatusCode,
      data: getData
    }),
    responseWithJson(response)
  )(response)
}
