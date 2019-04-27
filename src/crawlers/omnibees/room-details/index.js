import { gotoPage, pageWaitForSelector } from 'vendor/crawler'
import { curryAsync } from 'util/ramda'

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
