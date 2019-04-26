import errorsMiddleware from './errors'
import mapErrorsMiddleware from './map-errors'
import notRouteMiddleware from './no-route'
import dataMiddleware from './data'
import { loggerMiddleware, errorLoggerMiddleware } from './log'
import bodyParser from 'body-parser'

export const preRoutesMiddlewares = [bodyParser.json(), loggerMiddleware]

export const postRoutesMiddlewares = [
  dataMiddleware,
  mapErrorsMiddleware,
  errorsMiddleware,
  errorLoggerMiddleware,
  notRouteMiddleware
]
