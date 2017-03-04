import store from 'store/mobx';
import firebase from 'store/firebase';
import { browserHistory } from 'react-router';
import moment from 'moment';

const database = firebase.database();
const currentDay = moment().format('YYYYMMDD');

function checkIfUserExists(userId) {
  return new Promise((resolve, reject)=>{
    database.ref(userId).once('value', (snapshot) => {
      if (snapshot.exists()){
        store.setUser(userId);
        resolve(snapshot);
      } else {
        reject(userId);
      }
    });
  });
}

function updateChildStars(userId, kidName, value: 3) {
  return database.ref(`${userId}/${kidName}/${currentDay}`).set(value);
}

function checkIfChildresHasToday(kidsSnapshot) {
  return new Promise((resolve) => {
    kidsSnapshot.forEach((kidSnapshot) => {
      const kidName = kidSnapshot.key;
      const childData = kidSnapshot.child(currentDay);
      if (childData.val()) {
        store.addKid(kidName, childData.val());
      } else {
        const userId = kidsSnapshot.ref.key;
        updateChildStars(userId, kidName);
      }
      resolve();
    });
  });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user && !store.user) {
    checkIfUserExists(user.uid)
      .then(checkIfChildresHasToday)
      .then(()=>{
        browserHistory.push('/kids');
      }).catch((userId) => {
        store.setUser(userId);
        browserHistory.push('/add-kids');
      });
  }
});

export function login() {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

export function addKid(kidName) {
  updateChildStars(store.user, kidName).then(() => {
    store.addKid(kidName, 3);
    browserHistory.push('kids');
  });
}

function normaliseStars(stars) {
  return Math.min(Math.max(stars, 0), 3);
}

function changeStar(kidName, action) {
  const kidRef = database.ref(`${store.user}/${kidName}/${currentDay}`);
  kidRef.once('value').then((snapshot) => {
    let newValue = snapshot.val();
    if (action === 'up') {
      newValue++;
    } else {
      newValue--;
    }

    updateChildStars(store.user, kidName, normaliseStars(newValue));
    
    store.kids.find((kid) => {
      return kid.name === kidName;
    }).setStar(newValue);
  });
}

export function addStar(kidName) {
  return () => changeStar(kidName, 'up');
}

export function removeStar(kidName) {
  return () => changeStar(kidName, 'down');
}