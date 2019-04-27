import { gotoPage, pageWaitForSelector } from 'vendor/crawler'
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
