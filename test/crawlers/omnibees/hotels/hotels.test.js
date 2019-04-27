import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.should()
chai.use(chaiAsPromised)

import { search } from '../util'
import { launchBrowser, createBrowserPage } from 'vendor/crawler'

import { goToHotelsPage } from 'crawlers/omnibees/hotels'
import {
  get$HotelDescription,
  get$HotelAddress,
  get$HotelAmenities,
  get$HotelAmenityTitle,
  get$HotelAmenityList,
  get$HotelPrice,
  get$HotelName,
  get$HotelRoomsUrl,
  is$HotelWithRestrictions,
  get$Hotels,
  get$AvailableHotels
} from 'crawlers/omnibees/hotels/getters'

describe('crawlers → omnibees → hotels', () => {
  const url = process.env.TEST_OMNIBEES_URL
  const clientId = process.env.TEST_OMNIBEES_CLIENT_ID

  let page
  let $hotels

  before('should get a browser page', async function() {
    this.timeout(10000)
    const browser = await launchBrowser()
    page = await createBrowserPage(browser)
  })

  step('should go to hotels page', () => {
    return goToHotelsPage(url, clientId, search, page).should.be.fulfilled
  }).timeout(20000)

  step('should get hotels', async () => {
    $hotels = await get$Hotels(page)
    return $hotels.should.to.be.ok.and.not.to.be.empty
  })

  describe('hotels → available', () => {
    let $availableHotels
    let $hotel

    before('should has an available hotel', async function() {
      $availableHotels = await get$AvailableHotels(page, $hotels)

      if (!$availableHotels.length) return this.skip()

      $hotel = $availableHotels[0]
      return $availableHotels.should.to.be.not.empty
    })

    step('should verify if is a hotel with restrictions', async () => {
      const isHotelWithRestrictions = await is$HotelWithRestrictions(
        page,
        $hotel
      )

      return isHotelWithRestrictions.should.to.be.a('boolean')
    })

    step('should get hotel url', async () => {
      const url = await get$HotelRoomsUrl($hotel)

      return url.should.to.be.ok.and.to.not.be.empty
    })

    step('should get hotel name', async () => {
      const name = await get$HotelName($hotel)

      return name.should.to.be.ok.and.to.not.be.empty
    })

    step('should get hotel price', async () => {
      const price = await get$HotelPrice($hotel)

      return price.should.to.be.ok.and.to.be.a('number')
    })

    step('should get hotel description', async () => {
      const description = await get$HotelDescription($hotel)

      return description.should.to.be.ok.and.to.not.be.empty
    })

    step('should get hotel address', async () => {
      const address = await get$HotelAddress($hotel)

      return address.should.to.be.ok.and.to.not.be.empty
    })

    describe('hotels → available → amenities', () => {
      let $hotelAmenities
      let $hotelAmenity

      step('should get hotel amenities', async () => {
        $hotelAmenities = await get$HotelAmenities($hotel)
        $hotelAmenity = $hotelAmenities[0]

        return $hotelAmenities.should.to.be.not.empty
      })

      step('should get hotel amenity title', async () => {
        const title = await get$HotelAmenityTitle($hotelAmenity)

        return title.should.to.be.ok.and.to.not.be.empty
      })

      step('should get hotel amenity list', async () => {
        const list = await get$HotelAmenityList($hotelAmenity)

        return list.should.to.be.ok.and.to.not.be.empty
      })
    })
  })
})
