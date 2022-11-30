import ACTIONS from "../actions/constants";
export function counterReducer(
  state = {
    counter: 0,
  },
  action
) {
  switch (action.type) {
    case ACTIONS.INCREMENT: {
      // state.counter++;
      state = {
        ...state,
        counter: state.counter+1
      }
      return state;
    }
    case ACTIONS.DECREMENT: {
      state = {
        ...state,
        counter: state.counter-1
      }
      return state;
    }
    default:
      return state;
  }
}
