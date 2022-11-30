import { takeEvery, call, put, fork, all, takeLatest, take, takeLeading, takeMaybe } from 'redux-saga/effects';

import USER_ACTIONS from './constants';
import apiGetUsers from '../../api';
import userActions from "../../entities/user/user-actions";
function* getUsers(payload) {
  try {
    // debugger;
    // const test = yield apiGetUsers();
    // console.log(test);
    console.log('function* getUsers(payload)');
    const result = yield call(apiGetUsers);
    result.forEach(el=> el.reqid = payload.reqid)
    yield put(userActions.getUsersSuccess(result));
  } catch (error) {
    console.error(error);
  }
}

function* login(payload) {
  try {
    // debugger;
    // const test = yield apiGetUsers();
    // console.log(test);
    console.log('function* login(payload)');
    yield put({type: 'LOGIN_SUCCESS'})
  } catch (error) {
    console.error(error);
  }
}

// function* watchGetUsersRequest() {
//   yield takeEvery(USER_ACTIONS.GET_USERS_REQUEST_LATEST, getUsers);
// }

function* watchGetUsersRequest() {
  yield takeLatest(USER_ACTIONS.GET_USERS_REQUEST_LATEST, getUsers);
  yield takeEvery(USER_ACTIONS.GET_USERS_REQUEST_EVERY, getUsers);
  yield takeLeading(USER_ACTIONS.GET_USERS_REQUEST_LEADING, getUsers);
  yield takeMaybe(USER_ACTIONS.GET_USERS_REQUEST_MAYBE, getUsers);
  
}


function* watchTake() {
  while (true){
     const loginPayload = yield take(USER_ACTIONS.GET_USERS_REQUEST_TAKE);
     console.log('loginPayload', loginPayload);
     const loginResponse = yield take(['LOGIN_SUCCESS', 'LOGIN_ERROR', 'GET_USERS_REQUEST_TAKE_UNBLOCK']);
     console.log('login response ',loginResponse);
   }
}


// const userSagas = [fork(watchGetUsersRequest)];

const userSagas = {
  watchGetUsersRequest,
  watchTake
}

export default userSagas;
