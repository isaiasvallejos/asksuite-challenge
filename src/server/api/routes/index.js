import express from 'express'
import { getHotelsBySearch } from 'crawlers/omnibees/hotels'
import { getBody } from 'util/server/api/requests'
import { responseWithDataAndSuccess } from 'util/server/api/responses'

const router = express.Router()

router.post('/search', (request, response, next) => {
  const search = getBody(request)

  getHotelsBySearch(
    process.env.DEFAULT_OMNIBEES_URI,
    process.env.DEFAULT_OMNIBEES_CLIENT_ID,
    search
  )
    .then(responseWithDataAndSuccess(response, next))
    .catch(next)
})

export default router
