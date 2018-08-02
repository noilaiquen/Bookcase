import {
   FETCH_NOTE,
   FETCH_NOTE_SUCCESS,
   FETCH_FAILURE,
   TOGGLE_FORM_NOTE,
} from '../actions/Note';

const initState = {
   isLoading: false,
   showForm: false,
   notes: []
};

export default (state = initState, action) => {
   switch (action.type) {
      case FETCH_NOTE:
         return { ...state, isLoading: true };
      case FETCH_NOTE_SUCCESS:
         return { ...state, isLoading: false, notes: action.notes };
      case FETCH_FAILURE:
         return { ...state, isLoading: false };
      case TOGGLE_FORM_NOTE:  
         return { ...state, showForm: !state.showForm }
      default:
         return state;
   }
}