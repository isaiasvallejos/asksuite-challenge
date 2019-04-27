import { prop, assoc } from 'ramda'

// getTitle :: Omnibees.RoomDetails -> String
export const getTitle = prop('title')

// getDescription :: Omnibees.RoomDetails -> String
export const getDescription = prop('description')

// getAmenities :: Omnibees.RoomDetails -> Omnibees.RoomAmenity[]
export const getAmenities = prop('amenities')

// getAmenityTitle :: Omnibees.RoomAmenity -> String
export const getAmenityTitle = prop('title')

// getAmenityValues :: Omnibees.RoomAmenity -> String[]
export const getAmenityValues = prop('values')

// setTitle :: String -> Omnibees.RoomDetails
export const setTitle = assoc('title')

// setDescription :: String -> Omnibees.RoomDetails
export const setDescription = assoc('description')

// setAmenities :: Omnibees.RoomAmenity[] -> Omnibees.RoomDetails
export const setAmenities = assoc('amenities')

// setAmenityTitle :: String -> Omnibees.RoomAmenity
export const setAmenityTitle = assoc('title')

// setAmenityValues :: String[] -> Omnibees.RoomAmenity
export const setAmenityValues = assoc('values')
