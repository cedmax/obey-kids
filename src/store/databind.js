import { database } from 'services/firebase';
import store from 'store/mobx';
import constants from 'store/constants';
import getDates from 'helpers/get-dates';

function setDbStars(kidName, date, value) {
  if (typeof value === 'undefined') {
    value = constants.STARS;
  }

  database.ref(`${store.user}/${kidName}/${date}`).set(value);
}

function setStars(kidName, value) {
  setDbStars(kidName, store.day, value);
  store.setKid(kidName, value);
}

function getStars(kidName) {
  const kidRef = database.ref(`${store.user}/${kidName}/${store.day}`);

  return new Promise((resolve) => {
    kidRef.once('value').then((snapshot) => resolve(snapshot.val()));
  });
}

function checkNext(kidSnapshot, date) {
  const next = getDates.next(date);
  store.enableNext(!isNaN(parseInt(kidSnapshot.child(next).val(), 10)) && next);
}

function getGraphData(kidSnapshot, name, date) {
  let weekDate = date;
  while (weekDate !== getDates.prev(date, 7)) {
    handleKidsSnapshot(kidSnapshot, weekDate, (kidName, stars) => {
      weekDate = getDates.prev(weekDate);
      store.addToGraph(kidName, stars, weekDate);
    });
  }
}

function handleKidsSnapshot(kidSnapshot, date, callback) {
  const kidName = kidSnapshot.key;

  const childData = kidSnapshot.child(date);
  if (!isNaN(parseInt(childData.val(), 10))) {
    callback(kidName, childData.val());
  } else {
    setDbStars(kidName, date);
    callback(kidName, constants.STARS);
  }
}

function getData(date) {
  date = date || getDates.today();
  store.setDay(date);

  if (!store.user) return;
  return new Promise((resolve) => {
    database.ref(store.user).on('value', (userSnapshot) => {
      userSnapshot.forEach((kidSnapshot) => {
        handleKidsSnapshot(kidSnapshot, date, (name, stars) => {
          store.setKid(name, stars);
          checkNext(kidSnapshot, date);
        });
        if (!store.graphData[kidSnapshot.key]) {
          getGraphData(kidSnapshot, kidSnapshot.key, date);
        }
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