import USER_ACTIONS from "./constants";

const triggerLoginWorkshop = (dispatch, payload) => {
  debugger;
  dispatch({
    type: USER_ACTIONS.LOGIN_WORKSHOP,
    payload,
  });
}



const getUsersRequestTake = (dispatch, reqid) =>
  dispatch({
    type: USER_ACTIONS.GET_USERS_REQUEST_TAKE,
    reqid,
  });

  const channelCountDown = (dispatch) =>{

    dispatch({
      type: USER_ACTIONS.COUNT_DOWN,
    });
  }

const getUsersRequestTakeFork = (dispatch, reqid) =>
  dispatch({
    type: USER_ACTIONS.GET_USERS_REQUEST_TAKE_FORK,
    reqid,
  });

const getUsersRequestTakeUnblock = (dispatch, reqid) =>
  dispatch({
    type: USER_ACTIONS.GET_USERS_REQUEST_TAKE_UNBLOCK,
    reqid,
  });

const getUsersRequestLatest = (dispatch, reqid) =>
  dispatch({
    type: USER_ACTIONS.GET_USERS_REQUEST_LATEST,
    reqid,
  });

const getUsersRequestTakeEvery = (dispatch, reqid) =>
  dispatch({
    type: USER_ACTIONS.GET_USERS_REQUEST_EVERY,
    reqid,
  });

const getUsersRequestTakeLeading = (dispatch, reqid) =>
  dispatch({
    type: USER_ACTIONS.GET_USERS_REQUEST_LEADING,
    reqid,
  });

const getUsersRequestTakeMaybe = (dispatch, reqid) =>
  dispatch({
    type: USER_ACTIONS.GET_USERS_REQUEST_MAYBE,
    reqid,
  });

  const watchChannelRequests = (dispatch, reqid) =>
  dispatch({
    type: USER_ACTIONS.CHANNEL_REQUEST,
    reqid,
  });

  const watchChannelRequestsFork = (dispatch, reqid) =>
  dispatch({
    type: USER_ACTIONS.CHANNEL_REQUEST_FORK,
    reqid,
  });

const getUsersSuccess = (items) => ({
  type: USER_ACTIONS.GET_USERS_SUCCESS,
  payload: items,
});

// export const aaa = () => ({
//   type: USER_ACTIONS.GET_USERS_REQUEST_LATEST
// });

const userActions = {
  getUsersRequestTake,
  getUsersRequestTakeFork,
  getUsersRequestTakeUnblock,
  getUsersRequestLatest,
  getUsersRequestTakeEvery,

  getUsersRequestTakeLeading,
  getUsersRequestTakeMaybe,
  watchChannelRequests,
  watchChannelRequestsFork,
  getUsersSuccess,
  channelCountDown,
  triggerLoginWorkshop
};

export default userActions;
