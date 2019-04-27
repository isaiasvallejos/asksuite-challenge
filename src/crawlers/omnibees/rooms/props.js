import { prop, assoc, map, compose } from 'ramda'
import { removeQueryParameterFromUrl } from 'util/query-string'

// getRestricted :: Omnibees.Hotel -> Boolean
export const getRestricted = prop('restricted')

// getImages :: Omnibees.Hotel -> String[]
export const getImages = prop('images')

// getPrice :: Omnibees.Hotel -> Number
export const getPrice = prop('price')

// getDetailsUrl :: Omnibees.Hotel -> String
export const getDetailsUrl = prop('detailsUrl')

// setRestricted :: Boolean -> Omnibees.Hotel
export const setRestricted = assoc('restricted')

// setImages :: String[] -> Omnibees.Hotel
export const setImages = compose(
  assoc('images'),
  map(removeQueryParameterFromUrl('sz'))
)

// setPrice :: Number -> Omnibees.Hotel
export const setPrice = assoc('price')

// setDetailsUrl :: String -> Omnibees.Hotel
export const setDetailsUrl = assoc('detailsUrl')
