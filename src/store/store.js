import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { counterReducer } from './reducers/counter-reducer';
import  userReducer  from '../entities/user/user-reducer';
import rootSagas  from './sagas/root-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducers({counterReducer, userReducer}),
    applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSagas);
