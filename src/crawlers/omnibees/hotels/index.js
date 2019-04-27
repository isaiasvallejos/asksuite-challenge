import { filter as filterP } from 'bluebird'

import {
  gotoPage,
  pageWaitForSelector,
  pageQuerySelectorAll
} from 'vendor/crawler'
import { handleHasAnyClass } from 'vendor/crawler/handles'
import { validateOmnibeesSearch } from '../schema'
import { mountUrl } from './url'
import { curryAsync } from 'util/ramda'

// waitFor$Hotels :: Omnibees.HotelsPage -> Promise<Omnibees.ElementHandle.Hotels>
export const waitFor$Hotels = hotelsPage =>
  pageWaitForSelector('#search_results .entries', hotelsPage)

// gotoHotelsPage :: String -> Integer -> Omnibees.Search -> Crawler.Page -> Promise<Omnibees.HotelsPage>
export const goToHotelsPage = curryAsync(
  async (url, clientId, search, page) => {
    const validatedSearch = await validateOmnibeesSearch(search)
    const mountedUrl = mountUrl(url, clientId, validatedSearch)

    await gotoPage(mountedUrl, page)
    await waitFor$Hotels(page)
    return page
  }
)

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
