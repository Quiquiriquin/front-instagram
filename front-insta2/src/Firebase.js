import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAkLoonotlVO7lv7V34bHUJVLmHJnOJ-78",
    authDomain: "clone-netflix-c75d0.firebaseapp.com",
    databaseURL: "https://clone-netflix-c75d0.firebaseio.com",
    projectId: "clone-netflix-c75d0",
    storageBucket: "clone-netflix-c75d0.appspot.com",
    messagingSenderId: "730770388286"
  };
 
export default firebase.initializeApp(config);