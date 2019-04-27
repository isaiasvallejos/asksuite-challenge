import 'dotenv/config'
import startServer from 'server'
import startCrawler from 'crawlers'

startCrawler().then(startServer)
