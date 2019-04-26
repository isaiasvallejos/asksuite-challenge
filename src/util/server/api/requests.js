import { prop, compose } from 'ramda'

// getParams :: Request -> Object
export const getParams = prop('params')

// getQuery :: Request -> Object
export const getQuery = prop('query')

// getBody :: Request -> Object
export const getBody = prop('body')

// getHeaders :: Request -> Object
export const getHeaders = prop('headers')

// getIdParam :: Request -> String
export const getIdParam = compose(
  prop('id'),
  getParams
)
