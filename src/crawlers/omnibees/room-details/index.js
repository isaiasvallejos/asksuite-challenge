import {
  gotoPage,
  pageWaitForSelector,
  createBrowserPage
} from 'vendor/crawler'
import { curryAsync } from 'util/ramda'
import { get$RoomDetails, get$RoomDetailsAsObject } from './getters'
import { browser } from 'crawlers'

// waitFor$RoomDetails :: Omnibees.RoomDetailsPage -> Promise<Omnibees.ElementHandle.RoomDetails>
export const waitFor$RoomDetails = async roomDetailsPage => {
  const roomDetails = await pageWaitForSelector(
    '#popupModule .roomDescription',
    roomDetailsPage
  )

  return roomDetails
}

// goToRoomDetailsPage :: String -> Crawler.Page -> Promise<Omnibees.RoomDetailsPage>
export const goToRoomDetailsPage = curryAsync(async (url, page) => {
  await gotoPage(url, page)
  await waitFor$RoomDetails(page)

  return page
})

// getRoomDetailsByUrl :: String -> Promise<Omnibees.RoomDetails>
export const getRoomDetailsByUrl = async url => {
  const page = await createBrowserPage(browser)

  await goToRoomDetailsPage(url, page)
  const $roomDetails = await get$RoomDetails(page)
  return await get$RoomDetailsAsObject($roomDetails)
}
