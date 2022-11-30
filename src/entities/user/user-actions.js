import USER_ACTIONS from "./constants";

const getUsersRequestTake = (dispatch, reqid) =>
  dispatch({
    type: USER_ACTIONS.GET_USERS_REQUEST_TAKE,
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

  

const getUsersSuccess = (items) => ({
  type: USER_ACTIONS.GET_USERS_SUCCESS,
  payload: items,
});

// export const aaa = () => ({
//   type: USER_ACTIONS.GET_USERS_REQUEST_LATEST
// });

const userActions = {
  getUsersRequestTake,
  getUsersRequestTakeUnblock,
  getUsersRequestLatest,
  getUsersRequestTakeEvery,

  getUsersRequestTakeLeading,
  getUsersRequestTakeMaybe,
  getUsersSuccess,
};

export default userActions;
