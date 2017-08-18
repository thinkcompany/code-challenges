import * as APIUtil from './../util/util.js';

export const RECEIVE_DATA = 'RECEIVE_DATA';


export const receiveData = (data) => ({
  type: RECEIVE_DATA,
  data: JSON.parse(data)
});

export const requestData = () => (dispatch) => {
  return APIUtil.fetchData()
  .then((data) => dispatch(receiveData(data)));
};
