
import USER_ACTIONS from './constants';

const initialState = {
  items: [{}]
};

const usersReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case USER_ACTIONS.GET_USERS_SUCCESS:
      return {
        ...state,
        items:action.payload
      };
    default:
      return state;
  }
};

export default usersReducer;
