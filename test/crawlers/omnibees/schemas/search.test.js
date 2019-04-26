import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.should()
chai.use(chaiAsPromised)

import { format } from 'date-fns'
import { validateOmnibeesSearch } from 'crawlers/omnibees/schema'
import {
  afterTomorrow,
  formatedAfterTomorrow,
  formatedTomorrow,
  formatedYesterday,
  tomorrow
} from '../util'

describe('crawlers → omnibees → schemas → search', () => {
  it('should fullfil on valid schema', () => {
    const schema = {
      checkIn: formatedTomorrow,
      checkOut: formatedAfterTomorrow
    }

    return validateOmnibeesSearch(schema).should.eventually.equal(schema)
  })

  it('should fail with invalid dates', () => {
    return Promise.all([
      validateOmnibeesSearch({
        checkIn: '99999999',
        checkOut: '99999999'
      }).should.be.rejected,
      validateOmnibeesSearch({
        checkIn: 'Invalid Date',
        checkOut: 'Invalid Date'
      }).should.be.rejected
    ])
  })

  it('should fail with invalid dates formats', () => {
    const schema = {
      checkIn: format(tomorrow, 'yyyy-MM-dd'),
      checkOut: format(afterTomorrow, 'yyyy-MM-dd')
    }

    return validateOmnibeesSearch(schema).should.be.rejected
  })

  it('should fail if check in is a past date', () => {
    const schema = {
      checkIn: formatedYesterday,
      checkOut: formatedAfterTomorrow
    }

    return validateOmnibeesSearch(schema).should.be.rejected
  })

  it('should fail if check out is a past date', () => {
    const schema = {
      checkIn: formatedTomorrow,
      checkOut: formatedYesterday
    }

    return validateOmnibeesSearch(schema).should.be.rejected
  })

  it('should fail if check in is after check out', () => {
    const schema = {
      checkIn: formatedAfterTomorrow,
      checkOut: formatedTomorrow
    }

    return validateOmnibeesSearch(schema).should.be.rejected
  })
})
