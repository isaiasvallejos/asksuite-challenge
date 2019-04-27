import { handleEvaluate, handleQueryAll } from 'vendor/crawler/handles'
import { pageQuerySelector } from 'vendor/crawler'
import { map as mapP } from 'bluebird'
import { pipe } from 'ramda'
import {
  setAmenityTitle,
  setAmenityValues,
  setTitle,
  setDescription,
  setAmenities
} from './props'

// get$RoomDetails :: Omnibees.RoomDetailsPage -> Promise<Omnibees.ElementHandle.RoomDetails>
export const get$RoomDetails = roomDetailsPage =>
  pageQuerySelector('#popupModule', roomDetailsPage)

// get$RoomTitle :: Omnibees.ElementHandle.RoomDetails -> Promise<String>
export const get$RoomTitle = handleEvaluate(
  '.mainHeading h2',
  $h2 => $h2.textContent
)

// get$RoomDescription :: Omnibees.ElementHandle.RoomDetails -> Promise<String>
export const get$RoomDescription = handleEvaluate(
  '.roomDescription',
  $element =>
    Array.prototype.filter
      .call($element.childNodes, $child => $child.nodeType === Node.TEXT_NODE)
      .map($child => $child.textContent)
      .join('')
      .trim() // get text content without children ones
)

// get$RoomAmenities :: Omnibees.ElementHandle.RoomDetails -> Promise<Omnibees.ElementHandle.RoomAmenity[]>
export const get$RoomAmenities = handleQueryAll(
  '.roomFacilites .room_amenities ul li'
)

// get$RoomAmenityTitle :: Omnibees.ElementHandle.RoomAmenity -> Promise<String>
export const get$RoomAmenityTitle = handleEvaluate(
  'p strong',
  $h6 => $h6.textContent
)

// get$RoomAmenityList :: Omnibees.ElementHandle.RoomAmenity -> Promise<String[]>
export const get$RoomAmenityList = handleEvaluate('p', $p => {
  const valuesText = $p.textContent.split(':')[1]

  return valuesText
    .split(',')
    .map(value => value.trim())
    .map(value => value.replace(/\.$/, ''))
})

// get$RoomAmenityAsObject :: Omnibees.ElementHandle.RoomAmenity -> Promise<Omnibees.RoomAmenity>
export const get$RoomAmenityAsObject = async $amenity => {
  const title = await get$RoomAmenityTitle($amenity)
  const values = await get$RoomAmenityList($amenity)

  return pipe(
    setAmenityTitle(title),
    setAmenityValues(values)
  )({})
}

// get$RoomAmenitiesAsList :: Omnibees.ElementHandle.Room -> Promise<Omnibees.RoomAmenity[]>
export const get$RoomAmenitiesAsList = async $roomDetails => {
  const $amenities = await get$RoomAmenities($roomDetails)
  return mapP($amenities, get$RoomAmenityAsObject)
}

// get$RoomDetailsAsObject :: Omnibees.ElementHandle.RoomDetails -> Promise<Omnibees.RoomDetails>
export const get$RoomDetailsAsObject = async $roomDetails => {
  const title = await get$RoomTitle($roomDetails)
  const description = await get$RoomDescription($roomDetails)
  const amenities = await get$RoomAmenitiesAsList($roomDetails)

  return pipe(
    setTitle(title),
    setDescription(description),
    setAmenities(amenities)
  )({})
}
