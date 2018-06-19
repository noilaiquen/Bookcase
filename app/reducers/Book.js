import { 
   FETCH_BOOK,
   FETCH_BOOK_SUCCESS,
   FETCH_FAILURE,
   SEARCH_BOOK,
   CLEAR_SEARCH,
   FETCH_BOOK_ID,
   CHANGE_BOOK_INFO,
   RESET_UPDATE_STATE
} from '../actions/Book';

const initState = {
   isLoading: false,
   isSearching: false,
   booksSearch: [],
   books: [],
   isUpdated: false,
   bookInfo: null,
   error: null
};

export default (state = initState, action) => {
   switch (action.type) {
      case FETCH_BOOK: 
         return {
            ...state,
            isLoading: true
         };
      case FETCH_BOOK_SUCCESS: {
         const { books } = action;
         return {
            ...state,
            isLoading: false,
            books
         };
      }
      case FETCH_FAILURE: {
         const { error } = action;
         return {
            ...state,
            isLoading: false,
            error
         };
      }
      case SEARCH_BOOK: {
         const { booksSearch } = action;
         return {
            ...state,
            isSearching: true,
            booksSearch
         };
      }
      case CLEAR_SEARCH: 
         return {
            ...state,
            isSearching: false,
            booksSearch: []
         };  
      case FETCH_BOOK_ID: {
         const { bookInfo } = action;
         return {
            ...state,
            bookInfo
         };      
      }
      case CHANGE_BOOK_INFO: {
         const { value } = action;
         return {
            ...state,
            isUpdated: true,
            bookInfo: { ...state.bookInfo, ...value }
         };
      }
      case RESET_UPDATE_STATE:
         return {
            ...state,
            isUpdated: false,
         };
      default:
         return state;
   }
};
