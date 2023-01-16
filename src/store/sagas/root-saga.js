import { put, takeEvery, all, call, delay } from 'redux-saga/effects';
import ACTIONS from "../actions/constants";
import userSagas from '../../entities/user/user-saga';

// console.log(userSagas)
function* incrementAync() {
  yield put({ type: ACTIONS.INCREMENT });
  yield delay(1000);
  yield put({ type: ACTIONS.DECREMENT });
  yield delay(1000);
  yield put({ type: ACTIONS.INCREMENT });
  yield delay(1000);
  yield put({ type: ACTIONS.DECREMENT });
}

function* watchIncrementAsync() {
  yield takeEvery(ACTIONS.INCREMENT_ASYNC, incrementAync);
}

// export default function* rootUserSaga() {
//   yield all([
//     ...userSagas.watchGetUsersRequest()
//   ]);
// }

export default function* rootSagas() {
  // yield all([watchIncrementAsync(),userSagas()]);
  yield all([
    userSagas.watchGetUsersRequest(),
    userSagas.watchTake(),
    userSagas.watchTakeMaybe(),
    userSagas.watchTakeFork(),
    userSagas.watchChannelRequests(),
    userSagas.watchChannelRequestsFork(),
    userSagas.watchCountDown(),
    userSagas.watchLoginWorkshop(),
    // watchIncrementAsync()
  ]);
}
