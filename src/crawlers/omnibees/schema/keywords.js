import { parse, isAfter, isEqual, format } from 'date-fns'
import { compose } from 'ramda'

export const VALIDATION_DATE_FORMAT = 'ddMMyyyy'

// parseStringDate :: String -> Date
const parseStringDate = stringDate =>
  parse(stringDate, VALIDATION_DATE_FORMAT, new Date())

// parseStringDate :: String
const getFormattedDateNow = () => format(new Date(), VALIDATION_DATE_FORMAT)

// parseStringDate :: Date
const getParsedAndFormattedDateNow = compose(
  parseStringDate,
  getFormattedDateNow
)

export default validator => {
  validator.addKeyword('isTodayOrFuture', {
    type: 'string',
    schema: false,
    validate: stringDate => {
      const date = parseStringDate(stringDate)
      const dateNow = getParsedAndFormattedDateNow()

      return isAfter(date, dateNow) || isEqual(date, dateNow)
    }
  })

  validator.addKeyword('isAfter', {
    $data: true,
    type: 'string',
    validate: (stringDateToCompare, stringDate) => {
      const date = parseStringDate(stringDate)
      const dateToCompare = parseStringDate(stringDateToCompare)

      return isAfter(date, dateToCompare)
    }
  })

  return validator
}
