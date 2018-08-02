import { firebaseApp } from '../config/firebaseConfig';

export const checkAuthStatusApi = () => (
   new Promise((resolve) => {
      firebaseApp.auth().onAuthStateChanged(user => {
         resolve(user);
      });
   })
);

export const signInWithEmailPasswordApi = async (email, password) => {
   try {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      const user = checkAuthStatusApi();
      return user;
   } catch (err) {
      let message;
      if (err.code === 'auth/invalid-email') {
         message = 'The email invalid';
      }
      if (err.code === 'auth/user-not-found') {
         message = 'Account not found..';
      }
      if (err.code === 'auth/wrong-password') {
         message = 'The password invalid.';
      }
      console.log(message);
      return null;
   }
};
