import { expect } from 'chai'

import { searchToHash, mountUrl } from 'crawlers/omnibees/hotels/url'
import { formatedTomorrow, formatedAfterTomorrow } from '../util'

describe('crawlers → omnibees → hotels → url', () => {
  const search = {
    checkIn: formatedTomorrow,
    checkOut: formatedAfterTomorrow
  }

  const definedSearch = {
    hotelId: 1234,
    hotelName: 'teste',
    checkIn: formatedTomorrow,
    checkOut: formatedAfterTomorrow,
    code: 123,
    groupCode: 123,
    loyaltyCard: 123,
    rooms: 2,
    adults: 2,
    childrens: 1,
    childrensAge: [1, 2]
  }

  const fakeUrl = 'https://test.omnibees.com/chain.aspx'
  const clientId = 123

  it('should get url hash with default properties', () => {
    expect(searchToHash(search)).to.be.eql({
      hotel: '',
      hotelname: '',
      CheckIn: search.checkIn,
      CheckOut: search.checkOut,
      Code: '',
      group_code: '',
      loyality_card: '',
      NRooms: 1,
      ad: 1,
      ch: 0,
      ag: '-'
    })
  })

  it('should mount url with default properties', () => {
    const mountedUrl = mountUrl(fakeUrl, clientId, search)

    expect(mountedUrl).to.be.equal(
      `${fakeUrl}?c=${clientId}&#/hotel=&hotelname=&CheckIn=${
        search.checkIn
      }&CheckOut=${
        search.checkOut
      }&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`
    )
  })

  it('should mount url with defined properties', () => {
    const mountedUrl = mountUrl(fakeUrl, clientId, definedSearch)

    expect(mountedUrl).to.be.equal(
      `${fakeUrl}?c=${clientId}&#/hotel=${definedSearch.hotelId}&hotelname=${
        definedSearch.hotelName
      }&CheckIn=${definedSearch.checkIn}&CheckOut=${
        definedSearch.checkOut
      }&Code=${definedSearch.code}&group_code=${
        definedSearch.groupCode
      }&loyality_card=${definedSearch.loyaltyCard}&NRooms=${
        definedSearch.rooms
      }&ad=${definedSearch.adults}&ch=${
        definedSearch.childrens
      }&ag=${definedSearch.childrensAge.join('%3B')}`
    )
  })
})
