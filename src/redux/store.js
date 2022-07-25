import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userreducers';

const rootReducer = combineReducers({ userReducer });

 const Store = createStore(rootReducer, applyMiddleware(thunk));

 export default Store;