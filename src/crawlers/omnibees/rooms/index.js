import { map as mapP } from 'bluebird'
import {
  gotoPage,
  pageWaitForSelector,
  pageWaitForMs,
  launchBrowserAndCreatePage,
  closePageWithBrowser
} from 'vendor/crawler'
import { curryAsync } from 'util/ramda'
import { get$Rooms, get$RoomAsObject } from './getters'
import { getLanguageFromUrl } from '../url'

// waitFor$Rooms :: Omnibees.RoomsPage -> Promise<Omnibees.ElementHandle.Rooms>
export const waitFor$Rooms = async roomsPage => {
  const rooms = await pageWaitForSelector(
    '#rooms_results .entries .entry',
    roomsPage
  )
  await pageWaitForMs(1000, roomsPage) // Wait for some animations

  return rooms
}

// goToRoomsPage :: String -> Crawler.Page -> Promise<Omnibees.RoomsPage>
export const goToRoomsPage = curryAsync(async (url, page) => {
  await gotoPage(url, page)
  await waitFor$Rooms(page)

  return page
})

// getRoomsByUrl :: String -> Promise<Omnibees.Room[]>
export const getRoomsByUrl = async url => {
  const page = await launchBrowserAndCreatePage()
  const lang = getLanguageFromUrl(url)

  await goToRoomsPage(url, page)
  const $rooms = await get$Rooms(page)
  const rooms = await mapP($rooms, get$RoomAsObject(lang))

  await closePageWithBrowser(page)
  return rooms
}
