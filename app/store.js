import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { reduxMiddleware } from './utils';

const store = createStore(reducers, applyMiddleware(thunk, reduxMiddleware));
export default store;
