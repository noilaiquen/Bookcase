import { NavigationActions, StackActions } from 'react-navigation';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase, { firebaseApp } from '../config/firebaseConfig';
import { checkAuthStatusApi } from '../api/Auth';

import {
   CHECKING_AUTH_STATUS,
   LOGIN,
   LOGIN_SUCCESS,
   LOGIN_FAILURE,
   LOGOUT
} from './actionTypes';

export const checkAuthStatus = user => ({
   type: CHECKING_AUTH_STATUS,
   user
});

export const login = () => ({
   type: LOGIN
});

export const loginSuccess = user => ({
   type: LOGIN_SUCCESS,
   user
});

export const loginFailure = error => ({
   type: LOGIN_FAILURE,
   error
});

const navigateAction = user => (
   NavigationActions.navigate({
      routeName: user !== null ? 'Authorized' : 'Unauthorized',
      params: {},
      action: StackActions.reset({
         index: 0,
         actions: [
            NavigationActions.navigate({ routeName: user !== null ? 'Tabs' : 'Main' })
         ]
      }),
   })
);

export const AuthStatus = () => (
   async dispatch => {
      const user = await checkAuthStatusApi();
      dispatch(checkAuthStatus(user));
      dispatch(navigateAction(user));
   }
);

export const loginWithEmailPassword = (email, password) => (
   async dispatch => {
      dispatch(login());
      try {
         await firebaseApp.auth().signInWithEmailAndPassword(email, password);
         const user = firebaseApp.auth().currentUser;
         dispatch(loginSuccess(user));
         dispatch(navigateAction(user));
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
         dispatch(loginFailure(message));
      }
   }
);

export const loginWithGoogle = () => (
   async dispatch => {
      dispatch(login());
      try {
         const userInfo = await GoogleSignin.signIn();
         const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
         await firebaseApp.auth().signInWithCredential(credential);
         const user = firebaseApp.auth().currentUser;
         dispatch(loginSuccess(user));
         dispatch(navigateAction(user));
      } catch (err) {
         dispatch(loginFailure(JSON.stringify(err)));
      }
   }
);

export const loginWithFacebook = () => (
   async dispatch => {
      dispatch(login());
      try {
         const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
         if (result.isCancelled) {
            throw new Error('Please sign in before continue');
         }
         const tokenData = await AccessToken.getCurrentAccessToken();
         const token = tokenData.accessToken.toString();
         const credential = firebase.auth.FacebookAuthProvider.credential(token);
         await firebaseApp.auth().signInWithCredential(credential);
         const user = firebaseApp.auth().currentUser;
         dispatch(loginSuccess(user));
         dispatch(navigateAction(user));
      } catch (err) {
         dispatch(loginFailure(JSON.stringify(err)));
      }
   }
);

export const logout = () => (
   async dispatch => {
      await firebaseApp.auth().signOut();
      dispatch({ type: LOGOUT });
      const navigatonAction = NavigationActions.navigate({
         routeName: 'Unauthorized',
         action: StackActions.reset({
            index: 0,
            actions: [
               NavigationActions.navigate({ routeName: 'Main' })
            ]
         })
      });
      dispatch(navigatonAction);
   }
);
