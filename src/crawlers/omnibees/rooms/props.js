import { prop, assoc, map, compose } from 'ramda'
import { removeQueryParameterFromUrl } from 'util/query-string'

// getCrawlId :: Omnibees.Room -> String
export const getCrawlId = prop('crawlId')

// getRestricted :: Omnibees.Room -> Boolean
export const getRestricted = prop('restricted')

// getImages :: Omnibees.Room -> String[]
export const getImages = prop('images')

// getPrice :: Omnibees.Room -> Number
export const getPrice = prop('price')

// getDetailsUrl :: Omnibees.Room -> String
export const getDetailsUrl = prop('detailsUrl')

//setCrawlId :: Omnibees.Room -> String
export const setCrawlId = assoc('crawlId')

// setRestricted :: Boolean -> Omnibees.Room
export const setRestricted = assoc('restricted')

// setImages :: String[] -> Omnibees.Room
export const setImages = compose(
  assoc('images'),
  map(removeQueryParameterFromUrl('sz'))
)

// setPrice :: Number -> Omnibees.Room
export const setPrice = assoc('price')

// setDetailsUrl :: String -> Omnibees.Room
export const setDetailsUrl = assoc('detailsUrl')
