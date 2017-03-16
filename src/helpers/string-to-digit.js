import convertString from 'convert-string'
import digitalRoot from 'digital-root'

export default function stringToDigit (string) {
  const stringToNumArray = convertString.stringToBytes(string)
  const numericString = parseInt(stringToNumArray.join(''), 10)
  return digitalRoot(numericString)
}
