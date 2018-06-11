// import { NavigationActions } from 'react-navigation';
import { DeviceEventEmitter, ToastAndroid } from 'react-native';
import moment from 'moment';
import { firebaseApp } from '../config/firebaseConfig';
import Upload from '../api/Upload';

export const GOOGLE_SEARCH = 'GOOGLE_SEARCH';
export const GOOGLE_SEARCH_DISMISS = 'GOOGLE_SEARCH_DISMISS';
export const SET_BOOK_INFO = 'SET_BOOK_INFO';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const UPLOAD = 'UPLOAD';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

const currentDate = moment().format('YYYY-MM-DD');
const defaultThumbnail = 'https://firebasestorage.googleapis.com/v0/b/bookcase-d1e17.appspot.com/o/thumbnail%2FNo_book_cover_lg.jpg?alt=media&token=18f98f4f-1cfa-4610-b6db-bd7478849a20';

export const googleSearch = result => ({
   type: GOOGLE_SEARCH,
   result
});

export const googleSearchDismiss = () => ({
   type: GOOGLE_SEARCH_DISMISS
});

export const setBookInfo = data => ({
   type: SET_BOOK_INFO,
   data
});

export const onRemoveImage = () => ({
   type: REMOVE_IMAGE
});

export const uploadSuccess = () => ({
   type: UPLOAD_SUCCESS
});

export const onSelectSearchResult = ({ title, authors, description, pageCount, imageLinks }) => (
   dispatch => {
      const data = {
         title,
         author: authors !== undefined ? authors[0] : 'Undefined',
         page: pageCount !== undefined ? Number(pageCount) : 0,
         summary: description,
         isFinished: false,
         dateFinished: currentDate,
         thumbnail: imageLinks.thumbnail !== undefined ? imageLinks.thumbnail : defaultThumbnail,
         isGoogleSearch: false,
         googleSearch: [],
      };
      dispatch(setBookInfo(data));
   }   
);

export const googleBookSearch = text => (
   async dispatch => {
      if (text !== '') {
         const url = `https://www.googleapis.com/books/v1/volumes?q=${text}&maxResults=5`;
         const response = await fetch(url); //eslint-disable-line  
         const responseJson = await response.json();
         dispatch(googleSearch(responseJson.items));
      } else {
         dispatch(googleSearchDismiss());
      }
   }
);


export const onUpload = () => (
   async (dispatch, getState) => {
      dispatch({ type: 'SHOW_LOADING' });
      try {
         const { uid } = getState().auth.user;
         const {
            title, author, isFinished, dateFinished,
            page, imageSource, summary, thumbnail
         } = getState().add;

         let thumbnailLink = null;
         if (imageSource !== null) {
            thumbnailLink = await Upload(imageSource.uri);
         }

         if (thumbnail !== null) {
            thumbnailLink = thumbnail;
         }

         const dataPost = {
            title,
            author,
            summary,
            rating: 0,
            is_finished: isFinished,
            date_finished: isFinished ? dateFinished : null,
            page: Number(page),
            thumbnail: thumbnailLink !== null ? thumbnailLink : defaultThumbnail
         };
         await firebaseApp.database().ref('bookcase').child(uid).push(dataPost);
         dispatch(uploadSuccess());
         dispatch({ type: 'HIDE_LOADING' });
         ToastAndroid.show('Add successfully!', ToastAndroid.SHORT);
         
         /* refresh bookcase */
         DeviceEventEmitter.emit('refreshBookcase');
      } catch (error) {
         console.log('---------', error);
         dispatch({ type: 'HIDE_LOADING' });
         ToastAndroid.show('Add error!', ToastAndroid.SHORT);
      }
   }
);
