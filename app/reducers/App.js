import { 
   CONNECTION_CHANGE
} from '../actions/App';

const initState = {
   isLoading: false,
   isConnected: true
};

export default (state = initState, action) => {
   switch (action.type) {
      case 'SHOW_LOADING': 
         return {
            ...state,
            isLoading: true
         };
      case 'HIDE_LOADING': 
         return {
            ...state,
            isLoading: false
         };
      case CONNECTION_CHANGE:
         return {
            ...state,
            isConnected: action.isConnected
         };
      default:
         return state;
   }
};
