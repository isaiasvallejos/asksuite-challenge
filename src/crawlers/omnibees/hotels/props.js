import { prop, assoc, compose } from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'

// getRestricted :: Omnibees.Hotel -> Boolean
export const getRestricted = prop('restricted')

// getName :: Omnibees.Hotel -> String
export const getName = prop('name')

// getPrice :: Omnibees.Hotel -> Number
export const getPrice = prop('price')

// getDescription :: Omnibees.Hotel -> String
export const getDescription = prop('description')

// getAddress :: Omnibees.Hotel -> String
export const getAddress = prop('address')

// getRoomsUrl :: Omnibees.Hotel -> String
export const getRoomsUrl = prop('roomsUrl')

// getRooms :: Omnibees.Hotel -> Omnibees.Room[]
export const getRooms = prop('rooms')

// getAmenities :: Omnibees.Hotel -> Omnibees.HotelAmenity[]
export const getAmenities = prop('amenities')

// getAmenityTitle :: Omnibees.HotelAmenity -> String
export const getAmenityTitle = prop('title')

// getAmenityValues :: Omnibees.HotelAmenity -> String[]
export const getAmenityValues = prop('values')

// setRestricted :: Boolean -> Omnibees.Hotel
export const setRestricted = assoc('restricted')

// setName :: String -> Omnibees.Hotel
export const setName = assoc('name')

// setPrice :: Number -> Omnibees.Hotel
export const setPrice = assoc('price')

// setDescription :: String -> Omnibees.Hotel
export const setDescription = assoc('description')

// setAddress :: String -> Omnibees.Hotel
export const setAddress = assoc('address')

// setRoomsUrl :: String -> Omnibees.Hotel
export const setRoomsUrl = assoc('roomsUrl')

// setRooms :: Omnibees.Room[] -> Omnibees.Hotel
export const setRooms = assoc('rooms')

// setAmenities :: Omnibees.HotelAmenity[] -> Omnibees.Hotel
export const setAmenities = assoc('amenities')

// setAmenityTitle :: String -> Omnibees.HotelAmenity
export const setAmenityTitle = assoc('title')

// setAmenityValues :: String[] -> Omnibees.HotelAmenity
export const setAmenityValues = assoc('values')

// isHotelWithRooms :: Omnibees.Hotel -> Boolean
export const isHotelWithRooms = compose(
  isNotEmpty,
  getRooms
)
