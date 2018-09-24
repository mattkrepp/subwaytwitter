import axios from 'axios'


const GET_STATUSES = 'GET_STATUSES';
const dispatchGetStatuses = status => ({type: GET_STATUSES, status});

export const getStatuses = () => async dispatch => {
  try {
    const res = await axios.get('/api/status');
    console.log(res.data);
    dispatch(dispatchGetStatuses(res.data));
  } catch(err) {
    console.error(err);
  }
};

export default (state = {}, action) => {
  switch(action.type){
    case GET_STATUSES:
      return action.status;
    default:
      return state;
  }

}