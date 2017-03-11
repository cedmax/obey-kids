import { database } from 'services/firebase';
import store from 'store/mobx';
import constants from 'store/constants';
import getDates from 'helpers/get-dates';

function setStars(kidName, value) {
  if (typeof value === 'undefined') {
    value = constants.STARS;
  }

  store.setKid(kidName, value);
  database.ref(`${store.user}/${kidName}/${store.day}`).set(value);
}

function getStars(kidName) {
  const kidRef = database.ref(`${store.user}/${kidName}/${store.day}`);

  return new Promise((resolve) => {
    kidRef.once('value').then((snapshot) => resolve(snapshot.val()));
  });
}

function checkPrevNextDate(kidSnapshot, date) {
  const prev = getDates.prev(date);
  const next = getDates.next(date);
  store.enableNav('prev', !isNaN(parseInt(kidSnapshot.child(prev).val(), 10)) && prev);
  store.enableNav('next', !isNaN(parseInt(kidSnapshot.child(next).val(), 10)) && next);
}

function getData(date) {
  store.setDay(date);
  if (!store.user) return;
  return new Promise((resolve) => {
    database.ref(store.user).on('value', (userSnapshot) => {
      userSnapshot.forEach((kidSnapshot) => {
        const kidName = kidSnapshot.key;

        const childData = kidSnapshot.child(date);
        if (!isNaN(parseInt(childData.val(), 10))) {
          store.setKid(kidName, childData.val());
        } else {
          setStars(kidName);
        }
        checkPrevNextDate(kidSnapshot, date);
      });
      resolve(date);
    });
  });
}

function getUser(userId) {
  const date = getDates.today();

  return new Promise((resolve, reject) => {
    database.ref(userId).once('value', (snapshot) => {
      store.setUser(userId);

      if (snapshot.exists()) {
        resolve(date);
      } else {
        reject(userId);
      }
    });
  });
}

export default {
  setStars,
  getStars,
  getUser,
  getData
};