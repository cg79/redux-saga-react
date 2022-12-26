


# Table of contents

1. [What is redux-saga](#what)
2. [Effects](#effects)


[Step By Step](#steps)

# What is redux-saga <a name="what"></a>
Redux is a state management library, while 

Redux Saga is a middleware library that focuses on managing *side effects*





# Effects <a name="effects"></a>
 1. [Take](#take)
 2. [Take Maybe](#takemaybe)
 3. [Take Every](#takeevery)
 4. [Take Latest](#takelatest)
 5. [Take Leading](#takeleading)
 6. [Call](#call)
 7. [Fork](#fork)
 8. [Put](#put)
 9. [Channels](#channels)
    - [Action Channel](#actionChannel)
    - [Event Channel](#eventChannel)



# Take <a name="take"></a>
It is a **blocking** operation that creates an Effect description that instructs the middleware to wait for a specified action on the Store. The Generator is suspended until an action that matches pattern is dispatched.


# Take Maybe <a name="takemaybe"></a>
It is a **non blocking** opperation and it is executed only in case of an action
```
const loginPayload = yield takeMaybe('ON_LOGIN_SUCCESS');
```


# Take Every <a name="takeevery"></a>
It is a **non blocking** opperation and it is executed every time an action appears
```
yield takeEvery(USER_ACTIONS.GET_USERS_REQUEST_EVERY, getUsers);
```

# Take Latest <a name="takelatest"></a>
Cancels all previous calls and take only the latest request
```
yield takeLatest(USER_ACTIONS.GET_USERS_REQUEST_EVERY, getUsers);
```

# Take Leading <a name="takeleading"></a>
Start the first request and ignores all the other ones (until th efirst request is ended)
```
yield takeLeading(USER_ACTIONS.GET_USERS_REQUEST_EVERY, getUsers);
```

# Call <a name="call"></a>
execute a saga action
```
function* watchCountDown() {
  while (true) {
    const loginPayload = yield take(USER_ACTIONS.COUNT_DOWN);
    console.log("take payload", countdown);
    yield call(executeCountDown, 10);
  }
}
```

# Fork <a name="fork"></a>
it is used to 'fork' the current action that the current saga to not be blocked

```
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

```

# Put <a name="put"></a>
`put` is used to `send` the data to the redux store



# Channels <a name="channels"></a>
Channels generalize put and take Effects to communicate with external event sources or between Sagas themselves. They can also be used to queue specific actions from the Store.

# Action Channel <a name="actionChannel"></a>
So we want to queue all non-processed actions, and once we're done with processing the current request, we get the next message from the queue.

```
import { take, actionChannel, call, ... } from 'redux-saga/effects'

function* watchRequests() {
  // 1- Create a channel for request actions
  const requestChan = yield actionChannel('REQUEST')
  while (true) {
    // 2- take from the channel
    const {payload} = yield take(requestChan)
    // 3- Note that we're using a blocking call
    yield call(handleRequest, payload)
  }
}

function* handleRequest(payload) { ... }
```

# Event Channel <a name="eventChannel"></a>
Like actionChannel (Effect), eventChannel (a factory function, not an Effect) creates a Channel for events but from event sources other than the Redux Store.

```
import { eventChannel, END } from 'redux-saga'

function countdown(secs) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        secs -= 1
        if (secs > 0) {
          emitter(secs)
        } else {
          // this causes the channel to close
          emitter(END)
        }
      }, 1000);
      // The subscriber must return an unsubscribe function
      return () => {
        clearInterval(iv)
      }
    }
  )
}
```

Let's see how we can use this channel from our Saga. (This is taken from the cancellable-counter example in the repo.)

```
import { take, put, call } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

// creates an event Channel from an interval of seconds
function countdown(seconds) { ... }

export function* saga() {
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
```


# Spep by step <a name="steps"></a>

**Instalation**

`npm install redux redux-saga --save`



**1. Dispatch an action**

```
onSomeButtonClicked() {
    const { userId, dispatch } = this.props
    dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
  }
```

**2. Register root sagas**

```
function* watchGetUsersRequest() {
  yield takeLatest(USER_ACTIONS.GET_USERS_REQUEST_LATEST, getUsers);
  yield takeEvery(USER_ACTIONS.GET_USERS_REQUEST_EVERY, getUsers);
  yield takeLeading(USER_ACTIONS.GET_USERS_REQUEST_LEADING, getUsers);
}
```

and root saga:

```
export default function* rootSagas() {
  yield all([
    userSagas.watchGetUsersRequest(),
    ...
    userSagas.watchCountDown(),
  ]);
}
```

**3. Initiate an effect**

```
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

```


**4. Testing**



