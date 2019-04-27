import { compose, prop, dissocPath, curry, concat, converge, __ } from 'ramda'
import { parseUrl } from 'query-string'
import { stringify } from 'querystring'

// getParsedUrl :: { url: String, query: Object } -> String
export const getParsedUrl = prop('url')

// getParsedQuery :: { url: String, query: Object } -> Object
export const getParsedQuery = prop('query')

// parsedToString :: { url: String, query: Object } -> String
export const parsedToString = converge(concat, [
  compose(
    concat(__, '?'),
    getParsedUrl
  ),
  compose(
    stringify,
    getParsedQuery
  )
])

// removeQueryParameterFromUrl :: String -> String -> String
export const removeQueryParameterFromUrl = curry((parameter, url) =>
  compose(
    parsedToString,
    dissocPath(['query', parameter]),
    parseUrl
  )(url)
)
