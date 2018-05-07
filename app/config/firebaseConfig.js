import * as firebase from 'firebase';

const config = {
   apiKey: 'AIzaSyCve3iwTD7LteTEsmczXJnK9b-49P5NrAw',
   authDomain: 'bookcase-d1e17.firebaseapp.com',
   databaseURL: 'https://bookcase-d1e17.firebaseio.com',
   projectId: 'bookcase-d1e17',
   storageBucket: 'bookcase-d1e17.appspot.com',
   messagingSenderId: '450992608942'
};
 
export const firebaseApp = firebase.initializeApp(config);
