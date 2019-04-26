import { parse, isAfter } from 'date-fns'

export const VALIDATION_DATE_FORMAT = 'ddMMyyyy'

export default validator => {
  validator.addKeyword('isFuture', {
    type: 'string',
    schema: false,
    validate: stringDate => {
      const date = parse(stringDate, VALIDATION_DATE_FORMAT, new Date())
      return isAfter(date, new Date())
    }
  })

  validator.addKeyword('isAfter', {
    $data: true,
    type: 'string',
    validate: (stringDateToCompare, stringDate) => {
      const date = parse(stringDate, VALIDATION_DATE_FORMAT, new Date())
      const dateToCompare = parse(
        stringDateToCompare,
        VALIDATION_DATE_FORMAT,
        new Date()
      )

      return isAfter(date, dateToCompare)
    }
  })

  return validator
}
