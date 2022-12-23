# packages
<a href="http://example.com/" target="_blank" onclick="return false;">Hello, world!</a>

<a href="#pookie" onclick="return false;">pookie0</a>

# Header
`npm install redux redux-saga --save`

# My Anchored Heading {#my-anchor}

1. What is redux-saga 
Redux is a state management library, while Redux Saga is a library that focuses on managing *side effects*


USAGE
1. Dispatch an action

```
onSomeButtonClicked() {
    const { userId, dispatch } = this.props
    dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
  }
```


2. Initiate an effect
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

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}
```


3. Testing


2. how to connect a component to the store?

1. what's a redux saga channel?
2. what's the difference between take and take every?
3. what's a blocking call?
4. what is the definition of multithreading?







# reducers
a redus saga store can have multiple reducers. 
a reducer contain the data for a specific object
```
import ACTIONS from "../actions/constants";
export function counterReducer(
  state = {
    counter: 0,
  },
  action
) {
  debugger;
  switch (action.type) {
    case ACTIONS.INCREMENT: {
      state = {
        ...state,
        counter: state.counter+1
      }
      return state;
    }
    
    default:
      return state;
  }
}

```
<a name="pookie"></a>
# sagas
sagas respresent the methods used to update the store values
```
function* incrementAync() {
  debugger;
  yield put({ type: ACTIONS.INCREMENT });
  yield delay(1000);
  yield put({ type: ACTIONS.DECREMENT });
}

function* watchIncrementAsync() {
  yield takeEvery(ACTIONS.INCREMENT_ASYNC, incrementAync);
}

export function* rootSagas() {
  yield all([watchIncrementAsync()]);
}

``` 

# store

```
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { counterReducer } from './reducers/counter-reducer';
import { rootSagas } from './sagas/root-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(counterReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSagas);

```

# components

## connection the store using redux `connect`

```

const action = (type) => () => ({ type });

const mapState = (state) => {
  debugger;
  return {count: state.counter}
}

export const ConnectedCounter = connect(mapState, {
  onIncrement: action(ACTIONS.INCREMENT),
  onDecrement: action(ACTIONS.DECREMENT),
  onIncrementAsync: action(ACTIONS.INCREMENT_ASYNC),
})(Counter);
```


