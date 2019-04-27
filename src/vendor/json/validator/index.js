import { assoc } from 'ramda'
import { curryAsync } from 'util/ramda'

import Ajv from 'ajv'

// createValidator :: Ajv.Validator
export const createValidator = () =>
  new Ajv({
    $data: true,
    allErrors: true,
    jsonPointers: true
  })

// compileSchema :: Ajv.Validator -> Ajv.Schema -> Object -> Promise<Object>
export const compileSchema = curryAsync(async (validator, schema, data) => {
  try {
    const compile = validator.compile({ $async: true, ...schema })
    return await compile(data)
  } catch (error) {
    error.code = 'EVALIDATION'
    error.prototype = new Error()

    throw error
  }
})
