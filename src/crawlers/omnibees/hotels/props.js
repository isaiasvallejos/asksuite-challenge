import {
  handleEvaluateAll,
  handleEvaluate,
  handleQueryAll,
  handleHasClass
} from 'vendor/crawler/handles'
import { unformatMoney } from 'util/money'
import { curryAsync } from 'util/ramda'

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
