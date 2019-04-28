import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.should()
chai.use(chaiAsPromised)

import { launchBrowser, createBrowserPage } from 'vendor/crawler'
import { goToHotelsPage } from 'crawlers/omnibees/hotels'
import {
  get$HotelRoomsUrl,
  get$Hotels,
  get$AvailableHotels
} from 'crawlers/omnibees/hotels/getters'
import { goToRoomsPage } from 'crawlers/omnibees/rooms'
import { get$RoomDetailsUrl, get$Rooms } from 'crawlers/omnibees/rooms/getters'
import { search } from '../util'
import { goToRoomDetailsPage } from 'crawlers/omnibees/room-details'
import {
  get$RoomDescription,
  get$RoomAmenities,
  get$RoomAmenityTitle,
  get$RoomAmenityList,
  get$RoomTitle,
  get$RoomDetails,
  get$RoomDetailsAsObject
} from 'crawlers/omnibees/room-details/getters'
import { mountUrl } from 'crawlers/omnibees/hotels/url'
import { launchBrowserAndCreatePage } from 'vendor/crawler'

describe('crawlers → omnibees → rooms → details', () => {
  const uri = process.env.TEST_OMNIBEES_URI
  const clientId = process.env.TEST_OMNIBEES_CLIENT_ID
  const hotelsUrl = mountUrl(uri, clientId, search)

  let page
  let detailsPage
  let $hotels
  let $availableHotels
  let $hotel
  let roomsUrl
  let $rooms
  let $room
  let url
  let $roomDetails

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
    roomsUrl = await get$HotelRoomsUrl($hotel)

    return roomsUrl.should.to.be.ok.and.to.not.be.empty
  })

  before('should go to rooms page', async function() {
    this.timeout(20000)
    return goToRoomsPage(roomsUrl, page).should.be.fulfilled
  })

  step('should get rooms', async function() {
    $rooms = await get$Rooms(page)
    $room = $rooms[0]

    if (!$rooms.length) return this.skip()

    return $rooms.should.to.be.ok.and.not.to.be.empty
  })

  step('should get room details url', async () => {
    url = await get$RoomDetailsUrl($room)

    return url.should.to.be.ok.and.not.to.be.empty
  })

  step('should go to room details page', async () => {
    detailsPage = await launchBrowserAndCreatePage()
    return goToRoomDetailsPage(url, detailsPage).should.be.fulfilled
  }).timeout(20000)

  step('should get room details', async () => {
    $roomDetails = await get$RoomDetails(detailsPage)

    return $roomDetails.should.to.be.ok
  })

  step('should get room title', async () => {
    const title = await get$RoomTitle($roomDetails)

    return title.should.to.be.ok.and.not.empty
  })

  step('should get room description', async () => {
    const description = await get$RoomDescription($roomDetails)

    return description.should.to.be.ok.and.not.empty
  })

  describe('rooms → amenities', () => {
    let $roomAmenities
    let $roomAmenity

    step('should get room amenities', async () => {
      $roomAmenities = await get$RoomAmenities($roomDetails)
      $roomAmenity = $roomAmenities[0]

      return $roomAmenities.should.to.be.not.empty
    })

    step('should get room amenity title', async () => {
      const title = await get$RoomAmenityTitle($roomAmenity)

      return title.should.to.be.ok.and.to.not.be.empty
    })

    step('should get room amenity list', async () => {
      const list = await get$RoomAmenityList($roomAmenity)

      return list.should.to.be.ok.and.to.not.be.empty
    })
  })

  step('should get room details as object', async () => {
    const roomDetails = await get$RoomDetailsAsObject($roomDetails)

    return roomDetails.should.to.have.all.keys([
      'title',
      'description',
      'amenities'
    ])
  }).timeout(20000)
})
