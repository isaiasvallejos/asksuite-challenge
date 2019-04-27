import { curry } from 'ramda'

// handleQuery :: Crawler.SelectorString -> Promise<Crawler.ElementHandle>
export const handleQuery = curry((selector, handle) => handle.$(selector))

// handleQueryAll :: Crawler.SelectorString -> Promise<Crawler.ElementHandle[]>
export const handleQueryAll = curry((selector, handle) => handle.$$(selector))

// handleEvaluate :: Crawler.SelectorString -> (Crawler.ElementHandle -> a) -> Crawler.ElementHandle -> Promise<a>
export const handleEvaluate = curry((selector, handleFunction, handle) =>
  handle.$eval(selector, handleFunction)
)

// handleEvaluate :: Crawler.SelectorString -> (Crawler.ElementHandle -> a) -> Crawler.ElementHandle -> Promise<a>
export const handleEvaluateAll = curry((selector, handleFunction, handle) =>
  handle.$$eval(selector, handleFunction)
)

// handleSelfEvaluate :: (Crawler.ElementHandle -> a) -> Crawler.Page -> Promise<a>
export const handleSelfEvaluate = curry(
  (handleFunction, page, handle, ...args) =>
    page.evaluate(handleFunction, handle, args)
)

// handleHasClass :: String -> Crawler.Page -> Promise<Boolean>
export const handleHasClass = curry((className, page, handle) =>
  handleSelfEvaluate(
    ($element, className) => $element.classList.contains(className),
    page,
    handle,
    className
  )
)

// handleHasAnyClass :: String -> Crawler.Page -> Promise<Boolean>
export const handleHasAnyClass = curry((classNames, page, handle) =>
  handleSelfEvaluate(
    ($element, classNames) => {
      const elementClassNames = $element.className.split(' ')
      return elementClassNames.some(name => classNames.includes(name))
    },
    page,
    handle,
    ...classNames
  )
)
