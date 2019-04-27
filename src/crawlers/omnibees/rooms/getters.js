import {
  handleEvaluateAll,
  handleEvaluate,
  handleQueryAll,
  handleHasClass
} from 'vendor/crawler/handles'
import { unformatMoney } from 'util/money'
import { pageQuerySelectorAll } from 'vendor/crawler'

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
