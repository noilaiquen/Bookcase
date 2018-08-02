import moment from 'moment';
import {
   GOOGLE_SEARCH,
   GOOGLE_SEARCH_DISMISS,
   SET_BOOK_INFO,
   REMOVE_IMAGE,
   UPLOAD_SUCCESS
} from '../actions/Add';

const currentDate = moment().format('YYYY-MM-DD');

const initState = {
   isGoogleSearch: false,
   googleSearch: [],
   title: '',
   author: '',
   page: 0,
   summary: '',
   isFinished: false,
   dateFinished: currentDate,
   imageSource: null,
   thumbnail: null
};

export default (state = initState, action) => {
   switch (action.type) {
      case GOOGLE_SEARCH: {
         const { result } = action;
         return {
            ...state,
            isGoogleSearch: true,
            googleSearch: result
         };
      }
      case GOOGLE_SEARCH_DISMISS: {
         return {
            ...state,
            isGoogleSearch: false,
            googleSearch: []
         };
      }
      case SET_BOOK_INFO: {
         const { data } = action;
         return {
            ...state,
            ...data
         };
      }
      case REMOVE_IMAGE: 
         return {
            ...state,
            imageSource: null
         };
      case UPLOAD_SUCCESS: 
         return initState;
      default:
         return state;
   }
};
