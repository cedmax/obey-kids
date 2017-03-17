import databind from 'store/databind'
import constants from 'store/constants'

function normaliseStars (stars) {
  return Math.min(Math.max(stars, 0), constants.STARS)
}

function changeStar (kidName, action) {
  databind.getStars(kidName).then((stars) => {
    const newStars = normaliseStars((action === constants.ACTION_UP) ? ++stars : --stars)
    databind.setStars(kidName, newStars)
  })
}

export function addStar (kidName) {
  changeStar(kidName, constants.ACTION_UP)
}

export function removeStar (kidName) {
  changeStar(kidName, constants.ACTION_DOWN)
}

export function addKid (kidName) {
  databind.setStars(kidName)
}

export function setDay (day) {
  databind.getData(day)
}
