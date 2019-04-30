import { filter as filterP, map as mapP } from 'bluebird'
import { pipe } from 'ramda'
import {
  handleEvaluateAll,
  handleEvaluate,
  handleQueryAll,
  handleHasClass,
  handleHasAnyClass
} from 'vendor/crawler/handles'
import { pageQuerySelectorAll } from 'vendor/crawler'
import { unformatMoney } from 'util/money'
import { curryAsync } from 'util/ramda'
import {
  setRestricted,
  setPrice,
  setDescription,
  setAddress,
  setRoomsUrl,
  setAmenities,
  setAmenityTitle,
  setAmenityValues,
  setName,
  setRooms
} from './props'
import { getRoomsByUrl } from '../rooms'

// get$Hotels :: Omnibees.HotelsPage -> Promise<Omnibees.ElementHandle.Hotel[]>
export const get$Hotels = hotelsPage =>
  pageQuerySelectorAll('#search_results .entries .entry', hotelsPage)

// get$AvailableHotels :: Omnibees.HotelsPage -> Omnibees.ElementHandle.Hotel[] -> Promise<Omnibees.ElementHandle.AvailableHotel[]>
export const get$AvailableHotels = curryAsync((hotelsPage, $hotels) =>
  filterP(
    $hotels,
    handleHasAnyClass(['available', 'available_withRestriction'], hotelsPage)
  )
)

// get$HotelRoomsUrl :: Omnibees.HotelsPage -> Omnibees.ElementHandle.Hotel -> Promise<Boolean>
export const is$HotelWithRestrictions = curryAsync((hotelsPage, $hotel) =>
  handleHasClass('available_withRestriction', hotelsPage, $hotel)
)

// get$HotelRoomsUrl :: Omnibees.ElementHandle.Hotel -> Promise<String>
export const get$HotelRoomsUrl = handleEvaluate(
  '.description h5 a',
  $a => $a.href
)

// get$HotelName :: Omnibees.ElementHandle.Hotel -> Promise<String>
export const get$HotelName = handleEvaluateAll(
  '.description h5',
  $h5s => $h5s[0].textContent
)

// get$HotelPrice :: Omnibees.ElementHandle.Hotel -> Promise<Number>
export const get$HotelPrice = async $hotel => {
  const priceString = await handleEvaluateAll(
    '.description h5',
    $h5s => $h5s[1].textContent,
    $hotel
  )

  return unformatMoney(priceString)
}

// get$HotelAddress :: Omnibees.ElementHandle.Hotel -> Promise<String>
export const get$HotelAddress = handleEvaluate(
  '.description .address',
  $span => $span.textContent
)

// get$HotelDescription :: Omnibees.ElementHandle.Hotel -> Promise<String>
export const get$HotelDescription = handleEvaluate(
  '.description .tab_1.pane p',
  $paragraph => $paragraph.innerHTML.replace(/<br\s*[\/]?>/gi, '\n') // replace <br> to \n
)

// get$HotelAmenities :: Omnibees.ElementHandle.Hotel -> Promise<Omnibees.ElementHandle.HotelAmenity[]>
export const get$HotelAmenities = handleQueryAll(
  '.description .tab_2.pane .amenities'
)

// get$HotelAmenityTitle :: Omnibees.ElementHandle.HotelAmenity -> Promise<String>
export const get$HotelAmenityTitle = handleEvaluate(
  'h6',
  $h6 => $h6.textContent
)

// get$HotelAmenityList :: Omnibees.ElementHandle.HotelAmenity -> Promise<String[]>
export const get$HotelAmenityList = handleEvaluate('ul', $ul =>
  $ul.textContent
    .split('-')
    .map(amenityString => amenityString.trim())
    .filter(amenityString => !!amenityString)
)

// get$HotelAmenityAsObject :: Omnibees.ElementHandle.HotelAmenity -> Promise<Omnibees.HotelAmenity>
export const get$HotelAmenityAsObject = async $amenity => {
  const title = await get$HotelAmenityTitle($amenity)
  const values = await get$HotelAmenityList($amenity)

  return pipe(
    setAmenityTitle(title),
    setAmenityValues(values)
  )({})
}

// get$HotelAmenitiesAsList :: Omnibees.ElementHandle.Hotel -> Promise<Omnibees.HotelAmenity[]>
export const get$HotelAmenitiesAsList = async $hotel => {
  const $amenities = await get$HotelAmenities($hotel)
  return mapP($amenities, get$HotelAmenityAsObject)
}

// get$HotelAsObject :: Omnibees.HotelsPage -> Omnibees.ElementHandle.Hotel -> Promise<Omnibees.Hotel>
export const get$HotelAsObject = curryAsync(async (hotelsPage, $hotel) => {
  const [
    restricted,
    name,
    price,
    description,
    address,
    roomsUrl,
    amenities
  ] = await Promise.all([
    is$HotelWithRestrictions(hotelsPage, $hotel),
    get$HotelName($hotel),
    get$HotelPrice($hotel),
    get$HotelDescription($hotel),
    get$HotelAddress($hotel),
    get$HotelRoomsUrl($hotel),
    get$HotelAmenitiesAsList($hotel)
  ])

  const rooms = await getRoomsByUrl(roomsUrl)

  return pipe(
    setRestricted(restricted),
    setName(name),
    setPrice(price),
    setDescription(description),
    setAddress(address),
    setRoomsUrl(roomsUrl),
    setAmenities(amenities),
    setRooms(rooms)
  )({})
})
