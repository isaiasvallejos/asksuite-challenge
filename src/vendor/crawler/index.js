import puppeteer from 'puppeteer'
import { curry } from 'ramda'

// launchBrowser :: Promise<Crawler.Browser>
export const launchBrowser = () =>
  puppeteer.launch({
    executablePath: process.env.CHROME_BIN || null,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  })

// createBrowserPage :: Crawler.Browser -> Promise<Crawler.Page>
export const createBrowserPage = browser => browser.newPage()

// gotoPage :: Crawler.Page -> Crawler.Page -> Promise<Crawler.Page>
export const gotoPage = curry((url, page) => page.goto(url))

// pageQuerySelector :: Crawler.SelectorString -> Crawler.Page -> Promise<Crawler.ElementHandle>
export const pageQuerySelector = curry((selector, page) => page.$(selector))

// pageQuerySelectorAll :: Crawler.SelectorString -> Crawler.Page -> Promise<Crawler.ElementHandle[]>
export const pageQuerySelectorAll = curry((selector, page) => page.$$(selector))

// pageWaitForSelector :: Crawler.SelectorString -> Crawler.Page -> Promise<Crawler.Page>
export const pageWaitForSelector = curry((selector, page) =>
  page.waitForSelector(selector)
)

// pageWaitForFunction :: Crawler.FunctionString -> Crawler.Page -> Promise<Crawler.Page>
export const pageWaitForFunction = curry((fn, page) => page.waitForFunction(fn))

export default puppeteer
