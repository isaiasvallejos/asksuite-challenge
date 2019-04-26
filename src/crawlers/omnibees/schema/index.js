import { createValidator, compileSchema } from 'vendor/json/validator'
import createKeywords from './keywords'

const validator = createValidator()

createKeywords(validator)

// validateOmnibeesSearch :: Omnibees.Search -> Promise<Omnibees.Search>
export const validateOmnibeesSearch = compileSchema(validator, {
  type: 'object',
  properties: {
    hotelId: {
      type: ['string', 'integer']
    },
    hotelName: {
      type: 'string'
    },
    checkIn: {
      type: 'string',
      isFuture: true
    },
    checkOut: {
      type: 'string',
      isAfter: { $data: '1/checkIn' }
    },
    code: {
      type: 'string'
    },
    groupCode: {
      type: 'string'
    },
    loyaltyCard: {
      type: 'string'
    },
    rooms: {
      type: 'integer',
      minimum: 1,
      maximum: 5
    },
    adults: {
      type: 'integer',
      minimum: 1,
      maximum: 10
    },
    childrens: {
      type: 'integer',
      maximum: 10
    },
    childrensAge: {
      type: 'array',
      items: {
        type: 'integer'
      }
    }
  },
  required: ['checkIn', 'checkOut'],
  additionalProperties: false
})
