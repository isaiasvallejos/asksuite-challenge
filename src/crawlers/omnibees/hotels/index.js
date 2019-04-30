import { map as mapP } from 'bluebird'
import { filter } from 'ramda'
import {
  gotoPage,
  pageWaitForSelector,
  usingBrowserPageCreator
} from 'vendor/crawler'
import { validateOmnibeesSearch } from '../schema'
import { mountUrl } from './url'
import { curryAsync } from 'util/ramda'
import { get$Hotels, get$AvailableHotels, get$HotelAsObject } from './getters'
import { isHotelWithRooms } from './props'

// waitFor$Hotels :: Omnibees.HotelsPage -> Promise<Omnibees.ElementHandle.Hotels>
export const waitFor$Hotels = hotelsPage =>
  pageWaitForSelector('#search_results .entries', hotelsPage)

// goToHotelsPage :: String -Crawler.Page -> Promise<Omnibees.HotelsPage>
export const goToHotelsPage = curryAsync(async (url, page) => {
  await gotoPage(url, page)
  await waitFor$Hotels(page)

  return page
})

// getHotelsByUrl :: String -> Promise<Omnibees.Hotel[]>
export const getHotelsByUrl = usingBrowserPageCreator(async (page, url) => {
  await goToHotelsPage(url, page)
  const $hotels = await get$Hotels(page)
  const $availableHotels = await get$AvailableHotels(page, $hotels)
  const hotels = await mapP($availableHotels, get$HotelAsObject(page))
  const hotelsWithRooms = filter(isHotelWithRooms, hotels)

  return hotelsWithRooms
})

// getHotelsBySearch :: String -> Integer -> Omnibees.Search -> Promise<Omnibees.HotelSearch>
export const getHotelsBySearch = curryAsync(async (uri, clientId, search) => {
  const validatedSearch = await validateOmnibeesSearch(search)
  const url = mountUrl(uri, clientId, validatedSearch)
  const hotels = await getHotelsByUrl(url)

  return { url, hotels }
})
