import { tryCatch, always } from 'ramda'

// safeJsonParse :: String | Any -> Object
export const safeJsonParse = tryCatch(JSON.parse, always(null))
