import {
  handleEvaluateAll,
  handleEvaluate,
  handleQueryAll,
  handleHasClass
} from 'vendor/crawler/handles'
import { pipe } from 'ramda'
import { unformatMoney } from 'util/money'
import { pageQuerySelectorAll } from 'vendor/crawler'
import { setRestricted, setImages, setPrice, setDetailsUrl } from './props'
import { getRoomDetailsByUrl } from '../room-details'

// get$Rooms :: Omnibees.RoomsPage -> Promise<Omnibees.ElementHandle.Room[]>
export const get$Rooms = roomsPage =>
  pageQuerySelectorAll(
    '#rooms_results .entries .entry .content .roomName',
    roomsPage
  )

// is$RoomWithRestriction :: Omnibees.ElementHandle.Room -> Promise<Boolean>
export const is$RoomWithRestriction = handleEvaluate(
  '.soldOut',
  $element => $element.style.display !== 'none'
)

// get$RoomImages :: Omnibees.ElementHandle.Room -> Promise<String[]>
export const get$RoomImages = handleEvaluateAll(
  '.roomSlider .slide img',
  $imgs => $imgs.map($img => $img.src)
)

// get$RoomPrice :: Omnibees.ElementHandle.Room -> Promise<String>
export const get$RoomPrice = async $room => {
  const priceString = await handleEvaluate(
    '.roomExcerpt .sincePriceContent h6',
    $h6 => $h6.textContent,
    $room
  )

  return unformatMoney(priceString)
}

// get$RoomDetailsUrl :: Omnibees.ElementHandle.Room -> Promise<String>
export const get$RoomDetailsUrl = handleEvaluate(
  '.roomExcerpt .excerpt h5 a',
  $a => $a.href
)

// get$RoomAsObject :: Omnibees.ElementHandle.Room -> Promise<Omnibees.Room>
export const get$RoomAsObject = async $room => {
  const restricted = await is$RoomWithRestriction($room)
  const images = await get$RoomImages($room)
  const price = await get$RoomPrice($room)
  const detailsUrl = await get$RoomDetailsUrl($room)
  const details = await getRoomDetailsByUrl(detailsUrl)

  return pipe(
    setRestricted(restricted),
    setImages(images),
    setPrice(price),
    setDetailsUrl(detailsUrl)
  )({ ...details })
}
