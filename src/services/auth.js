import firebase from 'services/firebase'
import databind from 'store/databind'
import router from 'helpers/router'

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    databind.getUser(user.uid)
      .then((date) => router.navigateToKids(date))
      .catch(router.navigateToAddKids)
  }
})

export function login () {
  const provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().signInWithPopup(provider)
}
