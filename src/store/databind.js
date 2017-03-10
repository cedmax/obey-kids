import store from 'store/mobx';
import { database } from 'services/firebase';

function setStars(kidName, value) {
  if (typeof value === 'undefined') {
    value = 3;
  }

  database.ref(`${store.user}/${kidName}/${store.day}`).set(value).then(() => {
    store.setKid(kidName, value);
  });
}

function getStars(kidName) {
  const kidRef = database.ref(`${store.user}/${kidName}/${store.day}`);

  return new Promise((resolve) => {
    kidRef.once('value').then((snapshot) => resolve(snapshot.val()));
  });
}

function getData(snapshot) {
  return new Promise((resolve) => {
    snapshot.forEach((kidSnapshot) => {
      const kidName = kidSnapshot.key;
      const childData = kidSnapshot.child(store.day);
      if (!isNaN(childData.val())) {
        store.setKid(kidName, childData.val());
      } else {
        setStars(kidName);
      }
    });
    resolve();
  });
}

function getUser(userId, date) {
  store.setDay(date);

  return new Promise((resolve, reject) => {
    database.ref(userId).once('value', (snapshot) => {
      store.setUser(userId);

      if (snapshot.exists()) {
        resolve(snapshot);
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