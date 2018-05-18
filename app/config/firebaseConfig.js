import * as firebase from 'firebase';

const config = {
   apiKey: 'API_KEY',
   authDomain: 'AUTH_DOMAIN',
   databaseURL: 'DATABASE_URL',
   projectId: 'PROJECT_ID',
   storageBucket: 'STORAGE_BUCKET',
   messagingSenderId: 'MESSAGIN_SENDER_ID'
};
 
export const firebaseApp = firebase.initializeApp(config);
