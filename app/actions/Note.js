import moment from 'moment';
import { ToastAndroid } from 'react-native';
import { firebaseApp } from '../config/firebaseConfig';

import {
   FETCH_NOTE,
   FETCH_NOTE_SUCCESS,
   FETCH_NOTE_FAILURE,
   TOGGLE_FORM_NOTE
} from './actionTypes';

export const toggleFormNote = () => ({
   type: TOGGLE_FORM_NOTE
});

export const fetchBookNotes = (bookId, limit = undefined) => (
   async dispatch => {
      dispatch({ type: FETCH_NOTE });
      
      try {
         let notes = [];
         let snapshot = null;
         if(limit !== undefined) {
            snapshot = await firebaseApp.database().ref('notes').child(bookId).limitToFirst(limit).once('value');
         } else {
            snapshot = await firebaseApp.database().ref('notes').child(bookId).once('value');
         }
         snapshot.forEach(childSnapshot => {
            notes.push({
               key: childSnapshot.key,
               name: childSnapshot.val().name,
               content: childSnapshot.val().content,
               datetimeNote: childSnapshot.val().datetimeNote
            });
         });
         dispatch({ type: FETCH_NOTE_SUCCESS, notes });
      } catch (error) {
         dispatch({ type: FETCH_NOTE_FAILURE });
      }
   }
);

export const addBookNote = (text, bookId) => (
   async (dispatch, getState) => {
      try {
         const { displayName } = getState().auth.user;
         await firebaseApp.database().ref('notes').child(bookId).push({
            name: displayName,
            content: text,
            datetimeNote: moment().format('YYYY-MM-DD HH:mm:ss')
         });
         dispatch(toggleFormNote());
         ToastAndroid.show('Success!', ToastAndroid.LONG);
      } catch (error) {
         ToastAndroid.show('Somethings were wrong!', ToastAndroid.LONG);
      }
   }
);