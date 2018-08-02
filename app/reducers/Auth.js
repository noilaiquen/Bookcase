import { 
   CHECKING_AUTH_STATUS,
   LOGIN,
   LOGIN_SUCCESS,
   LOGIN_FAILURE,
   LOGOUT
} from '../actions/Auth';

const initState = {
   isLoading: true,
   user: null,
   isLoggedIn: false,
   error: null
};

export default (state = initState, action) => {
   switch (action.type) {
      case CHECKING_AUTH_STATUS: {
         const { user } = action;
         return {
            ...state,
            user,
            isLoading: false,
            isLoggedIn: user !== null ? true : false
         };
      }
      case LOGIN: 
         return { 
            ...state,
            error: null,
            isLoading: true
         };
      case LOGIN_SUCCESS: {
         const { user } = action;
         return { 
            ...state,
            isLoading: false,
            isLoggedIn: true,
            user
         };
      }
      case LOGIN_FAILURE: {
         const { error } = action;
         return { 
            ...state,
            isLoading: false,
            error
         };
      }
      case LOGOUT:
         return {
            ...state,
            initState
         }; 
      default:
         return state;
   }
};
