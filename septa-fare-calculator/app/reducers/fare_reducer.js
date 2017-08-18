import { RECEIVE_DATA } from './../actions/actions.js';

const reducer = (state = {}, action ) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_DATA:
      return action.data;
    default:
      return state;
  }
};

export default reducer;
