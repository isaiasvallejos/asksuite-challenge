import { prop, propOr } from 'ramda'

// getHotelId :: String | Integer
export const getHotelId = prop('hotelId')

// getHotelName :: String
export const getHotelName = prop('hotelName')

// getCheckIn :: DateString
export const getCheckIn = prop('checkIn')

// getCheckOut :: DateString
export const getCheckOut = prop('checkOut')

// getCode :: String
export const getCode = prop('code')

// getGroupCode :: String
export const getGroupCode = prop('groupCode')

// getLoyaltyCard :: String
export const getLoyaltyCard = prop('loyaltyCard')

// getRooms :: Integer
export const getRooms = prop('rooms')

// getAdults :: Integer
export const getAdults = prop('adults')

// getChildrens :: Integer
export const getChildrens = prop('childrens')

// getChildrensAge :: Integer[]
export const getChildrensAge = propOr([], 'childrensAge')
