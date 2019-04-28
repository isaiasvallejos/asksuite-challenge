import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.should()
chai.use(chaiAsPromised)

import { search } from '../util'
import { launchBrowser, createBrowserPage } from 'vendor/crawler'

import { goToHotelsPage } from 'crawlers/omnibees/hotels'
import {
  get$HotelRoomsUrl,
  get$Hotels,
  get$AvailableHotels
} from 'crawlers/omnibees/hotels/getters'
import { goToRoomsPage } from 'crawlers/omnibees/rooms'
import {
  get$RoomImages,
  get$RoomDetailsUrl,
  get$RoomPrice,
  is$RoomWithRestriction,
  get$Rooms,
  get$RoomAsObject
} from 'crawlers/omnibees/rooms/getters'
import { mountUrl } from 'crawlers/omnibees/hotels/url'
import { launchBrowserAndCreatePage } from 'vendor/crawler'

describe('crawlers → omnibees → rooms', () => {
  const uri = process.env.TEST_OMNIBEES_URI
  const clientId = process.env.TEST_OMNIBEES_CLIENT_ID
  const hotelsUrl = mountUrl(uri, clientId, search)

  let page
  let $hotels
  let $availableHotels
  let $hotel
  let url
  let $rooms
  let $room

  before('should get a browser page', async function() {
    this.timeout(10000)
    page = await launchBrowserAndCreatePage()
  })

  before('should go to hotels page', async function() {
    this.timeout(20000)
    return goToHotelsPage(hotelsUrl, page).should.be.fulfilled
  })

  before('should get hotel entries', async () => {
    $hotels = await get$Hotels(page)
    return $hotels.should.to.be.ok.and.not.to.be.empty
  })

  before('should has an available hotel', async function() {
    $availableHotels = await get$AvailableHotels(page, $hotels)

    if (!$availableHotels.length) return this.skip()

    $hotel = $availableHotels[0]
    return $availableHotels.should.to.be.not.empty
  })

  before('should get hotel url', async () => {
    url = await get$HotelRoomsUrl($hotel)

    return url.should.to.be.ok.and.to.not.be.empty
  })

  step('should go to rooms page', () => {
    return goToRoomsPage(url, page).should.be.fulfilled
  }).timeout(20000)

  step('should get rooms', async function() {
    $rooms = await get$Rooms(page)
    $room = $rooms[0]

    if (!$rooms.length) return this.skip()

    return $rooms.should.to.be.ok.and.not.to.be.empty
  })

  step('should verify if is a room with restrictions', async () => {
    const isRoomWithRestriction = await is$RoomWithRestriction($room)

    return isRoomWithRestriction.should.to.be.a('boolean')
  })

  step('should get room images', async () => {
    const images = await get$RoomImages($room)

    return images.should.to.be.ok.and.not.to.be.empty
  })

  step('should get room price', async () => {
    const price = await get$RoomPrice($room)

    return price.should.to.be.ok.and.to.be.a('number')
  })

  step('should get room details url', async () => {
    const url = await get$RoomDetailsUrl($room)

    return url.should.to.be.ok.and.not.to.be.empty
  })

  step('should get room as object', async () => {
    const room = await get$RoomAsObject($room)

    return room.should.to.have.all.keys([
      'title',
      'description',
      'amenities',
      'restricted',
      'images',
      'price',
      'detailsUrl'
    ])
  }).timeout(20000)
})
