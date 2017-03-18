import { database } from 'services/firebase'
import { view, user, graph } from 'store/mobx'
import constants from 'store/constants'
import getDates from 'helpers/get-dates'

function setDbStars (kidName, date, value) {
  if (typeof value === 'undefined') {
    value = constants.STARS
  }

  database.ref(`${user.identity}/${kidName}/${date}`).set(value)
}

function setStars (kidName, value) {
  setDbStars(kidName, view.day, value)
  view.setKid(kidName, value)
  graph.updateGraph(kidName, value, view.day)
}

function getStars (kidName) {
  const kidRef = database.ref(`${user.identity}/${kidName}/${view.day}`)

  return new Promise((resolve) => {
    kidRef.once('value').then((snapshot) => resolve(snapshot.val()))
  })
}

function checkNext (kidSnapshot, date) {
  const next = getDates.next(date)
  view.enableNext(!isNaN(parseInt(kidSnapshot.child(next).val(), 10)) && next)
}

function getGraphData (kidSnapshot, name, date) {
  let weekDate = date
  while (weekDate !== getDates.prev(date, constants.GRAPH_LENGTH)) {
    handleKidsSnapshot(kidSnapshot, weekDate, (kidName, stars) => {
      graph.addToGraph(kidName, stars, weekDate)
      weekDate = getDates.prev(weekDate)
    })
  }
}

function handleKidsSnapshot (kidSnapshot, date, callback) {
  const kidName = kidSnapshot.key

  const childData = kidSnapshot.child(date)
  if (!isNaN(parseInt(childData.val(), 10))) {
    callback(kidName, childData.val())
  } else {
    setDbStars(kidName, date)
    callback(kidName, constants.STARS)
  }
}

function getData (date) {
  date = date || getDates.today()
  view.setDay(date)

  if (!user.identity) return
  return new Promise((resolve) => {
    database.ref(user.identity).on('value', (userSnapshot) => {
      userSnapshot.forEach((kidSnapshot) => {
        handleKidsSnapshot(kidSnapshot, date, (name, stars) => {
          view.setKid(name, stars)
          checkNext(kidSnapshot, date)
        })
        if (!graph.data[kidSnapshot.key]) {
          getGraphData(kidSnapshot, kidSnapshot.key, date)
        }
      })

      resolve(date)
    })
  })
}

function getUser (userId) {
  const date = getDates.today()

  return new Promise((resolve, reject) => {
    database.ref(userId).once('value', (snapshot) => {
      user.setUser(userId)

      if (snapshot.exists()) {
        resolve(date)
      } else {
        reject(userId)
      }
    })
  })
}

export default {
  setStars,
  getStars,
  getUser,
  getData
}
