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

// launchBrowserAndCreatePage :: romise<Crawler.Page>
export const launchBrowserAndCreatePage = async () => {
  const browser = await launchBrowser()
  return await createBrowserPage(browser)
}

// closePage :: Crawler.Page :: Promise<None>
export const closePage = page => page.close()

// closeBrowser :: Crawler.Browser :: Promise<None>
export const closeBrowser = browser => browser.close()

// closePageWithBrowser :: Crawler.Page :: Promise<None>
export const closePageWithBrowser = async page => {
  const browser = await page.browser()
  await closePage(page)
  return await closeBrowser(browser)
}

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

// pageWaitForMs :: Integer -> Crawler.Page -> Promise<Crawler.Page>
export const pageWaitForMs = curry((ms, page) => page.waitFor(ms))

// pageWaitForFunction :: Crawler.FunctionString -> Crawler.Page -> Promise<Crawler.Page>
export const pageWaitForFunction = curry((fn, page) => page.waitForFunction(fn))

export default puppeteer
