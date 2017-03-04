import firebase from 'firebase';
let env = 'prod';
const config = {
  dev: {
    apiKey: 'AIzaSyAjk2TSguMPkNzT4OGSUMvHLHJIf03VuaE',
    authDomain: 'kids-obey-local.firebaseapp.com',
    databaseURL: 'https://kids-obey-local.firebaseio.com',
    storageBucket: 'kids-obey-local.appspot.com',
    messagingSenderId: '210925229662'
  },
  prod: {
    apiKey: 'AIzaSyBsVlx6IZB4xAH3Ta_1bbo5AT-uAh9MSWw',
    authDomain: 'kids-obey.firebaseapp.com',
    databaseURL: 'https://kids-obey.firebaseio.com',
    storageBucket: 'kids-obey.appspot.com',
    messagingSenderId: '985182574504'
  }
};

if (window.location.hostname==='localhost') {
  env = 'dev';
}

firebase.initializeApp(config[env]);
export default firebase;