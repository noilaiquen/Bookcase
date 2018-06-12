import { 
   CONNECTION_CHANGE,
   KEYBOARD_SHOW,
   KEYBOARD_HIDE,
   SHOW_LOADING,
   HIDE_LOADING,
} from '../actions/App';

const initState = {
   isLoading: false,
   isConnected: true,
   isKeyboardShow: false
};

export default (state = initState, action) => {
   switch (action.type) {
      case SHOW_LOADING: 
         return {
            ...state,
            isLoading: true
         };
      case HIDE_LOADING: 
         return {
            ...state,
            isLoading: false
         };
      case CONNECTION_CHANGE:
         return {
            ...state,
            isConnected: action.isConnected
         };
      case KEYBOARD_SHOW:
         return {
            ...state,
            isKeyboardShow: true
         };
      case KEYBOARD_HIDE:
         return {
            ...state,
            isKeyboardShow: false
         };
      default:
         return state;
   }
};
