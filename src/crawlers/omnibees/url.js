import {
  getQueryParameterFromUrl,
  addQueryParameterToUrl
} from 'util/query-string'

// getLanguageFromUrl :: String -> String
export const getLanguageFromUrl = getQueryParameterFromUrl('lang')

// addLanguageToUrl :: String -> String -> String
export const addLanguageToUrl = addQueryParameterToUrl('lang')
