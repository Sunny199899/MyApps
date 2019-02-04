import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import mathReducer from './reducers/mathReducer'
import userReducer from './reducers/userReducer'

const store = createStore(
    combineReducers({math:mathReducer, user:userReducer}), 
    {}, 
    applyMiddleware(createLogger())
);

export default store;