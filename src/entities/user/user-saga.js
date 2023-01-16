/* eslint-disable no-unused-vars */
import {
  takeEvery,
  call,
  put,
  fork,
  all,
  takeLatest,
  take,
  takeLeading,
  takeMaybe,
  cancel,
  actionChannel,
} from "redux-saga/effects";

import { eventChannel } from "redux-saga";


import USER_ACTIONS from "./constants";
import apiGetUsers from "../../api";
import userActions from "../../entities/user/user-actions";


function loginApi(payload){
  return new Promise((res, rej)=>{
    setTimeout(()=>{
      res({
        token: 'my_token',
        payload,
      })
    }, 1000)
  })
}


function* executeLoginWorkshop(payload) {
  try {
    debugger;

    console.log("functionregisterForLoginWorkshop");

    const result = yield call(loginApi, payload);

    console.log('login response ', result);

    //yield put(userActions.getUsersSuccess(result));
  } catch (error) {
    console.error(error);
  }
}

function* watchLoginWorkshop() {
  debugger;
  while (true) {
    debugger;
    console.log('asdasd');
    const loginPayload = yield take(USER_ACTIONS.LOGIN_WORKSHOP);
    debugger;
    console.log("take LOGIN_WORKSHOP");
    yield call(executeLoginWorkshop, loginPayload);
  }
}




function countdown(secs) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        secs -= 1
        if (secs > 0) {
          emitter(secs)
        } else {
          // this causes the channel to close
          emitter('END')
        }
      }, 1000);
      // The subscriber must return an unsubscribe function
      return () => {
        clearInterval(iv)
      }
    }
  )
}

function* executeCountDown(value=10) {
  const chan = yield call(countdown, value)
  try {    
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      let seconds = yield take(chan)
      console.log(`countdown: ${seconds}`)
    }
  } finally {
    console.log('countdown terminated')
  }
}

function* watchCountDown() {
  while (true) {
    const loginPayload = yield take(USER_ACTIONS.COUNT_DOWN);
    console.log("take payload", countdown);
    yield call(executeCountDown, 10);
  }
}


function* getUsers(payload) {
  try {
    // debugger;
    // const test = yield apiGetUsers();
    // console.log(test);
    console.log("function* getUsers(payload)");
    const result = yield call(apiGetUsers);
    result.forEach((el) => (el.reqid = payload.reqid));
    yield put(userActions.getUsersSuccess(result));
  } catch (error) {
    console.error(error);
  }
}

function* callGetUsers(payload) {
  try {
    // debugger;
    const data = yield call(getUsers, payload);
    yield put({ type: "FETCH_SUCCEEDED", data });
  } catch (error) {
    yield put({ type: "FETCH_FAILED", error });
  }
}

function* login(payload) {
  try {
    // debugger;
    // const test = yield apiGetUsers();
    // console.log(test);
    // setTimeout(() => {
    //   console.log("function* login(payload)");
    //   yield put({ type: "LOGIN_SUCCESS" });
    // },1000)

    console.log("function* login(payload)");
    yield put({ type: "LOGIN_SUCCESS" });
  } catch (error) {
    console.error(error);
  }
}

// eslint-disable-next-line require-yield
function* loginT(payload) {
  try {
    // debugger;
    // const test = yield apiGetUsers();
    // console.log(test);
    // setTimeout(() => {
    //   console.log("function* login(payload)");
    //   yield put({ type: "LOGIN_SUCCESS" });
    // },1000)

    // eslint-disable-next-line require-yield
     setTimeout(function () {
      function* gen() {
        console.log("function* loginT(payload)");
        debugger;
        yield put({ type: "LOGIN_SUCCESS" });
      }
      debugger;
      var it = gen();
      it.next();
      // console.log(it.next().value);
    }, 1000);

    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    debugger;
    console.error(error);
  }
}

function* watchChannelRequestsFork() {
  // 1- Create a channel for request actions
  const requestChan = yield actionChannel(USER_ACTIONS.CHANNEL_REQUEST_FORK);
  while (true) {
    // 2- take from the channel
    const payload = yield take(requestChan);
    console.log("watchChannelRequests ", payload);

    // 3- Note that we're using a blocking call
    // yield call(getUsers, payload)

    yield fork(getUsers, payload);
  }
}

function* watchChannelRequests() {
  // 1- Create a channel for request actions
  const requestChan = yield actionChannel(USER_ACTIONS.CHANNEL_REQUEST);
  while (true) {
    // 2- take from the channel
    const payload = yield take(requestChan);
    console.log("watchChannelRequests ", payload);

    yield call(getUsers, payload);
  }
}

// function* watchGetUsersRequest() {
//   yield takeEvery(USER_ACTIONS.GET_USERS_REQUEST_LATEST, getUsers);
// }

function* watchGetUsersRequest() {
  yield takeLatest(USER_ACTIONS.GET_USERS_REQUEST_LATEST, getUsers);
  yield takeEvery(USER_ACTIONS.GET_USERS_REQUEST_EVERY, getUsers);
  yield takeLeading(USER_ACTIONS.GET_USERS_REQUEST_LEADING, getUsers);
}

function* watchTake() {
  while (true) {
    const loginPayload = yield take(USER_ACTIONS.GET_USERS_REQUEST_TAKE);
    console.log("take payload", loginPayload);
    const loginResponse = yield take([
      "LOGIN_SUCCESS",
      "LOGIN_ERROR",
      "GET_USERS_REQUEST_TAKE_UNBLOCK",
    ]);
    console.log("login response watchTake", loginResponse);
  }
}

function* watchTakeMaybe() {
  while (true) {
    const loginPayload = yield takeMaybe('GET_USERS_SUCCESS');
    console.log("take MAYBE payload", loginPayload);
    
  }
}

function* watchTakeFork() {
  while (true) {
    const loginPayload = yield take(USER_ACTIONS.GET_USERS_REQUEST_TAKE_FORK);

    // const task = yield fork(loginT, loginPayload);
    const task = yield fork(login, loginPayload);

    console.log("loginForkPayload", loginPayload);
    const loginResponse = yield take([
      "LOGIN_SUCCESS",
      "LOGIN_ERROR",
      "GET_USERS_REQUEST_TAKE_UNBLOCK",
    ]);
    console.log("login response watchTakeFork", loginResponse);

    if (loginResponse.type === "LOGIN_SUCCESS") {
      yield cancel(task);
      yield put({ type: "DELETE_TOKEN" });
    }
  }
}

// const userSagas = [fork(watchGetUsersRequest)];

const userSagas = {
  callGetUsers,
  apiGetUsers,
  getUsers,
  watchGetUsersRequest,
  watchTake,

  watchTakeMaybe,
  watchTakeFork,
  watchChannelRequests,
  watchChannelRequestsFork,
  watchCountDown,
  watchLoginWorkshop,
};

export default userSagas;
