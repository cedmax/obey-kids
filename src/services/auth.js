import firebase from 'services/firebase';
import databind from 'store/databind';
import router from 'helpers/router';
import moment from 'moment';

firebase.auth().onAuthStateChanged((user) => {
  const today = moment().format('YYYYMMDD');
  if (user) {
    databind.getUser(user.uid, today)
      .then(databind.getData)
      .then(() => router.navigateToKids(today))
      .catch(router.navigateToAddKids);
  }
});

export function login() {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider);
}
