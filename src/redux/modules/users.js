import {
  createAction,
  handleActions
} from 'redux-actions'


import {
  post
} from '../utils/ajaxAction';

// Constants
// ------------------------------------
export const SIGN_UP_USER = 'SIGN_UP_USER';

// ------------------------------------
// Actions
// ------------------------------------
export const signUpUser = createAction(
  SIGN_UP_USER,
  _ => {
    return dispatch => {
      dispatch(post(SIGN_UP_USER, {
        url: '/signup',
        data: {
          'method': 'signup'
        }
      }));
    }
  }
)




// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SIGN_UP_USER]: (state, _) => {
    return _.payload;
  }
}, []);
