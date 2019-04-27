import { launchBrowser } from 'vendor/crawler'

export let browser

export default async () => {
  browser = await launchBrowser()
}
