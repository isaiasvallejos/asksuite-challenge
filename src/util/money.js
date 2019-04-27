import { unformat } from 'accounting'

// unformatMoney :: String -> Number
export const unformatMoney = moneyString => unformat(moneyString, ',')
