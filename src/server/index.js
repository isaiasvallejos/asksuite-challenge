import api from './api'
import log from 'log'

export default () => {
  api.listen(process.env.PORT, () =>
    log.info(`server running on ${api.address().port}`)
  )

  return api
}
