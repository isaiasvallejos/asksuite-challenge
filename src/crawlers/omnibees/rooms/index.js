import { gotoPage, pageWaitForSelector, pageWaitForMs } from 'vendor/crawler'
import { curryAsync } from 'util/ramda'

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
