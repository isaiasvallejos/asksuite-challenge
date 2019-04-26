import { equals } from 'ramda'

// isEnvironment :: String -> Boolean
export const isEnvironment = equals(process.env.NODE_ENV)

// isProduction :: Boolean
export const isProduction = () => isEnvironment('production')

// isDevelopment :: Boolean
export const isDevelopment = () => isEnvironment('development')

// isTest :: Boolean
export const isTest = () => isEnvironment('test')
