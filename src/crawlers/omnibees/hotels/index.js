import { map as mapP } from 'bluebird'
import { filter, compose } from 'ramda'
import { isNotEmpty } from 'ramda-adjunct'
import {
  gotoPage,
  pageWaitForSelector,
  createBrowserPage
} from 'vendor/crawler'
import { validateOmnibeesSearch } from '../schema'
import { mountUrl } from './url'
import { curryAsync } from 'util/ramda'
import { browser } from 'crawlers'
import { get$Hotels, get$AvailableHotels, get$HotelAsObject } from './getters'
import { getRooms } from './props'

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
export const getHotelsByUrl = async url => {
  const hotelsPage = await createBrowserPage(browser)

  await goToHotelsPage(url, hotelsPage)
  const $hotels = await get$Hotels(hotelsPage)
  const $availableHotels = await get$AvailableHotels(hotelsPage, $hotels)
  const hotels = await mapP($availableHotels, get$HotelAsObject(hotelsPage))
  const hotelsWithRooms = filter(
    compose(
      isNotEmpty,
      getRooms
    ),
    hotels
  )

  return hotelsWithRooms
}

// getHotelsBySearch :: String -> Integer -> Omnibees.Search -> Promise<Omnibees.HotelSearch>
export const getHotelsBySearch = curryAsync(async (uri, clientId, search) => {
  const validatedSearch = await validateOmnibeesSearch(search)
  const url = mountUrl(uri, clientId, validatedSearch)
  const hotels = await getHotelsByUrl(url)

  return { url, hotels }
})
