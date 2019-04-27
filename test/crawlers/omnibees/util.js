import { format, addDays, subDays } from 'date-fns'
import { VALIDATION_DATE_FORMAT } from 'crawlers/omnibees/schema/keywords'

export const now = new Date()
export const yesterday = subDays(now, 1)
export const tomorrow = addDays(now, 1)
export const afterTomorrow = addDays(now, 2)
export const formatedYesterday = format(yesterday, VALIDATION_DATE_FORMAT)
export const formatedTomorrow = format(tomorrow, VALIDATION_DATE_FORMAT)
export const formatedAfterTomorrow = format(
  afterTomorrow,
  VALIDATION_DATE_FORMAT
)
export const search = {
  checkIn: formatedTomorrow,
  checkOut: formatedAfterTomorrow,
  rooms: 1,
  adults: 1,
  childrens: 2,
  childrensAge: [10, 15]
}
