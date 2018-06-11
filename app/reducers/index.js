import { combineReducers } from 'redux';
import auth from './Auth';
import app from './App';
import book from './Book';
import add from './Add';
import nav from './Navigation';

export default combineReducers({
   app,
   auth,
   nav,
   book,
   add
});
