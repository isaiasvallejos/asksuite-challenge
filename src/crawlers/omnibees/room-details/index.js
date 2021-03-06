import {
  gotoPage,
  pageWaitForSelector,
  launchBrowserAndCreatePage,
  closePageWithBrowser
} from 'vendor/crawler'
import { curryAsync } from 'util/ramda'
import { get$RoomDetails, get$RoomDetailsAsObject } from './getters'
import { addLanguageToUrl } from '../url'

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
export const getRoomDetailsByUrl = curryAsync(async (lang, url) => {
  const page = await launchBrowserAndCreatePage()
  const urlWithLanguage = addLanguageToUrl(lang, url)

  await goToRoomDetailsPage(urlWithLanguage, page)
  const $roomDetails = await get$RoomDetails(page)
  const roomDetails = await get$RoomDetailsAsObject($roomDetails)

  await closePageWithBrowser(page)
  return roomDetails
})
