import { map as mapP } from 'bluebird'
import {
  gotoPage,
  pageWaitForSelector,
  pageWaitForMs,
  createBrowserPage
} from 'vendor/crawler'
import { curryAsync } from 'util/ramda'
import { browser } from 'crawlers'
import { get$Rooms, get$RoomAsObject } from './getters'

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
  const page = await createBrowserPage(browser)

  await goToRoomsPage(url, page)
  const $rooms = await get$Rooms(page)
  return await mapP($rooms, get$RoomAsObject)
}
